# chrome-tab-mover

Minimal Chrome extension that adds four keyboard shortcuts:

- `Ctrl+Left` / `Ctrl+Right` — switch focus to the previous / next tab (wraps around)
- `Ctrl+Shift+Left` / `Ctrl+Shift+Right` — move the active tab one position to the left / right

On macOS the binding uses `MacCtrl` (the physical Ctrl key, not Cmd), so the same finger movement works on Linux and macOS.

Trade-off: while the extension is enabled, `Ctrl+Left/Right` in Chrome text inputs and the URL bar will switch tabs instead of moving the cursor word-by-word.

## Install (unpacked)

1. Open `chrome://extensions/` in Chrome.
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder.
4. Open `chrome://extensions/shortcuts` to verify or change the key bindings.

## Files

- `manifest.json` — extension manifest (MV3), declares the two commands.
- `background.js` — service worker that listens for the commands and calls `chrome.tabs.move`.
