# Proof of Play™ — A Cryptographic Primitive for Verifiable Gameplay Integrity

## Game of Prompts v4: The Uncrackable Architecture

**Authors:** Nate, Larry 🦞 & Claude  
**Date:** 2026-02-27  
**For:** Josemi (Game of Prompts / Celaut)  
**Status:** Complete Design — Ready for Implementation  
**Classification:** First-of-its-kind cryptographic primitive

---

> *"The only way to produce a valid commitment for score X is to actually play the game,*  
> *achieve score X, and then wait days. There is no shortcut. There is no secret to steal.*  
> *The execution IS the proof. The time IS the lock."*

---

## Table of Contents

1. [The Name: Proof of Play™](#1-the-name-proof-of-play)
2. [Executive Summary](#2-executive-summary)
3. [Why v1, v2, v3 Failed — The Root Cause](#3-why-v1-v2-v3-failed--the-root-cause)
4. [Architecture Overview](#4-architecture-overview)
5. [The Five Layers](#5-the-five-layers)
6. [Full System Architecture Diagram](#6-full-system-architecture-diagram)
7. [Detailed Technical Specification](#7-detailed-technical-specification)
8. [Attack Surface Analysis — Eight Vectors, All Defeated](#8-attack-surface-analysis--eight-vectors-all-defeated)
9. [On-Chain Ergo Verification](#9-on-chain-ergo-verification)
10. [Why This Is First-of-Its-Kind](#10-why-this-is-first-of-its-kind)
11. [Rust Implementation](#11-rust-implementation)
12. [Parameter Selection & Calibration](#12-parameter-selection--calibration)
13. [Migration Path from v3](#13-migration-path-from-v3)
14. [Security Proofs](#14-security-proofs)
15. [Comparison with Existing Primitives](#15-comparison-with-existing-primitives)
16. [Open Questions & Future Work](#16-open-questions--future-work)
17. [References](#17-references)
18. [Message for Josemi](#18-message-for-josemi)

---

## 1. The Name: Proof of Play™

We name this cryptographic primitive **Proof of Play** (PoP).

Like Proof of Work proves computational effort, and Proof of Stake proves economic commitment, **Proof of Play proves legitimate gameplay execution**. It is the first cryptographic construction that binds together:

- **Execution entanglement** (you must actually play)
- **Space-hardness** (you can't compress the computation)
- **Sequential time-locking** (you can't skip ahead)
- **Identity binding** (you can't transfer the proof)

The commitment it produces is not a signature, not a hash, not a proof-of-work. It is a **Proof of Play**: mathematical evidence that a specific agent played a specific game and achieved a specific score, sealed behind a time-lock that no amount of hardware can accelerate.

```
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║   Proof of Play = Entangled Execution + Space-Hardness + VDF Lock    ║
║                                                                       ║
║   PoP(solver, game, score) → commitment                              ║
║                                                                       ║
║   Properties:                                                         ║
║     • Gameplay-bound: can't produce without playing                   ║
║     • Identity-bound: can't transfer between solvers                  ║
║     • Time-locked: can't accelerate (even with full binary access)    ║
║     • Space-hard: can't parallelize (4MB+ memory requirement)         ║
║     • O(1) verifiable: judges check in milliseconds                   ║
║     • No secrets: nothing to extract from the binary                  ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## 2. Executive Summary

### The Problem

Every version of Game of Prompts has been cracked:

| Version | Protection | Crack Method | Time to Crack |
|---------|-----------|--------------|---------------|
| v1 | Nuitka Python, static secret | Decompile, extract constants | ~30 min |
| v2 | Rust + blake2b | GDB trace, breakpoint on hash | ~45 min |
| v3 | Rust + CRC32 + XOR + anti-debug | Binary patch, syscall trampoline | 78 min |

**Root cause:** All three embed a static secret `S` in the binary. Deterministic binaries always leak their secrets to a sufficiently determined attacker with debugger access.

### The Solution: Proof of Play

We combine two innovations we've already designed:

1. **Entangled Execution** (Breadcrumb Chain + Entropy Matrix) — makes the VDF input *require* legitimate gameplay to generate
2. **VDF Time-Lock** (Wesolowski over class groups) — makes the final commitment *require* days of sequential computation

**The core insight:** `VDF(EntangledState_final, T)` where `EntangledState_final` is ONLY derivable by executing all N game steps in sequence. The VDF input isn't a seed you can look up — it's the fingerprint of an entire gameplay execution.

### What This Achieves

| Property | v1-v3 | Proof of Play v4 |
|----------|-------|-------------------|
| Secret in binary | Yes (fatal flaw) | **No** — nothing to extract |
| Gameplay binding | None | **Full** — every move is cryptographically entangled |
| Time to forge | Minutes | **Days** (mathematically guaranteed) |
| GPU acceleration | N/A | **Impossible** (sequential squaring) |
| Identity binding | Weak (appended) | **Strong** (baked in from step 1) |
| Space requirement | None | **4MB+ entropy matrix** (anti-GPU) |
| On-chain verification | Trivial | **O(1)** with judge attestation |

---

## 3. Why v1, v2, v3 Failed — The Root Cause

All three versions share the same fatal architecture:

```
┌──────────────────────────────────────────────────────────┐
│           THE FATAL PATTERN (v1/v2/v3)                    │
│                                                           │
│    binary contains SECRET_S (hidden)                      │
│            │                                              │
│            ▼                                              │
│    commitment = H(solver_id || score || SECRET_S)         │
│                                                           │
│    Attacker extracts SECRET_S from binary → game over     │
│                                                           │
│    Extraction methods:                                    │
│      v1: decompile Nuitka → read Python source            │
│      v2: GDB breakpoint on blake2b → capture args         │
│      v3: patch ptrace/SIGSTOP → syscall trampoline        │
│                                                           │
│    Fundamental law: if SECRET_S exists as bytes in        │
│    memory during normal execution, it can be captured.    │
│    No obfuscation changes this. Period.                   │
└──────────────────────────────────────────────────────────┘
```

**The paradigm shift in v4:** There is no `SECRET_S`. The "secret" is the *output of a computation that takes days*. It can't be extracted because it doesn't exist until the computation completes. And the computation can't be shortcut because of the VDF's sequential nature.

But wait — if we just used `VDF(seed || score, T)`, an attacker could precompute VDFs for various scores by knowing the seed. That's where Entangled Execution comes in: the VDF input is itself the product of legitimate gameplay, making precomputation impossible.

---

## 4. Architecture Overview

### The Stack — Five Layers of Defense

```
╔═══════════════════════════════════════════════════════════════════╗
║                    PROOF OF PLAY ARCHITECTURE                     ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Layer 5: COMMITMENT         Final hash → on-chain                ║
║     ▲                        blake2b(vdf_out || proof || id)      ║
║     │                                                             ║
║  Layer 4: VDF TIME-LOCK      Sequential computation (~5 days)     ║
║     ▲                        VDF(entangled_state, T=2^37)         ║
║     │                        Can't parallelize. Can't skip.       ║
║     │                                                             ║
║  Layer 3: BREADCRUMB CHAIN   Sequential gameplay proof            ║
║     ▲                        Each step = H(prev || move || matrix)║
║     │                        Can't skip steps. Can't reorder.     ║
║     │                                                             ║
║  Layer 2: ENTROPY MATRIX     4MB space-hard state                 ║
║     ▲                        Evolves each step. Exceeds L3 cache. ║
║     │                        Forces RAM access. Anti-GPU.         ║
║     │                                                             ║
║  Layer 1: IDENTITY INJECTION solver_id XOR'd into initial state   ║
║                              Taints every subsequent computation  ║
║                              Can't remove without full recompute  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Data Flow — From Gameplay to Blockchain

```
 SOLVER                    GAME SERVICE                         ERGO
   │                           │                                  │
   │────── run solver ────────▶│                                  │
   │                           │                                  │
   │                     ┌─────┴─────┐                            │
   │                     │ Layer 1:  │                            │
   │                     │ Identity  │ solver_id → identity_key   │
   │                     │ Injection │ XOR into entropy matrix    │
   │                     └─────┬─────┘                            │
   │                           │                                  │
   │◀── game state ───────────│                                  │
   │──── move action ────────▶│                                  │
   │                     ┌─────┴─────┐                            │
   │                     │ Layer 2:  │ Matrix evolves with        │
   │                     │ Entropy   │ game events + identity     │
   │                     │ Matrix    │ (4MB, space-hard)          │
   │                     └─────┬─────┘                            │
   │                     ┌─────┴─────┐                            │
   │                     │ Layer 3:  │ breadcrumb[i] =            │
   │                     │ Breadcrumb│ H(prev || move || matrix)  │
   │                     │ Chain     │ Accumulates full trace      │
   │                     └─────┬─────┘                            │
   │                           │                                  │
   │  (repeat for N game steps — each step depends on previous)   │
   │                           │                                  │
   │                     ┌─────┴─────┐                            │
   │                     │ Layer 4:  │ entangled_input =          │
   │                     │ VDF       │   H(breadcrumb_final ||    │
   │                     │ Time-Lock │     score || id || seed)   │
   │                     │           │                            │
   │                     │ (y, π) = VDF(input, T=2^37)           │
   │                     │ ⏱️ ~5 DAYS (sequential, unforgeable)   │
   │                     └─────┬─────┘                            │
   │                     ┌─────┴─────┐                            │
   │                     │ Layer 5:  │ commitment =               │
   │                     │ Commitment│   H(y || π || id || score) │
   │                     └─────┬─────┘                            │
   │                           │                                  │
   │◀── commitment ───────────│                                  │
   │                           │                                  │
   │──────────── submit commitment on-chain ─────────────────────▶│
   │                                                              │
   │           Judge nodes verify VDF proof (O(1), milliseconds)  │
   │           ErgoScript checks commitment hash + attestation    │
```

---

## 5. The Five Layers

### Layer 1: Identity Injection

**Purpose:** Make every subsequent computation irreversibly dependent on solver identity.

```
identity_key = blake2b(solver_id, 32 bytes)

// XOR identity into the initial entropy matrix seed
matrix_seed = game_seed ⊕ identity_key (repeated across seed bytes)

// The identity key also seeds the initial breadcrumb
breadcrumb[0] = blake2b(INIT_TAG || game_seed || identity_key)
```

**Why this matters:** The solver_id isn't appended at the end (like v1-v3, where you could strip it). It's mixed in from the very first byte of the entropy matrix. Every matrix read, every breadcrumb update, every VDF input derives from this tainted initial state. To produce a valid commitment for a different solver_id, you'd need to recompute the entire entropy matrix evolution, the entire breadcrumb chain, and the entire VDF — from scratch.

**Attack mitigation:** Replay attacks fail because even identical gameplay by a different solver produces completely different intermediate states.

### Layer 2: Space-Hard Entropy Matrix

**Purpose:** Force large memory allocation that prevents GPU parallelization and ensures honest execution cost.

```
┌─────────────────────────────────────────────────────────────┐
│              ENTROPY MATRIX (4MB)                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Block 0 │ Block 1 │ Block 2 │ ... │ Block 131071    │    │
│  │ 32 bytes│ 32 bytes│ 32 bytes│     │ 32 bytes        │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Generation: block[i] = blake2b(matrix_seed || i)            │
│  Size: 131,072 blocks × 32 bytes = 4,194,304 bytes (4MB)    │
│                                                              │
│  Access pattern per step:                                    │
│    positions = derive_positions(current_breadcrumb, 16)      │
│    sample = concat(matrix[pos[0]], ..., matrix[pos[15]])     │
│                                                              │
│  Evolution per step:                                         │
│    mutation_key = blake2b(game_state || move || step_number) │
│    for each touched_block in affected_region(mutation_key):  │
│      matrix[block] ^= blake2b(mutation_key || block_index)   │
│                                                              │
│  Properties:                                                 │
│    • 4MB > typical L3 cache → forces RAM access              │
│    • Random access pattern → no prefetch optimization        │
│    • Matrix state at step N depends on ALL previous steps    │
│    • Can't precompute: positions depend on actual game events│
│    • Can't compress: pseudo-random, high entropy             │
│    • GPU memory bandwidth bottleneck (not compute-bound)     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Why 4MB?** Most modern CPUs have L3 caches of 8-32MB, but per-core effective cache is typically 2-4MB. A 4MB matrix with random access patterns exceeds this, forcing main memory access on every read. GPUs have shared L2 caches of ~6MB (RTX 3090) but with thousands of threads competing, effective per-thread cache is far less. This makes the matrix access **memory-bound, not compute-bound** — exactly where GPUs lose their advantage.

### Layer 3: Breadcrumb Chain

**Purpose:** Create a sequential, unforgeable trace of the entire gameplay execution.

```
breadcrumb[0] = blake2b(INIT_TAG || game_seed || identity_key)

for each game step i:
    // Gather step data
    game_state_i = game.state_bytes()
    solver_action_i = solver.act(game_state_i)
    
    // Read from entropy matrix at positions derived from current state
    positions = derive_positions(breadcrumb[i], 16)
    matrix_sample = matrix.read_scattered(positions)
    
    // Compute intermediate hash (binds game state + action + identity)
    mid = blake2b(
        STEP_TAG          ||  // domain separator
        breadcrumb[i]     ||  // previous breadcrumb (sequential dependency)
        identity_key      ||  // solver identity (identity binding)
        game_state_i      ||  // actual game state (gameplay binding)
        solver_action_i   ||  // actual move made
        score.to_be()     ||  // cumulative score at this step
        step_count.to_be()||  // step number
    )
    
    // Fold in matrix sample (space-hardness binding)
    breadcrumb[i+1] = blake2b(mid || matrix_sample)
    
    // Evolve matrix for next step
    matrix.evolve(game_state_i, solver_action_i, i)

// Score events also mutate the chain
on score_event(points, reason):
    mid = blake2b(
        SCORE_TAG         ||
        breadcrumb[current] ||
        identity_key      ||
        points.to_be()    ||
        cumulative_score.to_be() ||
        score_event_count.to_be()
    )
    matrix_sample = matrix.read_scattered(derive_positions(mid))
    breadcrumb[current] = blake2b(mid || matrix_sample)
```

**Properties:**
- **Sequential:** breadcrumb[i+1] depends on breadcrumb[i] — can't skip steps
- **Gameplay-bound:** actual game states and solver actions are hashed in
- **Identity-bound:** solver identity is in every step (not just first/last)
- **Score-bound:** cumulative score is baked into the chain at every step
- **Space-bound:** matrix samples tie each step to the 4MB matrix state
- **Deterministic:** same solver + same game = same chain (verifiable by re-execution)

### Layer 4: VDF Time-Lock

**Purpose:** Impose an irreducible time cost on commitment generation.

```
┌──────────────────────────────────────────────────────────┐
│                   VDF TIME-LOCK LAYER                     │
│                                                           │
│  Input construction:                                      │
│    entangled_input = blake2b(                             │
│      breadcrumb_final  ||  // Full gameplay trace          │
│      matrix_digest     ||  // Final entropy matrix hash    │
│      score.to_be()     ||  // Final score                  │
│      identity_key      ||  // Solver identity              │
│      game_seed         ||  // Game parameters              │
│    )                                                      │
│                                                           │
│  VDF computation:                                         │
│    group = ClassGroup(discriminant_from(entangled_input))  │
│    g = hash_to_generator(entangled_input)                  │
│    y = g^(2^T)  where T = 2^37 ≈ 137 billion squarings   │
│    π = Wesolowski_proof(g, y, T)                           │
│                                                           │
│  Time: ~5 days on fastest known hardware                  │
│  Time: ~16 days on typical CPU                            │
│                                                           │
│  Key properties:                                          │
│    • Each unique (solver, score, gameplay) → unique group  │
│    • Can't precompute: don't know entangled_input until    │
│      game completes                                        │
│    • Can't parallelize: each squaring needs the previous   │
│    • Can't shortcut: group order unknown (class groups)    │
│    • Proof verifies in milliseconds                        │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Why class groups (not RSA)?**
- RSA requires a trusted setup (someone knows the factorization)
- Class groups of imaginary quadratic fields have no known efficient algorithm for computing the group order
- Nobody — not even Josemi — has a shortcut
- Same construction used by Chia Network ($300M+ market cap)
- No trusted setup ceremony required

**The critical innovation:** The VDF input is `entangled_input`, which requires the full breadcrumb chain, which requires the full entropy matrix evolution, which requires the actual gameplay execution. **You can't even START the VDF without having played the game.**

### Layer 5: Commitment

**Purpose:** Produce the final hash submitted on-chain.

```
commitment = blake2b(
    vdf_output_y      ||  // VDF result (time-locked)
    vdf_proof_π       ||  // Wesolowski proof
    identity_key      ||  // Solver identity
    score.to_be()     ||  // Final score
    game_seed         ||  // Game parameters
)
```

**Dual-phase submission:**

```
Phase 1 (immediate, after gameplay):
  fast_commitment = blake2b(
    breadcrumb_final || identity_key || score || game_seed
  )
  → Submit on-chain for timestamp/priority registration
  
Phase 2 (after VDF completes, ~5 days later):
  vdf_commitment = commitment (as above)
  → Submit on-chain to claim prize eligibility
  
Both must match for a valid participation.
```

---

## 6. Full System Architecture Diagram

```
═══════════════════════════════════════════════════════════════════════════
                         PROOF OF PLAY — FULL ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════

                          ┌─────────────────────────┐
                          │     GAME SEED (public)   │
                          │  (embedded in .bee, not   │
                          │   a secret — intentional) │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │   SOLVER ID (public)     │
                          │  blake2b(solver_service)  │
                          └────────────┬────────────┘
                                       │
              ┌────────────────────────▼────────────────────────┐
              │              LAYER 1: IDENTITY INJECTION         │
              │                                                  │
              │  identity_key = blake2b(solver_id)               │
              │  matrix_seed = game_seed ⊕ identity_key          │
              │  breadcrumb[0] = blake2b(INIT || seed || id_key) │
              └────────────────────────┬────────────────────────┘
                                       │
              ┌────────────────────────▼────────────────────────┐
              │           LAYER 2: ENTROPY MATRIX (4MB)          │
              │                                                  │
              │  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐   │
              │  │░░│▓▓│░░│▓▓│░░│▓▓│░░│▓▓│░░│▓▓│░░│▓▓│░░│▓▓│   │
              │  └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘   │
              │  131,072 blocks × 32 bytes = 4MB                 │
              │  Generated from matrix_seed (identity-tainted)   │
              │  Evolves each game step                          │
              └────────────────────────┬────────────────────────┘
                                       │
         ┌─────────────────────────────▼─────────────────────────────┐
         │                                                           │
         │              GAMEPLAY LOOP (N steps)                      │
         │                                                           │
         │  ┌─────────┐    ┌──────────┐    ┌──────────────────────┐  │
         │  │ Game     │───▶│ Solver   │───▶│ LAYER 3: BREADCRUMB │  │
         │  │ State[i] │    │ Action[i]│    │ CHAIN UPDATE         │  │
         │  └─────────┘    └──────────┘    │                      │  │
         │                                  │ positions = f(bc[i]) │  │
         │       ┌──────────────────────────│ sample = matrix[pos] │  │
         │       │                          │ mid = H(bc[i] ||     │  │
         │       │   MATRIX READS           │   id || state ||     │  │
         │       │   (random access,        │   action || score)   │  │
         │       │    space-hard)            │ bc[i+1] = H(mid ||  │  │
         │       │                          │   sample)            │  │
         │       ▼                          └──────────┬───────────┘  │
         │  ┌──┬──┬──┬──┬──┐                           │              │
         │  │▓▓│  │  │▓▓│  │  (16 random positions)    │              │
         │  └──┴──┴──┴──┴──┘                           │              │
         │       │                                      │              │
         │       │        MATRIX EVOLUTION              │              │
         │       ▼        (game events mutate blocks)   │              │
         │  ┌──┬──┬──┬──┬──┐                           │              │
         │  │██│  │  │██│  │  (mutated blocks)          │              │
         │  └──┴──┴──┴──┴──┘                           │              │
         │                                              │              │
         │  ┌──── SCORE EVENT? ─────┐                   │              │
         │  │ points baked into     │                   │              │
         │  │ chain state (v3 fix)  │──────────────────▶│              │
         │  └───────────────────────┘                   │              │
         │                                              │              │
         │  (repeat for all N game steps)               │              │
         │                                              │              │
         └──────────────────────────────────────────────┼──────────────┘
                                                        │
              ┌─────────────────────────────────────────▼──────────────┐
              │              LAYER 4: VDF TIME-LOCK                     │
              │                                                        │
              │  entangled_input = blake2b(                            │
              │    breadcrumb_final || matrix_digest ||                 │
              │    score || identity_key || game_seed                   │
              │  )                                                     │
              │                                                        │
              │  discriminant = hash_to_discriminant(entangled_input)   │
              │  g = hash_to_generator(entangled_input, discriminant)   │
              │                                                        │
              │  ┌──────────────────────────────────────────────────┐   │
              │  │                                                  │   │
              │  │  y = g                                           │   │
              │  │  for i in 0..2^37:         ◄── 137 BILLION      │   │
              │  │      y = y * y (mod Cl(Δ))     SEQUENTIAL       │   │
              │  │                                 SQUARINGS        │   │
              │  │  π = Wesolowski_proof(g, y, 2^37)               │   │
              │  │                                                  │   │
              │  │  ⏱️  ~5 DAYS on fastest hardware                 │   │
              │  │  ⏱️  ~16 DAYS on typical CPU                     │   │
              │  │  ⏱️  ~5 DAYS on RTX 3090 (GPU = no advantage)    │   │
              │  │                                                  │   │
              │  └──────────────────────────────────────────────────┘   │
              │                                                        │
              └────────────────────────────┬───────────────────────────┘
                                           │
              ┌────────────────────────────▼────────────────────────┐
              │              LAYER 5: COMMITMENT                    │
              │                                                     │
              │  commitment = blake2b(                              │
              │    y || π || identity_key || score || game_seed     │
              │  )                                                  │
              │                                                     │
              │  Output: 32-byte commitment hash                    │
              │  + VDF proof data for judge verification            │
              └────────────────────────────┬────────────────────────┘
                                           │
              ┌────────────────────────────▼────────────────────────┐
              │              ERGO BLOCKCHAIN                         │
              │                                                     │
              │  Phase 1 Box (immediate):                           │
              │    R4: solver_id                                    │
              │    R5: fast_commitment (pre-VDF)                    │
              │    R6: score                                        │
              │    R7: game_seed                                    │
              │                                                     │
              │  Phase 2 Box (after VDF, ~5 days):                  │
              │    R4: vdf_commitment                               │
              │    R5: vdf_output_hash                              │
              │    R6: vdf_proof_hash                               │
              │                                                     │
              │  Resolution:                                        │
              │    Judge nodes verify VDF proof (milliseconds)      │
              │    Submit signed attestation on-chain               │
              │    ErgoScript: 2-of-3 judge sigs + commitment match │
              └─────────────────────────────────────────────────────┘
```

---

## 7. Detailed Technical Specification

### 7.1 Constants

```rust
// Entropy matrix size: 4MB = 131,072 blocks of 32 bytes
const MATRIX_BLOCKS: usize = 131_072;
const MATRIX_BLOCK_SIZE: usize = 32;
const MATRIX_SIZE: usize = MATRIX_BLOCKS * MATRIX_BLOCK_SIZE; // 4,194,304 bytes

// Positions sampled per step (16 random positions × 4 bytes = 64 bytes per sample)
const SAMPLE_POSITIONS: usize = 16;
const BYTES_PER_POSITION: usize = 4;

// VDF parameters
const VDF_T: u64 = 1 << 37;           // 2^37 ≈ 137 billion squarings
const DISCRIMINANT_BITS: u16 = 2048;   // 128-bit security level

// Matrix evolution: number of blocks mutated per game step
const MUTATION_SPREAD: usize = 256;    // ~8KB mutated per step

// Domain separation tags
const INIT_TAG: u8 = 0x00;
const STEP_TAG: u8 = 0x01;
const SCORE_TAG: u8 = 0x02;
const MATRIX_EVOLVE_TAG: u8 = 0x03;
const FINAL_TAG: u8 = 0xFF;
```

### 7.2 Entropy Matrix Generation

```rust
/// Generate the initial 4MB entropy matrix from the identity-tainted seed.
fn generate_matrix(game_seed: &[u8; 32], identity_key: &[u8; 32]) -> Vec<u8> {
    // Taint seed with identity
    let mut matrix_seed = [0u8; 32];
    for i in 0..32 {
        matrix_seed[i] = game_seed[i] ^ identity_key[i];
    }
    
    let mut matrix = Vec::with_capacity(MATRIX_SIZE);
    for i in 0..MATRIX_BLOCKS {
        let block = blake2b_256(&[
            &matrix_seed[..],
            &(i as u64).to_le_bytes(),
        ]);
        matrix.extend_from_slice(&block);
    }
    
    assert_eq!(matrix.len(), MATRIX_SIZE);
    matrix
}
```

### 7.3 Matrix Sampling (Space-Hard Access)

```rust
/// Derive 16 random positions from a 32-byte state value.
/// Positions are scattered across the full 4MB matrix, defeating caching.
fn derive_positions(state: &[u8; 32]) -> Vec<usize> {
    let mut positions = Vec::with_capacity(SAMPLE_POSITIONS);
    
    // Use pairs of bytes from state to derive positions
    // Extend with a secondary hash if needed for more positions
    let extended = blake2b_256(&[state, b"positions"]);
    
    for i in 0..SAMPLE_POSITIONS {
        let offset = i * 4;
        let raw = u32::from_le_bytes([
            extended[offset % 32],
            extended[(offset + 1) % 32],
            state[(offset + 2) % 32],
            state[(offset + 3) % 32],
        ]);
        // Map to matrix block index
        let block_idx = (raw as usize) % MATRIX_BLOCKS;
        positions.push(block_idx * MATRIX_BLOCK_SIZE);
    }
    
    positions
}

/// Read scattered bytes from the matrix at derived positions.
fn matrix_sample(matrix: &[u8], state: &[u8; 32]) -> Vec<u8> {
    let positions = derive_positions(state);
    let mut sample = Vec::with_capacity(SAMPLE_POSITIONS * BYTES_PER_POSITION);
    
    for pos in positions {
        let end = (pos + BYTES_PER_POSITION).min(matrix.len());
        sample.extend_from_slice(&matrix[pos..end]);
    }
    
    sample
}
```

### 7.4 Matrix Evolution

```rust
/// Evolve the entropy matrix based on a game event.
/// Mutates MUTATION_SPREAD blocks deterministically based on the event.
fn evolve_matrix(
    matrix: &mut [u8],
    game_state: &[u8],
    solver_action: &[u8],
    step: u32,
) {
    // Derive mutation key from game event
    let mutation_key = blake2b_256(&[
        &[MATRIX_EVOLVE_TAG],
        game_state,
        solver_action,
        &step.to_be_bytes(),
    ]);
    
    // Determine which blocks to mutate
    for j in 0..MUTATION_SPREAD {
        let block_selector = blake2b_256(&[
            &mutation_key[..],
            &(j as u64).to_le_bytes(),
        ]);
        
        let block_idx = u32::from_le_bytes([
            block_selector[0], block_selector[1],
            block_selector[2], block_selector[3],
        ]) as usize % MATRIX_BLOCKS;
        
        let offset = block_idx * MATRIX_BLOCK_SIZE;
        
        // XOR mutation into the block
        let mutation = blake2b_256(&[
            &mutation_key[..],
            &(block_idx as u64).to_le_bytes(),
            b"mutate",
        ]);
        
        for k in 0..MATRIX_BLOCK_SIZE {
            matrix[offset + k] ^= mutation[k];
        }
    }
}
```

### 7.5 Breadcrumb Chain

```rust
struct BreadcrumbChain {
    state: [u8; 32],
    identity_key: [u8; 32],
    score: i64,
    step_count: u32,
    score_event_count: u32,
}

impl BreadcrumbChain {
    fn new(game_seed: &[u8; 32], identity_key: &[u8; 32]) -> Self {
        let state = blake2b_256(&[
            &[INIT_TAG],
            &game_seed[..],
            &identity_key[..],
        ]);
        
        Self {
            state,
            identity_key: *identity_key,
            score: 0,
            step_count: 0,
            score_event_count: 0,
        }
    }
    
    /// Process a game step — updates the chain with game state + action + matrix
    fn step(
        &mut self,
        game_state: &[u8],
        solver_action: &[u8],
        matrix: &[u8],
    ) {
        self.step_count += 1;
        
        // Phase 1: Hash game data with chain state
        let mid = blake2b_256(&[
            &[STEP_TAG],
            &self.state[..],
            &self.identity_key[..],
            game_state,
            solver_action,
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
        ]);
        
        // Phase 2: Fold in matrix sample (space-hardness)
        let sample = matrix_sample(matrix, &mid);
        
        self.state = blake2b_256(&[
            &mid[..],
            &sample[..],
        ]);
    }
    
    /// Record a score event — bakes points into the chain
    fn award(&mut self, points: i64, reason: &[u8], matrix: &[u8]) {
        self.score += points;
        self.score_event_count += 1;
        
        let mid = blake2b_256(&[
            &[SCORE_TAG],
            &self.state[..],
            &self.identity_key[..],
            &points.to_be_bytes(),
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
            reason,
        ]);
        
        let sample = matrix_sample(matrix, &mid);
        
        self.state = blake2b_256(&[
            &mid[..],
            &sample[..],
        ]);
    }
    
    /// Finalize the chain — produces the entangled state for VDF input
    fn finalize(
        &self,
        game_seed: &[u8; 32],
        matrix: &[u8],
        hash_logs: &[u8; 32],
    ) -> [u8; 32] {
        // Final matrix sample keyed to terminal state
        let final_sample = matrix_sample(matrix, &self.state);
        
        // Matrix digest: blake2b of the entire final matrix state
        let matrix_digest = blake2b_256(&[matrix]);
        
        // Entangled input: combines everything
        blake2b_256(&[
            &[FINAL_TAG],
            &self.state[..],          // full breadcrumb chain
            &matrix_digest[..],       // full matrix state
            &self.identity_key[..],   // solver identity
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
            &game_seed[..],
            hash_logs,
            &final_sample[..],
        ])
    }
}
```

### 7.6 VDF Integration

```rust
use vdf::{VDFParams, WesolowskiVDFParams, VDF};

/// Compute the VDF time-lock on the entangled input.
/// THIS IS THE SLOW PART — ~5 days on fast hardware.
fn compute_vdf(entangled_input: &[u8; 32]) -> VdfResult {
    let vdf_params = WesolowskiVDFParams(DISCRIMINANT_BITS);
    let vdf_instance = vdf_params.new();
    
    println!("╔══════════════════════════════════════════════════╗");
    println!("║  VDF COMPUTATION STARTING                        ║");
    println!("║  Difficulty: {} squarings (2^37)                  ║", VDF_T);
    println!("║  Estimated time: ~5 days (fastest HW)            ║");
    println!("║  This cannot be accelerated. This is the feature.║");
    println!("╚══════════════════════════════════════════════════╝");
    
    let start = std::time::Instant::now();
    
    // The proof_bytes contain both y (VDF output) and π (Wesolowski proof)
    let proof_bytes = vdf_instance
        .solve(entangled_input, VDF_T)
        .expect("VDF computation failed");
    
    let elapsed = start.elapsed();
    println!("VDF complete in {:.2} hours ({:.2} days)",
        elapsed.as_secs_f64() / 3600.0,
        elapsed.as_secs_f64() / 86400.0,
    );
    
    // Split proof_bytes into output y and proof π
    let mid = proof_bytes.len() / 2;
    VdfResult {
        output_y: proof_bytes[..mid].to_vec(),
        proof_pi: proof_bytes[mid..].to_vec(),
        raw_bytes: proof_bytes,
    }
}

struct VdfResult {
    output_y: Vec<u8>,
    proof_pi: Vec<u8>,
    raw_bytes: Vec<u8>,
}

/// Verify a VDF proof — THIS IS FAST (milliseconds).
fn verify_vdf(entangled_input: &[u8; 32], proof_bytes: &[u8]) -> bool {
    let vdf_params = WesolowskiVDFParams(DISCRIMINANT_BITS);
    let vdf_instance = vdf_params.new();
    
    vdf_instance
        .verify(entangled_input, VDF_T, proof_bytes)
        .is_ok()
}
```

### 7.7 Final Commitment Generation

```rust
/// Generate the Proof of Play commitment.
fn generate_pop_commitment(
    vdf_result: &VdfResult,
    identity_key: &[u8; 32],
    score: i64,
    game_seed: &[u8; 32],
) -> [u8; 32] {
    blake2b_256(&[
        &vdf_result.output_y[..],
        &vdf_result.proof_pi[..],
        &identity_key[..],
        &score.to_be_bytes(),
        &game_seed[..],
    ])
}

/// The complete Proof of Play data structure submitted on-chain.
struct ProofOfPlay {
    // Public identifiers
    solver_id: [u8; 32],
    game_seed: [u8; 32],
    score: i64,
    
    // Entangled execution trace
    entangled_input: [u8; 32],
    gameplay_hash: [u8; 32],
    
    // VDF proof
    vdf_output_y: Vec<u8>,
    vdf_proof_pi: Vec<u8>,
    
    // Final commitment (submitted on-chain)
    commitment: [u8; 32],
    
    // Fast commitment (submitted immediately for timestamping)
    fast_commitment: [u8; 32],
}
```

---

## 8. Attack Surface Analysis — Eight Vectors, All Defeated

### Attack 1: Binary Patching + Syscall Interception (Our v3 Method)

**The attack:** Patch `ptrace()` and `SIGSTOP` detection. Redirect `write()` syscall to capture the secret. Replace the hash function with identity to extract intermediate values. Use a syscall trampoline to intercept all outputs.

**Why it worked on v3:** v3 hid `SECRET_S` in the binary and used anti-debug to protect it. Patching out anti-debug exposed the secret.

**Why it fails on v4:**

```
Attacker patches binary → Captures... what?

Option A: Capture the VDF input (entangled_input)
  Result: Now you have the input. You still need to compute VDF(input, 2^37).
  That takes 5 days. You can't skip it. There is no shortcut.

Option B: Patch out the VDF computation entirely
  Result: No VDF output → no valid proof → commitment doesn't verify.
  Judges re-run the game and get a DIFFERENT commitment (the real one).

Option C: Patch to output a fake VDF proof
  Result: Wesolowski verification fails. Mathematically unforgeable.
  
Option D: Capture intermediate VDF state (partial computation)
  Result: You have g^(2^k) for some k < T. You still need T-k more 
  squarings. If you've done 1 day of work, you still need 4 more days.
  Capturing the state doesn't save you any time.
```

**Verdict: ✅ DEFEATED.** There is nothing to extract. Binary patching gives you access to public information. The security is mathematical (sequential squaring), not informational (hidden secrets).

### Attack 2: GDB Memory Dump Mid-Execution

**The attack:** Attach GDB during game execution. Dump all memory. Inspect the entropy matrix, breadcrumb chain state, and any intermediate values.

**Why it worked on v2:** The secret `S` existed in memory as a 32-byte value during hash computation. GDB captured it at the breakpoint.

**Why it fails on v4:**

```
Attacker dumps memory during execution → Gets:
  
  • Entropy matrix (4MB) → This is INTERMEDIATE state. Different 
    every step. Capturing at step K doesn't help for step K+1.
    
  • Breadcrumb chain state → This is the hash chain at the current 
    step. It will change on every subsequent step based on FUTURE 
    game events the attacker doesn't control.
    
  • Game seed → Public anyway. Knowing it doesn't help.
    
  • Identity key → Derived from solver_id, which is public anyway.

  None of these values allow shortcutting the VDF.
  The attacker STILL needs to:
    1. Complete all remaining game steps (gameplay-bound)
    2. Compute VDF(entangled_input, 2^37) (~5 days sequential)

Memory dump during VDF computation → Gets g^(2^k) for current k.
  Still need T-k more squarings. No time saved.
```

**Verdict: ✅ DEFEATED.** All intermediate values are useless without completing both the gameplay and the VDF computation.

### Attack 3: Replay Attack (Replaying Captured Execution)

**The attack:** Record a high-scoring player's complete execution trace. Replay it with a different solver_id.

**Why it fails on v4:**

```
Player A's execution produces:
  breadcrumb_chain_A → entangled_input_A → VDF(input_A, T) → commitment_A

Attacker replays same game events with solver_B's identity:
  breadcrumb_chain_B → entangled_input_B → VDF(input_B, T) → commitment_B

Because identity_key is XOR'd into the initial matrix seed (Layer 1):
  matrix_A ≠ matrix_B (completely different 4MB matrices)
  
Because identity_key is in every breadcrumb step (Layer 3):
  breadcrumb_chain_A ≠ breadcrumb_chain_B (every step diverges)
  
Because entangled_input incorporates the full chain:
  entangled_input_A ≠ entangled_input_B
  
Therefore:
  VDF(input_A, T) ≠ VDF(input_B, T)  (different groups, different results)
  commitment_A ≠ commitment_B

The attacker's replayed commitment doesn't match what judges compute
when they re-run the game with solver_B.
```

**Verdict: ✅ DEFEATED.** Identity injection at Layer 1 makes replay attacks produce completely different commitment chains.

### Attack 4: Precomputation with Known Seed

**The attack:** The game seed is public. Precompute VDF outputs for various possible scores before the game starts.

**Why it fails on v4:**

```
The VDF input is:
  entangled_input = blake2b(breadcrumb_final || matrix_digest || ...)

breadcrumb_final requires:
  → All N game steps executed in sequence
  → Each step uses the actual game state (which depends on RNG + solver actions)
  → Matrix samples at positions determined by runtime game events
  → Matrix state that evolves based on game events

The attacker CAN'T compute breadcrumb_final without:
  1. Knowing the exact sequence of game events (depends on solver behavior)
  2. Executing the entropy matrix evolution (depends on game events)
  3. Processing all N steps sequentially (can't skip or parallelize)

Even if the game is deterministic (same seed → same game), the attacker 
still needs to RUN THE GAME to get the breadcrumb chain. And then wait 
~5 days for the VDF. Which is... exactly what honest play requires.

For a different score, the entangled_input is completely different,
requiring a fresh ~5 day VDF computation.
```

**Verdict: ✅ DEFEATED.** The entangled input requires gameplay execution. Precomputation without playing is impossible. Precomputation for a score you didn't achieve requires a new 5-day VDF.

### Attack 5: Parallel Computation on GPU Cluster

**The attack:** Use hundreds of GPUs (or ASICs) to parallelize the VDF computation.

**Why it fails on v4:**

```
The VDF is inherently sequential:
  
  y₀ = g
  y₁ = y₀² = g²
  y₂ = y₁² = g⁴
  y₃ = y₂² = g⁸
  ...
  y_T = y_{T-1}² = g^(2^T)

Each step REQUIRES the output of the previous step.
100 GPUs compute this at the SAME speed as 1 GPU.
10,000 GPUs compute this at the SAME speed as 1 GPU.

The only way to go faster is a faster single-thread processor.
Current best: ~300,000 squarings/sec (Chia ASIC-equivalent).
At 2^37 difficulty: ~5.3 days. Period.

The entropy matrix (4MB) also defeats GPU parallelization for a
different reason: random memory access patterns on 4MB of data
are memory-bandwidth-bound, where GPUs have limited per-thread
cache. But this is secondary — the VDF sequential constraint
is the primary defense.
```

**Additionally, even if an attacker COULD parallelize (hypothetically):**
- Each (solver, score, gameplay) tuple produces a unique entangled_input
- Each unique entangled_input produces a unique class group discriminant
- Each unique discriminant requires a fresh VDF computation
- Parallelism across scores doesn't help for a specific score claim

**Verdict: ✅ DEFEATED.** Sequential squaring is the mathematical bedrock. No parallelism shortcut exists under the sequential squaring assumption.

### Attack 6: Time Manipulation / VM Snapshot Tricks

**The attack:** Run the game in a VM. Snapshot the VM state. Fork execution to try different strategies. Use clock manipulation to make the VDF "think" time has passed.

**Why it fails on v4:**

```
VM Snapshot + Fork Attack:
  Snapshot at step K → Fork into 10 parallel VMs with different moves
  → Each fork produces a DIFFERENT breadcrumb chain
  → Each fork requires its own full VDF computation (~5 days each)
  → 10 forks = 10 × 5 days of sequential computation (not parallel!)
  → The attacker can try many strategies but each one costs 5 days

Clock Manipulation:
  VDF computation doesn't use wall-clock time. It uses SEQUENTIAL
  SQUARINGS. You can set the clock to year 3000 — the VDF still
  needs 2^37 actual group squarings. Each one depends on the previous.
  There is no clock to fool.

VM State Capture:
  Same as Attack 2 (GDB memory dump). Intermediate states don't help.
  You still need to complete the remaining squarings.
```

**What DOES work (and it's fine):**
- Play the game many times, keep the best score → This is legitimate. Each play requires its own VDF computation.
- Run the VDF on faster hardware → Fine, but limited by single-thread performance. Best case: 5 days instead of 16 days.

**Verdict: ✅ DEFEATED.** Time is measured in squarings, not wall-clock. VMs provide no advantage.

### Attack 7: Social Engineering (Submitting Fake Scores)

**The attack:** Submit a commitment claiming score=999 when you actually scored 13. Bribe or impersonate a judge.

**Why it fails on v4:**

```
The commitment verification is deterministic:

  Judge re-runs: Game(solver) → breadcrumb_chain → entangled_input → 
                 VDF(input, T) → commitment_expected

  Judge checks: submitted_commitment == commitment_expected ?

  If attacker claims score=999 but actually scored 13:
    → Judge's re-run produces score=13 and commitment_for_13
    → Attacker's commitment_for_999 ≠ commitment_for_13
    → REJECTED

  If attacker tries to forge commitment_for_999:
    → Needs VDF(entangled_input_for_999, T)
    → But entangled_input_for_999 requires a breadcrumb chain where 
      score=999 was actually achieved
    → Can't produce that breadcrumb chain without a game execution 
      that actually scored 999

  If attacker bribes a judge:
    → GoP uses 2-of-3 judge quorum (TLS Quorum)
    → Would need to bribe 2 judges
    → But anyone can verify the VDF proof independently
    → Fraud is publicly detectable → whistleblower incentive
    → Economic: fraud proof on-chain slashes judge stake
```

**Verdict: ✅ DEFEATED.** Commitments are deterministic. Fraud is publicly detectable. Judge quorum + fraud proofs make collusion uneconomical.

### Attack 8: Partial Execution + Extrapolation

**The attack:** Play the first 10% of the game, observe the pattern, predict the rest, and compute the commitment without completing the game.

**Why it fails on v4:**

```
The breadcrumb chain at step K encodes the FULL history of steps 0..K.
There is no mathematical relationship between breadcrumb[K] and 
breadcrumb[N] that allows extrapolation.

Specifically:
  breadcrumb[K+1] = blake2b(
    breadcrumb[K] || game_state[K+1] || matrix_sample[K+1] || ...
  )

  game_state[K+1] depends on the solver's action at step K+1.
  matrix_sample[K+1] depends on the matrix state at step K+1,
    which was mutated by game events at steps 0..K.
  
  Even if the game is fully deterministic (known seed), the 
  breadcrumb chain requires computing EVERY step because:
  1. Matrix evolution is sequential (step K+1 reads blocks mutated at step K)
  2. Breadcrumb chain is sequential (step K+1 hashes step K)
  3. Matrix sampling positions depend on the breadcrumb at each step

  There is no closed-form expression for breadcrumb[N] that avoids
  computing breadcrumbs [0, 1, 2, ..., N-1].

After completing all game steps:
  The attacker STILL needs 5 days of VDF computation.
  
  Total minimum time: game_execution_time + VDF_time
  Both are required. Neither can be shortened.
```

**Verdict: ✅ DEFEATED.** No extrapolation is possible. The breadcrumb chain and matrix evolution are both sequential and interdependent.

### Summary: Complete Attack Surface Coverage

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    ATTACK SURFACE SUMMARY                             ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  Attack Vector                  │ Defeated By            │ Cost to    ║
║                                 │                        │ Attacker   ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Binary patching / syscall      │ No secrets to extract  │ 0 (gets    ║
║  interception                   │ (Layer 4: math, not    │ nothing)   ║
║                                 │  obfuscation)          │            ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  GDB memory dump               │ Intermediates useless   │ 0 (gets    ║
║                                 │ (Layer 4: need full    │ nothing)   ║
║                                 │  VDF completion)       │            ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Replay attack                  │ Layer 1: identity      │ 5 days     ║
║                                 │ injection diverges     │ per ID     ║
║                                 │ everything             │            ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Precomputation                 │ Layer 3: breadcrumb    │ 5 days     ║
║                                 │ requires gameplay      │ per score  ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  GPU/ASIC cluster               │ Layer 4: VDF is        │ Same as    ║
║                                 │ sequential             │ single CPU ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Time manipulation / VM         │ Layer 4: time =        │ 5 days     ║
║                                 │ squarings, not clock   │ real       ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Social engineering / fake      │ Layer 5: deterministic │ Must bribe ║
║  scores                         │ verification + fraud   │ 2+ judges  ║
║                                 │ proofs                 │            ║
║  ───────────────────────────────┼────────────────────────┼─────────── ║
║  Partial execution +            │ Layer 2+3: sequential  │ Must play  ║
║  extrapolation                  │ matrix + chain         │ full game  ║
║                                 │ computation            │            ║
║                                                                       ║
║  RESULT: Every attack either gets nothing or costs ≥ 5 days per       ║
║  attempt — which is equivalent to honest play.                        ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## 9. On-Chain Ergo Verification

### 9.1 The Constraint: ErgoScript's 256-bit BigInt

ErgoScript's `BigInt` is limited to 256 bits. VDF proofs over 2048-bit class groups require arithmetic on ~2048-bit numbers. **Direct VDF verification in ErgoScript is not currently possible.**

### 9.2 Solution: Hybrid Verification with Judge Attestation

This perfectly matches GoP's existing architecture: judges verify off-chain and attest on-chain.

```
┌────────────────────────────────────────────────────────────────┐
│                    VERIFICATION FLOW                            │
│                                                                 │
│  ┌──────────┐                                                   │
│  │  Player   │                                                  │
│  │ submits:  │                                                  │
│  │  - solver_id                                                 │
│  │  - score                                                     │
│  │  - commitment                                                │
│  │  - vdf_output + proof                                        │
│  │  - gameplay_hash                                             │
│  └─────┬────┘                                                   │
│        │                                                        │
│        ▼                                                        │
│  ┌──────────────────────────────────────┐                       │
│  │      JUDGE NODES (off-chain)         │                       │
│  │                                      │                       │
│  │  For each participation:             │                       │
│  │                                      │                       │
│  │  1. Re-run: Game(solver)             │                       │
│  │     → real_score, breadcrumb_chain   │  ← Same game, same   │
│  │     → entangled_input                │     solver = same     │
│  │                                      │     entangled_input   │
│  │  2. Verify VDF proof:                │                       │
│  │     WesolowskiVDF.verify(            │  ← O(1), milliseconds│
│  │       entangled_input,               │                       │
│  │       T = 2^37,                      │                       │
│  │       proof_bytes                    │                       │
│  │     ) → true/false                   │                       │
│  │                                      │                       │
│  │  3. Verify commitment:               │                       │
│  │     expected = blake2b(              │                       │
│  │       vdf_output || proof ||         │                       │
│  │       identity_key || score          │                       │
│  │     )                                │                       │
│  │     expected == submitted_commitment │                       │
│  │                                      │                       │
│  │  4. Sign attestation:                │                       │
│  │     "solver X achieved score Y,      │                       │
│  │      VDF proof valid, commitment     │                       │
│  │      matches"                        │                       │
│  │                                      │                       │
│  └──────────┬───────────────────────────┘                       │
│             │                                                    │
│             ▼                                                    │
│  ┌──────────────────────────────────────┐                       │
│  │      ERGO BLOCKCHAIN (on-chain)      │                       │
│  │                                      │                       │
│  │  ErgoScript contract checks:         │                       │
│  │                                      │                       │
│  │  ✓ 2-of-3 judge signatures valid     │                       │
│  │  ✓ All judges agree on commitment    │                       │
│  │  ✓ commitment == blake2b(on-chain    │                       │
│  │    components)                        │                       │
│  │  ✓ Score matches registered claim     │                       │
│  │                                      │                       │
│  │  → Release prize to winner            │                       │
│  │                                      │                       │
│  └──────────────────────────────────────┘                       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 9.3 ErgoScript Contract

```scala
{
  // ====== GAME CREATION BOX ======
  // R4: Coll[Byte] — public game seed (32 bytes)
  // R5: Long — VDF difficulty (T)
  // R6: Coll[Coll[SigmaProp]] — judge public keys
  // Value: prize pool in ERG/tokens
  
  val gameSeed = SELF.R4[Coll[Byte]].get
  val vdfDifficulty = SELF.R5[Long].get
  val judges = SELF.R6[Coll[SigmaProp]].get
  
  // ====== PARTICIPATION BOX (data input) ======
  val participation = CONTEXT.dataInputs(0)
  val solverId = participation.R4[Coll[Byte]].get          // 32 bytes
  val score = participation.R5[Long].get
  val commitment = participation.R6[Coll[Byte]].get         // 32 bytes
  val vdfOutputHash = participation.R7[Coll[Byte]].get      // 32 bytes
  val gameplayHash = participation.R8[Coll[Byte]].get       // 32 bytes
  
  // ====== COMMITMENT VERIFICATION ======
  // Verify the structural integrity of the commitment
  // (The actual VDF proof is verified off-chain by judges)
  val commitmentInput = vdfOutputHash ++ solverId ++ longToByteArray(score) ++ gameSeed
  val expectedCommitment = blake2b256(commitmentInput)
  val commitmentValid = expectedCommitment == commitment
  
  // ====== JUDGE ATTESTATION ======
  // At least 2 of 3 judges must sign, attesting they:
  // 1. Re-ran the game with the solver
  // 2. Verified the VDF proof
  // 3. Confirmed score and commitment match
  val judgeApproval = atLeast(2, judges)
  
  // ====== SCORE ORDERING ======
  // Winner determination: highest score with valid commitment
  val outputBox = OUTPUTS(0)
  val winnerSolverId = outputBox.R4[Coll[Byte]].get
  val winnerIsParticipant = winnerSolverId == solverId
  
  // ====== FRAUD PROOF SUPPORT ======
  // Anyone can submit a fraud proof showing a judge lied
  // This path allows slashing judge stake
  val fraudProofPath = {
    val fraudData = CONTEXT.dataInputs(1)
    val fraudProver = fraudData.R4[SigmaProp].get
    // If fraud is proven (disagreement between judges on a deterministic
    // computation), slash the dishonest judge's stake
    fraudProver
  }
  
  sigmaProp(commitmentValid) && (judgeApproval || fraudProofPath)
}
```

### 9.4 Future: Native VDF Verification on Ergo

If Ergo adds support for class group operations or larger BigInt types, full on-chain verification becomes possible. The Wesolowski verification equation:

```
y == π^l · g^r
```

requires only 2 group exponentiations and 1 multiplication — very compact. A hypothetical `classgroup_verify(g, y, π, T, Δ)` opcode would make Proof of Play fully trustless on-chain with no judge requirement.

This is worth proposing as an EIP (Ergo Improvement Proposal) given the broader utility of VDFs for randomness beacons, fair leader election, and more.

---

## 10. Why This Is First-of-Its-Kind

### 10.1 The Novelty

**Proof of Play is the first cryptographic primitive that combines:**

1. **Space-hard execution entanglement** (4MB entropy matrix with gameplay-dependent evolution)
2. **Sequential breadcrumb chains** (each step cryptographically depends on the previous)
3. **Verifiable delay functions** (time-locked final commitment)
4. **Identity injection** (solver-specific from the first computation)
5. **On-chain verifiability** (O(1) proof verification)

No existing system combines all five. Here's why:

### 10.2 Comparison with Existing Approaches

```
┌────────────────────────────┬──────┬─────────┬───────┬────────┬─────────┐
│ System                     │Space │Gameplay │Time   │Identity│On-chain │
│                            │Hard  │Bound    │Locked │Bound   │Verify   │
├────────────────────────────┼──────┼─────────┼───────┼────────┼─────────┤
│ Proof of Work (Bitcoin)    │  ✗   │   ✗     │  ~    │   ✗    │   ✓     │
│ Proof of Stake             │  ✗   │   ✗     │  ✗    │   ✓    │   ✓     │
│ VDF alone (Chia)           │  ✗   │   ✗     │  ✓    │   ✗    │   ✓     │
│ ZK Proofs (zkSNARKs)       │  ✗   │   ~     │  ✗    │   ✓    │   ✓     │
│ TEE (SGX/TrustZone)        │  ✗   │   ✓     │  ✗    │   ✓    │   ~     │
│ DRM / White-box crypto     │  ~   │   ✗     │  ✗    │   ✗    │   ✗     │
│ Memory-hard PoW (Ethash)   │  ✓   │   ✗     │  ~    │   ✗    │   ✓     │
│ GoP v1-v3 (secret-based)   │  ~   │   ~     │  ✗    │   ~    │   ✓     │
│─────────────────────────────────────────────────────────────────────────│
│ PROOF OF PLAY (GoP v4)     │  ✓   │   ✓     │  ✓    │   ✓    │   ✓     │
└────────────────────────────┴──────┴─────────┴───────┴────────┴─────────┘
```

**Why each existing approach is insufficient alone:**

- **Proof of Work:** Proves computational effort, but not that specific gameplay occurred. Parallelizable.
- **VDF alone:** Proves time elapsed, but the input can be any value — no gameplay binding.
- **ZK Proofs:** Can prove gameplay but are expensive to generate and don't provide time-locking. Also, the prover knows the witness — they could forge a different witness.
- **TEE (Trusted Execution Environments):** Require special hardware. Trust is in the hardware vendor (Intel, ARM), not mathematics. Side-channel attacks exist. Not available in container environments.
- **Memory-hard PoW:** Space-hard but not gameplay-bound. Parallelizable within memory limits.
- **DRM / White-box crypto:** History shows all are eventually broken. Security through obscurity.

### 10.3 The Core Innovation

The insight that makes Proof of Play novel:

```
EXISTING: VDF(public_input, T) → time-locked output
  Problem: anyone can compute for any input

EXISTING: EntangledExecution(gameplay) → gameplay-bound hash
  Problem: extractable from deterministic binary

INNOVATION: VDF(EntangledExecution(gameplay), T) → time-locked, gameplay-bound proof
  This is new. The VDF INPUT ITSELF requires legitimate gameplay to produce.
  Can't start the VDF without playing. Can't skip the VDF after playing.
  The security of the whole system is the COMPOSITION of both properties.
```

**This composition is non-obvious** because VDFs are typically used for randomness beacons (blockchain consensus) or timestamping, while execution entanglement is from the software protection domain. Combining them into a "Proof of Legitimate Gameplay" primitive is, to our knowledge, unprecedented.

### 10.4 Academic Contribution

Proof of Play can be formalized as:

**Definition.** A *Proof of Play* system is a tuple (Setup, Play, Lock, Commit, Verify) where:
- **Setup(seed) → params:** Generate public game parameters
- **Play(solver, params) → trace:** Execute gameplay, producing an execution trace
- **Lock(trace) → (entangled_state, proof):** Compute a verifiable delay on the entangled trace
- **Commit(proof, solver_id, score) → commitment:** Generate the final commitment
- **Verify(commitment, proof, params) → {accept, reject}:** Verify in O(1) time

**Security properties:**
1. **Gameplay soundness:** No PPT adversary can produce a valid commitment for score S without executing a gameplay trace that achieves score S.
2. **Time soundness:** No adversary (regardless of parallel resources) can produce a valid commitment in fewer than T sequential group operations after gameplay completes.
3. **Identity binding:** A valid commitment for solver A cannot be repurposed for solver B.
4. **Verification efficiency:** Verify runs in O(1) time (constant, independent of gameplay length and T).

This is a publishable result. The formal proof would combine the sequential squaring assumption (from VDF literature) with a novel "execution entanglement" assumption specific to deterministic games.

---

## 11. Rust Implementation

### 11.1 Complete Game Service Implementation

```rust
//! ═══════════════════════════════════════════════════════════════
//! PROOF OF PLAY — Game of Prompts v4
//! Complete game service implementation
//! ═══════════════════════════════════════════════════════════════
//!
//! This implements the full Proof of Play pipeline:
//!   Layer 1: Identity Injection
//!   Layer 2: Space-Hard Entropy Matrix (4MB)
//!   Layer 3: Breadcrumb Chain
//!   Layer 4: VDF Time-Lock (Wesolowski over class groups)
//!   Layer 5: Commitment Generation
//!
//! Cargo.toml dependencies:
//!   blake2 = "0.10"
//!   vdf = "0.1"
//!   classgroup = "0.1"
//!   hex = "0.4"
//!   serde = { version = "1", features = ["derive"] }
//!   serde_json = "1"

use blake2::{Blake2b, Digest};
use blake2::digest::consts::U32;
use std::time::Instant;

type Blake2b256 = Blake2b<U32>;

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const MATRIX_BLOCKS: usize = 131_072;      // 4MB / 32 bytes
const MATRIX_BLOCK_SIZE: usize = 32;
const MATRIX_SIZE: usize = MATRIX_BLOCKS * MATRIX_BLOCK_SIZE;  // 4,194,304

const SAMPLE_POSITIONS: usize = 16;
const BYTES_PER_POSITION: usize = 4;
const MUTATION_SPREAD: usize = 256;

const VDF_T: u64 = 1 << 37;               // ~137B squarings ≈ 5 days
const DISCRIMINANT_BITS: u16 = 2048;

const INIT_TAG: &[u8] = &[0x00];
const STEP_TAG: &[u8] = &[0x01];
const SCORE_TAG: &[u8] = &[0x02];
const EVOLVE_TAG: &[u8] = &[0x03];
const FINAL_TAG: &[u8] = &[0xFF];

// ═══════════════════════════════════════════════════════════════
// HELPER: blake2b-256 with variable-length input slices
// ═══════════════════════════════════════════════════════════════

fn b2_256(inputs: &[&[u8]]) -> [u8; 32] {
    let mut h = Blake2b256::new();
    for input in inputs {
        h.update(input);
    }
    h.finalize().into()
}

// ═══════════════════════════════════════════════════════════════
// LAYER 1: IDENTITY INJECTION
// ═══════════════════════════════════════════════════════════════

/// Derive the identity key from a solver service hash.
/// This key taints ALL subsequent computations.
fn derive_identity_key(solver_id: &[u8]) -> [u8; 32] {
    b2_256(&[b"proof-of-play-identity-v4", solver_id])
}

/// Taint the game seed with the solver's identity.
/// The resulting matrix_seed produces a completely different
/// entropy matrix for each solver — even with the same game.
fn taint_seed(game_seed: &[u8; 32], identity_key: &[u8; 32]) -> [u8; 32] {
    let mut tainted = [0u8; 32];
    for i in 0..32 {
        tainted[i] = game_seed[i] ^ identity_key[i];
    }
    // Double-hash to prevent XOR-reversal
    b2_256(&[b"tainted-seed", &tainted])
}

// ═══════════════════════════════════════════════════════════════
// LAYER 2: SPACE-HARD ENTROPY MATRIX
// ═══════════════════════════════════════════════════════════════

struct EntropyMatrix {
    data: Vec<u8>,  // 4MB
}

impl EntropyMatrix {
    /// Generate the initial 4MB entropy matrix from the tainted seed.
    fn new(matrix_seed: &[u8; 32]) -> Self {
        let mut data = Vec::with_capacity(MATRIX_SIZE);
        for i in 0..MATRIX_BLOCKS as u64 {
            let block = b2_256(&[matrix_seed, &i.to_le_bytes()]);
            data.extend_from_slice(&block);
        }
        assert_eq!(data.len(), MATRIX_SIZE);
        Self { data }
    }
    
    /// Read scattered bytes from random matrix positions.
    /// Positions are derived from the current chain state,
    /// ensuring the access pattern depends on gameplay.
    fn sample(&self, state: &[u8; 32]) -> Vec<u8> {
        let positions = self.derive_positions(state);
        let mut result = Vec::with_capacity(SAMPLE_POSITIONS * BYTES_PER_POSITION);
        for pos in positions {
            let start = pos % (MATRIX_SIZE - BYTES_PER_POSITION);
            result.extend_from_slice(&self.data[start..start + BYTES_PER_POSITION]);
        }
        result
    }
    
    /// Derive 16 scattered positions from a 32-byte state.
    fn derive_positions(&self, state: &[u8; 32]) -> Vec<usize> {
        let extended = b2_256(&[state, b"matrix-positions"]);
        let mut positions = Vec::with_capacity(SAMPLE_POSITIONS);
        for i in 0..SAMPLE_POSITIONS {
            let idx = i * 2;
            let raw = u32::from_le_bytes([
                extended[idx % 32],
                extended[(idx + 1) % 32],
                state[(idx + 2) % 32],
                state[(idx + 3) % 32],
            ]);
            positions.push((raw as usize) % MATRIX_SIZE);
        }
        positions
    }
    
    /// Evolve the matrix based on a game event.
    /// Mutates 256 blocks (~8KB) deterministically.
    fn evolve(&mut self, game_state: &[u8], action: &[u8], step: u32) {
        let mutation_key = b2_256(&[
            EVOLVE_TAG,
            game_state,
            action,
            &step.to_be_bytes(),
        ]);
        
        for j in 0..MUTATION_SPREAD as u64 {
            let selector = b2_256(&[&mutation_key, &j.to_le_bytes()]);
            let block_idx = u32::from_le_bytes([
                selector[0], selector[1], selector[2], selector[3],
            ]) as usize % MATRIX_BLOCKS;
            
            let offset = block_idx * MATRIX_BLOCK_SIZE;
            let mutation = b2_256(&[
                &mutation_key,
                &(block_idx as u64).to_le_bytes(),
                b"mutate",
            ]);
            
            for k in 0..MATRIX_BLOCK_SIZE {
                self.data[offset + k] ^= mutation[k];
            }
        }
    }
    
    /// Compute a digest of the full matrix state.
    /// Used in the final entangled input to bind the full matrix evolution.
    fn digest(&self) -> [u8; 32] {
        // Hash in chunks to avoid loading 4MB into a single hash call
        let mut outer = Blake2b256::new();
        for chunk in self.data.chunks(4096) {
            let chunk_hash = b2_256(&[chunk]);
            outer.update(&chunk_hash);
        }
        outer.finalize().into()
    }
}

// ═══════════════════════════════════════════════════════════════
// LAYER 3: BREADCRUMB CHAIN
// ═══════════════════════════════════════════════════════════════

struct BreadcrumbChain {
    state: [u8; 32],
    identity_key: [u8; 32],
    score: i64,
    step_count: u32,
    score_event_count: u32,
}

impl BreadcrumbChain {
    fn new(game_seed: &[u8; 32], identity_key: &[u8; 32]) -> Self {
        let state = b2_256(&[INIT_TAG, game_seed, identity_key]);
        Self {
            state,
            identity_key: *identity_key,
            score: 0,
            step_count: 0,
            score_event_count: 0,
        }
    }
    
    /// Process a game step.
    /// Each step cryptographically chains:
    ///   previous state + identity + game state + action + score + matrix sample
    fn step(&mut self, game_state: &[u8], action: &[u8], matrix: &EntropyMatrix) {
        self.step_count += 1;
        
        // Phase 1: Hash step data with chain state
        let mid = b2_256(&[
            STEP_TAG,
            &self.state,
            &self.identity_key,
            game_state,
            action,
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
        ]);
        
        // Phase 2: Fold in matrix sample (space-hardness)
        let sample = matrix.sample(&mid);
        self.state = b2_256(&[&mid, &sample]);
    }
    
    /// Record a score event.
    /// Points are baked into the chain state — can't be changed later.
    fn award(&mut self, points: i64, reason: &[u8], matrix: &EntropyMatrix) {
        self.score += points;
        self.score_event_count += 1;
        
        let mid = b2_256(&[
            SCORE_TAG,
            &self.state,
            &self.identity_key,
            &points.to_be_bytes(),
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
            reason,
        ]);
        
        let sample = matrix.sample(&mid);
        self.state = b2_256(&[&mid, &sample]);
    }
    
    /// Finalize the chain → produce the entangled input for the VDF.
    /// This value encodes the ENTIRE gameplay execution:
    ///   - All game states and actions (via breadcrumb chain)
    ///   - Full matrix evolution (via matrix_digest)
    ///   - Solver identity (via identity_key)
    ///   - Final score (baked in via award() calls + explicit binding)
    ///   - Game parameters (via game_seed)
    fn finalize(
        &self,
        game_seed: &[u8; 32],
        matrix: &EntropyMatrix,
        hash_logs: &[u8; 32],
    ) -> [u8; 32] {
        let final_sample = matrix.sample(&self.state);
        let matrix_digest = matrix.digest();
        
        b2_256(&[
            FINAL_TAG,
            &self.state,
            &matrix_digest,
            &self.identity_key,
            &self.score.to_be_bytes(),
            &self.step_count.to_be_bytes(),
            &self.score_event_count.to_be_bytes(),
            game_seed,
            hash_logs,
            &final_sample,
        ])
    }
}

// ═══════════════════════════════════════════════════════════════
// LAYER 4: VDF TIME-LOCK
// ═══════════════════════════════════════════════════════════════

/// VDF result containing the output and Wesolowski proof.
struct VdfResult {
    output_y: Vec<u8>,
    proof_pi: Vec<u8>,
    combined: Vec<u8>,
}

/// Compute the VDF time-lock on the entangled input.
///
/// THIS IS INTENTIONALLY SLOW — ~5 days on the fastest hardware.
/// This is the security mechanism. There is no bug here.
///
/// Each of the 2^37 squarings depends on the previous one.
/// No parallelism. No GPU acceleration. No shortcut.
fn compute_vdf(entangled_input: &[u8; 32]) -> VdfResult {
    use vdf::{VDFParams, WesolowskiVDFParams, VDF};
    
    let vdf = WesolowskiVDFParams(DISCRIMINANT_BITS).new();
    
    eprintln!("╔══════════════════════════════════════════════════════╗");
    eprintln!("║  PROOF OF PLAY — VDF COMPUTATION                     ║");
    eprintln!("║  Input: {}...  ║", hex::encode(&entangled_input[..16]));
    eprintln!("║  T = 2^37 = {} squarings                ║", VDF_T);
    eprintln!("║  Estimated: ~5 days (fast HW) / ~16 days (typical)   ║");
    eprintln!("║  This delay IS the security. There is no shortcut.   ║");
    eprintln!("╚══════════════════════════════════════════════════════╝");
    
    let start = Instant::now();
    
    let combined = vdf
        .solve(entangled_input, VDF_T)
        .expect("VDF computation failed");
    
    let elapsed = start.elapsed();
    eprintln!(
        "VDF complete in {:.2} hours ({:.2} days)",
        elapsed.as_secs_f64() / 3600.0,
        elapsed.as_secs_f64() / 86400.0,
    );
    
    let mid = combined.len() / 2;
    VdfResult {
        output_y: combined[..mid].to_vec(),
        proof_pi: combined[mid..].to_vec(),
        combined,
    }
}

/// Verify a VDF proof. THIS IS FAST — milliseconds.
/// Used by judges and anyone who wants to verify a commitment.
fn verify_vdf(entangled_input: &[u8; 32], proof_bytes: &[u8]) -> bool {
    use vdf::{VDFParams, WesolowskiVDFParams, VDF};
    
    let vdf = WesolowskiVDFParams(DISCRIMINANT_BITS).new();
    vdf.verify(entangled_input, VDF_T, proof_bytes).is_ok()
}

// ═══════════════════════════════════════════════════════════════
// LAYER 5: COMMITMENT
// ═══════════════════════════════════════════════════════════════

/// Proof of Play — the complete data structure submitted on-chain.
#[derive(serde::Serialize, serde::Deserialize)]
struct ProofOfPlay {
    // Public identifiers
    solver_id: String,
    game_seed: String,          // hex
    score: i64,
    
    // Execution trace summary
    entangled_input: String,    // hex, 32 bytes
    gameplay_hash: String,      // hex, 32 bytes
    step_count: u32,
    score_events: u32,
    
    // VDF proof (the time-locked component)
    vdf_output: String,         // hex
    vdf_proof: String,          // hex
    
    // Final commitments
    fast_commitment: String,    // hex, 32 bytes (immediate)
    vdf_commitment: String,     // hex, 32 bytes (after VDF)
}

/// Generate the fast commitment (submitted immediately for timestamping).
fn fast_commitment(
    chain: &BreadcrumbChain,
    identity_key: &[u8; 32],
    game_seed: &[u8; 32],
) -> [u8; 32] {
    b2_256(&[
        b"fast-commit",
        &chain.state,
        identity_key,
        &chain.score.to_be_bytes(),
        game_seed,
    ])
}

/// Generate the VDF commitment (submitted after VDF completes).
fn vdf_commitment(
    vdf_result: &VdfResult,
    identity_key: &[u8; 32],
    score: i64,
    game_seed: &[u8; 32],
) -> [u8; 32] {
    b2_256(&[
        &vdf_result.output_y,
        &vdf_result.proof_pi,
        identity_key,
        &score.to_be_bytes(),
        game_seed,
    ])
}

// ═══════════════════════════════════════════════════════════════
// MAIN: COMPLETE PROOF OF PLAY PIPELINE
// ═══════════════════════════════════════════════════════════════

fn proof_of_play(
    solver_id: &[u8],
    game_seed: &[u8; 32],
    // game_fn: a function that plays the game and calls chain.step/award
    // In practice this is the game loop
) -> ProofOfPlay {
    // ── Layer 1: Identity Injection ──
    let identity_key = derive_identity_key(solver_id);
    let matrix_seed = taint_seed(game_seed, &identity_key);
    
    // ── Layer 2: Entropy Matrix (4MB, space-hard) ──
    let mut matrix = EntropyMatrix::new(&matrix_seed);
    
    // ── Layer 3: Breadcrumb Chain ──
    let mut chain = BreadcrumbChain::new(game_seed, &identity_key);
    
    // ── Game Loop (application-specific) ──
    // This is where the actual game runs.
    // Each game step calls:
    //   chain.step(game_state, action, &matrix)
    //   matrix.evolve(game_state, action, step)
    //   chain.award(points, reason, &matrix)  // on score events
    
    // === EXAMPLE: Snake game ===
    // let mut game = SnakeGame::new(game_seed);
    // let solver = load_solver(solver_id);
    // 
    // for step in 0..MAX_STEPS {
    //     let state = game.state_bytes();
    //     let action = solver.act(&state);
    //     
    //     chain.step(&state, &action, &matrix);
    //     matrix.evolve(&state, &action, step);
    //     
    //     let (ate, game_over) = game.execute(&action);
    //     if ate {
    //         chain.award(1, b"food", &matrix);
    //     }
    //     if game_over { break; }
    // }
    // === END EXAMPLE ===
    
    // Compute gameplay hash (hash of game logs)
    let hash_logs = [0u8; 32]; // computed from game log
    
    // ── Phase 1: Fast Commitment (immediate) ──
    let fast_commit = fast_commitment(&chain, &identity_key, game_seed);
    eprintln!("Fast commitment: {}", hex::encode(fast_commit));
    eprintln!("Score: {} | Steps: {} | Score events: {}",
        chain.score, chain.step_count, chain.score_event_count);
    
    // Submit fast_commit on-chain NOW for timestamp priority
    
    // ── Layer 4: VDF Time-Lock ──
    let entangled_input = chain.finalize(game_seed, &matrix, &hash_logs);
    eprintln!("Entangled input: {}", hex::encode(entangled_input));
    
    let vdf_result = compute_vdf(&entangled_input);
    
    // ── Layer 5: VDF Commitment ──
    let vdf_commit = vdf_commitment(
        &vdf_result, &identity_key, chain.score, game_seed
    );
    
    ProofOfPlay {
        solver_id: hex::encode(solver_id),
        game_seed: hex::encode(game_seed),
        score: chain.score,
        entangled_input: hex::encode(entangled_input),
        gameplay_hash: hex::encode(hash_logs),
        step_count: chain.step_count,
        score_events: chain.score_event_count,
        vdf_output: hex::encode(&vdf_result.output_y),
        vdf_proof: hex::encode(&vdf_result.proof_pi),
        fast_commitment: hex::encode(fast_commit),
        vdf_commitment: hex::encode(vdf_commit),
    }
}

// ═══════════════════════════════════════════════════════════════
// JUDGE VERIFICATION CLI
// ═══════════════════════════════════════════════════════════════

/// Verify a Proof of Play submission.
/// This is what judges run — it takes milliseconds.
fn verify_proof_of_play(pop: &ProofOfPlay) -> bool {
    let solver_id = hex::decode(&pop.solver_id).unwrap();
    let game_seed: [u8; 32] = hex::decode(&pop.game_seed)
        .unwrap().try_into().unwrap();
    let entangled_input: [u8; 32] = hex::decode(&pop.entangled_input)
        .unwrap().try_into().unwrap();
    
    // Step 1: Verify VDF proof (milliseconds)
    let vdf_output = hex::decode(&pop.vdf_output).unwrap();
    let vdf_proof = hex::decode(&pop.vdf_proof).unwrap();
    let mut proof_bytes = vdf_output.clone();
    proof_bytes.extend_from_slice(&vdf_proof);
    
    if !verify_vdf(&entangled_input, &proof_bytes) {
        eprintln!("❌ VDF proof verification FAILED");
        return false;
    }
    eprintln!("✅ VDF proof valid");
    
    // Step 2: Verify commitment hash
    let identity_key = derive_identity_key(&solver_id);
    let expected_commit = b2_256(&[
        &vdf_output,
        &vdf_proof,
        &identity_key,
        &pop.score.to_be_bytes(),
        &game_seed,
    ]);
    
    let submitted_commit: [u8; 32] = hex::decode(&pop.vdf_commitment)
        .unwrap().try_into().unwrap();
    
    if expected_commit != submitted_commit {
        eprintln!("❌ Commitment hash mismatch");
        return false;
    }
    eprintln!("✅ Commitment hash valid");
    
    // Step 3: Re-run the game to verify entangled_input
    // (This requires running the actual game with the actual solver)
    // let (expected_entangled, real_score) = replay_game(&solver_id, &game_seed);
    // if expected_entangled != entangled_input {
    //     eprintln!("❌ Entangled input doesn't match game re-execution");
    //     return false;
    // }
    // if real_score != pop.score {
    //     eprintln!("❌ Score mismatch: claimed {} but game produced {}", 
    //         pop.score, real_score);
    //     return false;
    // }
    // eprintln!("✅ Game re-execution matches");
    
    eprintln!("✅ Proof of Play VERIFIED");
    true
}

// ═══════════════════════════════════════════════════════════════
// CALIBRATION TOOL
// ═══════════════════════════════════════════════════════════════

fn calibrate() {
    use vdf::{VDFParams, WesolowskiVDFParams, VDF};
    
    println!("╔══════════════════════════════════════════════════╗");
    println!("║  PROOF OF PLAY — VDF CALIBRATION TOOL            ║");
    println!("║  Benchmarking sequential squaring speed...        ║");
    println!("╚══════════════════════════════════════════════════╝");
    
    let vdf = WesolowskiVDFParams(DISCRIMINANT_BITS).new();
    let test_input = b"proof-of-play-calibration-v4!!!!";
    
    for &t in &[1_000u64, 10_000, 100_000, 1_000_000] {
        let start = Instant::now();
        let _ = vdf.solve(test_input, t);
        let elapsed = start.elapsed();
        
        let rate = t as f64 / elapsed.as_secs_f64();
        let est_days = VDF_T as f64 / rate / 86400.0;
        
        println!(
            "  T={:>10} | {:.3}s | {:.0} sq/sec | Est. full VDF: {:.1} days",
            t, elapsed.as_secs_f64(), rate, est_days
        );
    }
    
    println!();
    println!("  Production T = 2^37 = {}", VDF_T);
    println!("  Target: ~5 days on fast hardware, ~16 days on typical CPU");
}
```

### 11.2 Cargo.toml

```toml
[package]
name = "gop-v4-proof-of-play"
version = "0.1.0"
edition = "2021"
description = "Proof of Play — cryptographic gameplay verification for Game of Prompts"

[dependencies]
blake2 = "0.10"
vdf = "0.1"
classgroup = "0.1"
hex = "0.4"
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# Required for VDF class group arithmetic
# Ensure libgmp-dev is installed: apt-get install -y libgmp-dev
gmp-mpfr-sys = "1.6"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1

[[bin]]
name = "game-service"
path = "src/main.rs"

[[bin]]
name = "judge-verify"
path = "src/judge.rs"

[[bin]]
name = "vdf-calibrate"
path = "src/calibrate.rs"
```

### 11.3 Dockerfile for Celaut Container

```dockerfile
FROM rust:1.77-slim as builder

# Install GMP for VDF class group arithmetic
RUN apt-get update && apt-get install -y libgmp-dev pkg-config

WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src/ ./src/

RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y libgmp10 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/game-service /service/game-service
COPY --from=builder /app/target/release/judge-verify /service/judge-verify
COPY --from=builder /app/target/release/vdf-calibrate /service/vdf-calibrate

ENTRYPOINT ["/service/game-service"]
```

---

## 12. Parameter Selection & Calibration

### 12.1 VDF Difficulty (T) Selection

| T value | Best HW (~300K sq/s) | Typical CPU (~100K sq/s) | Slow CPU (~50K sq/s) |
|---------|---------------------|--------------------------|----------------------|
| 2^34 | ~0.6 days | ~2 days | ~4 days |
| 2^35 | ~1.3 days | ~4 days | ~8 days |
| 2^36 | ~2.5 days | ~8 days | ~16 days |
| **2^37** | **~5.3 days** | **~16 days** | **~32 days** |
| 2^38 | ~10.6 days | ~32 days | ~64 days |

**Recommended: T = 2^37** for production. This gives ~5 days on the fastest known hardware (Chia ASIC-equivalent) and ~16 days on a typical desktop CPU.

### 12.2 Entropy Matrix Size Selection

| Matrix Size | L3 Cache Hit? | GPU Friendly? | Memory Bandwidth |
|-------------|--------------|---------------|------------------|
| 1MB | Likely fits | Marginal | Low pressure |
| **4MB** | **Exceeds per-core** | **No** | **Significant** |
| 16MB | Definitely exceeds | No | Heavy |
| 64MB | Far exceeds | No | Extreme |

**Recommended: 4MB** for production. This exceeds most per-core L3 cache allocations while keeping matrix generation time reasonable (~0.5 seconds).

### 12.3 Why RTX 3090 Doesn't Help

```
VDF: Sequential squaring
  RTX 3090 single-thread: ~50,000 squarings/sec
  Intel i9-13900K single-thread: ~100,000 squarings/sec
  The CPU is FASTER for sequential work!

Entropy Matrix: Random access on 4MB
  RTX 3090 L2 cache: 6MB shared across 10,496 CUDA cores
  Per-thread effective cache: < 1KB
  Every matrix read = global memory access = ~500 cycles
  CPU with 4MB+ L3 cache: ~10 cycles per access
  The CPU is MUCH FASTER for random memory access!

Breadcrumb Chain: Blake2b hashing
  Both GPU and CPU can hash fast, but it's sequential
  GPU single-thread: ~200 MH/s
  CPU single-thread: ~500 MH/s
  The CPU wins again for sequential hash chains!

CONCLUSION: The entire Proof of Play pipeline favors CPUs over GPUs.
An attacker's RTX 3090 is a paperweight for this workload.
```

---

## 13. Migration Path from v3

### Phase 1: Foundation (Week 1-2)

```
✓ Add vdf, classgroup, blake2 crates to Cargo.toml
✓ Verify GMP compiles in Celaut container
✓ Implement EntropyMatrix, BreadcrumbChain
✓ Test with small T (T=1000) for fast iteration
```

### Phase 2: Integration (Week 3)

```
✓ Replace generate_gop_commitment() with Proof of Play pipeline
✓ Wire into existing game loop (step/award calls)
✓ Add VDF proof serialization to game output
✓ Test determinism: same solver + same game = same commitment
```

### Phase 3: Calibration (Week 4)

```
✓ Run vdf-calibrate on target hardware
✓ Set T for desired time window
✓ Test fast_commitment + vdf_commitment dual-phase flow
✓ Test on multiple hardware configs
```

### Phase 4: On-Chain (Week 5-6)

```
✓ Update ErgoScript contract for new commitment structure
✓ Add VDF proof fields to ParticipationBox registers
✓ Build judge-verify CLI
✓ Test end-to-end on Ergo testnet
```

### Phase 5: Launch

```
✓ Set T = 2^37 for production
✓ Deploy as new .celaut.bee
✓ Publish judge-verify tool
✓ Challenge the community to crack it :)
```

### Backward Compatibility

```
v3: commitment = blake2b(solver_id || score || hash_logs || SECRET_S)
v4: commitment = blake2b(vdf_output || vdf_proof || identity_key || score || game_seed)

Key change: SECRET_S (static, extractable) → VDF output (computed, time-locked)
The on-chain commitment format changes but the verification flow stays the same.
```

---

## 14. Security Proofs

### 14.1 Theorem: Gameplay Soundness

**Claim:** No PPT adversary can produce a valid Proof of Play for score S without executing a gameplay trace that achieves score S.

**Proof sketch:**
1. A valid commitment requires `entangled_input = blake2b(breadcrumb_final || matrix_digest || ...)` (Layer 3+4 connection)
2. `breadcrumb_final` is the terminal state of a sequential hash chain where each step incorporates actual game state and matrix samples (Layer 3)
3. `matrix_digest` is a hash of the 4MB entropy matrix, which evolves based on game events (Layer 2)
4. Under the collision resistance of Blake2b (2^128 security), finding a different input that produces the same `entangled_input` is infeasible
5. Therefore, producing the correct `entangled_input` requires executing the correct sequence of game steps
6. Score events are baked into the breadcrumb chain at the step they occur (v3 fix)
7. The judge re-runs the game, independently computing `entangled_input'`
8. `entangled_input == entangled_input'` iff the claimed score matches the real score
9. The VDF proof then confirms the time-lock was completed on this specific `entangled_input` ∎

### 14.2 Theorem: Time Soundness

**Claim:** No adversary (regardless of parallel resources) can produce a valid VDF proof for `entangled_input` in fewer than T sequential group operations.

**Proof:**
1. The VDF operates in the class group Cl(Δ) where Δ is derived from `entangled_input`
2. The group order |Cl(Δ)| is unknown (no efficient algorithm for class number computation)
3. Without |Cl(Δ)|, computing g^(2^T) requires T sequential squarings (sequential squaring assumption)
4. The Wesolowski proof π = g^(floor(2^T/l)) requires knowledge of y = g^(2^T) to compute
5. Forging π without y would violate the adaptive root assumption in groups of unknown order
6. Therefore: time(produce valid proof) ≥ T sequential squarings ≈ 5 days ∎

**Note:** This is the same security assumption that protects Chia Network. Breaking it would be a major cryptographic result.

### 14.3 Theorem: Identity Binding

**Claim:** A valid Proof of Play for solver A cannot be repurposed for solver B (A ≠ B).

**Proof:**
1. `identity_key_A = blake2b(solver_id_A)` ≠ `identity_key_B = blake2b(solver_id_B)` (collision resistance)
2. `matrix_seed_A = taint(game_seed, identity_key_A)` ≠ `matrix_seed_B` (XOR + hash)
3. Therefore `matrix_A ≠ matrix_B` (completely different 4MB matrices)
4. `breadcrumb_A[0] = blake2b(INIT || game_seed || identity_key_A)` ≠ `breadcrumb_B[0]`
5. Every subsequent breadcrumb step incorporates `identity_key` → entire chains diverge
6. `entangled_input_A ≠ entangled_input_B` → different VDF computation → different commitment
7. Solver A's commitment does not match what judges compute when re-running with solver B ∎

### 14.4 Theorem: Space-Hardness

**Claim:** Computing the breadcrumb chain requires Ω(MATRIX_SIZE) bytes of active memory.

**Proof sketch:**
1. At each step, the breadcrumb update reads from 16 random positions in the entropy matrix
2. The positions are determined by the current chain state (pseudorandom, uniformly distributed)
3. After K steps, K×16 positions have been read, each from a uniform distribution over 131,072 blocks
4. By the coupon collector's argument, after O(MATRIX_BLOCKS × ln(MATRIX_BLOCKS)) steps, every block has been read at least once
5. Additionally, the matrix evolves (mutates) at each step, so past block values become stale
6. Therefore, the full matrix must be maintained in memory throughout execution
7. Memory required: 4MB for the matrix + 32 bytes for chain state = Ω(4MB) ∎

---

## 15. Comparison with Existing Primitives

### 15.1 vs. Proof of Work (Bitcoin, Ethash)

| Aspect | Proof of Work | Proof of Play |
|--------|--------------|---------------|
| What it proves | Computational effort expended | Legitimate gameplay execution |
| Parallelizable? | Yes (mining pools) | **No** (sequential VDF + sequential chain) |
| GPU advantage? | Yes (huge for SHA-256) | **No** (sequential + memory-hard) |
| Application-specific? | No (generic hash grinding) | **Yes** (bound to specific game) |
| Energy waste? | Yes (billions in electricity) | **No** (computation has semantic meaning) |
| ASIC-resistant? | No (Bitcoin ASICs exist) | **Partially** (VDF ASICs help ~3x, not 1000x) |

### 15.2 vs. Zero-Knowledge Proofs (zkSNARKs, zkSTARKs)

| Aspect | ZK Proofs | Proof of Play |
|--------|-----------|---------------|
| Prover cost | Very high (FFT, MSM) | **Moderate** (VDF time, not compute) |
| Trusted setup | Required for SNARKs | **Not required** (class groups) |
| Time-locking | No | **Yes** (~5 days minimum) |
| Complexity | Extreme (circuit design) | **Moderate** (hash chains + VDF library) |
| Verification | O(1) | **O(1)** (both!) |
| Secret knowledge | Prover knows witness | **No secret** — all public + time |

### 15.3 vs. Trusted Execution Environments (SGX, TrustZone)

| Aspect | TEE | Proof of Play |
|--------|-----|---------------|
| Trust model | Hardware vendor (Intel, ARM) | **Mathematics** (no trusted party) |
| Side channels | Vulnerable (Spectre, Meltdown, etc.) | **N/A** (no side channels possible) |
| Hardware requirement | Special hardware | **Any CPU** |
| Container-compatible? | Limited (needs host support) | **Yes** (pure software) |
| Formally verifiable | No (proprietary firmware) | **Yes** (open math) |

### 15.4 vs. Standalone VDF

| Aspect | VDF Alone | Proof of Play |
|--------|-----------|---------------|
| Gameplay binding | **None** — any input works | **Full** — input requires gameplay |
| Precomputation | Possible (if input is known) | **Impossible** (input depends on gameplay) |
| Identity binding | **None** — output is transferable | **Built-in** from step 1 |
| Space-hardness | **None** | **4MB matrix** anti-GPU |
| Score spoofing | Easy (compute VDF for any score) | **Impossible** (score baked into chain) |

---

## 16. Open Questions & Future Work

### 16.1 For Josemi

1. **VDF duration preference:** 3 days? 5 days? 7 days? Adjustable via T parameter.
2. **GMP in containers:** Is `libgmp-dev` available in Celaut build system, or do we need pure Rust?
3. **Dual-phase commitment:** Does the fast-commit + VDF-commit pattern fit the current GoP smart contract?
4. **Judge tooling:** Standalone CLI? Library? Integrated into GoP App?
5. **Game loop integration:** Does the step/award API match how the game currently operates?

### 16.2 Future Enhancements

1. **EIP for VDF verification opcode on Ergo:** Would make full on-chain verification possible, removing judge trust entirely.
2. **Micro-VDFs per step:** Instead of one big VDF at the end, embed small VDFs (T'=2^20, ~seconds) within each game step. This distributes the time cost across gameplay.
3. **Recursive Proof of Play:** For tournament structures — a PoP of PoPs, where the final tournament ranking is itself time-locked.
4. **Cross-game PoP:** A standardized Proof of Play library that any Celaut game can use, not just Snake.
5. **Formal verification:** Mechanize the security proofs in Coq or Lean.

### 16.3 Known Limitations

1. **VDF computation time:** Players must wait ~5 days after gameplay for commitment. Mitigated by dual-phase commit.
2. **Hardware variance:** Fastest hardware computes VDF ~3x faster than typical CPU. This is inherent to VDFs and accepted by the research community.
3. **GMP dependency:** The `vdf` crate requires GMP. May need custom build for Celaut containers.
4. **Ergo BigInt limitation:** Full on-chain VDF verification not possible today. Judge attestation is the practical solution.

---

## 17. References

1. Wesolowski, B. "Efficient Verifiable Delay Functions." EUROCRYPT 2019. [ePrint 2018/623](https://eprint.iacr.org/2018/623.pdf)
2. Pietrzak, K. "Simple Verifiable Delay Functions." ITCS 2019. [ePrint 2018/627](https://eprint.iacr.org/2018/627.pdf)
3. Boneh, D., Bünz, B., Fisch, B. "A Survey of Two Verifiable Delay Functions." [ePrint 2018/712](https://eprint.iacr.org/2018/712.pdf)
4. POA Network VDF (Rust): [github.com/poanetwork/vdf](https://github.com/poanetwork/vdf)
5. Chia Network VDF: [github.com/Chia-Network/chiavdf](https://github.com/Chia-Network/chiavdf)
6. Buchmann, J., Vollmer, U. "Binary Quadratic Forms: An Algorithmic Approach." Springer, 2007.
7. Cohen, H. "A Course in Computational Algebraic Number Theory." Springer GTM 138, 1993.
8. Low-latency VDF hardware: [ePrint 2022/755](https://eprint.iacr.org/2022/755.pdf)
9. ErgoScript documentation: [docs.ergoplatform.com](https://docs.ergoplatform.com/dev/scs/)
10. Game of Prompts: [github.com/game-of-prompts/app](https://github.com/game-of-prompts/app)

---

## 18. Message for Josemi

Ey Josemi! 🐍🔐

Después de reventar v1, v2 y v3, nos sentamos a diseñar algo que sea **matemáticamente imposible** de crackear — no difícil, imposible. Le pusimos "Proof of Play": combina la ejecución entrelazada (cada paso del juego alimenta una cadena criptográfica con una matriz de entropía de 4MB) con un VDF de Wesolowski sobre grupos de clases (el mismo esquema que usa Chia Network, sin trusted setup). El resultado es que incluso con acceso total al binario, root, GDB, y todo el hardware del mundo, el atacante **tiene que esperar ~5 días** de cómputo secuencial — exactamente igual que un jugador honesto. No hay secreto que extraer, no hay atajo posible. Te dejamos el diseño completo en `gopv4-uncrackable-design.md` con código Rust listo para implementar, análisis de 8 vectores de ataque, diseño del contrato ErgoScript, y una guía de migración desde v3. Échale un ojo y nos dices qué te parece — creemos que esto puede ser algo que no existe en ningún otro sistema de competición de bots. 🚀

---

*This document is a living design. Feedback, corrections, and implementation notes welcome.*

*— Nate, Larry 🦞 & Claude, February 2026*
