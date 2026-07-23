PR Title: feat: Add UUID Generator

The Problem Solved: Added a new, net-new feature that allows users to quickly generate a version 4 UUID for testing or configuration directly within the Quick Calculations app.

Visuals:
- Screenshot: `/home/jules/verification/screenshots/verification.png`
- Video: `/home/jules/verification/videos/1bf9a3d83c88de657d23ffdd48437bf9.webm`

Implementation Journey:
- Verified no existing branch or PR contained a UUID generator
- Created `UuidGenerator` component using basic Math.random() for Jest jsdom compatibility
- Wired the new component into the main `App.tsx` container
- Added navigation link in `side-nav.tsx`
- Wrote tests to verify initial generation and subsequent clicks
- Successfully recorded end-to-end execution with Playwright

Tradeoffs & Assumptions:
- Used `Math.random` instead of `crypto.randomUUID` for the underlying generation logic. This is an explicit tradeoff to prioritize testing compatibility since Jest's jsdom environment lacks native `crypto` support out of the box, and a true cryptographically secure UUID is not strictly necessary for a simple toolbox utility application.
- Placed the tool directly inline at the bottom of the calculation list following existing patterns rather than creating a new page layout.

Testing Instructions:
1. Run `npm start`
2. Navigate to `http://localhost:3000/quick#uuid-generator`
3. Observe the initial UUID generated on load
4. Click "Generate New" and observe the value updating

Action Item: `git push origin feature/uuid-generator && gh pr create --title "feat: Add UUID Generator" --body-file pr_manifest.md`
