# Code Quest Lab - Current Checkpoint

Updated: 2026-08-10

## Current checkpoint

**Checkpoint 1 - Core game stability and complete V1 path**
Status: **Active; not complete**

## Main progress checkpoint

<!-- checkpoint-progress:start -->
Active checkpoint completion: **93%**

Overall project completion: **19%**

Scoring date: 2026-08-10. Overall progress is rounded from one completed
checkpoint plus 93% of the active checkpoint across ten checkpoints.

| Acceptance lane | Weight | Earned | Evidence currently credited | Evidence still required |
|---|---:|---:|---|---|
| Functional D1-12 route, bosses, rewards, final portal, and ending | 30 | 30 | A loopback QA-assisted Mage route now covers the D1, D2, and D4-8 chain plus promoted D9 Vow Breaker's Castle, D10 The Abandoned Laboratory, D11 Ranger Watchtowers, and D12 Necromancer's Stolen Graveyard; D12 includes corrupted horde rooms, Soul Collector content, the Corrupted Necromancer transformation/Phase 2/defeat sequence, standard boss rewards, Veteran unlock, saved-boss portal recovery, and session summary; automated D1-12 route contracts also pass | One fresh player-completed D1-12 route through the final portal and intended ending without developer encounter aids |
| Meaningful 10-30 minute touch-first session | 20 | 16 | Dated touch-first play covered Town, D1 combat rooms, shrine, treasure, elite, boss, target lock, and deliberate portal travel; a current-build managed-browser run also paused, reloaded, resumed the exact combat room, paused again, and finished to the dashboard with the local QA safety aid enabled | One dated 10-30 minute touch-only/device session; the current managed-browser run was shorter and is not physical-device evidence |
| Reload, background, forced-close, and deliberate-finish recovery | 15 | 15 | Page-background and lifecycle contracts; same-room and boss-room recovery; real-storage page-close/reopen simulation; recovered Dungeon 1 combat resume, pause, and deliberate Finish For Now | Native/physical-device suspension and cross-device migration evidence remain later release gates |
| Keyboard/mouse and touch playability with no open P0/P1 defect | 15 | 12 | Input contracts plus a full observable D1 touch route on a tablet-sized managed-browser surface using the visible target lock; no P0/P1 issue was observed during that route | Representative full-route tablet/device evidence with recorded diagnostics and no P0/P1 issue |
| Versioned plain-text profile transfer | 10 | 10 | Exported the retained Level 4 Barbarian, uploaded the `.txt` through the real browser file chooser, imported a matching Level 4 copy with the same dungeon/room/run/play-time values, and confirmed the original remained unchanged before deleting only the temporary copy; contracts also cover active-run preservation and non-overwrite behavior | Cross-version/device fixtures and future-class migration evidence |
| Tests, current records, GitHub, and website milestone | 10 | 10 | Tested commit `e7871b0` is pushed to `origin/main`; the **113/113** release gate, `qa:fast`, build/package audit, and native sync pass; Cloudflare Pages preview `a89328df` and the configured hostname pass production checks, and live desktop/tablet smoke reaches D1 combat and safe pause | Re-run the owner-approved GitHub, website, and live-flow evidence for the next stable milestone; full C1 acceptance remains separate |
<!-- checkpoint-progress:end -->

### Latest evidence update (2026-08-10)

- A fresh managed-browser normal-control playthrough at
  `http://127.0.0.1:4176/?cql-dev=1` used a 1024x768 desktop-sized view for
  D1, then a 600x768 touch-sized view for D2 and D4. With only the local
  session invincibility aid, ordinary canvas
  attacks, the visible target-assist/attack joystick, step movement, and
  normal reward/exit controls, a new Mage completed D1 and D2 Normal end to
  end. D2 included its shrine, treasure, Prison Warden mini-boss, queued
  level-up choices, three-phase Fallen King fight, Veteran unlock, and portal
  travel into D4. A D4 attempt reached Broken Crossing; after the aid was
  accidentally toggled off, the saved session summary correctly recorded the
  death at that mini-boss. A second D4 start re-armed the aid before combat,
  verified protected combat, pause, and Finish and Return to Dashboard. The
  managed tab recorded no warning or error diagnostics. This is useful
  managed touch-sized evidence, but not physical-device, clean-player, or
  full D1-12 evidence, so the score remains **93%** / **19%**.

- The D4 probe also hardened the local developer safety workflow: repeating
  `CQLI` now remains idempotently enabled and shows the same visible
  `Invincibility enabled` banner; page reload is the only reset. The focused
  developer-cheat contracts and full **113/113** gate pass. This does not change
  the evidence score or create a deployment checkpoint.

- A retained Level 3 Mage then started a new D1 Normal run at the default
  desktop viewport with only session invincibility. Ordinary mouse-target
  attacks and normal reward/exit controls completed Shadow Hall, the Elder Stone
  shrine, Bone Chamber, Treasure Chamber, Ruined Archway, and Ashen Pit. The
  run reached Death Chamber, defeated one elite, and paused safely with two
  elites remaining (36 enemies defeated; no browser warnings or errors). This
  is route evidence only, not fresh-profile, full D1-D12, clean-player, or
  physical-device acceptance, so the score remains **93%** / **19%**.

- Hardened recovered combat sessions so `Resume Session` restores the exact
  checkpointed room and opens the existing pause menu before damage updates
  resume. On the current build at `http://127.0.0.1:4176/?cql-dev=1`, a fresh
  Mage reached D1 combat, paused, reloaded, showed `SESSION RECOVERED`, resumed
  into the paused combat room, armed `CQLI`, resumed safely, paused, and used
  `Finish and Return to Dashboard`; the managed-browser tab recorded no error or
  warning diagnostics. The source mirror, build/package audit, Capacitor sync,
  and full local gate pass **113/113**. Commit `e7871b0` was pushed and
  deployed to Cloudflare Pages; preview `a89328df` and the configured hostname
  passed production checks. Published desktop flow reached D1 `Burial Hall`,
  and the published 1024x768 tablet flow paused into the Character Menu with
  no browser warnings or errors. This raises the active checkpoint to **93%** /
  **19%**; it remains QA-assisted evidence, not clean-player or physical-device
  acceptance.

- Promoted Necromancer's Stolen Graveyard into the playable chain after
  Ranger Watchtowers. The local QA-assisted Mage route verified the Cemetery
  Gate, corrupted horde rooms, the authored Soul Collector layer, The Ritual
  Altar, the Corrupted Necromancer's Phase 1/Phase 2 transformation and soul-
  release defeat sequence, standard souls/XP/mastery rewards, Veteran unlock,
  and the final session summary. A second reload from the saved defeated-boss
  checkpoint verified that the exit portal is recreated and the managed
  `Proceed through exit` fallback completes the route. The source mirror,
  `qa:fast`, build/package audit, Capacitor sync, and full local release gate
  pass **112/112**. This is QA-assisted loopback evidence, not clean-player,
  physical-device, GitHub, or website deployment evidence.

- Promoted Ranger Watchtowers into the playable chain after The Abandoned
  Laboratory. The local QA-assisted Mage route reached the randomized
  environment-first watchtower rooms, the Shattered Signal Tower, the
  Corrupted Ranger Captain's authored kneeling/transformation sequence,
  custom Phase 2 corruption surge, peaceful defeat dialogue, guaranteed Tier
  8 salvage, Veteran unlock, managed portal fallback, and
  `THE SESSION IS COMPLETE`. The source mirror, deterministic QA,
  build/package audit, Capacitor sync, and full local release gate pass
  **111/111**. This is functional local evidence, not clean-player,
  physical-device, GitHub, or website deployment evidence.

- Promoted The Abandoned Laboratory into the playable chain after D9. A
  loopback QA-assisted Mage route verified its Laboratory Entrance, randomized
  combat chambers, Mutation Chamber, Head Researcher mini-boss, The Alchemist
  introduction and serum transformation, boss reward, Veteran unlock, portal,
  and `THE SESSION IS COMPLETE`. The new boss phase-aware QA step and the
  portal-only managed touch fallback were both exercised. This is functional
  route evidence, not clean-player or device acceptance.

- Promoted Joey's already-implemented Vow Breaker's Castle into the playable
  release surface after D8. The local route reached Castle Gate, Barracks,
  Library, Throne Hall, the Royal Commander mini-boss, and the Oathbreaker
  King; the custom mini-boss death sequence, phase-two story beat, boss vault,
  rewards, Veteran unlock, and `THE SESSION IS COMPLETE` summary were all
  observed. This was QA-assisted with the loopback developer controls, so it
  is functional route evidence rather than clean-player or device acceptance.

- Fixed the mini-boss timing race exposed by that route: a delayed mini-boss
  can no longer expose a room exit before it has spawned, and the developer
  room-complete helper now waits instead of falsely clearing that room. The
  source mirror, deterministic QA, build/package audit, Capacitor sync, and
  full local release gate pass **110/110**.

- Made mini-boss roster selection data-driven through
  `MINIBOSS_TYPES_BY_DUNGEON`, preserving Joey's D1, D2, D4, D5, D6, and D10
  creative pools while giving future open-world regions one explicit registry
  seam and a safe D1 fallback. The source mirror, build/package audit,
  Capacitor sync, deterministic fast QA, and full **108/108** gate pass. This
  is architecture hardening only; the score remains **79%** / **18%** and no
  deployment checkpoint was created.

- Added one bounded rolling project memory in `PROJECT_MEMORY.md` and wired
  every autonomous cycle to read it before selecting work. Durable facts are
  replaced or consolidated in place; stacked per-cycle memory files and
  appended transcripts are prohibited. The executable control contract checks
  the read rule, material-state-change blocker rule, and 120-line limit. The
  release gate passes **108/108**; this reduces repeated work but does not add
  manual route/device evidence, so the score remains **79%** / **18%**.

- Centralized encounter stat composition in `getEncounterTuning(dungeonId)`.
  Reusable enemies, minibosses, Void Monarch compatibility logic, and every
  named boss spawner now share difficulty, dungeon, and temporary-run modifier
  composition; mini-boss rosters now use one explicit dungeon registry; Joey's
  named phases, attacks, dialogue, visuals, and endings remain in their
  existing systems. The architecture contract, **108/108**
  release gate, build/package audit, deterministic QA, and Capacitor sync pass.
  Minibosses now honor selected difficulty consistently. This is architecture
  hardening rather than manual route/device evidence, so the score remains
  **79%** / **18%** with no deployment checkpoint.

- Made `release:verify` self-preparing: it now refreshes `dist` and syncs the
  Capacitor web assets before static-package tests. Added an executable project
  contract for the ordering, preventing stale-generated-file failures after a
  source edit. The gate passes **108/108**, including build/package audit and
  native sync; this is workflow hardening, not route or device evidence, so the
  score remains **79%** / **18%** with no deployment checkpoint.

- Clarified first-session onboarding: the profile screen now frames the game as
  a short fantasy adventure rooted in Town, the modifier screen explains that
  its rule is temporary and profile-safe, and unlocked route cards show
  `Available from Town gate` with one non-duplicated reward line. The source
  mirror, **108/108** release gate, `qa:fast`, production package audit, and
  Capacitor native sync pass. This is local onboarding polish; the score stays
  **79%** / **18%** and no deployment checkpoint was created.

- Added a physical `North Road` signpost beside the existing Town road and a
  matching `ROAD` landmark on the Town minimap. It points players toward the
  existing Forgotten Depths portal without adding a menu shortcut, teleport,
  or new progression path. The source mirror, **108/108** release gate,
  `qa:fast`, production package audit, and Capacitor native sync pass. This is
  local open-world readability hardening; the score remains **79%** / **18%**
  and no deployment checkpoint was created.

- Added a duplicate-safe DOM-click fallback for the skill, potion, optional Bob
  beam, and Auto Rush action controls. It preserves normal pointer-up behavior,
  rejects the click that follows a successful release, and suppresses a delayed
  pointer-up after fallback. The change is local input hardening only: it does
  not alter combat values, saves, exports, or developer controls. The full
  release gate passes **108/108**, `qa:fast`, production build/package audit,
  and Capacitor native sync pass. No deployment checkpoint or score change was
  created.

- Added explicit profile-transfer fixtures for legacy raw saves, future save
  versions, unsupported future classes, and invalid optional checkpoints. The
  current loader preserves durable data for the normal migration path without
  silently remapping unsupported Joey classes. The release gate now passes
  **108/108**; this is transfer regression protection, not cross-device or
  touch-session acceptance evidence, so the score remains **79%** / **18%**.

- An incomplete fresh normal-control route on a disposable 540x720 Mage used
  only session invincibility, ordinary attacks, and the Step movement fallback.
  It cleared Dungeon 1 through Stone Guardian, Dungeon 2 through Fallen King,
  and the early Dungeon 4 combat/event/vault sequence before the browser
  session ended at the Corrupted Champion. This is not clean D1-8, ending, or
  touch-session acceptance evidence and is not scored. A subsequent browser
  attempt was denied localhost permission; exact owner action is recorded as
  B-009 in `BLOCKERS.md`.

- The working-tree change is release-verified but cannot yet be committed:
  `git add` was denied while creating `.git/index.lock`, and a read-only check
  confirmed that no stale lock exists. B-010 records the required Git metadata
  permission or owner-terminal commit action. No commit, push, or deployment is
  claimed for this local slice.

- A read-only check of the configured hostname on 2026-08-10 was
  inconclusive: DNS resolved and ping succeeded, but every HTTPS fetch failed
  and TCP 443 was unreachable from this environment. B-011 records the exact
  external verification action. The previous successful production checkpoint
  remains the last authoritative live evidence; no deployment was attempted.

### Latest evidence update (2026-08-09)

- The new step movement pad was verified on a fresh loopback Mage at 540x720.
  Its bounded directional taps used the shared player movement and room-clamp
  path to traverse Town, the D1/D2/D4-D8 entrance portals, and the final D8
  portal; the same disposable run reached the named Void Monarch, Chieftain,
  Archmage Valen, Hollow World Tree, and Broker encounters and displayed
  `THE SESSION IS COMPLETE`. The run used the bounded developer encounter aid
  after normal attack attempts, so it is functional route and managed-surface
  evidence, not clean-player, physical-device, or 10-30-minute touch-session
  acceptance. Finish For Now, Pause -> Finish and Return to Dashboard, profile
  deletion, and empty browser diagnostics were also verified. The release gate
  now passes **97/97**; the score remains **79%** / **18%** and no deployment
  checkpoint was created for this local hardening slice.

- A fresh protected Mage route on an uncached `localhost:4173` surface at
  540x720 confirmed that the repaired attack path can clear a combat room, but
  the managed browser did not move the player to the forward door after the
  room cleared. Keyboard, arrow, joystick-drag, refocus, and pause/resume
  paths were each tried within the bounded five-attempt policy; the route was
  stopped and the exact failure was preserved rather than repeated. This is
  not clean-player D1-8 or touch-only acceptance evidence, and the disposable
  profile was deleted.

- Added a contextual touch fallback for constrained browser surfaces. `Follow
  Northern Road` is available in Town, the entrance hub exposes its existing
  gate flow, and a dungeon `START` room exposes `Enter Dungeon`; normal walking
  remains available. `Proceed Through Exit` stays hidden in Town, entrance
  hubs, and unclaimed static rooms, then appears after a real forward combat
  clear or claimed shrine/treasure reward. Fresh 540x720 checks advanced Town
  -> D1 Entrance -> gate selection -> D1 `room_m0`, then `room_m0` -> `room_m1`
  and a completed shrine -> treasure. An unclaimed treasure also exposed
  `Open Treasure`, delivered the existing loot overlay, and then exposed the
  ordinary forward exit. The full release gate passes **97 tests**; `qa:fast`,
  production build, and Capacitor native sync also pass.
  This is local usability hardening, not a new acceptance lane or deployment
  checkpoint, so the score remains **79%** / **18%**.

- A local 540x720 touch-surface probe used a disposable Mage on Normal
  difficulty and exercised the visible attack control through D1 combat,
  shrine, treasure, level-up, the Stone Guardian Phase 2 fight, and the portal
  into the Fallen Kingdom entrance. D2 pause/reload restored the same first
  combat-room checkpoint and showed `SESSION RECOVERED`. A later fresh-page
  probe re-enabled the session-scoped invincibility aid, survived a bounded
  no-input interval and room clear, then paused and used `Finish and Return to
  Dashboard`. The first resumed attempt had not re-enabled the session-scoped
  aid and ended, so it is not credited as protected recovery. The managed
  browser did not reliably deliver joystick drag events; movement used the
  documented keyboard fallback after bounded diagnosis. The route therefore
  remains touch-surface evidence, not touch-only 10-30 minute acceptance. The
  stored harness play time was inflated by analysis waits and is not credited
  as a meaningful human session. The disposable profile was deleted and the
  retained profiles were unchanged; the score remains **79%** / **18%**.

- A new disposable Mage started at Level 1 and traversed the full functional
  V1 route boundary on Normal: D1, D2, and D4-D8. The run reached the named
  bosses Stone Guardian, Fallen King, Void Monarch, Corrupted High Chieftain,
  Archmage Valen, Hollow World Tree, and The Broker; observed shrine/treasure
  rewards and every portal handoff; reached `THE SESSION IS COMPLETE`; read
  the optional Pattern recognition note and next-step suggestion; and used
  both `Finish for Now` and Pause -> `Finish and Return to Dashboard`. The
  managed joystick/attack path still did not deliver a normal attack in this
  fresh tab, so loopback enemy-free and current-encounter QA controls were
  used for combat completion. This is fresh-profile functional evidence, not
  clean-player route acceptance or touch-only evidence. The diagnostic log was
  empty; the disposable profile was deleted after its Level 22/2527-Soul
  record was observed, and retained profiles were unchanged. The score remains
  **79%** / **18%**.

- The fresh-route input diagnosis led to a narrow local hardening: the shared
  Attack joystick now has a guarded managed-browser click fallback for tap
  actions when pointer-up delivery is lost, while normal pointer-up taps and
  directional drags remain guarded against duplicate activation. The source
  mirror was resynced; 18 focused combat contracts, the 93-test
  `release:verify` gate, `qa:fast`, production build, and native sync pass.
  This has not yet been revalidated in a fresh browser/device route, so it does
  not add clean-player or touch-only evidence, change the **79%** / **18%**
  score, or warrant a deployment checkpoint.

- Post-edit runtime validation on a fresh uncached `localhost:4173` origin at
  540x720 confirmed the repaired control in a real D1 room: one center tap
  reduced `Enemies: 2` to `Enemies: 1`, and browser diagnostics were empty. A
  separate three-enemy room remained at `Enemies: 3` after a directional drag,
  so the drag did not trigger a duplicate tap; the room was cleared only with
  the bounded high-damage QA aid. This is managed-browser input evidence, not
  physical-device, full-route, or clean-player acceptance. The score remains
  **79%** / **18%** and no deployment checkpoint was created.

- A disposable loopback QA Mage traversed the functional V1 chain through D1,
  D2, D4, D5, D6, D7, and D8 using the developer invincibility aid and 10x
  simulation speed. Every named boss was reached and completed, every portal
  advanced to the next entrance, D8 reached `THE SESSION IS COMPLETE`, and
  `Finish for Now` returned to Town. This is not clean-player route/ending
  acceptance evidence and does not change the **79%** / **18%** score. The
  follow-up fixes are verified in **93 tests**, `qa:fast`, the build/package
  audit, native sync, GitHub commit `20f85ba`, Cloudflare preview
  `https://d8829db6.code-quest-lab.pages.dev/`, configured-domain production
  checks, and live desktop/tablet profile-shell smoke. The deployed source
  SHA-256 is
  `553C51477907DDDA9CA67AF0D1C79581378A676EAE83741627645ED1D4682A19`.

- The architecture and fast QA milestone is now a completed deployment
  checkpoint: commit `2c1d6ba` (`Add deterministic gameplay QA architecture`)
  was pushed to `origin/main` and deployed on 2026-08-08. Pages preview
  `https://7c154632.code-quest-lab.pages.dev/` and configured hostname
  `https://code-quest-lab.gov8661682.com/` both passed production checks. Live
  browser smoke passed at 1024x768 and 1440x900 with the profile screen,
  playable game area, first-room objective, no horizontal overflow, and no
  captured browser warnings/errors. The deployed source SHA-256 is
  `00349B9312F68EE8402F143785AEEA28FB5FD5D0386E114D0501E5B2336448FC`.

- On 2026-08-08, the holistic architecture review was completed and recorded
  in `ARCHITECTURE_REVIEW.md`. The shared boss identity registry corrects the
  generic HUD/room fallback while preserving all named bosses and mechanics.
  A loopback-only fast QA layer now supports accelerated time, high damage,
  enemy-free mode, phase stepping, encounter completion, jump-to-boss, and
  structured telemetry; these controls remain outside saves and text exports.
  The fixed-seed representative simulator passes early, mid, late, collision,
  damage, victory, loss, timeout, and finite-summon checks. Full local
  verification passes **92 tests**, the 17-file build/package audit, inline
  runtime parsing, and native sync. This changes the workflow and fixes a
  shared representation defect, but does not add D1-8, ending, or touch-first
  safe-stop evidence, so the score remains **79%** / **18%**.

- The Void Monarch summon-pressure follow-up is deployed as commit `9886f50`
  (`Bound Void Monarch summon pressure`) with Pages preview
  `https://c45c9c7c.code-quest-lab.pages.dev/` and configured hostname
  `https://code-quest-lab.gov8661682.com/`. Beast summons are limited to four
  waves, crystal summons to four phase-aware waves, and the live boss remains
  the encounter target after those finite pressure windows. All 84 tests, the
  17-file build/package audit, native sync, cache-busted production checks,
  and live profile smoke passed. The deployed shell hash is
  `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
- This is a balance and playability hardening milestone, not new route
  evidence; the score remains **79%** / **18%** until D4-8, the intended
  ending, and the full safe-stop session are evidenced.
- The QA/readability follow-up is deployed as commit `cd90db4` (`Harden local
  boss QA controls`) with Pages preview
  `https://0db3ee6b.code-quest-lab.pages.dev/` and configured hostname
  `https://code-quest-lab.gov8661682.com/`. The loopback-only `F8 F7 F6 F4`
  developer aid now clears live boss summons without marking the boss room
  complete or opening its exit, and the D4 HUD names the Void Monarch
  correctly. All 83 tests, the 17-file build/package audit, native sync,
  cache-busted production checks, and live profile-to-entrance smoke passed.
- A disposable local Mage run reached D4 room 11 after this correction and
  verified pause, resume, and deliberate Finish and Return to Dashboard. The
  disposable profile was deleted through Manage Data; retained Mage level 12
  and Barbarian level 4 records remained unchanged. This hardening does not
  close a new acceptance lane, so the score remains **79%** / **18%**.

- The Dungeon 2 elite budget was tightened from 4x to 2.5x authored base
  health after accounting for depth and Dungeon 2 scaling. Modifier identity
  and behavior remain intact. A fresh disposable Mage re-entered Dungeon 2
  Normal after the fix and cleared early combat, shrine, treasure, later
  combat, and the Prison Warden route segment before a deliberate safe stop.
- Queued touch and desktop attack taps now wait for the ordinary attack
  cooldown instead of being discarded. Focused contracts, the earlier bounded
  elite route, and the new source build cover the hardening. This is a
  meaningful milestone, but it does not close a new acceptance lane: the
  evidence score remains **79%** for Checkpoint 1 and **18%** overall until
  D4-8, the ending, and the full safe-stop session are evidenced.
- The latest major checkpoint is verified as commit `9886f50`, pushed on
  2026-08-07 and deployed to `https://code-quest-lab.gov8661682.com/` with
  preview `https://c45c9c7c.code-quest-lab.pages.dev/`. The deployed shell
  hash is `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.

## Current objective

Prove that a clean profile can complete the current Version 1 Dungeon 1-12 path
and that a touch-first 10-30 minute session can pause, recover, summarize, and
stop without losing progress. Preserve the existing story, classes, combat,
dungeon, boss, dialogue, and ending direction while fixing only verified
defects. Shape the implementation so Town, entrances, waypoints, and saved
world locations can grow into the explicit compact open-world direction without
expanding the untested V1 content boundary.

Autonomous continuation follows `AUTORUN.md`. The score above changes only
when its table gains or loses named evidence; retries and effort alone do not
change it.

## Completed acceptance criteria

- The current four-class browser game launches and has a tested profile/Town/
  entrance/trial/modifier/first-combat flow.
- Dungeons 1, 2, and 4-12 have route-generation/validation contracts and the
  V1 release guard prevents D13-16 from selection, waypoint, saved-world resume,
  or boss-exit bypasses.
- Active-run checkpoints, Resume Session, Return to Town, Finish For Now,
  session summary, optional contextual Learning Support, and page-background
  save paths exist and are contract-tested.
- Keyboard/mouse and touch/joystick input contracts, canvas focus, bounded
  first-room onboarding, and safe release fallbacks are covered.
- `npm.cmd run release:verify` passed on 2026-08-07: release contracts, 83 Node
  tests, a 17-file static build, and the static-package audit. The new
  session-transient UI, no-waypoint cleanup, and final-enemy status-refresh
  contracts are included; `npm.cmd run native:sync` also passed.
- The versioned local profile-transfer contract preserves durable profile data,
  a valid backup, and an active-run checkpoint; import creates a new profile
  without overwriting the current profile. A real local browser upload
  round-trip on 2026-08-07 matched the retained Barbarian's level, dungeon,
  highest room, run count, and play time; only the temporary imported copy was
  deleted afterward.
- The last major web checkpoint is live-verified at
  `https://code-quest-lab.gov8661682.com/` and the current production check
  passes.

## Remaining acceptance criteria

1. Complete a fresh profile through the full bounded D1-12 route, including
   rooms, bosses, rewards, final portal, and intended session ending.
2. Record a meaningful 10-30 minute touch-first session with a clear objective,
   checkpoint/autosave, pause/resume, summary, next step, and safe stop. The
   current managed-browser recovery and finish sequence is now verified; the
   remaining gap is session duration and representative touch/device evidence.
3. Verify the current route and recovery behavior on representative
   tablet-sized browser surfaces, with no P0/P1 defect or browser diagnostics.
4. Run the relevant tests/build again after any evidence-driven fixes, update
   status/changelog, and complete the GitHub + website checkpoint before
   marking this checkpoint complete.

## Active tasks

1. Continue the highest-priority clean-profile, touch-first D1-12 playthrough;
   record the first failing room/system if the run cannot complete. The latest
   disposable Mage QA route completed D1 and the patched D2 route through the
   Fallen King, including the bounded elite room, and entered The Shadow Realm
   Entrance with the local invincibility aid; the next route target is D4-8 and
   the intended ending. The full D1-12 route is still unproven. Apply the
   `AUTORUN.md` failure fingerprint: switch strategy after three materially
   identical technical failures and stop the same manual route after five
   materially identical attempts.
2. Run the remaining 10-30 minute touch-only/device session around the now-
   verified pause, page-background, reload, Resume Session, and Finish For Now
   paths; do not repeat the completed managed-browser recovery check.
3. Keep the deployed profile-transfer and grouped enemy/door readability
  changes under regression coverage. The local follow-up also clears stale
  dungeon lock and waypoint messages when a session returns to Town or uses
  Finish for Now; combat
  calculations remain unchanged. A separate loopback-gated, session-only
  developer invincibility aid and the first-combat visible-spawn hardening are
  local QA tools only and are not part of the deployed checkpoint. The local
  follow-up also resets a regenerating elite's recovery timer after every
  successful hit and restores the exact generated route before applying a
  saved room checkpoint; these are combat/recovery correctness fixes, not new
  gameplay systems.
4. Continue the clean-profile D1-8 route on a representative supported
   surface. Initial attack response is now reproduced on the Pages preview;
   the save/readability milestone has passed its tests, GitHub push, deployment,
   and live verification, while C1 remains active because D1-8 completion and
   tablet/lifecycle evidence are still open.

The open-world design is now recorded in `OPEN_WORLD_DIRECTION.md`. It is a
product/architecture constraint for future implementation, not permission to
skip the active C1 route, save, input, and session acceptance criteria.

## Latest active-checkpoint QA evidence

- On 2026-08-05, the configured production hostname was tested at 1024x768
  with a fresh Barbarian profile created for this run. The profile reached
  Town, the Dungeon 1 entrance, Normal trial, modifier selection, and three
  first-combat rooms: `Ashen Pit`, `Crypt Passage`, and `Dark Corridor`.
- The run reached the bounded read-and-respond onboarding surface and normal
  defeat/recovery flow each time, with no browser error or warning diagnostics.
  Three controlled attempts did not produce a visible enemy defeat: a touch
  Attack-joystick drag, a touch Attack-joystick tap plus movement, and
  repeated desktop canvas clicks. This is an incomplete gameplay result, not a
  confirmed product-side combat defect; the browser harness/input delivery
  must be reproduced on another supported surface before implementation is
  changed.
- The temporary QA profile was deleted through the in-game Manage Data
  confirmation. No pre-existing profile data was present at the start of this
  run.
- After the 2026-08-05 deployment checkpoint, a fresh Mage probe on the Pages
  preview at 1024x768 reached Dungeon 1 `START Ancient Entrance` with no
  browser diagnostics but did not transition from room 0 after the tested
  managed-browser movement/interaction inputs. The temporary profile was
  deleted; this is additional input/route evidence, not a confirmed combat
  calculation defect.
- A subsequent fresh Mage run on the same 1024x768 Pages-preview surface
  entered `Burial Hall`, showed a visible damage response and HP change after
  a canvas click, defeated enemies, progressed through a shrine and treasure
  room, and reached `Gladiator Pit` before the session ended. No browser
  diagnostics were recorded; the controlled run did not complete the full
  D1-8 route.
- A local fresh-Mage regression run reached `Shadow Hall`, displayed the
  normal defeat summary, and used `Finish For Now`. The returned Town screenshot
  was visually free of the old dungeon lock/waypoint messages; the known
  synthetic Mage profile was deleted afterward, while an unrelated existing
  Barbarian profile was left untouched.
- On 2026-08-05, a resumed local QA profile traversed its saved D2 route from
  `START Castle Gatehouse` through `COMBAT 2`, `SHRINE 3`, `TREASURE 4`, and
  `ELITE 5` into `BOSS 6 The Fallen King's Throne Room`. With the loopback-only
  developer invincibility aid enabled, bounded desktop click probes reduced
  the Stone Guardian from `3675/3675` to `2715/3675` and the Fallen King
  guardian from `100%` to `74%`, then the run was paused safely. This is
  resumed-session combat evidence, not fresh-profile D1-8 completion or direct
  regenerating-elite manual evidence.
- The same local verification reproduced and covered the regenerating-elite
  recovery-timer defect: successful damage now resets the timer, the canonical
  source/mirror hashes remain identical, and `npm.cmd run release:verify`
  passed all 65 tests after build and native web-copy sync.
- A clean local Mage profile paused in D1 `COMBAT Ashen Pit`, was reloaded,
  and resumed in the same generated room with the same two remaining Zombies
  and locked door. This confirms the saved route is restored before room state
  is applied; the full D1-8 route and tablet lifecycle evidence remain open.
- A separate clean local Mage profile reached D1 `COMBAT Crypt Passage` with
  the loopback-only invincibility aid enabled for QA. After two visible enemy
  defeats, one normal enemy remained outside the 1024x768 visible viewport and
  the door stayed locked. The run was paused and preserved as an evidence gap;
  no indefinite target-search loop or unverified gameplay workaround was added.
- On 2026-08-05, a fresh local Mage QA profile progressed through D1 `Crypt
  Passage`, `Mystic Sanctum`, `Hidden Cache`, and `Burial Hall` with the
  loopback-only developer aid enabled. Visible combat, shrine interaction,
  treasure rewards, and level-up/gear surfaces were observed. `Burial Hall`
  then retained one hidden/offscreen Soul Wraith after the visible enemies were
  defeated, reproducing the target-location playability gap without further
  repeated search attempts.
- Added a restrained screen-space locator for the nearest live offscreen enemy;
  hidden Soul Wraiths are marked `THREAT` rather than exposed visually. The
  canonical HTML, downloadable mirror, and focused source contract are recorded
  in pushed commit `4747413`; this is local QA hardening and is not deployed.
- The same profile was paused, reloaded, recovered from the saved `Burial Hall`
  checkpoint, and resumed without data loss or browser diagnostics. The
  indicator-specific live screenshot remains unrecorded, so this evidence does
  not complete the room, D1-8, or tablet lifecycle criteria.
- Commit `3106820` refreshes room progress and the HUD immediately after the
  final enemy leaves the array, covering the level-up pause boundary that had
  left a stale lock message. Focused and full release verification passed all
  67 tests, the 17-file package audit, and native sync; a local resumed
  `Ruined Archway` smoke showed an active game screen with empty door status
  and no enemy count. This minor local follow-up is not deployed.
- After local browser access was restored, a fresh cache-busting loopback QA
  URL loaded the current shell. The saved Mage level 10 session reopened at
  the defeated D1 Guardian room, rendered a visible `EXIT PORTAL`, and walking
  into it completed the handoff to the next entrance area without browser
  diagnostics. This proves recovered boss-room exit behavior, not full D1-8
  completion.
- The recovered boss-room load path now restores the forward door and exit
  portal after reload/background recovery, and the loopback-only developer QA
  aid has an additional gated `F8`, `F7`, `F6`, `F4` sequence for clearing live
  boss summons during local debugging. The invincibility toggle also accepts
  the ordinary-key fallback `C`, `Q`, `L`, `I` when a managed browser reserves
  function keys. Neither behavior is enabled on the deployed/public shell or
  included in profile export.
- A cache-busted loopback combat smoke used the ordinary-key fallback before
  entering Dungeon 1's first combat room; after 12 seconds with two enemies
  present, the session remained active at `100/100 HP`. The temporary profile
  was deleted afterward, and this remains QA evidence only.
- The portal handoff QA also found and corrected a stale entrance objective:
  each entrance now resolves its objective from the underlying dungeon, so the
  Fallen Kingdom entrance correctly names the Fallen King rather than the
  previous Stone Guardian objective. The browser smoke verified both the HUD
  objective and entrance banner.
- A 600x700 touch-layout replay found that an upward movement-joystick drag
  could release over the adjacent Potion control in the managed browser
  harness. Joystick pointer ownership now cancels the overlapping skill
  release instead of activating Potion; the replay no longer showed the
  unintended `NO POTIONS` action. The temporary route remained in Town after
  bounded navigation attempts, so full touch-first D1-8 evidence remains open.
- On 2026-08-05, clean-profile touch-first runs were initially stopped by
  in-app browser permission denial on both QA surfaces; this was recorded as
  blocker `B-007`. Loopback access was subsequently restored, the saved boss
  recovery path was manually verified, and manual route/lifecycle evidence
  can continue locally. Pages-preview and physical-device evidence remain
  separate open acceptance items.
- After the latest control update, `npm.cmd run release:verify` passed all 75
  tests, the 17-file static package audit, and the build; the prior
  `npm.cmd run native:sync` also passed.
- The AI expert review is recorded in `AI_EXPERT_PLAYTEST.md`. It confirms
  Town's useful hub foundation but finds that the current dashboard/route flow
  still feels menu-driven, the minimap/landmarks do not yet communicate an open
  world, and first-combat enemy/lock feedback needs improvement.
- On 2026-08-07, two bounded fresh-Mage loopback attempts completed Town,
  Entrance, Normal trial, session modifier, start room, and first combat. The
  first reached `Forsaken Vault` and the second reached `Crypt Passage`; both
  ended before an enemy defeat in the managed browser surface, with no browser
  diagnostics. The loopback-only developer key sequence did not register in
  this input surface, so no further identical combat attempts were made. Both
  synthetic profiles were deleted; the existing Barbarian profile was not
  changed.
- A verified status-polish defect was fixed locally: static Town/Entrance/
  shrine/treasure rooms now clear stale lock text as well as hiding the status
  element. The focused lifecycle contracts and packaged local Town smoke pass;
  this is a minor local hardening change, not a deployment checkpoint.
- On 2026-08-07, a fresh temporary Mage profile survived a real local-storage
  page-close/reopen simulation from Dungeon 1 combat. Reopening the profile
  showed `SESSION RECOVERED`; Resume Session restored the saved combat
  checkpoint, Pause exposed the safe-stop menu, and Finish and Return to
  Dashboard banked the run. The temporary profile was deleted through Manage
  Data; the existing Barbarian profile was untouched. This completes the
  browser-storage lifecycle lane, while native/physical-device lifecycle
  evidence remains open.
- On 2026-08-07, a cache-busted local smoke reproduced and then verified the
  Finish for Now transition fix: the old dungeon lock text is now cleared both
  before and after Town rebuild, with the returned `#doorStatus` empty and
  hidden. The source mirror, focused lifecycle contract, 77-test release
  verification, static package, and native web-asset sync all pass. This is
  local hardening, not a deployment checkpoint.
- On 2026-08-07, a bounded local Mage run used the loopback-only developer
  invincibility aid and completed the observable Dungeon 1 route: `Burial Hall`,
  `Ancient Shrine`, `Sunken Treasury`, `Ashen Pit`, `Guardian's Sanctum`, and
  the exit portal into `The Fallen Kingdom Entrance`. The Stone Guardian was
  reduced from `750/750` to zero through the normal touch attack control, and
  the next-region entrance was observed. This is valid D1 boss/portal evidence,
  but it used the existing Mage profile rather than a clean profile and does
  not establish D1-8, touch-first, or ending completion. The Manage Data
  surface retained both Mage and Level 4 Barbarian profiles; no profile was
  deleted. At that earlier point, the checkpoint and overall scores were 61%
  and 16%; the current score is recorded at the top of this file.
- On 2026-08-07, a separate isolated Mage QA profile completed the fresh
  Dungeon 1 boss-and-portal route, then entered Dungeon 2 with `Elite Invasion`.
  In `Dark Inquisition Chamber`, the Corrupted elite modifier reproduced an
  unbounded-feeling escalation to `Enemies: 15` and a locked exit after several
  distinct, bounded attack/reposition attempts. The run was safely finished;
  only the temporary QA profile was deleted, while the retained Mage (116
  Souls) and Barbarian (0 Souls) profiles were preserved. The follow-up fix in
  `6423ecb` gives each Corrupted elite a finite two-minion summon budget,
  preserves it through room checkpoints, and adds a 77-test contract. This is
  local hardening evidence, not D1-8 completion; the then-current scores were
  61% and 16%, before the later clean D1 touch-route evidence.

- On 2026-08-07, a new disposable Mage profile verified the patched local
  shell through Dungeon 1 Normal's first combat, shrine, sealed-chest event,
  treasure vault, elite lair, and a later cleared combat room. It reached
  Level 7, so Dungeon 4 remained correctly locked behind progression. The run
  was finished safely and only that profile was deleted; the retained Mage and
  Barbarian profiles were unchanged. This is clean-profile D1 evidence, not a
  post-fix D4 rerun or D1-8 completion.

## Latest milestone evidence

- On 2026-08-07, a separate disposable Mage completed the full observable
  Dungeon 1 touch-first slice: `Shadow Hall`, `Elder Stone`, `Cursed Gallery`,
  `Relic Chamber`, `Dark Corridor`, `Forsaken Vault`, `Guardian's Sanctum`,
  the Stone Guardian through Phase 2, and the exit portal into `The Fallen
  Kingdom Entrance`. The visible session-only target lock made center-hold
  Attack usable throughout the route; the local developer invincibility aid
  was enabled only for QA. The two disposable Mage profiles from this run
  were deleted through Manage Data; the retained Mage and Barbarian profiles
  were verified unchanged. This advanced the evidence score to 74% / 17%
  before the milestone publication; the current score is 76% / 18%, while the
  D1-8 ending and full safe-stop session remain open.
- The boss handoff edge case found during that run is now fixed: dead summon
  objects no longer leave `CLEAR SUMMONS` visible or keep a defeated boss room
  locked. The runtime counts only live summons, clears dead objects, reopens
  the exit, and removes stale status text; the focused combat contract and the
  80-test release gate cover the behavior.
- Milestone checkpoint `0c960fc` was pushed and deployed on 2026-08-07. Both
  `https://88bd6ae9.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/` passed `production:check`; the live
  browser smoke reached profile creation, Mage selection, Town, visible target
  assist, pause, Finish and Return to Dashboard, and temporary-profile cleanup
  with no browser diagnostics. Shell SHA-256:
  `975FD97E55D2AB013EE63082398519F29722E698DEC32221CE38441B597D6E3F`.

- On 2026-08-07, a disposable Mage QA route completed Dungeon 2 Normal from
  `Castle Gatehouse` through `Cracked Courtyard`, `Fallen Watchtower`,
  `Shattered Altar`, `Broken Strongbox Hall`, `Collapsed Barracks`,
  `Broken Rampart`, the `Prison Warden` mini-boss, and `The Fallen King's
  Throne Room`. The Fallen King reached Phase 3 and the exit portal opened
  into `The Shadow Realm Entrance`; the loopback-only developer invincibility
  aid was used only for QA, and local diagnostics contained no errors or
  warnings. This advances the route evidence to 19/30, while D4-8, the final
  portal, ending, and full safe-stop session remain open.
- The D2 playthrough found that several queued level-ups displayed the final
  level number repeatedly, which made the reward flow look stuck. Level-up
  choices now retain their earned level and show how many choices remain;
  the focused contract and 81-test release gate cover the fix in commit
  `9c451af`.
- Milestone commit `9c451af` was pushed with control record `6dd1a44` and
  deployed on 2026-08-07. The preview
  `https://3edbf5d2.code-quest-lab.pages.dev/` and configured hostname both
  passed production checks; live smoke reached a new Mage, Town, Dungeon 1
  start, `COMBAT Cursed Gallery`, pause/finish, and temporary-profile cleanup
  at the 1078x912 managed browser surface with no error or warning diagnostics.
  The deployed shell SHA-256 is
  `404D82FD0AC5DDF612540B28C13BCAE93FDE5CA05798BAA731C433230B793AEA`.

## Known blockers

- Android build evidence requires an owner-provided JDK, Android SDK/platform
  tools, and Gradle environment; the current machine has no `JAVA_HOME` or
  `java` command.
- iOS build evidence requires an owner-provided Mac/Xcode environment; the
  current Windows machine has no `xcodebuild`.
- Live StoreKit/Google Play work requires owner-created products, IDs, sandbox
  accounts, signing, and platform access.
- Physical-device, legal, commercial-rights, privacy/log, age-rating, school,
  and store-material approvals remain owner actions.

These blockers do not prevent the browser-side Checkpoint 1 work.

## Last verified Git commit

- Current verified code head: `e7871b0` (`Checkpoint recovery-safe gameplay
  milestone`), pushed to `origin/main` after the **113/113** release gate,
  `qa:fast`, build/package audit, native sync, and live browser smoke.
  Checkpoint 1 remains active.

- Current local QA follow-up: `3106820` (`Refresh combat status after final
  enemy defeat`), pushed to `origin/main` on 2026-08-05 after focused and full
  release verification; it is intentionally not a website deployment
  checkpoint.
- Current local QA follow-up: `4747413` (`Point toward hidden offscreen combat
  threats`), pushed to `origin/main` on 2026-08-05; it is intentionally not a
  website deployment checkpoint.
- Current local QA follow-up: `8e165e1` (`Fix route restoration and first
  combat onboarding`), pushed to `origin/main` on 2026-08-05; it records the
  exact-route recovery fix, corrected first-combat guard, and bounded
  off-viewport target finding. It is intentionally not a website deployment
  checkpoint.
- Unreleased local QA hardening: `3e33470` (`Add gated developer invincibility
  cheat`), pushed to `origin/main` on 2026-08-05; it is intentionally not a
  website deployment checkpoint.
- Unreleased local combat fix: regenerating-elite recovery-timer reset;
  committed and pushed to `origin/main` on 2026-08-05 after the focused
  regression and full release verification passed. It is intentionally not a
  website deployment checkpoint.
- Unreleased local hardening: `5db6db5` (`Fix stale session status cleanup`),
  pushed to `origin/main` on 2026-08-05; tests and package sync pass, but this
  minor follow-up is intentionally not a separate website deployment.
- Unreleased local hardening: `e1380c4` (`Harden recovered boss progression QA`)
  restores recovered boss-room exit portals, corrects entrance objectives, and
  adds a gated local summons-clear QA sequence; source contracts, package
  sync, and browser recovery smoke pass. It is not a website deployment
  checkpoint because full Checkpoint 1 remains incomplete.
- Touch-control follow-up `90f4f36` (`Protect touch joystick releases`) records
  the 600x700 overlap fix, its contract, and the bounded local replay. It is
  also not a website deployment checkpoint.
- Open-world discoverability follow-up `c8b50c8` (`Guide Town portal discovery`)
  adds a screen-edge direction arrow for the off-screen Town portal. The
  compact-viewport smoke rendered the cue without adding a menu shortcut; it
  is not a website deployment checkpoint.
- Runtime/milestone: `9c451af` (`Clarify queued level-up choices`)
- Prior stable runtime: `32d83d0` (`Harden page-background save coverage`)
- Control record: `194bcc5` (`Record project checkpoint controls and QA gap`)
- Branch: `main`; milestone commit `e7871b0` records the recovery-safe pause
  handoff and the current GitHub/website checkpoint; the deployment preview is
  `https://a89328df.code-quest-lab.pages.dev/` and the configured hostname is
  `https://code-quest-lab.gov8661682.com/`.
- Baseline tag retained: `code-quest-lab-baseline-2026-08-04`

## Last verified website deployment

- Commit: `e7871b0` (`Checkpoint recovery-safe gameplay milestone`)
- Deployment date: 2026-08-10
- Primary: `https://code-quest-lab.gov8661682.com/`
- Preview: `https://a89328df.code-quest-lab.pages.dev/`
- Current production check: passed on 2026-08-10 for primary and preview

The verified milestone shell includes the recovery-safe pause handoff, existing
Town minimap, versioned profile transfer, grouped readability fixes,
session-only touch target assist, dead-summon boss handoff correction, and
queued level-up clarity. The live smoke reached the profile dashboard, Town,
Dungeon 1 start, `COMBAT Burial Hall`, pause/finish, and cleanup; the tablet
viewport also paused into the Character Menu. Both production checks passed
with no browser diagnostics. The next step is a fresh D1-12 player route and
the remaining touch/device session evidence.

## Exact condition required to advance

Advance to Checkpoint 2 only when every remaining acceptance criterion above is
supported by dated manual evidence, relevant automated tests and a successful
production build; no unresolved P0/P1 issue remains; project status,
changelog, backlog, blockers, and checkpoint records are updated; and the
stable milestone has been committed, pushed, deployed, and live-verified.

Do not advance merely because source code or tests were added. Do not reopen
Checkpoint 0 or repeat the completed creative audit unless a specific regression
or release blocker is documented.
