PR Title: feat: JSON Formatter

The Problem Solved: Adds a JSON Formatter tool to prettify and format raw JSON input, providing instant visual feedback and validation.

Visuals: [verification.png](/home/jules/verification/screenshots/verification.png)

Implementation Journey:
- Verified no duplication of JSON functionality existed.
- Documented architectural assumptions favoring a robust but standard two-textarea approach.
- Created `src/components/json-formatter.tsx` component.
- Added test coverage in `src/components/json-formatter.test.tsx` (Valid input, invalid input, empty input).
- Registered the component in `src/App.tsx`.
- Linked the component in `src/components/side-nav.tsx`.
- Tested and captured verification screenshot of the fully-rendered feature.

Tradeoffs & Assumptions:
- Evaluated 3 approaches (Auto-format, Single Textarea on-click, Tree View). Chose Standard auto-formatting with distinct read-only output. This prevents invalid typed JSON from unexpectedly wiping out the user's manual spacing edits, while still offering instantaneous format visibility.
- Chose simple error messaging directly under the text boxes rather than blocking rendering to remain non-intrusive.

Testing Instructions:
1. Check out `feature/json-formatter`.
2. Start the application (`npm start`).
3. Click "JSON Formatter" in the left sidebar.
4. Enter `{"test":    "value"}` in the raw input box and observe the beautifully spaced result in the output box.

Action Item: git push origin feature/json-formatter
