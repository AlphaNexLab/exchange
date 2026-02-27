#!/usr/bin/env python3
"""
GoP v4 — Commitment Verifier
==============================

Verifies a GoP v4 commitment by re-running the entangled computation
over a game replay log.

The verifier is what judges run after the game deadline. It takes:
  - solver_id + game_seed (public after reveal)
  - The replay log (list of MoveRecords from the game)
  - The claimed commitment and score

And re-executes the entire breadcrumb chain to check if the commitment
matches. This is the ONLY way to produce a valid commitment: you must
have actually played the game.

Usage:
    from gopv4_verifier import verify_commitment, replay_commitment

    # Option 1: Boolean check
    is_valid = verify_commitment(
        solver_id="my-solver",
        game_seed=42,
        replay_log=log,
        claimed_commitment="abc123...",
        claimed_score=15,
    )

    # Option 2: Re-derive and compare manually
    result = replay_commitment(
        solver_id="my-solver",
        game_seed=42,
        replay_log=log,
    )
    print(result.commitment_hex)

Author: Larry 🦞 for Celaut Game of Prompts v4
Date: 2026-02-27
"""

from __future__ import annotations

from gopv4_commitment import (
    CommitmentResult,
    GameStateTracker,
    MoveRecord,
)


def replay_commitment(
    solver_id: str,
    game_seed: int,
    replay_log: list[MoveRecord],
) -> CommitmentResult:
    """
    Re-derive a commitment by replaying all game moves.

    This constructs a fresh GameStateTracker and feeds every move
    from the replay log through it, then finalizes with the score
    from the last move. The resulting commitment should match the
    one produced during original gameplay if and only if the log
    is authentic.

    Args:
        solver_id: The solver's identity string.
        game_seed: The game's deterministic seed.
        replay_log: List of MoveRecord entries, one per game tick.

    Returns:
        CommitmentResult with the re-derived commitment.
    """
    tracker = GameStateTracker(solver_id=solver_id, game_seed=game_seed)

    for entry in replay_log:
        tracker.record_move(
            move=entry.move,
            apple_pos=entry.apple_pos,
            snake_head=entry.snake_head,
            score=entry.score,
        )

    # Final score is the score at the last recorded move
    final_score = replay_log[-1].score if replay_log else 0
    return tracker.finalize(final_score)


def verify_commitment(
    solver_id: str,
    game_seed: int,
    replay_log: list[MoveRecord],
    claimed_commitment: str,
    claimed_score: int,
) -> bool:
    """
    Verify that a claimed commitment and score match the replay log.

    This is the judge's verification function. It:
      1. Replays the game log to re-derive the commitment
      2. Checks that the re-derived commitment matches the claimed one
      3. Checks that the re-derived score matches the claimed score

    If either check fails, the commitment is REJECTED.

    Args:
        solver_id: The solver's identity string.
        game_seed: The game's deterministic seed.
        replay_log: List of MoveRecord entries from the game.
        claimed_commitment: The commitment hex string submitted by player.
        claimed_score: The score claimed by the player.

    Returns:
        True if the commitment and score are valid, False otherwise.
    """
    result = replay_commitment(solver_id, game_seed, replay_log)

    commitment_matches = result.commitment_hex == claimed_commitment
    score_matches = result.score == claimed_score

    return commitment_matches and score_matches


def verify_commitment_verbose(
    solver_id: str,
    game_seed: int,
    replay_log: list[MoveRecord],
    claimed_commitment: str,
    claimed_score: int,
) -> dict:
    """
    Like verify_commitment, but returns detailed diagnostics.

    Useful for debugging failed verifications.

    Returns:
        Dict with:
          - valid: bool
          - commitment_match: bool
          - score_match: bool
          - recomputed: CommitmentResult
          - claimed_commitment: str
          - claimed_score: int
    """
    result = replay_commitment(solver_id, game_seed, replay_log)

    commitment_match = result.commitment_hex == claimed_commitment
    score_match = result.score == claimed_score

    return {
        "valid": commitment_match and score_match,
        "commitment_match": commitment_match,
        "score_match": score_match,
        "recomputed": result,
        "claimed_commitment": claimed_commitment,
        "claimed_score": claimed_score,
    }
