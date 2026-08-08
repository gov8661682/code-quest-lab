# Code Quest Lab - Autonomous Work Protocol

Updated: 2026-08-08
Status: **Active**

## Outcome

Continue Code Quest Lab toward a polished, enjoyable, stable, and genuinely
playable Release Candidate. Preserve Joey's story, characters, classes, skills,
combat, dungeons, bosses, progression, dialogue, endings, and original ideas.
Shape new work toward the compact, discovery-led open-world direction without
bypassing the tested Version 1 boundary.

## Start of every work cycle

1. Read `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`, `DECISIONS.md`, and this
   file.
2. Confirm the one active checkpoint and inspect the current Git/test state.
3. Select the highest-priority unmet acceptance criterion that can produce new
   evidence now.
4. Define the expected progress delta and the verification needed before
   changing code.
5. Implement the smallest coherent slice, verify it, record the result, and
   continue with the next eligible item.

When a proposed route check would repeat a normal-speed encounter, run
`npm.cmd run qa:fast` and the relevant focused tests first. Use the loopback
developer QA controls for accelerated browser logic, phase, room, and boss
checks. Reserve ordinary-speed play for a sufficiently complete route and for
feel, touch responsiveness, comprehension, balance, and final release
validation; do not use it as the primary way to prove invariant mechanics.

Every cycle must produce at least one concrete progress delta:

- a tested player-visible improvement;
- new dated manual play or recovery evidence;
- a verified diagnosis that narrows a defect;
- a completed release/control requirement; or
- a precisely recorded external blocker plus a different actionable next step.

Effort, repeated observation, and a command variation that produces the same
failure do not count as progress.

## Loop breaker

- Fingerprint a failure by its objective, surface, action path, and material
  result. Trivial input, command, URL, viewport, or wording variations do not
  create a new failure.
- After **3 materially identical technical failures**, stop that method,
  diagnose the shared cause, and switch to a different strategy or independent
  acceptance item.
- Never exceed **5 materially identical gameplay or manual attempts**. On the
  fifth failure, stop the route, preserve the evidence, and record the exact
  failure and alternatives in `CURRENT_CHECKPOINT.md` or `BLOCKERS.md`.
- Ask the owner for direction only when the five-attempt limit is reached and
  no safe independent task can progress the active checkpoint.
- A blocker applies only to the affected work. Continue all independent work
  in the active checkpoint.
- Do not reopen completed audits or completed checkpoint work without a failed
  contract, confirmed regression, changed dependency, or explicit scope change.

## Progress scoring

`CURRENT_CHECKPOINT.md` is the main progress display. Its weighted table is the
only source for the active-checkpoint percentage.

- Weights must total 100 points.
- Earned points require named evidence in the same row and cannot exceed the
  row's weight.
- Repeated tests do not earn new points unless they satisfy a previously open
  evidence requirement.
- Recalculate only when evidence changes. Round the displayed overall project
  percentage to the nearest whole number.
- Overall project percentage is:
  `(completed checkpoints + active checkpoint percentage / 100) / 10 * 100`.
- A percentage is a planning signal, not permission to mark a checkpoint
  complete. Every acceptance criterion must still be fully satisfied.

The executable project-control contract verifies the retry limits, the table
totals, and both displayed percentages during `npm.cmd test` and
`npm.cmd run release:verify`.

## Checkpoint and deployment discipline

- Work only on the active checkpoint unless a verified release regression
  needs a bounded correction.
- Group minor fixes. Commit/push/deploy only a substantial, stable, tested
  milestone under the protocol in `ROADMAP.md`.
- Never deploy a broken or incomplete build merely to increase the score.
- After a verified major checkpoint, immediately advance and continue.
- Publication, store submission, spending, legal acceptance, and credential
  disclosure remain owner-approved actions.

## Stop conditions

Autonomous work stops only when all checkpoints meet the Release Candidate
criteria, or every remaining task genuinely depends on documented owner-only
actions. A difficult or slow task is not itself a blocker.
