# Code Quest Lab - School Review and Allowlisting Notes

Status: prepared for legitimate administrator review; not an instruction to
bypass a block (2026-08-04)

## Review target

- Domain: `code-quest-lab.gov8661682.com`
- Product type: touch-first fantasy action RPG with optional computational-thinking support.
- Intended users: approximately 13-17-year-old secondary-school students, families, and school-managed-device users.
- Core access: no login, account, email, chat, social profile, or personal information required.

## What administrators can inspect

- [About](https://code-quest-lab.gov8661682.com/about/) describes the product and supported surfaces.
- [Educational Purpose](https://code-quest-lab.gov8661682.com/education/) explains the limited, optional learning-support claims.
- [Privacy](https://code-quest-lab.gov8661682.com/privacy/) describes local saves and the infrastructure-log review boundary.
- [Support](https://code-quest-lab.gov8661682.com/support/) gives safe troubleshooting guidance.
- [Contact](https://code-quest-lab.gov8661682.com/contact/) provides the project review route.

The same material is also packaged locally in `dist\` so an administrator can
review the files before a public deployment.

## Network and content boundary

- The site is intended to be served over HTTPS from the dedicated hostname.
- The release package uses first-party HTML, inline game code, local CSS, local SVG assets, a manifest, and a service worker.
- The source CSP limits scripts, styles, images, connections, fonts, media, and frames to the same origin or explicitly local data URLs as documented in `_headers`.
- No advertising network, tracker, chat service, social widget, user-generated-content service, or classroom identity service is required.
- Normal play does not open an external website.
- Local browser storage holds profile and progression data; there is no cloud save in the current web design.

## Legitimate review request template

> Please review and, if appropriate, allow `code-quest-lab.gov8661682.com` for
> the Code Quest Lab web game. The site is an HTTPS static application for
> secondary-school-aged users. It uses first-party static assets, local browser
> storage, and a service-worker app shell. Normal play does not require an
> account, email, chat, advertising, tracking, camera, microphone, location, or
> contacts. The project provides public About, Educational Purpose, Privacy,
> Support, Contact, and School Review pages for inspection. If your policy
> requires a narrower rule or additional documentation, please provide the
> legitimate review path; the project will not attempt to bypass the control.

## Owner review before distribution

- Confirm the final hosting provider, certificate, DNS, and CDN-log treatment.
- Confirm the final content/age rating and school deployment requirements.
- Confirm the public privacy-policy and support URLs.
- Re-run clean-profile, offline, touch, and header checks against the deployed host.
- Keep any allowlisting decision with the school or network administrator.
