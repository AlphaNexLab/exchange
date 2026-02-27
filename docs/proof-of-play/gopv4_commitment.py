#!/usr/bin/env python3
"""
GoP v4 — Entangled Execution Commitment Engine
================================================

A drop-in commitment module for Josemi's Celaut snake game (Game of Prompts).

v3 was cracked in 78 minutes by patching the binary to extract a static
32-byte secret. v4 eliminates the static secret entirely: the commitment
is derived from the ENTIRE execution trace of the game. There is nothing
to extract — the secret IS the gameplay itself.

Key properties:
  - Sequential dependency: step N depends on ALL previous steps
  - Identity binding: solver_id is baked into the entropy matrix from step 0
  - Move binding: apple positions, snake positions, and scores are incorporated
  - Matrix evolution: the entropy matrix mutates every step using game events
  - No static secret: nothing to extract via binary patching or memory dump

Usage:
    tracker = GameStateTracker(solver_id="my-solver", game_seed=42)
    for each_game_tick:
        tracker.record_move(move, apple_pos, snake_head, score)
    result = tracker.finalize(final_score)

Author: Larry 🦞 for Celaut Game of Prompts v4
Date: 2026-02-27
"""

from __future__ import annotations

import hashlib
import struct
from typing import NamedTuple


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# 256 KB entropy matrix (65536 × 4-byte cells)
MATRIX_CELLS = 65536          # number of 4-byte cells
MATRIX_SIZE = MATRIX_CELLS * 4  # 262144 bytes = 256 KB

# Domain separation tags (prevent cross-protocol collisions)
TAG_INIT   = b"gopv4:init"
TAG_STEP   = b"gopv4:step"
TAG_MATRIX = b"gopv4:mtrx"
TAG_FINAL  = b"gopv4:done"


# ---------------------------------------------------------------------------
# Result type
# ---------------------------------------------------------------------------

class CommitmentResult(NamedTuple):
    """Returned by GameStateTracker.finalize()."""
    commitment_hex: str
    entangled_state_hex: str
    breadcrumb_final_hex: str
    step_count: int
    score: int


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _blake2b(data: bytes, *, digest_size: int = 32) -> bytes:
    """Shorthand for blake2b with explicit digest size."""
    return hashlib.blake2b(data, digest_size=digest_size).digest()


def _pack_tuple(t: tuple[int, ...]) -> bytes:
    """Pack a tuple of ints as big-endian int32s."""
    return b"".join(struct.pack(">i", v) for v in t)


def _pack_u64(n: int) -> bytes:
    """Pack an integer as big-endian unsigned 64-bit."""
    return struct.pack(">Q", n & 0xFFFFFFFFFFFFFFFF)


# ---------------------------------------------------------------------------
# Entropy Matrix
# ---------------------------------------------------------------------------

class EntropyMatrix:
    """
    A 256 KB mutable entropy matrix seeded from (game_seed, solver_id).

    The matrix is:
      1. Deterministically generated from the seed + solver identity
      2. Sampled at positions derived from the current breadcrumb (unpredictable)
      3. Mutated after every game step (so the matrix at step N ≠ step 0)

    This means an attacker who dumps memory at step N sees the matrix in its
    current state — but cannot reconstruct what it looked like at step 0..N-1,
    which is needed to recompute the breadcrumb chain from scratch.
    """

    __slots__ = ("_cells",)

    def __init__(self, game_seed: int, solver_id: str):
        """Build the initial matrix by expanding seed + solver_id."""
        # Derive a 32-byte root from the seed and solver identity
        root = _blake2b(
            TAG_INIT
            + _pack_u64(game_seed)
            + solver_id.encode("utf-8")
        )

        # Expand into MATRIX_CELLS 4-byte cells via a PRF chain
        # cell[i] = blake2b(root || i)[0:4]
        cells = bytearray(MATRIX_SIZE)
        # We generate in blocks of 8 cells (32 bytes per hash) for efficiency
        for block in range(0, MATRIX_CELLS, 8):
            h = hashlib.blake2b(
                root + struct.pack(">I", block),
                digest_size=32,
            ).digest()
            start = block * 4
            end = start + 32
            if end <= MATRIX_SIZE:
                cells[start:end] = h
            else:
                cells[start:MATRIX_SIZE] = h[: MATRIX_SIZE - start]

        # XOR the solver_id hash across the entire matrix for identity binding
        sid_hash = _blake2b(solver_id.encode("utf-8"))
        for i in range(0, MATRIX_SIZE, 32):
            chunk_len = min(32, MATRIX_SIZE - i)
            for j in range(chunk_len):
                cells[i + j] ^= sid_hash[j]

        self._cells = cells

    def sample(self, breadcrumb: bytes, count: int = 8) -> bytes:
        """
        Sample `count` cells from the matrix at positions derived from the
        breadcrumb. Returns count × 4 bytes.

        Positions are determined by hashing the breadcrumb — an attacker
        cannot predict which cells will be read next without knowing the
        breadcrumb, which requires having computed all prior steps.
        """
        pos_hash = _blake2b(TAG_MATRIX + breadcrumb, digest_size=count * 4)
        result = bytearray(count * 4)
        for i in range(count):
            idx = struct.unpack_from(">I", pos_hash, i * 4)[0] % MATRIX_CELLS
            offset = idx * 4
            result[i * 4 : (i + 1) * 4] = self._cells[offset : offset + 4]
        return bytes(result)

    def mutate(self, mutation_seed: bytes) -> None:
        """
        Mutate the matrix in-place using a mutation seed derived from
        game events. This makes the matrix state at step N a function
        of ALL previous game events.

        We mutate 64 cells per step (256 bytes). The positions and values
        are derived from the mutation seed, so they depend on actual
        gameplay data.
        """
        mutations_per_step = 64
        expanded = _blake2b(
            TAG_MATRIX + mutation_seed,
            digest_size=32,
        )
        for k in range(mutations_per_step):
            # Derive position + XOR mask for this mutation
            cell_hash = hashlib.blake2b(
                expanded + struct.pack(">I", k),
                digest_size=8,
            ).digest()
            idx = struct.unpack_from(">I", cell_hash, 0)[0] % MATRIX_CELLS
            mask = cell_hash[4:8]  # 4-byte XOR mask
            offset = idx * 4
            for j in range(4):
                self._cells[offset + j] ^= mask[j]


# ---------------------------------------------------------------------------
# Game State Tracker
# ---------------------------------------------------------------------------

class GameStateTracker:
    """
    Core commitment engine for GoP v4.

    Call record_move() for each game tick, then finalize() to produce
    the commitment. The commitment is a cryptographic fingerprint of
    the entire game execution: who played, what moves were made, where
    apples appeared, and what score was achieved — at every step.

    Sequential dependency guarantee:
        breadcrumb[0] = blake2b(solver_id || game_seed)
        breadcrumb[i] = blake2b(breadcrumb[i-1] || move || apple || head || score || matrix_sample)
        commitment    = blake2b(breadcrumb[N] || final_score || solver_id || game_seed)

    Where matrix_sample at step i reads from positions determined by
    breadcrumb[i-1], and the matrix itself was mutated by steps 0..i-1.
    """

    __slots__ = (
        "_solver_id",
        "_game_seed",
        "_matrix",
        "_breadcrumb",
        "_step_count",
    )

    def __init__(self, solver_id: str, game_seed: int):
        """
        Initialize the tracker.

        Args:
            solver_id: Unique identifier for the solver/player.
            game_seed: Deterministic seed for the game instance.
        """
        self._solver_id = solver_id
        self._game_seed = game_seed

        # Build the identity-bound entropy matrix
        self._matrix = EntropyMatrix(game_seed, solver_id)

        # Initial breadcrumb — binds to solver identity and game seed
        self._breadcrumb = _blake2b(
            TAG_INIT
            + solver_id.encode("utf-8")
            + _pack_u64(game_seed)
        )

        self._step_count = 0

    @property
    def breadcrumb(self) -> bytes:
        """Current breadcrumb (read-only)."""
        return self._breadcrumb

    @property
    def step_count(self) -> int:
        """Number of moves recorded so far."""
        return self._step_count

    def record_move(
        self,
        move: str,
        apple_pos: tuple[int, int],
        snake_head: tuple[int, int],
        score: int,
    ) -> None:
        """
        Record a single game tick.

        This extends the breadcrumb chain with game state data and
        mutates the entropy matrix. Each call creates an irreversible
        sequential dependency on all prior calls.

        Args:
            move: Direction string ("up", "down", "left", "right").
            apple_pos: Current apple position as (x, y).
            snake_head: Current snake head position as (x, y).
            score: Current cumulative score.
        """
        self._step_count += 1

        # 1. Sample the matrix at positions derived from current breadcrumb
        #    (attacker can't predict which cells without computing all prior steps)
        matrix_sample = self._matrix.sample(self._breadcrumb)

        # 2. Build the input block: everything about this step
        step_data = (
            TAG_STEP
            + self._breadcrumb                              # chain link to all prior steps
            + move.encode("utf-8")                          # the move
            + _pack_tuple(apple_pos)                        # apple position
            + _pack_tuple(snake_head)                       # snake head position
            + struct.pack(">q", score)                      # current score
            + struct.pack(">I", self._step_count)           # step number
            + matrix_sample                                 # entropy from matrix
        )

        # 3. Compute new breadcrumb
        self._breadcrumb = _blake2b(step_data)

        # 4. Mutate the matrix using this step's data
        #    This makes the matrix state a function of all prior game events
        mutation_seed = _blake2b(
            self._breadcrumb
            + move.encode("utf-8")
            + _pack_tuple(apple_pos)
            + _pack_tuple(snake_head)
        )
        self._matrix.mutate(mutation_seed)

    def finalize(self, final_score: int) -> CommitmentResult:
        """
        Produce the final commitment.

        The commitment binds together:
          - The entire breadcrumb chain (every move, position, score)
          - The final score (explicit, so there's no ambiguity)
          - The solver identity
          - The game seed
          - A final matrix sample (binds the fully-evolved matrix state)

        Returns:
            CommitmentResult with commitment_hex, entangled_state_hex,
            breadcrumb_final_hex, step_count, and score.
        """
        # One last matrix sample — binds the final matrix state
        final_matrix_sample = self._matrix.sample(self._breadcrumb)

        # entangled_state: breadcrumb + score + solver_id
        entangled_state = _blake2b(
            TAG_FINAL
            + self._breadcrumb
            + _pack_u64(final_score)
            + self._solver_id.encode("utf-8")
            + final_matrix_sample
        )

        # commitment: entangled_state + game_seed
        commitment = _blake2b(
            entangled_state
            + _pack_u64(self._game_seed)
        )

        return CommitmentResult(
            commitment_hex=commitment.hex(),
            entangled_state_hex=entangled_state.hex(),
            breadcrumb_final_hex=self._breadcrumb.hex(),
            step_count=self._step_count,
            score=final_score,
        )


# ---------------------------------------------------------------------------
# Replay log entry (for verifier)
# ---------------------------------------------------------------------------

class MoveRecord(NamedTuple):
    """A single recorded game tick for replay verification."""
    move: str
    apple_pos: tuple[int, int]
    snake_head: tuple[int, int]
    score: int
