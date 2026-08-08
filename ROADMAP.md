# Code Quest Lab - Release Roadmap

Updated: 2026-08-08

The numbered checkpoint sequence and evidence-backed progress report are
canonical in `CHECKPOINTS.md` and `PROJECT_PROGRESS.md`. `CURRENT_CHECKPOINT.md`
defines the one active work boundary; read it with `COMPLETED_WORK.md` and
`DECISIONS.md` before selecting a task.

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

## Open-world direction lane - explicit design target, staged implementation

The product now deliberately aims toward a compact, connected open world.
`OPEN_WORLD_DIRECTION.md` defines the player experience, region/landmark/dungeon
layers, world-state model, save boundaries, and acceptance bar.

- Treat the existing Town, entrance hubs, waypoints, `worldLocation`, dungeon
  registries, and room engine as the first open-world-compatible foundation.
- Keep the current V1 route guard and finish the D1-8 evidence before adding
  broad exploration or promoting D9-16.
- After the current path is playable, build a tested World Atlas, region graph,
  discovered destinations, optional landmarks, and persistent return state.
- Promote Joey's later classes, regions, Pure Corruption, Smelter, and story
  threads into the connected world only through complete content milestones.
- Do not simulate an infinite world, live-service pressure, or a second
  untestable engine. Every visible destination needs a tested travel, save,
  reward, and return path.

## Phase 1 - Tablet sessions and core V1 hardening (current)

Latest milestone: `2c1d6ba` (`Add deterministic gameplay QA architecture`) bounds
the architecture/testing workflow after `9886f50` bounded the Void Monarch's
summon pressure. It passed the 92-test release gate, static/package/native
checks, GitHub push, Cloudflare deployment, production checks, and live smoke
at 1024x768 and 1440x900. Pages preview:
`https://7c154632.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. This does not count as D4-8
completion; continue with the clean-profile route and remaining touch/tablet
lifecycle evidence.

- Extract pure save, progression, combat, entitlement, and configuration logic behind tests.
- Validate save creation, load, backup recovery, migration, profile deletion, settings, pause/resume, and lifecycle behavior.
- Provide a versioned local plain-text profile transfer that preserves durable
  progression, a valid backup, and any active-run checkpoint; import must
  create a new profile without overwriting the current one and remain outside
  cloud/account sync.
- Validate one complete release path from onboarding through the current Dungeon 1-8 endpoint and intended ending; keep later incomplete regions out of the V1 surface.
- Make touch the primary input path on iPad/Android tablet landscape layouts; test safe areas, muted devices, headphones, suspension, forced closure, and restricted-network conditions.
- Shape 10-30 minute sessions with clear objectives, checkpoints, autosave, session summary, next-step suggestions, and a satisfying stop point.
- Keep the C1 implementation compatible with the open-world direction: preserve explorable hub/waypoint seams and truthful destination context without expanding the tested D1-8 content boundary.
- Add optional Learning Support to the library/after-action surfaces: pattern, sequence, planning, decomposition, optimization, condition, loop, cause-and-effect, and debugging explanations without forced quizzes.
- Keep active-run checkpoints separate from profile progression: recover the latest safe room locally after suspension or forced closure, while deliberately finishing a run clears the checkpoint.
- Review dialogue, combat presentation, difficulty, humour, and monetisation for 13-17-year-old users; remove graphic, shocking, childish, or manipulative presentation.
- Fix P0/P1 usability, progression, mobile layout, and data-loss issues.
- Keep elite pressure bounded for touch-first progression: Corrupted summons
  and Regenerating recovery must have finite per-encounter limits, and every
  fix requires a fresh-room rerun before it receives checkpoint or deployment
  credit.
- Keep combined elite scaling bounded as well: the shared health budget must be
  applied after depth, dungeon, elite, and Giant modifiers so stacked rooms do
  not become multi-minute damage sponges. Attack taps received during cooldown
  must remain queued. Both behaviors require focused contracts and a fresh-room
  playthrough before the next major deployment.

Acceptance: a clean profile can complete a meaningful 10-30 minute tablet session and the locked V1 path in supported browser viewports; active-run recovery and optional play-support checks pass; remaining save-compatibility and full-path evidence is recorded.

### Architecture and fast QA slice (2026-08-08; deployed milestone checkpoint)

The holistic review is recorded in `ARCHITECTURE_REVIEW.md`. It preserves the
single-file parity baseline while improving the reusable seams that already
exist:

- `BOSS_IDENTITY_DEFS` now supplies one player-facing identity/defeat-message
  contract for the named bosses, fixing the shared HUD/room-label fallback
  without changing boss mechanics or Joey's creative content.
- Loopback-only developer QA now supports 1x/10x/25x time, high damage,
  enemy-free mode, phase stepping, current-encounter completion, jump-to-boss,
  and a structured telemetry overlay. All controls remain session-only and
  excluded from saves, exports, native packages, and public activation.
- `tools/qa/fast-combat-sim.mjs` and `npm.cmd run qa:fast` provide fixed-seed
  early/mid/late encounter, collision, damage, phase, summon-budget,
  victory/loss, timeout, and accelerated-time checks.
- This milestone passed the full release gate, native sync, production build,
  GitHub push, Cloudflare deployment, production checks, and live browser smoke.
  It does not raise the C1 percentage until a named route or tablet acceptance
  lane gains evidence.

### Route QA and exit-handoff hardening (2026-08-08; deployed milestone checkpoint)

- A disposable loopback QA run now covers the functional D1, D2, D4, D5, D6,
  D7, and D8 boss/portal chain in accelerated time, ending at the existing
  session summary and safe `Finish for Now` Town return.
- QA encounter completion clears live boss adds and refreshes the shared exit
  handoff; player-facing objectives do not announce an unlocked exit while live
  summons remain. Trial navigation uses world language (`Back to Dungeon
  Entrance`) instead of the retired module wording.
- The full 93-test release gate, deterministic QA suite, static/package audit,
  native sync, GitHub push, Cloudflare deployment, production checks, and live
  desktop/tablet profile-shell smoke all pass. This remains functional QA
  evidence, not clean-player route/ending acceptance, so the C1 percentage is
  unchanged.

### Touch surface and recovery probe (2026-08-08; local evidence only)

- A disposable Mage on a 540x720 loopback surface completed a representative
  D1 Normal sequence with the visible target-lock attack control, shrine,
  treasure, level-up, Stone Guardian Phase 2, and portal handoff into D2.
- Pause, reload, and profile reopen restored the same D2 combat checkpoint with
  `SESSION RECOVERED`. A separate probe re-enabled session-scoped developer
  invincibility after reload, survived an idle interval and room clear, and
  completed a deliberate pause/Finish and Return to Dashboard stop.
- This did not close C1: one resumed attempt ended before the session aid was
  re-enabled, joystick drag delivery was unreliable in the managed harness and
  required the bounded keyboard fallback, and the stored harness duration was
  not meaningful human-session evidence. The remaining priority is a clean
  D1-8/ending route plus touch-only tablet/device lifecycle evidence. No
  runtime change or website checkpoint is warranted for this incomplete slice.

### Fresh-profile functional V1 route probe (2026-08-08; local QA evidence only)

- A new Mage traversed D1, D2, and D4-D8 on Normal and reached all seven
  named bosses, shrine/treasure rewards, portal handoffs, the final session
  summary, optional learning note, next-step suggestion, and both safe-stop
  paths. The profile list and Manage Data record were verified before deleting
  only the temporary profile.
- The route used loopback enemy-free and current-encounter QA controls after
  the managed-browser joystick/attack delivery failed again. It therefore
  proves the progression/ending handoffs on a fresh profile, but not a
  player-completed clean route or touch-only acceptance. Empty browser logs and
  unchanged retained profiles were confirmed. No runtime change or website
  checkpoint is warranted for this incomplete evidence slice.

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

Autonomous continuation follows `AUTORUN.md`: every cycle must produce a
concrete progress delta, three materially identical technical failures force a
strategy change, and five materially identical manual/gameplay attempts force
that route to stop and be recorded. `CURRENT_CHECKPOINT.md` is the canonical
percentage display; percentages are earned from named evidence and do not
replace acceptance criteria.

Latest verified checkpoint (2026-08-07): source milestone `9886f50` bounded Void Monarch summon pressure to four beast waves and four phase-aware crystal waves after `cd90db4` hardened the loopback developer boss-summon aid and corrected the HUD identity; the Dungeon 2 pacing and queued attack-input hardening remain in the deployed history. The source is pushed to GitHub and deployed to `https://code-quest-lab.gov8661682.com/` with preview `https://c45c9c7c.code-quest-lab.pages.dev/`; both live checks passed with shell hash `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`. The active next priority is Checkpoint 1 D4-8 progression, the intended ending, safe-stop session, and tablet evidence. Later milestones must repeat the same test, push, deploy, and live-verification sequence.
