# X4 Minimal — Instructions for Codex

## Mission
Build an e-ink-first, reading-first minimalist experience for the Xteink X4 Pro. Messaging is secondary, and Wi-Fi-only operation is required. This is a personal experimental project, not a production WhatsApp client.

## Current baseline
- Public repo: https://github.com/msaavedra-ar/x4minimal
- Live web prototype: https://msaavedra-ar.github.io/x4minimal/
- Default branch: main; GitHub Pages serves root index.html.
- v0.1 is a standalone HTML/CSS/JS mockup, verified working on the owner's iPhone in Safari.
- Library, reading view, conversation list, fake chats and simulated sending/sync are implemented. NO real WhatsApp connection exists.

## Product priorities
1. Excellent distraction-free reading and e-ink readability.
2. Compact, responsive interface targeting approximately 4.3-inch e-ink touchscreen.
3. Optional text-only messaging with infrequent sync (target 15 minutes), Wi-Fi only.
4. Privacy, simplicity, low battery usage, graceful offline behavior.

## Important constraints and unknowns
- Hardware target: Xteink X4 Pro, not the owner's existing X4. Verify exact X4 Pro hardware, touchscreen, firmware support and APIs before coding hardware integration.
- CrossPoint firmware integration is a hypothesis, not an established supported plugin interface. Research repository/build/toolchain first.
- ESP32-S3 was discussed as a possible platform, but do not assume confirmed X4 Pro hardware specs.
- WhatsApp linked-device integration is NOT implemented. Unofficial bridges may be brittle, violate terms, require a persistent paired session, and expose private messages. Never imply official WhatsApp API support for personal accounts.
- Periodic 15-minute sync and background wake must be validated against actual hardware and power behavior.
- GitHub Pages is static; a server-side WhatsApp bridge cannot run on Pages. Any future bridge requires a separate trusted service and security design.

## Development workflow
- Keep index.html working on GitHub Pages and Safari.
- Prefer small, testable changes; use feature branches and pull requests for substantive work.
- Do not replace the existing UI with a large framework without a clear reason.
- Avoid third-party scripts and unnecessary tracking.
- Label demo data and simulated functions explicitly.
- Verify mobile layout, keyboard input, accessibility, offline states, and e-ink contrast.
- Do not commit credentials, session tokens, QR pairing data, or private chat content.
- Update README.md and docs/ROADMAP.md when behavior or milestones change.
- Communicate in Spanish (Argentina) when discussing the project with the owner.

## Immediate next task
Improve v0.1 to v0.2: Light Phone-inspired but original minimalist e-ink design, strong typography, readable 4.3-inch layout, touch targets, reduced animation, conversation UX and a clearly simulated sync indicator. Maintain reading-first navigation. No real WhatsApp integration yet.

## Definition of done
Changes load via GitHub Pages, work in Safari on iPhone, keep simulated messaging clearly labeled, and do not regress the reading experience.
