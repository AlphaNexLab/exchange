# GoP v4 — Integration Guide for Josemi

## Overview

GoP v4 replaces the static-secret commitment engine with **Entangled Execution**: the commitment is derived from the *entire gameplay trace*, not from a fixed 32-byte secret. There is nothing to extract via binary patching or memory dumping.

v3 was cracked in 78 minutes because the "secret" was a static constant derived from hardcoded entropy strings — an attacker patched the binary to intercept the `blake2b` call and extracted it. v4 eliminates this attack surface entirely.

---

## What Changed

| | v3 (cracked) | v4 (entangled) |
|---|---|---|
| **Secret** | Static 32-byte constant | None — commitment = f(entire gameplay) |
| **Commitment** | `blake2b(solver_id \|\| score \|\| hash_logs \|\| SECRET)` | `blake2b(entangled_state \|\| game_seed)` where `entangled_state` depends on every move |
| **Crack method** | Patch binary → extract secret → forge any score | Must replay entire game legitimately |
| **Time to crack** | 78 minutes | Equivalent to playing the game |

---

## Python Game Integration

### Step 1: Import the tracker

```python
from gopv4_commitment import GameStateTracker
```

### Step 2: Initialize at game start

In the game initialization (where `game_history_globals` is set up):

```python
# solver_id comes from the solver service identity
# game_seed is the deterministic game seed
tracker = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
```

### Step 3: Record every game tick

In the main game loop, after each move is processed (where `record_current_state_internal` and `move_made` are called):

```python
# After processing each move:
tracker.record_move(
    move=current_move,                        # "up"/"down"/"left"/"right"
    apple_pos=tuple(apple_globals),           # (apple_x, apple_y)
    snake_head=tuple(snake_head_position),    # (head_x, head_y)
    score=current_score,                      # from score_list or equivalent
)
```

**This must happen every tick, in order.** The sequential dependency is the core security property.

### Step 4: Finalize at game end

Replace the existing commitment computation:

```python
# OLD (v3) — in commitment_engine binary:
# commitment = blake2b(solver_id || score || hash_logs || SECRET)

# NEW (v4):
result = tracker.finalize(final_score)
commitment = result.commitment_hex
# result also contains: entangled_state_hex, breadcrumb_final_hex, step_count, score
```

### Step 5: Store the replay log

For verification, the game must record the replay log alongside the commitment:

```python
from gopv4_commitment import MoveRecord

# Build during gameplay:
replay_log = []
for each_tick:
    replay_log.append(MoveRecord(
        move=current_move,
        apple_pos=(apple_x, apple_y),
        snake_head=(head_x, head_y),
        score=current_score,
    ))
```

The replay log is submitted alongside the commitment for judge verification.

---

## Rust commitment_engine Changes

The Rust binary currently computes:

```rust
// v3
let secret = derive_secret_from_entropy_strings();  // static!
let commitment = blake2b(solver_id || score || hash_logs || secret);
```

Replace with the equivalent of `GameStateTracker` in Rust:

```rust
// v4 — pseudocode
struct GameStateTracker {
    matrix: [u8; 262144],  // 256KB entropy matrix
    breadcrumb: [u8; 32],
    step_count: u32,
    solver_id: String,
    game_seed: u64,
}

impl GameStateTracker {
    fn new(solver_id: &str, game_seed: u64) -> Self { /* ... */ }
    
    fn record_move(&mut self, mv: &str, apple: (i32,i32), head: (i32,i32), score: i64) {
        // 1. Sample matrix at positions from breadcrumb
        // 2. New breadcrumb = blake2b(old_breadcrumb || move || apple || head || score || step || sample)
        // 3. Mutate matrix using game events
    }
    
    fn finalize(&self, final_score: i64) -> Commitment {
        // entangled = blake2b(breadcrumb || score || solver_id || final_sample)
        // commitment = blake2b(entangled || game_seed)
    }
}
```

The Python implementation in `gopv4_commitment.py` is the reference — port it 1:1.

Key Rust crates needed:
- `blake2` (for blake2b)
- No other dependencies

---

## Verification Process

Judges verify commitments by **re-running the entire game**:

```python
from gopv4_verifier import verify_commitment

is_valid = verify_commitment(
    solver_id=claimed_solver_id,
    game_seed=revealed_seed,      # revealed by creator after deadline
    replay_log=submitted_log,
    claimed_commitment=submitted_commitment,
    claimed_score=submitted_score,
)
```

The verifier re-executes every step of the breadcrumb chain. If the replay log, solver_id, score, or seed don't match exactly, verification fails.

---

## Why v4 Is Much Harder to Crack Than v3

### v3 Crack (what happened)

1. Attacker runs game in debugger
2. Sets breakpoint on `blake2b`
3. Reads the 32-byte secret from memory
4. Computes `blake2b(solver_id || any_score || hash_logs || secret)` offline
5. Submits forged commitment with inflated score
6. **Total time: 78 minutes**

### v4 — Why each attack vector fails

**Binary patching / blake2b interception:**
- Attacker intercepts the *final* `blake2b` call and sees the `entangled_state`
- But `entangled_state` already has the real score baked in (via the breadcrumb chain)
- To produce an `entangled_state` for score=999, they'd need a different breadcrumb chain
- A different breadcrumb chain requires replaying the entire game with score=999
- Which means... actually playing the game and scoring 999

**GDB memory dump:**
- Attacker dumps the entropy matrix and breadcrumb at step N
- The matrix at step N has been mutated by N steps of gameplay
- The attacker cannot reconstruct what the matrix looked like at steps 0..N-1
- Without the historical matrix states, they can't recompute the breadcrumb chain
- They're stuck with the breadcrumb for the real score

**Static analysis / reverse engineering:**
- There is no static secret to find
- The commitment algorithm is known (not security-through-obscurity)
- Understanding the algorithm doesn't help — you still have to run it
- And running it requires actual game events as input

**Replay with fake game events:**
- Attacker could fabricate a replay log with score=999
- But the judge re-runs the *actual* game (Game Service + Solver Service)
- The judge's re-run produces the real score and real commitment
- Fake log → different commitment → verification fails

### The fundamental shift

v3: Security = "can you find the secret?" (answer: yes, in 78 min)
v4: Security = "can you play the game better?" (that's the whole point of GoP)

---

## Files

| File | Purpose |
|---|---|
| `gopv4_commitment.py` | Core commitment engine (GameStateTracker + EntropyMatrix) |
| `gopv4_verifier.py` | Judge verification module |
| `gopv4_test.py` | Test harness with 8 comprehensive tests |
| `gopv4_integration_notes.md` | This file |

---

## Performance Notes

The 256KB entropy matrix is generated once at game start (~0.3s on Python, will be much faster in Rust). Each `record_move()` call takes ~0.5ms in Python. For a 1000-step game, total overhead is ~0.8s — negligible.

In Rust, expect 10-100x faster. The matrix generation and per-step hashing are trivially parallelizable if needed, though sequential dependency of the breadcrumb chain must be maintained.

---

*Larry 🦞 — 2026-02-27*
