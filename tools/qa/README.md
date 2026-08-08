# Fast developer QA

The browser game remains the authority for rendering, pointer delivery, audio,
save storage, and tablet feel. The fast QA layer covers logic that should not
require a normal-speed playthrough.

Run the deterministic representative suite with:

```powershell
npm.cmd run qa:fast
```

The Node tests also run it through `npm.cmd test`. The suite uses fixed seeds
and representative early, mid, and late encounters. It checks attack cycles,
collision, damage, phase transitions, finite summon budgets, victory, loss,
timeout, invincibility, high damage, enemy-free mode, and accelerated time.

## Local browser controls

For a loopback URL such as `http://127.0.0.1:4173/?cql-dev=1`, enter the
following hidden sequences while the game screen is active:

| Purpose | Function-key sequence | Managed-browser fallback |
|---|---|---|
| Invincibility | `F8 F7 F6 F3` | `C Q L I` |
| Clear live boss summons | `F8 F7 F6 F4` | — |
| Cycle time scale 1x/10x/25x | `F8 F7 F6 F5` | `C Q L S` |
| Toggle high damage | `F8 F7 F6 F2` | `C Q L D` |
| Toggle enemy-free mode | `F8 F7 F6 F1` | `C Q L E` |
| Step a live boss phase | `F8 F7 F6 F9` | `C Q L P` |
| Complete the current encounter | `F8 F7 F6 F10` | `C Q L R` |
| Jump to the current route's boss room | `F8 F7 F6 F11` | `C Q L B` |
| Show/hide telemetry overlay | `F8 F7 F6 F12` | `C Q L V` |

The controls are local-web/loopback gated, session-only, and excluded from
profile saves, `.txt` exports, native packages, and public-host activation.
They are for debugging and QA, not player progression or monetisation.

The telemetry snapshot is available in the local browser console as
`window.__cqlDevTelemetry` while the gate is active. It includes the latest
room, boss phase, enemy count, command events, and overlay snapshot. No network
request or external analytics is added.
