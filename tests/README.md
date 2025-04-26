# Twine Template Automated Tests

This directory contains automated tests for the Twine Template project using Playwright.

## Setup

Testing is an optional feature in the Twine Template that requires additional dependencies beyond the minimal setup. This follows the template's modular dependency approach, where you only install what you need for your specific use case.

You can install the testing dependencies using the justfile command:

```bash
./just install-tests
```

This will:
1. Install npm dependencies
2. Install Playwright browsers with all system dependencies
3. Run additional dependency installation to ensure everything is set up correctly

Note that this is separate from the minimal setup (Tweego and Just) and is only needed if you want to run automated tests.

Alternatively, you can manually install:

```bash
cd tests
npm install
npx playwright install --with-deps
npx playwright install-deps
```

## Running Tests

Test commands automatically compile the game but do not reinstall test dependencies each time:

```bash
# Install test dependencies (only needed once or when dependencies change)
./just install-tests

# Run basic tests (compiles the game first)
./just test

# Run tests with interactive UI
./just test-ui

# Run tests in debug mode
./just test-debug

# Generate a test report
./just test-report
```

If you need to install all dependencies including test dependencies:

```bash
# Install all dependencies including test dependencies
./just install-all
```

You can also run the commands directly from the tests directory if you've already compiled the game and installed dependencies:

```bash
cd tests

# Run basic tests
npm test

# Run tests with interactive UI
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Generate a test report
npm run report
```

## Test Configuration

Tests are configured in the `config/config.js` file. This file defines test paths that the automated tests will follow.

### Test Path Structure

A test path consists of:

- `name`: A descriptive name for the test path
- `description`: A longer description of what the test is checking
- `steps`: An array of steps to execute

Each step has:

- `description`: What this step is doing
- `action`: The type of action to perform (click, input, wait, assert)
- Additional parameters depending on the action type:
  - For `click`: `text` or `selector` to identify what to click
  - For `input`: `selector` and `value` for form inputs
  - For `wait`: `duration` in milliseconds
  - For `assert`: `text` or `selector` to verify visibility
- `expect`: Optional text to verify after the action completes

### Example Configuration

```javascript
{
  name: "Basic Navigation",
  description: "Tests basic navigation through the game",
  steps: [
    {
      description: "Start the game",
      action: "assert",
      text: "Start", // Verify we're on the start page
    },
    {
      description: "Click on first choice",
      action: "click",
      text: "Begin your journey", // Text of the link to click
      expect: "You have chosen to begin your journey" // Text expected after clicking
    }
  ]
}
```

## Creating New Test Paths

To create a new test path:

1. Open `config/config.js`
2. Add a new object to the `testPaths` array
3. Define your steps based on the game's flow
4. Run the tests to verify your path works correctly

## Best Practices

- Create test paths that cover ideally all user journeys through the game
- Keep test paths focused on specific functionality
- Use descriptive names and descriptions
- Add assertions to verify the game state after important actions
- Test edge cases and failure scenarios

## Troubleshooting

If tests are failing, try these steps:

1. **Check if the game compiles correctly**:
   ```bash
   ./just compile
   ```

2. **Verify the HTML structure**:
   ```bash
   node tests/scripts/check-compiled-html.js
   ```

3. **Look at the screenshots**:
   Tests automatically take screenshots at key points, which are saved in the `tests/test-results` directory (standardized to match Playwright's `outputDir` configuration).

4. **Increase timeouts**:
   If tests are timing out, you may need to increase the timeout values in `playwright.config.js`.

5. **Update test paths**:
   Make sure the test paths in `config/config.js` match the actual content of your game.

6. **Run with debug mode**:
   ```bash
   ./just test-debug
   ```
   This will open a browser window and show you exactly what's happening during the test.