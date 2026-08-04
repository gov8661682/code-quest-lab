# Code Quest Lab - Decisions

Updated: 2026-08-04

## D-001 - Preserve the existing game

The current HTML/Canvas game is the canonical baseline. Work proceeds incrementally. No full rewrite or broad source split is allowed until parity tests protect the gameplay loop, save format, and visible navigation.

## D-002 - Offline-first, local-only V1

No accounts, backend, cloud saves, chat, multiplayer, analytics, or advertising are required for V1. This reduces privacy, reliability, and store-review risk. Local saves need backup and corruption recovery because browser/native storage can be cleared or interrupted.

## D-003 - V1 commerce model

Use one non-consumable full-game unlock behind a parent gate. Keep store calls in platform adapters and provide a development entitlement mode. Browser builds do not invent a separate payment path.

## D-004 - Child-safe defaults

The primary audience is secondary-school students approximately 13-17. This is not an automatic Kids-category decision, but the product remains teen-safe by default: no behavioral ads, no chat, no unnecessary permissions, no loot boxes, and no manipulative purchase flow.

## D-005 - No placeholder release surface

Unfinished systems are either completed, hidden from the V1 navigation, or clearly labeled as post-release content. Disabled buttons that look like promised V1 features are not acceptable.

## D-006 - No unverified asset acquisition

Use only original/procedural assets or assets with a recorded commercial license. Do not download third-party game art, music, fonts, or branding without an explicit provenance record.

## D-007 - Provisional application identity

Display name remains `Code Quest Lab`. Recommended provisional bundle identifier is `com.gov8661682.codequestlab`, pending owner confirmation and availability checks. This is not a trademark or identifier clearance.

## D-008 - Genuine but optional learning support

The game remains a fantasy action RPG first. Learning Support may explain patterns, sequencing, planning, decomposition, optimization, conditions, loops, cause-and-effect, and debugging after play, but it must not turn the adventure into a forced quiz or make unsupported claims about programming or academic outcomes.

## D-009 - Tablet session design

Landscape tablet touch is the primary path. V1 targets natural 10-30 minute sessions with checkpoints, autosave, pause/resume, suspension recovery, session summaries, next-step suggestions, and explicit stopping points. Engagement comes from mastery and fun, not streaks, energy, scarcity, or pressure.
