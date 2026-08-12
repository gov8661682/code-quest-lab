# Code Quest Lab - Device Acceptance Runbook

Updated: 2026-08-12

This runbook is the remaining owner-side evidence packet for Checkpoint 1. It
is intentionally separate from the loopback developer QA controls. A run that
uses invincibility, high damage, enemy-free mode, room completion, boss jumps,
or phase jumps may validate a regression, but it does not count as clean-player
acceptance.

## Current tested build

Use the configured hostname for Runs A-C unless the owner specifically needs
the Pages preview:

- Runtime snapshot: `f0ce0e9` (`Add data-driven world state registry`)
- Deployment preview: `596095e6.code-quest-lab.pages.dev`
- Primary: `https://code-quest-lab.gov8661682.com/`
- Source SHA-256:
  `AA469B00C64FDE728A04BBE088CC92E2F767075E7C590AFC1F044DE4D2E611F1`
- Deployed checkpoint gate: **151/151**; current repository control gate:
  **153/153**. Do not enable developer controls during Runs A-C.

## Generate a fresh report template

From the repository root, create a dated, non-personal report seeded with the
current Git commit and canonical source hash:

```powershell
npm.cmd run acceptance:report -- --output .\device-acceptance-reports\cql-device-YYYY-MM-DD.md
```

Replace `YYYY-MM-DD` with the actual run date. The command refuses to overwrite
an existing report. Complete the generated template on the representative
device, then record its sanitized path in the project control records after
Runs A-C are finished. Do not commit an incomplete report or include personal
data, credentials, tokens, school identifiers, or raw device accounts.

## Required test inputs

- A representative iPad or Android tablet in landscape, plus a phone if the
  phone layout is intended to be supported.
- The current tested web build at
  `https://code-quest-lab.gov8661682.com/` or the owner-approved packaged
  build supplied for the same checkpoint.
- The commit, deployment date, and source hash recorded in
  `CURRENT_CHECKPOINT.md` before the run begins.
- A fresh local profile. Do not delete an existing profile before exporting or
  otherwise preserving it.

## Record before starting

Record only test metadata; do not include account credentials, tokens, school
identifiers, or personal data.

| Field | Value |
|---|---|
| Date/time and timezone | |
| Device model and OS | |
| Browser/app version | |
| Orientation and viewport | |
| Build commit/source hash | |
| URL or package version | |
| Network state at start | |
| Audio state at start | |

## Run A - clean-player V1 route

1. Create a fresh profile and choose a currently supported class.
2. Open Settings, record the initial `Gameplay Audio` state, and leave it in
   the intended test state; then choose the calm Standard Expedition for the
   first run.
3. Follow the Town objective and the player-following guide to the northern
   gate. Confirm the arrow stays beside the character, points toward the gate,
   and is not mounted on or pulsing at the gate.
4. Complete the released D1-D12 route with ordinary touch controls, including
   room combat, mini-bosses, bosses, rewards, the final portal, and the
   intended ending/session summary.
5. Record the first room or system that prevents completion. If the route
   completes, record the final portal, ending text, rewards, and return/safe
   stop behavior.

Pass requires no developer controls, no P0/P1 defect, no browser/runtime
diagnostic, no lost progress, and a truthful final handoff. A partial route is
useful evidence but does not earn the full-route acceptance lane.

## Run B - 10-30 minute touch-first session

Within one uninterrupted session, record:

1. A clear objective and at least one meaningful room/checkpoint.
2. Touch movement and attack/target selection without keyboard or mouse.
3. Pause, page background or app suspension, resume, and one deliberate
   `Finish For Now`/safe-stop.
4. The session summary, next-step suggestion, and restored progress after
   resuming or reopening.

Record the approximate session duration and any input, layout, audio, save, or
comprehension issue. This run may stop safely before D1-D12; it is the evidence
for the meaningful-session lane, not a substitute for Run A.

## Run C - device and release-readiness checks

On the same representative device, verify:

- Landscape layout, safe-area insets, readable text, and unobstructed touch
  targets at the intended tablet size.
- Move joystick, Attack joystick/target assist, skill buttons, pause, menus,
  gate interaction, player-following guide, room-exit guide, and boss portal.
- Muted-device behavior, audible feedback when unmuted, and headphone output
  if available.
- Reload/background/forced-close recovery without losing the last durable
  profile or active-room checkpoint.
- Offline or temporarily unavailable-network behavior after the build has
  loaded, using normal browser/platform behavior only.
- `.txt` profile export and import on a second supported browser/device if
  cross-device transfer is being claimed. Confirm import creates a new profile
  and leaves the source profile unchanged.

## Evidence packet

Save a short report with the metadata table, pass/fail result for Runs A-C,
first-failure room if any, session duration, and links or filenames for
screenshots/logs. Use filenames such as
`cql-device-2026-08-12-ipad-run-a.png`; omit personal data. Record the report
path in `CURRENT_CHECKPOINT.md`, `PROJECT_PROGRESS.md`, and `BLOCKERS.md`.

Do not publish a new build merely to collect this evidence. If a release
blocking defect is found, fix it, run the release gate, and use the major-
milestone deployment protocol before retesting the live site.
