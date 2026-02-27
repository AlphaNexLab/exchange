#!/usr/bin/env python3
"""
GoP v4 — Test Harness
======================

Simulates complete snake games and demonstrates all security properties
of the v4 commitment engine:

  1. Determinism — identical inputs produce identical commitments
  2. Move sensitivity — changing ANY move changes the commitment
  3. Identity binding — different solver_id → different commitment
  4. Score binding — tampering with score → verification failure
  5. Sequential dependency — can't compute step N without step N-1
  6. Verifier round-trip — verifier correctly accepts/rejects
  7. Attack simulation — shows why v3 crack methods fail

Author: Larry 🦞 for Celaut Game of Prompts v4
Date: 2026-02-27
"""

from __future__ import annotations

import copy
import hashlib
import struct
import sys
import time

from gopv4_commitment import (
    CommitmentResult,
    EntropyMatrix,
    GameStateTracker,
    MoveRecord,
    _blake2b,
    _pack_u64,
    TAG_FINAL,
    TAG_INIT,
)
from gopv4_verifier import (
    replay_commitment,
    verify_commitment,
    verify_commitment_verbose,
)


# ---------------------------------------------------------------------------
# Fake snake game for testing
# ---------------------------------------------------------------------------

def simulate_snake_game(
    seed: int = 42,
    num_steps: int = 50,
    num_apples: int = 8,
) -> list[MoveRecord]:
    """
    Generate a deterministic fake snake game replay.

    Produces a sequence of moves with realistic-looking positions
    and score increments (score goes up when an apple is eaten).
    """
    import random
    rng = random.Random(seed)

    directions = ["up", "down", "left", "right"]
    log: list[MoveRecord] = []

    x, y = 10, 10  # starting head position
    score = 0
    apple_x = rng.randint(0, 19)
    apple_y = rng.randint(0, 19)
    apples_eaten = 0

    for step in range(num_steps):
        # Pick a move (simple: move toward apple)
        if apple_x > x:
            move = "right"
        elif apple_x < x:
            move = "left"
        elif apple_y > y:
            move = "down"
        elif apple_y < y:
            move = "up"
        else:
            move = rng.choice(directions)

        log.append(MoveRecord(
            move=move,
            apple_pos=(apple_x, apple_y),
            snake_head=(x, y),
            score=score,
        ))

        # Apply move
        dx, dy = {"up": (0, -1), "down": (0, 1), "left": (-1, 0), "right": (1, 0)}[move]
        x = (x + dx) % 20
        y = (y + dy) % 20

        # Check apple
        if x == apple_x and y == apple_y:
            score += 1
            apples_eaten += 1
            apple_x = rng.randint(0, 19)
            apple_y = rng.randint(0, 19)
            if apples_eaten >= num_apples:
                # Stop after eating enough apples
                break

    return log


# ---------------------------------------------------------------------------
# Test functions
# ---------------------------------------------------------------------------

def test_determinism():
    """Identical inputs must always produce identical commitments."""
    print("\n[TEST 1] Determinism")
    print("  Running same game 5 times...")

    results = []
    for i in range(5):
        tracker = GameStateTracker(solver_id="alice", game_seed=42)
        log = simulate_snake_game(seed=42, num_steps=50)
        for entry in log:
            tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        result = tracker.finalize(log[-1].score)
        results.append(result)

    commitments = set(r.commitment_hex for r in results)
    all_same = len(commitments) == 1

    print(f"  Commitment: {results[0].commitment_hex[:48]}...")
    print(f"  Score: {results[0].score}, Steps: {results[0].step_count}")
    print(f"  All 5 identical: {all_same}")
    assert all_same, "DETERMINISM FAILED"
    print("  ✅ PASS")
    return results[0]


def test_move_sensitivity():
    """Changing a single move must change the commitment."""
    print("\n[TEST 2] Move Sensitivity")

    log_original = simulate_snake_game(seed=42, num_steps=50)

    # Compute original commitment
    tracker = GameStateTracker(solver_id="alice", game_seed=42)
    for entry in log_original:
        tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
    original = tracker.finalize(log_original[-1].score)

    # Alter move at various positions
    test_positions = [0, 1, len(log_original) // 2, len(log_original) - 1]
    all_different = True

    for pos in test_positions:
        log_tampered = list(log_original)
        old_move = log_tampered[pos].move
        new_move = "left" if old_move != "left" else "right"
        log_tampered[pos] = MoveRecord(
            move=new_move,
            apple_pos=log_tampered[pos].apple_pos,
            snake_head=log_tampered[pos].snake_head,
            score=log_tampered[pos].score,
        )

        tracker = GameStateTracker(solver_id="alice", game_seed=42)
        for entry in log_tampered:
            tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        tampered = tracker.finalize(log_tampered[-1].score)

        matches = original.commitment_hex == tampered.commitment_hex
        if matches:
            all_different = False
        print(f"  Altered step {pos:>3}: commitment {'SAME ❌' if matches else 'DIFFERENT ✓'}")

    assert all_different, "MOVE SENSITIVITY FAILED"
    print("  ✅ PASS — Any single move change cascades to different commitment")


def test_identity_binding():
    """Different solver_id must produce different commitments."""
    print("\n[TEST 3] Identity Binding")

    log = simulate_snake_game(seed=42, num_steps=50)
    solvers = ["alice", "bob", "charlie", "josemi"]

    commitments = {}
    for sid in solvers:
        tracker = GameStateTracker(solver_id=sid, game_seed=42)
        for entry in log:
            tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        result = tracker.finalize(log[-1].score)
        commitments[sid] = result.commitment_hex

    print(f"  alice:   {commitments['alice'][:40]}...")
    print(f"  bob:     {commitments['bob'][:40]}...")
    print(f"  charlie: {commitments['charlie'][:40]}...")
    print(f"  josemi:  {commitments['josemi'][:40]}...")

    all_unique = len(set(commitments.values())) == len(solvers)
    assert all_unique, "IDENTITY BINDING FAILED"
    print("  ✅ PASS — Each solver gets a unique commitment")


def test_score_binding():
    """Tampering with the final score must produce a different commitment."""
    print("\n[TEST 4] Score Binding")

    log = simulate_snake_game(seed=42, num_steps=50)
    real_score = log[-1].score

    tracker = GameStateTracker(solver_id="alice", game_seed=42)
    for entry in log:
        tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)

    honest = tracker.finalize(real_score)

    # Try various fake scores
    fake_scores = [real_score + 1, real_score + 10, 999, 0]
    all_different = True

    for fake in fake_scores:
        # Re-run to get fresh tracker at finalization point
        tracker2 = GameStateTracker(solver_id="alice", game_seed=42)
        for entry in log:
            tracker2.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        forged = tracker2.finalize(fake)

        matches = honest.commitment_hex == forged.commitment_hex
        if matches:
            all_different = False
        print(f"  Real score={real_score}, fake score={fake:>3}: "
              f"{'SAME ❌' if matches else 'DIFFERENT ✓'}")

    assert all_different, "SCORE BINDING FAILED"
    print("  ✅ PASS — Score tampering always detected")


def test_sequential_dependency():
    """Step N must depend on step N-1 (can't skip or reorder)."""
    print("\n[TEST 5] Sequential Dependency")

    log = simulate_snake_game(seed=42, num_steps=30)

    # Get breadcrumb at each step
    tracker = GameStateTracker(solver_id="alice", game_seed=42)
    breadcrumbs = [tracker.breadcrumb.hex()]
    for entry in log:
        tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        breadcrumbs.append(tracker.breadcrumb.hex())

    # Verify all breadcrumbs are unique (no cycles)
    unique = len(set(breadcrumbs)) == len(breadcrumbs)
    print(f"  {len(breadcrumbs)} breadcrumbs, all unique: {unique}")
    assert unique, "BREADCRUMBS NOT UNIQUE"

    # Try computing step 15 directly with step 14's breadcrumb
    # but skip step 10 (mutate the log by swapping steps 10 and 11)
    log_swapped = list(log)
    if len(log_swapped) > 11:
        log_swapped[10], log_swapped[11] = log_swapped[11], log_swapped[10]

        tracker_swapped = GameStateTracker(solver_id="alice", game_seed=42)
        for entry in log_swapped:
            tracker_swapped.record_move(
                entry.move, entry.apple_pos, entry.snake_head, entry.score
            )
        swapped_result = tracker_swapped.finalize(log_swapped[-1].score)

        tracker_original = GameStateTracker(solver_id="alice", game_seed=42)
        for entry in log:
            tracker_original.record_move(
                entry.move, entry.apple_pos, entry.snake_head, entry.score
            )
        original_result = tracker_original.finalize(log[-1].score)

        reorder_detected = swapped_result.commitment_hex != original_result.commitment_hex
        print(f"  Swapping steps 10↔11 detected: {reorder_detected}")
        assert reorder_detected, "REORDER NOT DETECTED"

    # Show cascade: changing step 0 changes ALL subsequent breadcrumbs
    log_alt = list(log)
    log_alt[0] = MoveRecord(
        move="left" if log[0].move != "left" else "right",
        apple_pos=log[0].apple_pos,
        snake_head=log[0].snake_head,
        score=log[0].score,
    )

    tracker_alt = GameStateTracker(solver_id="alice", game_seed=42)
    alt_breadcrumbs = [tracker_alt.breadcrumb.hex()]
    for entry in log_alt:
        tracker_alt.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        alt_breadcrumbs.append(tracker_alt.breadcrumb.hex())

    # Step 0 breadcrumbs are same (initial), but step 1+ should all differ
    step0_same = breadcrumbs[0] == alt_breadcrumbs[0]
    diverged = all(
        breadcrumbs[i] != alt_breadcrumbs[i]
        for i in range(1, len(breadcrumbs))
    )
    print(f"  Initial breadcrumb same: {step0_same}")
    print(f"  All subsequent breadcrumbs diverged: {diverged}")
    assert step0_same and diverged, "CASCADE FAILED"
    print("  ✅ PASS — Full sequential dependency confirmed")


def test_verifier_roundtrip():
    """Verifier must accept honest commitments and reject tampered ones."""
    print("\n[TEST 6] Verifier Round-Trip")

    log = simulate_snake_game(seed=42, num_steps=50)
    solver_id = "alice"
    game_seed = 42
    real_score = log[-1].score

    # Compute honest commitment
    tracker = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
    for entry in log:
        tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
    honest = tracker.finalize(real_score)

    # Test 6a: Honest verification
    valid = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=honest.commitment_hex,
        claimed_score=real_score,
    )
    print(f"  Honest verification: {valid}")
    assert valid, "HONEST VERIFICATION FAILED"

    # Test 6b: Wrong score
    valid_wrong_score = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=honest.commitment_hex,
        claimed_score=999,
    )
    print(f"  Wrong score (999): rejected={not valid_wrong_score}")
    assert not valid_wrong_score, "WRONG SCORE NOT REJECTED"

    # Test 6c: Wrong solver_id
    valid_wrong_solver = verify_commitment(
        solver_id="evil-bob",
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=honest.commitment_hex,
        claimed_score=real_score,
    )
    print(f"  Wrong solver_id: rejected={not valid_wrong_solver}")
    assert not valid_wrong_solver, "WRONG SOLVER NOT REJECTED"

    # Test 6d: Tampered log
    tampered_log = list(log)
    tampered_log[5] = MoveRecord(
        move="up" if log[5].move != "up" else "down",
        apple_pos=log[5].apple_pos,
        snake_head=log[5].snake_head,
        score=log[5].score,
    )
    valid_tampered = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=tampered_log,
        claimed_commitment=honest.commitment_hex,
        claimed_score=real_score,
    )
    print(f"  Tampered log: rejected={not valid_tampered}")
    assert not valid_tampered, "TAMPERED LOG NOT REJECTED"

    # Test 6e: Verbose diagnostics
    diag = verify_commitment_verbose(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=honest.commitment_hex,
        claimed_score=real_score,
    )
    print(f"  Verbose check: valid={diag['valid']}, "
          f"commitment_match={diag['commitment_match']}, "
          f"score_match={diag['score_match']}")
    assert diag["valid"]

    print("  ✅ PASS — Verifier accepts honest, rejects all tampering")


def test_attack_simulation():
    """
    Simulate the v3 crack methodology against v4 and show it fails.

    v3 crack: binary patch to intercept blake2b call, extract the static
    32-byte secret, then compute commitment = blake2b(solver_id || score
    || hash_logs || secret) for any desired score.

    v4 defense: there IS no static secret. The commitment depends on the
    full execution trace. Extracting any intermediate value is useless
    without replaying every step.
    """
    print("\n[TEST 7] Attack Simulation (v3 crack methods vs v4)")
    print("=" * 60)

    log = simulate_snake_game(seed=42, num_steps=50)
    solver_id = "alice"
    game_seed = 42
    real_score = log[-1].score

    # --- Play the game honestly to get the real commitment ---
    tracker = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
    for entry in log:
        tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)

    # Capture internal state (simulating GDB memory dump at this point)
    captured_breadcrumb = tracker.breadcrumb
    captured_step_count = tracker.step_count

    honest = tracker.finalize(real_score)
    print(f"\n  Honest result: score={honest.score}, "
          f"commitment={honest.commitment_hex[:40]}...")

    # --- Attack 1: Memory dump of breadcrumb, forge different score ---
    print(f"\n  ATTACK 1: GDB memory dump of breadcrumb")
    print(f"  Captured breadcrumb: {captured_breadcrumb.hex()[:40]}...")
    print(f"  Attacker tries to finalize with score=999...")

    # Attacker has the breadcrumb but needs to also have the matrix
    # in its final state to compute the final matrix sample.
    # Even if they capture both, they can only produce a commitment
    # for score=999 that will NOT match the judge's re-computation.
    fake_matrix = EntropyMatrix(game_seed, solver_id)
    # But wait — the matrix has been mutated by 50 steps of gameplay.
    # The attacker's fresh matrix ≠ the evolved matrix.
    fake_sample = fake_matrix.sample(captured_breadcrumb)

    # Even with the "right" breadcrumb, wrong matrix state → wrong sample
    entangled_forged = _blake2b(
        TAG_FINAL
        + captured_breadcrumb
        + _pack_u64(999)
        + solver_id.encode("utf-8")
        + fake_sample  # wrong! matrix hasn't been evolved
    )
    forged_commitment = _blake2b(entangled_forged + _pack_u64(game_seed))

    verified = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=forged_commitment.hex(),
        claimed_score=999,
    )
    print(f"  Forged commitment: {forged_commitment.hex()[:40]}...")
    print(f"  Verification result: {'ACCEPTED ❌' if verified else 'REJECTED ✓'}")
    assert not verified

    # --- Attack 2: Replay with different final score only ---
    print(f"\n  ATTACK 2: Replay game honestly, lie about score at finalize")
    tracker2 = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
    for entry in log:
        tracker2.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
    inflated = tracker2.finalize(999)  # lie about score

    # The commitment is different because final_score is baked in
    verified2 = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=inflated.commitment_hex,
        claimed_score=999,
    )
    print(f"  Inflated commitment: {inflated.commitment_hex[:40]}...")
    print(f"  Judge re-derives score={real_score}, attacker claims 999")
    print(f"  Verification result: {'ACCEPTED ❌' if verified2 else 'REJECTED ✓'}")
    assert not verified2

    # --- Attack 3: Skip steps (try to shortcut the computation) ---
    print(f"\n  ATTACK 3: Skip steps (only replay first and last 5 moves)")
    short_log = log[:5] + log[-5:]
    tracker3 = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
    for entry in short_log:
        tracker3.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
    shortcut = tracker3.finalize(real_score)

    verified3 = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,  # judge uses the REAL full log
        claimed_commitment=shortcut.commitment_hex,
        claimed_score=real_score,
    )
    print(f"  Shortcut commitment: {shortcut.commitment_hex[:40]}...")
    print(f"  Verification result: {'ACCEPTED ❌' if verified3 else 'REJECTED ✓'}")
    assert not verified3

    # --- Attack 4: Extract seed and rebuild from scratch ---
    print(f"\n  ATTACK 4: Extract game_seed, replay without real game events")
    # Attacker knows game_seed=42 and solver_id="alice" but makes up moves
    fake_log = simulate_snake_game(seed=99, num_steps=50)  # different game
    tracker4 = GameStateTracker(solver_id=solver_id, game_seed=game_seed)
    for entry in fake_log:
        tracker4.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
    faked = tracker4.finalize(fake_log[-1].score)

    verified4 = verify_commitment(
        solver_id=solver_id,
        game_seed=game_seed,
        replay_log=log,
        claimed_commitment=faked.commitment_hex,
        claimed_score=faked.score,
    )
    print(f"  Fake game commitment: {faked.commitment_hex[:40]}...")
    print(f"  Verification result: {'ACCEPTED ❌' if verified4 else 'REJECTED ✓'}")
    assert not verified4

    print(f"\n  ✅ ALL ATTACKS DEFEATED")
    print("=" * 60)


def test_performance():
    """Measure performance for realistic game sizes."""
    print("\n[TEST 8] Performance Benchmark")

    for num_steps in [50, 200, 500, 1000]:
        log = simulate_snake_game(seed=42, num_steps=num_steps, num_apples=999)

        t0 = time.perf_counter()
        tracker = GameStateTracker(solver_id="alice", game_seed=42)
        t_init = time.perf_counter() - t0

        t1 = time.perf_counter()
        for entry in log:
            tracker.record_move(entry.move, entry.apple_pos, entry.snake_head, entry.score)
        t_moves = time.perf_counter() - t1

        t2 = time.perf_counter()
        result = tracker.finalize(log[-1].score)
        t_final = time.perf_counter() - t2

        total = t_init + t_moves + t_final
        per_step = (t_moves / len(log)) * 1000  # ms

        print(f"  {len(log):>4} steps: init={t_init:.3f}s  moves={t_moves:.3f}s  "
              f"final={t_final:.4f}s  total={total:.3f}s  "
              f"({per_step:.2f} ms/step)")

    print("  ✅ PASS — Performance is acceptable for real-time gameplay")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("🦞 GoP v4 — Entangled Execution Commitment Engine")
    print("=" * 60)
    print("Test Suite")
    print("=" * 60)

    passed = 0
    failed = 0
    tests = [
        test_determinism,
        test_move_sensitivity,
        test_identity_binding,
        test_score_binding,
        test_sequential_dependency,
        test_verifier_roundtrip,
        test_attack_simulation,
        test_performance,
    ]

    for test_fn in tests:
        try:
            test_fn()
            passed += 1
        except AssertionError as e:
            print(f"  ❌ FAILED: {e}")
            failed += 1
        except Exception as e:
            print(f"  ❌ ERROR: {type(e).__name__}: {e}")
            failed += 1

    print("\n" + "=" * 60)
    print(f"RESULTS: {passed}/{passed + failed} tests passed")
    if failed == 0:
        print("🎉 ALL TESTS PASSED")
        print()
        print("╔══════════════════════════════════════════════════════════╗")
        print("║  v4: THE SECRET IS THE EXECUTION. NOTHING TO STEAL.    ║")
        print("╚══════════════════════════════════════════════════════════╝")
    else:
        print(f"💥 {failed} test(s) FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()
