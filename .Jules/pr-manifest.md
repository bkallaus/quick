## PR Manifest
**PR Title:** feat: String Case Converter

**The Problem Solved:** A utility for developers to quickly convert strings between camelCase, snake_case, kebab-case, and PascalCase simultaneously in real-time.

**Visuals:**
[Screenshot of Component](/home/jules/verification/screenshots/string-case-converter.png)

**Implementation Journey:**
- Verified no duplication existed for this feature.
- Built a minimal StringCaseConverter component utilizing native string manipulation.
- Wrote full unit test coverage mimicking user interactions using React Testing Library.
- Added component to the layout in src/App.tsx.
- Linked component in src/components/side-nav.tsx.
- Created Playwright UI test and manually reviewed successful UI layout and data conversions.
- Overcame react-scripts environment cache corruption and generated screenshot.
- Validated testing suite passed with 100% success.

**Tradeoffs & Assumptions:**
- I brainstormed a URL Parser, Slug Generator, and String Case Converter. I opted for the String Case Converter as it provides the most lateral utility without external dependency bloat.
- Assumed standard alphabetic/numeric extraction logic splitting by non-alphanumeric characters was sufficient for basic developer use cases.

**Testing Instructions:**
1. Clone this branch feature/string-case-converter.
2. Run npm start and navigate to http://localhost:3000/quick#string-case-converter.
3. Type "hello world examples" into the input text area.
4. Verify camelCase shows "helloWorldExamples", snake_case shows "hello_world_examples", etc.

**Action Item:**
Use the submit tool to open the PR.
