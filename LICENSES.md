# Code Quest Lab - Licenses and Third-Party Notices

Updated: 2026-08-04

This file is an inventory, not a legal opinion. The owner must confirm rights before commercial release.

## Project code

The repository does not currently include a project license file or contributor-rights record. Owner confirmation is required for the commercial distribution rights to the existing HTML, artwork code, UI, and audio code.

## Runtime and platform dependencies

- Capacitor core, Android, iOS, CLI, and App plugin are included under their MIT license; the official notices are available from the `@capacitor/*` package metadata and must be retained with any native distribution bundle.
- Browser APIs used by the baseline include Canvas, DOM events, Web Storage, and Web Audio. Platform terms remain applicable.
- StoreKit and Google Play Billing are not integrated yet; record their official notices if and when they are added.

## Fonts and glyphs

The baseline uses system font fallbacks and Unicode emoji/glyphs; no font files are shipped. If a font is bundled later, add its license and notice here.

## Release gate

Do not call the asset/licensing criterion passed until the owner confirms the project code rights and every shipped non-procedural asset has a commercial-use record.
