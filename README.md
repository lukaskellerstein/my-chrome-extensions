# my-chrome-extensions

A collection of small Chrome (Manifest V3) extensions.

| Extension | Description |
| --- | --- |
| [chrome-tab-mover](./chrome-tab-mover) | Switch the active tab or move its position via keyboard shortcuts. |
| [youtube-pip-hotkey](./youtube-pip-hotkey) | Toggle Picture-in-Picture on YouTube with a hotkey. |

## Install from a release

1. Go to the [Releases](../../releases) page and download the `.zip` for the extension you want.
2. Unzip it to a folder you'll keep (Chrome loads the extension from this folder, so don't delete it).
3. Open `chrome://extensions` and enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the unzipped folder.

## Publishing a new release

Releases are built automatically by GitHub Actions ([`.github/workflows/release.yml`](./.github/workflows/release.yml)).
Bump the `version` in the relevant `manifest.json`, then push a version tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow zips every extension folder (named `<extension>-v<version>.zip`) and attaches
the zips to a new GitHub release for that tag.
