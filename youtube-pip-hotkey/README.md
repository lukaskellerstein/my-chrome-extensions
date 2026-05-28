# YouTube PiP Hotkey

Toggle Picture-in-Picture on YouTube with **Option+G** (`⌥G`), reliably — no
AppleScript, no Chrome restarts.

## Why this exists

Triggering PiP through Chrome's AppleScript interface (`execute javascript ...`)
is flaky: Chrome's scripting interface periodically wedges (reports
`count of windows = 0`) and only a full Chrome restart fixes it. This extension
moves the trigger *into the page*, where a real `keydown` carries the user
activation that `requestPictureInPicture()` requires — so it works every time.

## Install (one-time)

1. Open `chrome://extensions`.
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder
   (`.../my-chrome-extensions/youtube-pip-hotkey`).

It stays loaded across Chrome restarts. To pick up edits to `content.js`, click
the reload ↻ icon on the extension card (and reload any open YouTube tab).

## Usage

On any YouTube tab, press **Option+G** to toggle PiP on the current video.

## Window pinning

A Hammerspoon watcher (`~/.hammerspoon/init.lua`) detects the
`Picture in Picture` window and pins it to the top-right, floating + sticky
(450×300) so it follows you across spaces. Generic window-pinning lives on
**Option+Shift+G**.
