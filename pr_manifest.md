PR Title: feat: URL Encoder/Decoder Component

The Problem Solved: Added a robust URL Encoder/Decoder tool to the application to help users seamlessly transform text to and from URL-safe formats with immediate, two-way data binding.

Visuals:
- [URL Encoder Screenshot](/home/jules/verification/url-encoder.png)

Implementation Journey:
- Scanned remote branches to verify net-new feature idea (avoiding duplication).
- Designed and authored the core `UrlEncoder` component in `src/components/url-encoder.tsx` to handle `encodeURIComponent` and `decodeURIComponent` logic with error states.
- Authored a comprehensive test suite in `src/components/url-encoder.test.tsx` for robust state transitions and error boundary checks.
- Integrated component into the main view (`src/App.tsx`) and navigation sidebar (`src/components/side-nav.tsx`).
- Verified local tests (`npm test`) and performed local frontend layout and behavior testing using Playwright.
- Passed automated code review and scrubbed accidental logs from version control.

Tradeoffs & Assumptions:
- Brainstorming: I evaluated adding text-sanitization utilities alongside URL encoding or generic escaping.
- Assumption: The simplest implementation (two synchronized text areas displaying the encoded/decoded string) provides the most straightforward utility, adhering to the project's 'Simplicity First' directives. No extra dependencies or config options were implemented.

Testing Instructions:
1. Check out the feature branch.
2. Run `npm start`.
3. Open `http://localhost:3000/quick` in your browser.
4. Click 'URL Encoder/Decoder' in the sidebar.
5. Type `Hello World! @#$` in the "Plain Text" box; the URL encoded box should update instantly.
6. Make modifications directly in the "URL Encoded" box; observe the "Plain Text" box decode appropriately, or error out for invalid sequences.

Action Item: `git push -u origin feature/url-encoder && gh pr create --title "feat: URL Encoder/Decoder Component" --body-file pr_manifest.md`
