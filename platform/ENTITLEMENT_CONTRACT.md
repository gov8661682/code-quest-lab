# Code Quest Lab - Entitlement Adapter Contract

Status: shared-core contract; native discovery seam and test adapter are present,
but adapters are not yet connected to live stores
(2026-08-04)

The game core in `index.html` owns product messaging, the parent-confirmation
surface, premium-content access checks, and the verified local cache. It does
not import StoreKit, Google Play Billing, or a browser payment SDK.

## Registration

A platform shell may register an adapter before the game boots:

```js
window.CodeQuestPlatform = {
  entitlements: {
    source: 'storekit', // 'storekit', 'googleplay', or approved 'web'
    enforceProductionEntitlement: true,
    getEntitlementState: async ({ productId }) => ({
      productId,
      status: 'owned', // owned, not_owned, revoked, pending, or unavailable
      verified: true,
      source: 'storekit'
    }),
    purchase: async ({ productId }) => ({
      productId,
      status: 'owned',
      verified: true,
      source: 'storekit'
    }),
    restore: async ({ productId }) => ({
      productId,
      status: 'owned',
      verified: true,
      source: 'storekit'
    })
  }
};
```

The example is a shape only, not a grant or test entitlement. Real adapters
must call the platform store, verify the product ID and transaction state, and
return `verified: true` only after the platform's documented result is valid.

## Core safety rules

- Product ID is `codequestlab.full_unlock` until the owner supplies final platform IDs.
- A local save flag, URL parameter, DOM edit, or unverified callback must never grant production access.
- `source` must identify the verified store boundary: `storekit`, `googleplay`, or an owner-approved `web` adapter.
- Purchase and restore callbacks must be idempotent and must preserve the save when verification fails.
- `not_owned` or `revoked` clears the verified cache but does not delete progression.
- A verified entitlement may remain usable offline until the next platform verification; lack of connectivity must not erase a valid save.
- Web payment code, if approved later, must be a separate adapter and must not be loaded by the game until its privacy, security, and legal review is complete.

The shared core now rejects results for any product other than
`codequestlab.full_unlock`. `tests/entitlement-contracts.test.mjs` executes the
shipped boundary against mocked adapters for ownership, duplicate callbacks,
decline/pending, revocation, parent gating, adapter errors, and enforced
free-user denial. These tests do not simulate a payment or create production
access without a verified adapter result.

## Native discovery and development mode

The shared shell has a fail-closed Capacitor discovery seam for a native plugin
named `CodeQuestEntitlements`. It only registers on iOS or Android after
Capacitor reports that plugin as available, maps iOS to `storekit` and Android
to `googleplay`, and never overwrites an adapter explicitly supplied by the
platform shell. No plugin means free-preview mode.

`platform/dev-entitlement-adapter.mjs` is a test-only, non-purchasing adapter.
It is intentionally excluded from `dist/` and can model owned, not-owned,
pending, revoked, and unavailable results for CI or an owner-controlled review
build. It must never be imported by the public browser shell or exposed as a
production unlock toggle.

## Required adapter tests

Test success, decline, cancellation, pending, duplicate callbacks, store
unavailable, restore success, no purchase, revocation, offline launch after a
verified purchase, and app restart. Test a free user against a modified local
save and confirm that production access remains denied when no verified store
result exists.
