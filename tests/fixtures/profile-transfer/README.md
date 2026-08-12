# Profile-transfer fixtures

These files are synthetic, device-neutral `.txt` fixtures for the local
`CODE QUEST LAB PROFILE EXPORT` parser. They contain no retained player data,
contact information, account identifiers, or network credentials.

- `legacy-v1-barbarian.txt` is the raw-save format accepted from an earlier
  local build.
- `current-v2-mage-active-run.txt` is the current envelope with durable
  progress, a recoverable backup, and an interrupted Dungeon 1 checkpoint.
- `current-v2-mage-invalid-checkpoint.txt` proves that durable progress stays
  importable while an invalid optional checkpoint is discarded.
- `future-v3-mage.txt` proves that an unsupported future save schema fails
  closed.
- `unsupported-ranger-v2.txt` proves that a class not in the current runtime
  whitelist is not silently remapped.

The fixtures exercise supported save-version boundaries and can be loaded from
another browser origin or test machine without depending on localStorage. They
do not replace real cross-device, native-storage, or baseline-to-release
browser evidence.
