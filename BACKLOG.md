# Code Quest Lab - Backlog

Updated: 2026-08-05

These items are intentionally outside the active checkpoint and the locked V1
route unless a release-critical defect or an explicit scope decision promotes
one. They must not be used to reopen completed work.

## Joey creative parity (preserved, not silently simplified)

- Complete, balance, and device-test Dungeons 9-16 and their source-resident
  boss, reward, dialogue, progression, and save paths before promoting any of
  them into a release surface. The V1 guard remains in force.
- Restore Joey's four additional classes in isolated parity milestones: Ranger,
  Necromancer, Alchemist, and Paladin, including exact named skills, resources,
  passives, skill trees, class gear, set bonuses, materials, balance, and
  end-to-end playability.
- Carry Joey's D16 Phase 4 Pure Corruption attack families and the complete
  second-journey/Last Light experience through a dedicated endgame parity and QA
  milestone.
- Reconcile the Smelter screen, recipe data, costs, save behavior, and release
  navigation before exposing it again; never ship a contradictory “no recipes”
  placeholder while recipe data is active.
- Correct future stale representation only when a specific source comment is
  misleading; do not rewrite creative behavior during documentation work.

## Deferred architecture and optional improvements

- Modularize the 55k-line HTML into data, core, rendering, input, UI, storage,
  audio, and platform packages after parity tests and a scoped migration plan
  exist.
- Add controller support after keyboard and touch input are stable.
- Add optional cloud backup only after offline saves are reliable and a privacy
  review approves the data model; no cloud identity is planned for V1.
- Add full input remapping, high-contrast presets, and further accessibility
  options after the current release-critical accessibility pass.
- Add post-release content only after V1 audits remain stable.

## Guardrail

The highest-priority work is always the unmet acceptance criterion in
`CURRENT_CHECKPOINT.md`. Small balance, wording, and cleanup ideas should be
grouped into a meaningful checkpoint rather than deployed individually.
