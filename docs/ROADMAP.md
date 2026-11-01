# Roadmap — X4 Minimal

## Completed: v0.1
- [x] Public repository `msaavedra-ar/x4minimal`
- [x] Root `index.html` with working prototype
- [x] GitHub Pages enabled
- [x] Owner tested successfully in Safari on iPhone
- [x] Fake chat list, reply interaction and simulated manual sync

## In review: v0.2 — E-ink interface
- [x] Original minimalist visual design inspired by distraction-free devices
- [x] 4.3-inch portrait responsive layout and touch-friendly controls
- [x] High contrast, no essential color coding, minimal motion
- [x] Reading-first home, usable library and conversation views
- [x] Message compose UX and clear demo/sync labels
- [x] Simulated 15-minute schedule display; no false claims of real background sync
- [x] Chromium functional checks at 320, 360, 430 and 800 CSS pixels, including offline after load
- [ ] Test in Safari on iPhone and GitHub Pages
- [ ] Validate layout, refresh and touch interaction on confirmed X4 Pro hardware

Implementation uses original demo text, adjustable reading size and per-conversation drafts. State is intentionally limited to the current tab session. Responsive checks use CSS pixels, not a verified physical X4 Pro resolution. The 15-minute interval is a labeled proposal; sync runs only when the user presses the simulation button.

## Research: v0.3 — Device feasibility
- [ ] Confirm Xteink X4 Pro CPU, touchscreen, memory, Wi-Fi and firmware interfaces from reliable primary sources
- [ ] Study CrossPoint source code, build system and extensibility
- [ ] Choose native firmware modification vs web runtime based on evidence
- [ ] Prototype e-ink refresh and power constraints on actual hardware

## Research: v0.4 — Messaging feasibility
- [ ] Evaluate compliant options for WhatsApp personal messaging; document limitations
- [ ] Decide if a separate server/bridge is feasible and acceptable
- [ ] Design device pairing, session security, encryption in transit and recovery
- [ ] Investigate push/poll vs 15-minute scheduled wake, offline queue and battery
- [ ] No live integration without an explicit security and feasibility review

## Not goals for initial milestones
- Cellular connectivity, SIM, calls, social feeds or an Android app store
- Claiming official WhatsApp support
- Shipping a production-ready device firmware without hardware validation
