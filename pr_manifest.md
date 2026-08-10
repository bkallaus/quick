PR Title: feat: Number Base Converter

The Problem Solved: Introduces a fast, client-side calculator for converting numbers between Decimal, Hexadecimal, Octal, and Binary bases in real-time, handling arbitrarily large numbers via BigInt.

Visuals:
- [Screenshot showing base conversion](file:///home/jules/verification/screenshot.png)

Implementation Journey:
- Created the core `number-base-converter.tsx` component with 4 synchronized inputs (Base 10, 16, 8, 2).
- Utilized `BigInt` under the hood to completely bypass standard JS integer overflow limits.
- Implemented robust input sanitization per-base (e.g., ignoring non-hex characters in the hex input).
- Added comprehensive unit testing verifying valid conversions, empty state handling, and invalid character rejection.
- Integrated the new tool into `App.tsx`'s main layout and the `side-nav.tsx` sidebar navigation.
- Verified visual fidelity and functionality using a headless Playwright script.

Tradeoffs & Assumptions:
- **Assumption:** The user needs to convert standard computer science numerical bases without running into the JavaScript Number.MAX_SAFE_INTEGER limit.
- **Architectural Brainstorming (Forced Variance):**
  1. *Standard:* Store 4 separate state strings and update all 4 via `useEffect` whenever one changes. (Rejected: Prone to infinite update loops or sync desyncs).
  2. *Minimalist (Chosen):* Store a single source of truth (the decimal string representation) and derive the other 3 base representations dynamically on render, parsing exact inputs via `BigInt` on change. (Selected for robust sync and large number support).
  3. *Creative/Lateral:* Create a purely functional pipe that parses any input into a typed object and fans out formats using standard `Number.toString(radix)`. (Rejected: Fails on very large numbers > 2^53).
- **Tradeoff:** By storing only a generic string and stripping invalid characters on the fly, typing an invalid letter in a hex box won't update the state, but might visually linger in the DOM temporarily. This is acceptable for the simplicity gained by not managing complex controlled-input cursors.

Testing Instructions:
1. Check out branch `feature/number-base-converter`.
2. Run `npm start`.
3. Navigate to http://localhost:3000/quick#number-base-converter.
4. Enter `255` in the Decimal field. Verify Hex becomes `ff`, Octal becomes `377`, and Binary becomes `11111111`.
5. Enter a very large number (e.g., > 20 digits) to verify BigInt scaling works without scientific notation collapse.
6. Verify tests pass via `CI=true npm test`.

Action Item: `git push origin feature/number-base-converter` and open PR via UI/CLI.
