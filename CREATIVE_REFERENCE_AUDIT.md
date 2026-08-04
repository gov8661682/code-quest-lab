# Joey Creative Reference Audit

Reviewed: 2026-08-04

## Reference identity

- Reference file: `F:\Downloads\20260804_latest output.txt`
- Reference type: complete self-contained HTML game output, not a prose design note
- Reference size: 4,785,331 bytes
- Reference line count: 80,806 lines
- Reference SHA-256: `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB`
- Current repository source: `index.html`
- Current source SHA-256 at review: `1F7B0ED475419ABD0E05829BF2D11C241DC30746EF18A6993BCAABE43969C503`
- Post-audit source SHA-256 after the non-behavioral comment correction and upstream accessibility merge: `F4A12AD085F8AF3E7272CFDB03AEAC82DFA6F6205836270A192D2A8B1D085FD3`
- Current repository baseline: `052a517` / `code-quest-lab-baseline-2026-08-04`

The reference is newer and substantially larger than the current release-working tree. It is therefore the authoritative creative reference for Joey's ideas in this audit, but it is not merged wholesale into the current source. The reference itself contains comments such as `backbone-only`, phased implementation notes, and intentionally unfinished surfaces; code presence is not treated as proof of a tested playable feature.

## Executive conclusion

Joey's world, character concepts, named abilities, dungeon themes, boss identities, dialogue, and multi-ending structure should be preserved. The current project has a safe release boundary and a stronger release/documentation workflow, but it is not yet at creative parity with the latest output.

The largest verified parity gap is the absence of Ranger, Necromancer, Alchemist, and Paladin from the current selectable class/runtime surface. Their skills, resources, passives, skill-tree branches, class-restricted equipment, and related materials are present in Joey's reference but not in the current source. The latest reference also extends the final Pure Corruption encounter with seven additional Phase 4 attack families that are not in the current source.

The current source does already contain much of the later dungeon and boss work that older comments describe as reserved. Dungeons 9-16 remain intentionally hidden from the V1 release surface because complete route, reward, progression, dialogue, storage, and hands-on evidence is still not established. This is a release-evidence boundary, not permission to discard Joey's later content.

## Content already preserved in the current project

The following creative direction is represented in the current source or release records and must remain intact:

- The fantasy action-RPG framing, Town hub, character profiles, mastery progression, equipment, crafting, merchant, dungeon routes, procedural rooms, combat, bosses, and original visual language.
- The four currently selectable classes: Barbarian, Mage, Rogue, and Druid, including their existing base/core/movement/ultimate skill families and class-specific combat resources.
- The named dungeon arc from The Forgotten Depths and The Fallen Kingdom through The Shadow Realm, The Corrupted Barbarian Village, The Arcane Citadel, The Dead Druidic Forest, and The Black Market.
- Source-resident later regions and their names: Vow Breaker's Castle, The Abandoned Laboratory, Ranger Watchtowers, Necromancer's Stolen Graveyard, Realm of Space, Realm of Time, Realm of Life, and Realm of Pure Corruption.
- The named later bosses and source dispatches: The Oathbreaker King, The Alchemist, the Corrupted Ranger Captain, the Corrupted Necromancer, Corruption of Space, Corruption of Time, Corruption of Life, Pure Corruption, and the Pure Corruption rematch.
- Bob's normal conversations, hidden friendship chain, final secret conversation, pet interaction, and second-journey recognition. The `BOB_CONVERSATIONS`, `BOB_HIDDEN_CHAIN`, `BOB_FINAL_CONVO`, and `BOB_RECOGNITION_CONVO` content compares equal after whitespace normalization.
- The Dungeon 16 choice, bad ending, good ending, purification journey, second encounter, and “Last Light” ending framework. The `PC20_*`, `PC_ENDING_LINES`, `PURIFICATION_FAREWELL_LINES`, and `BAD_ENDING_PURGE_LINES` content compares equal after whitespace normalization.
- The project direction of private local saves, offline-capable browser play, tablet controls, optional learning support, and non-manipulative engagement. These are product constraints around the game, not replacements for its story or systems.

## Verified parity gaps and outdated representation

### Classes, skills, resources, and passives

Joey's reference has eight class IDs in `CLASS_DATA` and `CLASS_ORDER`; the current source has four. The missing reference classes are:

| Class | Reference identity | Reference skill families | Current status |
| --- | --- | --- | --- |
| Ranger | Precise hunter who marks prey and strikes from range | Longbow Shot, Twin Shot, Ricochet Arrow, Hunting Knife; Rain of Arrows, Explosive Arrow, Beast Companion, Sniper's Focus; Grappling Hook, Roll, Wind Step, Eagle Leap; Volley Barrage, Spirit Eagle, Avatar of the Hunt, Nature's Wrath | Not selectable or wired in current source |
| Necromancer | Bone-and-shadow master commanding an undead legion | Bone Slash, Bone Spear, Soul Bolt, Siphon Touch; Bone Prison, Raise Golem, Corpse Explosion, Blood Nova; Skeleton Launch, Wraith Walk, Grave Tunnel, Shadow Dash; Army of the Dead, Bone Storm, Reaper Form, Plague of Souls | Not selectable or wired in current source |
| Alchemist | Chemical-warfare specialist using fire, acid, and poison | Acid Flask, Chemical Injector, Fire Bomb, Toxic Spray; Corrosive Cloud, Chain Reaction, Mutation Serum, Homunculus; Rocket Flask, Smoke Bomb, Chemical Slide, Emergency Injection; Laboratory Disaster, Philosopher's Stone, Plague Lord, Ultimate Creation | Not selectable or wired in current source |
| Paladin | Holy warrior combining steel and radiant judgment | Purification Slash, Lance Stab, Smash of Creation, Shield Parry; Sword of the Sky, Lance Flurry, Unbreakable Vow, Shield Throw; Sword Dance, Lunge, Ground Smash, Complete Defense; World Cutting Slash, Holy Mount, Heaven's Fury, Fortress | Not selectable or wired in current source |

The reference also adds distinct HUD/runtime resources for Faith, Chemicals, Focus, Necromancer Souls, and a class-passive meter. `CLASS_PASSIVES` defines Battle Frenzy, Arcane Overflow, Assassin's Instinct, Nature's Blessing, Hunter's Instinct, Undead Legion, Chemical Mastery, and Divine Conviction.

Implementation maturity matters here. Joey's own comments identify Ranger's Hunter's Instinct as the fully implemented passive reference while describing several other passive effects and some skill-tree effects as backbone or phased work. The parity roadmap must preserve the exact names and mechanics as design intent, then promote each class only after its runtime behavior, HUD, save migration, balance, and playability are verified.

### Equipment, sets, and materials

The current source supports class-restricted gear for the four existing classes. Joey's reference expands `classReq` to all eight classes, expands `SET_DEFS` from 10 to 52 named sets, and adds 42 class-set identities that are absent from the current source:

- Ranger: Alpha's Bond, Bloodmoon Pack, Eternal Pack, Deadeye's Mark, Runner's Volley, Chain Detonator, Scorched Earth, Tempest Dance, Whisperwind, and Unbroken Vine.
- Necromancer: Ossuary of the Bone King, Legion of the Eternal Skeleton, Eternal Soulbinder, Harbinger of Lost Souls, Crimson Reaper, Blood Ascendant, Crimson Immortal, Avatar of Death, Lord of the Grave, and Grave Sovereign.
- Alchemist: Corrosion Master, Rotting Harvest, Volatile Combustion, Overcharged Ordnance, Symbiotic Formula, Endless Assembly Line, Grand Homunculus, Toxic Frenzy, Phantom Toxin, and Perfect Mutation.
- Paladin: Aegis of the First Guardian, Earthshaker of Creation, Judgment of the Divine Blade, Blade of the First Light, Holy Lancer, Spear of the Holy Cavalier, Divine Bulwark, Holy Bastion, Aegis of the Avenger, Wrath of the Earthforged, Judgment of Creation, and Titan of the First Forge.

The reference's additional material identities include Adaptive Alloy, Bastion Alloy, Battle Alloy, Blood King's Alloy, Bulwark Alloy, Chrono Alloy, Colossus Steel, Divine Alloy, Dragon Steel, Endurance Alloy, Eternal Crystal, Executioner's Alloy, Fortress Alloy, Hunter Alloy, King's Alloy, Leviathan Steel, Phantom Alloy, Phoenix Crystal, Precision Alloy, Runeforged Alloy, Shadow Alloy, Storm Alloy, Titan Alloy, Void Alloy, and War Alloy. These must not be silently replaced with generic gear or removed for implementation convenience.

### Dungeons, bosses, and progression

The comparison found a representation problem rather than a simple missing-boss problem:

- The current source contains dispatch and spawn paths for D9's Oathbreaker King, D10's Alchemist, D11's Corrupted Ranger Captain, D12's Corrupted Necromancer, D13's Corruption of Space, D14's Corruption of Time, D15's Corruption of Life, and D16's Pure Corruption/rematch. The corresponding first seven boss function bodies compare equal between the reference and current source after trimming; the D16 spawn blocks differ because the reference adds later Phase 4 state.
- Several current `DUNGEON_DEFS` and dungeon-section comments still call D9, D10, D11, D12, or D15 reserved, environment-only, or future-boss content. They are stale source documentation and should be corrected to say that the boss implementation is source-resident while the V1 release surface and full evidence remain gated.
- The current V1 guard intentionally hides Dungeons 9-16 from selection, waypoints, saved-world resume, and boss-exit progression. Keep that guard until each route, boss, reward/material table, progression handoff, dialogue, save behavior, and hands-on desktop/tablet path is complete.
- Joey's reference explicitly describes the D15 Corruption of Life pass as boss/AI/phase/summoning/death work without rewards, materials, dialogue, or D16 progression changes. This is an important example of why “boss function exists” must not be confused with “dungeon release-ready.”
- D16's first encounter, purification journey, and rematch remain the core endgame story. The latest reference adds Phase 4 attack families represented by `pcCleaveSpin`, `pcCrown`, `pcWarShock`, `pcBarrage`, `pcSnare`, `pcTendril`, and `pcStorm`; these are absent from the current source and belong in a later endgame parity milestone.

### Story, dialogue, and original ideas

The principal dialogue and ending content is already preserved. No rewrite or simplification is authorized merely to make the code easier to maintain. The parity work must retain:

- Bob's quiet trust-building, hidden chain, final secret, pet idea, and subtle second-journey recognition.
- The first Pure Corruption choice and the good/bad consequences.
- The purification farewell lines for every prior boss.
- The rematch, “Last Light,” and the idea that the player's second journey changes what the world remembers.

The latest output also restores an active Smelter button while its visible Smelter screen says that no recipes are known, even though the same file contains a 55-material recipe table and the current source retains the recipe engine and renderer but removes the active hub button. Keep the Smelter as Joey's original idea, but do not re-expose an internally contradictory placeholder. Promote it only when the UI, recipe data, costs, save behavior, and tests agree.

## Parity decisions

1. Do not copy `20260804_latest output.txt` over `index.html` or merge the monolithic files wholesale. The current release shell, V1 guard, save boundaries, security headers, public review pages, and tests must remain controlled.
2. Preserve Joey's names, class identities, skill names, boss names, dungeon themes, dialogue, endings, and distinctive mechanics. Refactoring may change code organization, not creative meaning.
3. Treat the latest output as a creative/content ledger and implementation reference. Treat comments that say `backbone-only`, `Phase`, `reserved`, or `future` as maturity signals requiring verification.
4. Keep the V1 D1-8 release boundary. The latest reference does not automatically expand V1, and source-resident D9-16 content is not public release evidence.
5. Add the four missing classes in isolated, testable milestones. Each class must cover selection/save migration, HUD/resource behavior, base skills, higher-tier skills, skill-tree effects, equipment/loot, balance, and browser play before it is considered complete.
6. Correct stale current-source comments that misdescribe already-present D9-16 boss dispatches, without changing gameplay behavior during the audit.
7. Treat D16 Phase 4 expansion, coherent Smelter exposure, and complete later-dungeon rewards/progression as separate milestones rather than hidden side effects of the class work.

## Roadmap acceptance gates for creative parity

Every parity milestone must have:

- exact creative names and mechanics checked against this reference;
- pure logic/contract coverage for save, selection, costs, cooldowns, progression, and failure paths;
- a fresh-profile browser play path at desktop and tablet-sized viewports;
- no regression to the current V1 D1-8 route or privacy/offline boundaries;
- updated roadmap, status, changelog, and known-issue records;
- a major-milestone GitHub and website checkpoint only after the tests, production build, and live verification are green.

## Owner decisions still open

- Whether the four new classes are intended for the next public release or remain post-V1 content. The current plan assumes post-V1 parity work and keeps V1 locked to D1-8.
- Whether the next class parity milestone should begin with Ranger (the reference's most complete new-class implementation) or follow a different product priority.
- Final approval of the age-appropriate presentation and school-facing wording for darker Necromancer, corruption, and endgame material before those regions become release-visible.

Until those decisions change the scope, the safe implementation order is: audit and ledger (complete) -> isolated parity milestone -> tests/build/playability -> checkpoint -> next unfinished Goal item.
