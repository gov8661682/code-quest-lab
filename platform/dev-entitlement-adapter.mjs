// Development-only entitlement adapter.
//
// This module is intentionally not copied into dist/ and is never imported by
// the public game shell. It gives browser/CI tests a non-purchasing store
// boundary with the same result shape as the future platform adapters.

export const DEVELOPMENT_PRODUCT_ID = 'codequestlab.full_unlock';

const VALID_STATUSES = new Set([
  'owned',
  'not_owned',
  'revoked',
  'pending',
  'unavailable'
]);

function normalizeStatus(value, fallback) {
  const status = String(value || '').toLowerCase();
  return VALID_STATUSES.has(status) ? status : fallback;
}

function makeResult(productId, expectedProductId, status) {
  const requestedProductId = String(productId || '');
  const productMatches = requestedProductId === expectedProductId;
  const normalizedStatus = productMatches ? status : 'unavailable';
  return {
    productId: requestedProductId,
    status: normalizedStatus,
    verified: productMatches && normalizedStatus !== 'unavailable',
    source: 'web'
  };
}

/**
 * Create a deterministic, non-purchasing adapter for development and tests.
 *
 * `purchaseStatus` and `restoreStatus` model store outcomes; they do not
 * charge, contact, or redirect to a store. The returned adapter is marked
 * `developmentOnly` so a caller can reject it in a production shell.
 */
export function createDevelopmentEntitlementAdapter(options = {}) {
  const productId = options.productId || DEVELOPMENT_PRODUCT_ID;
  if (productId !== DEVELOPMENT_PRODUCT_ID) {
    throw new Error(`Development adapter only supports ${DEVELOPMENT_PRODUCT_ID}`);
  }

  let state = normalizeStatus(options.initialStatus, 'not_owned');
  const purchaseStatus = normalizeStatus(options.purchaseStatus, 'owned');
  const restoreStatus = normalizeStatus(options.restoreStatus, state);

  const result = (requestedProductId, status = state) => makeResult(
    requestedProductId,
    productId,
    status
  );

  return {
    source: 'web',
    enforceProductionEntitlement: true,
    developmentOnly: true,

    async getEntitlementState({ productId: requestedProductId } = {}) {
      return result(requestedProductId);
    },

    async purchase({ productId: requestedProductId } = {}) {
      if (String(requestedProductId || '') !== productId) {
        return result(requestedProductId, 'unavailable');
      }
      state = purchaseStatus;
      return result(requestedProductId);
    },

    async restore({ productId: requestedProductId } = {}) {
      if (String(requestedProductId || '') !== productId) {
        return result(requestedProductId, 'unavailable');
      }
      state = restoreStatus;
      return result(requestedProductId);
    },

    // Test-only state control. Production adapters must derive state from the
    // platform store and must not expose a local entitlement toggle.
    setState(nextStatus) {
      state = normalizeStatus(nextStatus, 'unavailable');
      return result(productId);
    }
  };
}
