# Source Directory Clean-up (2025-02-28)

## Changes Made
- Removed src/head.html as we want to keep all content in .tw files
- Updated tasks.json to:
  - Remove --head option since we don't use HTML files
  - Make it platform-independent using VSCode variables
- Updated .clinerules to explicitly state:
  - src/ directory contains ONLY .tw files
  - All CSS goes in StoryStylesheet.tw
  - All JavaScript goes in StoryScript.tw
  - No HTML files allowed in src/

## Rationale
Keeping all content in .tw files makes the project more maintainable and consistent with Twine's philosophy. Any HTML/CSS/JS that would have gone in head.html can be properly organized in the respective .tw files (StoryStylesheet.tw for CSS, StoryScript.tw for JS).