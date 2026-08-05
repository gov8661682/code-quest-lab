# Code Quest Lab - Version 1 Scope Lock

Scope locked: 2026-08-04; open-world-compatible direction added 2026-08-05

This is the release-candidate scope. New ideas belong in `BACKLOG.md` unless they are required for data safety, store policy, core usability, security, or purchase reliability.

## In scope

- A playable browser build served from the existing single-page Canvas game.
- A landscape, touch-first tablet experience for approximately 13-17-year-old secondary-school students, with keyboard/mouse support as a secondary path.
- A maintainable release foundation around the existing game: deterministic smoke checks, static production validation, offline web install metadata, and a documented migration path toward modules.
- First-launch profile creation and profile selection.
- Existing hero classes, Town hub, the validated V1 dungeon path, combat, progression, equipment/crafting systems that are actually enabled, achievements, settings, pause/resume, and game-over recovery.
- An open-world-compatible first slice: Town as an explorable home region, connected tested entrances/waypoints, clear destination context, persistent safe return locations, and a truthful World Atlas/route presentation as those surfaces are implemented. The V1 content boundary remains Dungeons 1-8.
- Local-only saves with character migration and one recoverable backup save.
- Desktop keyboard/mouse input and phone/tablet touch controls with safe-area handling.
- Reliable 10-30 minute session flow: clear objective, checkpoint/autosave, pause/resume, safe recovery after suspension or forced closure, session summary, next-step suggestion, and an explicit stop point.
- Optional Learning Support in the existing library/summary surfaces: authentic explanations of patterns, sequencing, planning, optimization, conditions, loops, decomposition, cause-and-effect, and debugging without forced lessons or quizzes.
- Managed-device-safe behavior: no external redirects during normal play, no account creation, no login, no social/chat features, no user-generated content, and no camera, microphone, location, contacts, or other unnecessary permissions.
- Procedural/original presentation assets already in the repository, with provenance recorded.
- Capacitor preparation for iOS and Android, with platform purchase adapters separated from game logic.
- One non-consumable premium unlock abstraction, development entitlement mode, restore flow, and parent gate. Live product creation and live transactions are out of scope for this workspace session.
- V1 release route boundary: the validated navigation and boss-exit chain currently ends at Dungeon 8 (The Black Market); Dungeons 9-16 remain source-resident but hidden as post-release content until their routes, bosses, rewards, and evidence are complete.
- Joey creative-reference boundary: `CREATIVE_REFERENCE_AUDIT.md` records the newer Ranger, Necromancer, Alchemist, Paladin, later-dungeon, equipment, Smelter, and Pure Corruption content. That reference does not automatically expand V1; its original names and ideas are preserved in the post-V1 parity backlog.
- Store listing drafts, privacy/data-safety preparation, asset register, licenses record, QA plan, and owner handoff documentation.

## Explicitly deferred or excluded from V1

- Accounts, cloud saves, multiplayer, chat, user-generated content, analytics, behavioral advertising, and live services.
- New dungeons or systems whose source currently describes them as environment-only, reserved for a future boss, or otherwise incomplete. They must be hidden, clearly marked as post-release, or completed and tested before inclusion.
- The disabled Forge Smelter unless it is implemented end-to-end; it must not appear as an unexplained placeholder in the release surface.
- Forced quizzes, long instructional screens, classroom accounts, teacher dashboards, online submissions, social features, daily streaks, energy/waiting systems, artificial scarcity, FOMO prompts, excessive notifications, and rewards that penalize stopping.
- Real Apple or Google products, real payments, signing certificates, store submission, legal acceptance, trademark clearance, or public distribution.
- A full rewrite of the existing game before parity tests exist.
- A seamless infinite world, unrestricted D9-16 access, or a large untested overworld. Open-world foundations are staged behind complete route, save, input, offline, and return evidence.

## V1 acceptance bar

The release candidate must meet every item in `RELEASE_CRITERIA.md`, with no open P0/P1 issue and with every remaining human-only action named in `OWNER_ACTIONS.md`. It must not present future open-world destinations as playable when their travel, saves, rewards, and return paths are not tested.
