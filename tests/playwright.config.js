// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // Increase global timeout to 60 seconds
  expect: {
    timeout: 10000 // Increase expect timeout to 10 seconds
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'file://' + require('path').resolve(__dirname, '../dist/index.html'),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Always run in headless mode since we're in a code-server environment
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'test-results/',
});