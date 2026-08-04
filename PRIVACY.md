# Code Quest Lab - Privacy Design

Status: implementation direction; not a legal privacy policy (2026-08-04)

## Data-minimisation position

V1 is offline-first and self-contained. The game does not require an account, login, email address, name, social identity, classroom connection, or cloud save. The core game should not request or use camera, microphone, precise location, contacts, advertising ID, or other unnecessary device permissions.

## On-device data

The current game stores local profile and gameplay state such as class, progression, inventory, equipment, settings, achievements, and recovery data in browser/native local storage. It may store player-entered equipment names; these are not required to be real names and the UI should not ask for personal information. Manage Data provides local deletion. A backup copy is kept locally to recover from an interrupted save and is deleted with the character data.

No on-device save should be transmitted to a server in V1. There is no cloud-sync or cross-device identity model.

## Network and third parties

Normal gameplay should work without a network and should not open external browser windows. The static web shell may be fetched from the project host and cached by the service worker. The native shells do not need external network access for the core game. Capacitor's generated Android template currently declares `INTERNET`; this is not used by game code and remains an owner-reviewed native permission decision before release. No third-party analytics, ad SDK, social SDK, chat service, or behavioral tracker is planned.

The host or CDN may have ordinary infrastructure request logs outside the game code. Whether those logs are retained, what data they contain, and whether a privacy policy must describe them are owner/vendor questions; do not claim zero data collection until the host configuration is reviewed.

## Teen and managed-device safeguards

- No profiling of students or behavioral advertising.
- No precise location, contacts, camera, microphone, or background tracking.
- No open chat, user-generated content, or external community links in normal play.
- No purchase prompt without a parent gate and clear one-time pricing.
- No attempt to bypass MDM, parental controls, school restrictions, network filters, or app review.
- Graceful behavior when storage, network, audio, or permissions are unavailable.

## Platform disclosure work

Before store submission, the owner must review the final native dependencies and complete Apple App Privacy and Google Play Data Safety responses. If billing or platform services transmit identifiers or purchase information, those disclosures must reflect the actual implementation. This document does not determine legal compliance under COPPA, GDPR, or any other law.

## Owner decisions required

- Confirm the hosting/CDN log retention and privacy-policy treatment.
- Provide the public privacy-policy URL/text.
- Approve the final data inventory after Capacitor, StoreKit, and Play Billing are integrated.
- Confirm whether any school deployment requires additional consent, filtering, or device-management documentation.
