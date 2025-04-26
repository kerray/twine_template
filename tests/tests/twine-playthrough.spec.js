// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../config/config');

/**
 * Helper function to wait for a short time
 * @param {number} ms - Time to wait in milliseconds
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Runs a test based on a test path configuration
 * @param {Object} testPath - Test path configuration object
 */
test(`Playthrough: ${config.testPaths?.[0]?.name || 'Default'}`, async ({ page }) => {
  // Load the game
  console.log('Navigating to the game...');
  await page.goto('/');
  
  // Log page title to help with debugging
  const title = await page.title();
  console.log(`Page title: "${title}"`);
  
  // Take a screenshot before waiting for the passages element
  await page.screenshot({ path: 'test-results/initial-load.png' });
  console.log('Saved initial screenshot to test-results/initial-load.png');
  
  // Wait for the game to load with increased timeout
  console.log('Waiting for #passages element to appear...');
  await page.waitForSelector('#passages', { timeout: 60000 }); // Increase timeout to 60 seconds
  console.log('#passages element found, game loaded successfully');
  
  // Take another screenshot after the game has loaded
  await page.screenshot({ path: 'test-results/game-loaded.png' });
  console.log('Saved loaded game screenshot to test-results/game-loaded.png');
  
  // Get all test paths from config
  const testPaths = config.testPaths || [];
  
  // If no test paths defined, log a warning
  if (testPaths.length === 0) {
    console.warn('No test paths defined in config.js');
    return;
  }
  
  // Run through each test path
  for (const testPath of testPaths) {
    console.log(`Running test path: ${testPath.name}`);
    
    // Run through each step in the test path
    for (const step of testPath.steps) {
      console.log(`  Step: ${step.description}`);
      
      // Wait for any animations to complete
      await wait(500);
      
      // Handle different action types
      switch (step.action) {
        case 'click':
          if (step.selector) {
            await page.click(step.selector);
          } else if (step.text) {
            await page.getByText(step.text, { exact: false }).first().click();
          }
          break;
          
        case 'input':
          if (step.selector && step.value) {
            await page.fill(step.selector, step.value);
          }
          break;
          
        case 'wait':
          await wait(step.duration || 1000);
          break;
          
        case 'assert':
          if (step.text) {
            await expect(page.getByText(step.text, { exact: false })).toBeVisible();
          } else if (step.selector) {
            await expect(page.locator(step.selector)).toBeVisible();
          }
          break;
          
        default:
          console.warn(`Unknown action type: ${step.action}`);
      }
      
      // Wait for page to stabilize after action
      await wait(300);
      
      // If verification is specified, check that the expected content is visible
      if (step.expect) {
        await expect(page.getByText(step.expect, { exact: false })).toBeVisible();
      }
    }
  }
});