# X4 Minimal

A reading-first minimalist interface experiment for the Xteink X4 Pro, with optional Wi-Fi-only text messaging.

Demo: https://msaavedra-ar.github.io/x4minimal/

## Current status
v0.2 interface implemented for review, with reading-first navigation, high-contrast monochrome styling and no animations. The published GitHub Pages demo remains v0.1 until the pull request is merged and Pages deploys. **No real WhatsApp connection.**

- Library with an original three-page sample, session-only reading position and text size controls (18–28 px).
- Fictional conversations with independent session-only drafts, explicit labels, a 500-character composer and local simulated sending. Enter adds a new line; the button adds the message to the demo.
- Manual simulated sync. The proposed 15-minute interval is explanatory text; no polling, timer, background wake or network messaging exists.
- No external fonts, scripts, dependencies, trackers or backend. Everything works locally after the page assets load. Offline reload is not guaranteed: no service worker or offline cache is installed.
- Drafts, reading position, text size and messages reset on reload. Do not enter private messages into this demonstration.

## Local development and validation

Use the existing checkout and serve the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

No build or dependency installation is required for the app. `index.html`, `styles.css` and `app.js` use relative URLs compatible with GitHub Pages project paths.

For automated browser checks, with Playwright Python and Chromium installed, run in another terminal:

```sh
python3 tests/smoke.py
# Or: python3 tests/smoke.py http://127.0.0.1:8000
```

The test uses `/usr/bin/chromium`. It exercises reading and page boundaries, font size, per-conversation drafts, whitespace rejection, literal HTML input, local sending, loss of connectivity, simulated sync and session reset at 320, 360, 430 and 800 CSS pixels. It also checks horizontal overflow and JavaScript errors, and rejects external requests.

Manual release checks on iPhone Safari: reading/navigation in portrait and landscape, text zoom, visible keyboard and multiline composing, VoiceOver labels and focus order, offline behavior after load, and all three assets loading from the GitHub Pages subpath. Safari on a real iPhone, Pages deployment and physical e-ink behavior have not been validated for v0.2. A 4.3-inch diagonal alone does not establish pixel resolution or hardware compatibility.

## Vision
A compact, distraction-free e-reader where reading comes first and text messaging is secondary. Wi-Fi only, no SIM or mobile data. A 15-minute sync interval is a goal, not a verified device capability.

## Proposed approach
- Iterate on static HTML/CSS/JS and test on Safari.
- Research X4 Pro hardware and CrossPoint firmware before implementing device integration.
- Assess a separate secure messaging bridge, because GitHub Pages cannot host a backend.
- Validate power usage, scheduled wake and privacy before any real messaging integration.

## Codex handoff
Read [AGENTS.md](AGENTS.md) and [docs/ROADMAP.md](docs/ROADMAP.md) before working. Current milestone: review v0.2 and validate it on iPhone Safari and GitHub Pages before declaring release completion. Collaborate in Spanish (Argentina).
