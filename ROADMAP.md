# Code Quest Lab - Release Roadmap

Updated: 2026-08-04

## Phase 0 - Baseline, direction, and release foundation (complete for this session)

- Preserve the playable baseline and checkpoint it.
- Maintain the release documents and lock V1 scope.
- Add deterministic checks for source mirroring, static contracts, and critical save/entitlement logic.
- Add an offline-capable web shell without changing the game loop.
- Prepare the complete static web deployment package and first-party About, Educational Purpose, Privacy, Support, Contact, and School Review pages.
- Remove or clearly exclude unfinished release-surface items.
- Lock the teen-first, tablet-first, offline, privacy-minimal, and authentic-learning direction.

Acceptance: the existing browser game still launches, the baseline smoke journey remains green, the product documents agree, the complete static package is buildable, and static/offline checks pass. Evidence is recorded in `STATUS.md`.

## Creative parity lane - audit complete, implementation queued

Joey's latest output is preserved as a creative reference in `CREATIVE_REFERENCE_AUDIT.md`. It is a content ledger and parity reference, not a replacement source file.

- Preserve Joey's original dungeon names, character identities, skill names, boss names, dialogue, endings, purification journey, and “Last Light” idea.
- Keep the V1 D1-8 release boundary until later routes, rewards, progression, dialogue, save behavior, and desktop/tablet playability are evidenced.
- Correct stale source comments that describe already-present D9-16 boss dispatches as reserved or environment-only; do not change gameplay behavior as part of the audit.
- Add Ranger, Necromancer, Alchemist, and Paladin in isolated milestones, including class selection/save migration, HUD resources, passives, all skill tiers, skill-tree behavior, class-restricted equipment, set bonuses, materials, balance, and playability.
- Promote D9-D12 and D13-D16 only through explicit route/boss/reward/progression milestones. Source-resident boss functions do not by themselves make a dungeon release-ready.
- Preserve and later verify Joey's D16 Phase 4 Pure Corruption mechanics (`pcCleaveSpin`, `pcCrown`, `pcWarShock`, `pcBarrage`, `pcSnare`, `pcTendril`, and `pcStorm`) as an endgame parity milestone.
- Keep the Smelter as an original idea, but do not expose a contradictory placeholder; its UI, 55-material recipe data, costs, saves, and tests must agree before activation.

Creative parity acceptance: the exact named content is represented, the relevant pure contracts pass, a fresh-profile desktop/tablet play path is verified, the V1 boundary and privacy/offline rules remain intact, and the milestone checkpoint protocol below is completed.

## Phase 1 - Tablet sessions and core V1 hardening (current)

- Extract pure save, progression, combat, entitlement, and configuration logic behind tests.
- Validate save creation, load, backup recovery, migration, profile deletion, settings, pause/resume, and lifecycle behavior.
- Validate one complete release path from onboarding through the current Dungeon 1-8 endpoint and intended ending; keep later incomplete regions out of the V1 surface.
- Make touch the primary input path on iPad/Android tablet landscape layouts; test safe areas, muted devices, headphones, suspension, forced closure, and restricted-network conditions.
- Shape 10-30 minute sessions with clear objectives, checkpoints, autosave, session summary, next-step suggestions, and a satisfying stop point.
- Add optional Learning Support to the library/after-action surfaces: pattern, sequence, planning, decomposition, optimization, condition, loop, cause-and-effect, and debugging explanations without forced quizzes.
- Keep active-run checkpoints separate from profile progression: recover the latest safe room locally after suspension or forced closure, while deliberately finishing a run clears the checkpoint.
- Review dialogue, combat presentation, difficulty, humour, and monetisation for 13-17-year-old users; remove graphic, shocking, childish, or manipulative presentation.
- Fix P0/P1 usability, progression, mobile layout, and data-loss issues.

Acceptance: a clean profile can complete a meaningful 10-30 minute tablet session and the locked V1 path in supported browser viewports; active-run recovery and optional play-support checks pass; remaining save-compatibility and full-path evidence is recorded.

## Phase 2 - Native packaging for managed devices (scaffold in progress)

- [x] Package the web build with Capacitor 8.4.2 using `dist` as the web asset directory.
- [x] Generate Android and iOS projects; add the v8 App plugin for lifecycle/back-button integration.
- [ ] Create Android project and build it in an environment with JDK, Android SDK, and Gradle support.
- [ ] Build the iOS project on a Mac with Xcode and document the signed-build path.
- [x] Add the initial lifecycle, back-button, local-storage, and landscape-orientation handling.
- [ ] Validate safe-area, status-bar, audio-session, muted-device, and headphone behavior on hardware.
- Confirm normal play needs no external browser redirect or unnecessary permission and handles a muted device/headphones gracefully.

Acceptance: Android build succeeds; iOS project is generated and either builds or has a precise owner-only blocker.

## Phase 3 - Parent-safe monetisation and store package

- [x] Add a fail-closed Capacitor entitlement discovery seam and a test-only,
  non-purchasing development adapter; keep both outside the public runtime.
- [ ] Implement live StoreKit and Google Play Billing adapters and sandbox
  transaction evidence after the owner supplies product IDs and store access.
- Add the parent-gated purchase and restore UI without exposing a browser payment shortcut.
- Finalize and approve the generated app icons/splash, then prepare screenshots, feature graphic, listing copy, privacy draft, support content, and review notes.
- Use accurate wording: the product builds/supports problem-solving and computational-thinking skills through play; do not claim programming instruction, academic improvement, school approval, or clinical outcomes.
- Verify current Apple/Google requirements again immediately before submission.

Acceptance: purchase/restore flows pass without real transactions, assets have provenance, and store metadata is internally consistent.

## Phase 4 - Release candidate audit

- Run the full test plan, offline checks, interrupted-save and corruption recovery checks, responsive viewport checks, and available-device checks.
- Run two consecutive complete release audits.
- Freeze V1, version the build, create a release-candidate checkpoint, and write `RELEASE_CANDIDATE_REPORT.md`.

Acceptance: all release criteria are green or explicitly blocked by a named owner action; no P0/P1 issue remains.

## Major-milestone checkpoint protocol

Create a GitHub and website checkpoint after a major project milestone has been completed and tested. Major milestones include a major gameplay system, dungeon/class/progression phase, substantial UI or tablet-control improvement, significant architecture/save migration, PWA/offline support, major testing/release-readiness phase, or release candidate. Do not create checkpoints for minor fixes, small balancing adjustments, wording changes, or incomplete work; group related smaller changes into one meaningful milestone.

For each major milestone:

1. Run the relevant tests and production build.
2. Confirm that the game remains playable.
3. Update the roadmap, status, and changelog.
4. Create a clear Git commit describing the completed milestone.
5. Push it to GitHub.
6. Deploy the tested web build to the configured domain.
7. Verify the live deployment.
8. Record the Git commit, deployment date, and milestone in project status.

Deployment must not interrupt autonomous development. After a checkpoint is verified, continue immediately with the highest-priority unfinished item in the existing Goal. The working order is: creative reference audit -> scoped implementation -> tests/build/playability -> GitHub and website checkpoint -> next unfinished Goal item.
