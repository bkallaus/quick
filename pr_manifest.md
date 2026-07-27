PR Title: feat: Add URL Encoder/Decoder

The Problem Solved: Autonomously added a URL Encoder/Decoder tool to the Quick Calculations suite, enabling developers to easily encode and decode URI components directly from the dashboard.

Visuals: [verification.png](/home/jules/verification/screenshots/verification.png)

Implementation Journey:
* Created a feature branch `feature/url-encoder`.
* Implemented `UrlEncoder` component in `src/components/url-encoder.tsx` with a dual-textarea layout that automatically syncs encoded/decoded values using `encodeURIComponent` and `decodeURIComponent`.
* Wrote test cases for the component in `src/components/url-encoder.test.tsx` ensuring it encodes, decodes and handles invalid inputs.
* Integrated the component into the main view (`src/App.tsx`).
* Integrated the component link into the side navigation (`src/components/side-nav.tsx`).
* Verified tests passed locally (`npm test -- --watchAll=false`).
* Used Playwright to perform frontend visual verification.

Tradeoffs & Assumptions:
* Assumed the creation of a developer utility tool (URL Encoder) aligned with the project's goals.
* Brainstormed 3 Paths: Standard (Single textbox + Encode/Decode buttons), Minimalist (Dual textboxes, real-time sync), Lateral (Full URL parameters parser to table view).
* Chosen Path: Minimalist. This perfectly mimics the existing Base64 Encoder pattern providing consistent UI UX with zero clicks to output.

Testing Instructions:
1. Clone branch `feature/url-encoder`
2. Run `npm install` and `npm start`
3. Click "URL Encoder" on the side navigation
4. Type text in the Plain Text field and see it convert to URL Encoded format instantly.
5. Alternatively, paste URL encoded string in the second box to decode.

Action Item: `git commit -m "feat: add url encoder/decoder" and push via tooling`
