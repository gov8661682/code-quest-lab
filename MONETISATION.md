# Code Quest Lab - V1 Monetisation Design

Status: shared-core and development adapter implemented; no live products or
transactions (2026-08-04)

## Principles

Monetisation must be transparent, optional, age-appropriate, and compatible with 13-17-year-old users. The game must remain fun and meaningfully playable without paying. There are no ads, behavioral trackers, loot boxes, paid random rewards, consumable currency, subscriptions, energy timers, artificial scarcity, daily streak pressure, or pay-to-win advantages in V1.

## Proposed product

- Free introduction: first launch, profile creation, Town, onboarding, and the locked V1 introduction/dungeon slice.
- Premium product: one permanent, non-consumable full-game unlock covering the completed V1 scope (the current Dungeon 1-8 release route).
- Suggested owner-review range: approximately US$2.99-US$5.99 equivalent, with platform-localized prices set by the owner.
- Placeholder identifier: `codequestlab.full_unlock`; this is not a live product ID.
- Browser: the public build shows the transparent unlock surface but makes no payment request. A separately reviewed web adapter may be added only after the owner selects a legitimate provider and completes security/privacy/legal review.
- iOS: StoreKit adapter only; the game core must not know StoreKit APIs.
- Android: Google Play Billing adapter only; the game core must not know BillingClient APIs.

The shared-core boundary is documented in `platform/ENTITLEMENT_CONTRACT.md`.
The current game accepts only a verified adapter result and keeps the verified
entitlement cache separate from character progression. With no adapter present,
the browser remains a complete free-preview build and does not pretend that a
purchase occurred.

The Capacitor shell has a fail-closed discovery seam for a native
`CodeQuestEntitlements` plugin. The seam maps iOS to StoreKit and Android to
Google Play Billing, but it remains inert until a corresponding native plugin
is registered. `platform/dev-entitlement-adapter.mjs` is a test-only,
non-purchasing adapter; it is not imported by the public shell and is excluded
from `dist\`.

## Purchase flow

1. The player reaches a clearly labeled premium information screen.
2. A parent gate is shown before the purchase action or any external purchase/support link.
3. The platform store presents the product name, price, and one-time nature of the unlock.
4. A verified completed purchase grants the entitlement and records the last verified state locally.
5. The UI confirms what is unlocked and does not use countdowns, urgency, guilt, or pressure.

The game must not tell a student to bypass a school, parent, store, or device restriction. It must not use web redirects for digital purchases in normal gameplay.

## Restore, offline, refund, and failure behavior

- Restore is always available behind the same parent-controlled settings area and is safe to repeat.
- Restore and purchase failures leave the existing save untouched and explain that no charge was confirmed by the app.
- A verified entitlement may be cached for offline play; an unverified production flag must not grant a new entitlement.
- When a platform later reports refund, revocation, or invalidation, premium access is removed on the next verified check while local progress remains intact.
- Pending, cancelled, interrupted, and duplicate purchase callbacks are idempotent.
- A separately injected sandbox/test adapter may simulate granted, denied, pending, restored, revoked, and offline states without payment; the public build does not expose a production unlock toggle.

## Required test cases

- Parent gate pass/fail/cancel and repeated attempts.
- Purchase success, decline, cancellation, pending result, duplicate callback, and store-unavailable state.
- Restore success, no purchase found, revoked purchase, offline restore, and app restart after purchase.
- Free user cannot access premium content by editing a local save flag in a production build.
- Premium user never loses save data when entitlement verification fails.

## Owner actions

The owner must confirm final product IDs, price, tax/business setup, regional availability, refund/support wording, platform accounts, and sandbox testers. Codex must not create products or make purchases.
