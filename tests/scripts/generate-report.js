#!/usr/bin/env node

/**
 * Script to generate a human-readable test report from Playwright results
 * Run this after running the tests to get a summary of test results
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Paths
const TEST_RESULTS_DIR = path.join(__dirname, '../test-results');
const REPORT_OUTPUT_PATH = path.join(__dirname, '../test-report.md');

/**
 * Generate a markdown report from test results
 */
function generateReport() {
  console.log('Generating test report...');
  
  // Check if test results directory exists
  if (!fs.existsSync(TEST_RESULTS_DIR)) {
    console.error('No test results found. Please run tests first.');
    process.exit(1);
  }
  
  // Get all test result directories
  const resultDirs = fs.readdirSync(TEST_RESULTS_DIR)
    .filter(file => fs.statSync(path.join(TEST_RESULTS_DIR, file)).isDirectory());
  
  if (resultDirs.length === 0) {
    console.error('No test results found. Please run tests first.');
    process.exit(1);
  }
  
  // Start building the report
  let report = `# Twine Template Test Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  // Add test paths summary
  report += `## Test Paths\n\n`;
  
  if (!config.testPaths || config.testPaths.length === 0) {
    report += `No test paths defined in config.\n\n`;
  } else {
    report += `${config.testPaths.length} test paths defined:\n\n`;
    
    config.testPaths.forEach((path, index) => {
      report += `### ${index + 1}. ${path.name}\n\n`;
      report += `${path.description || 'No description provided'}\n\n`;
      report += `Steps: ${path.steps.length}\n\n`;
      
      // List steps
      report += `| # | Description | Action | Target | Expectation |\n`;
      report += `|---|-------------|--------|--------|-------------|\n`;
      
      path.steps.forEach((step, stepIndex) => {
        const target = step.text || step.selector || step.duration || '';
        report += `| ${stepIndex + 1} | ${step.description} | ${step.action} | ${target} | ${step.expect || ''} |\n`;
      });
      
      report += `\n`;
    });
  }
  
  // Add test results
  report += `## Test Results\n\n`;
  
  // Count result directories to determine pass/fail
  const passCount = resultDirs.filter(dir => !dir.includes('failed')).length;
  const failCount = resultDirs.length - passCount;
  
  report += `- Total tests: ${resultDirs.length}\n`;
  report += `- Passed: ${passCount}\n`;
  report += `- Failed: ${failCount}\n\n`;
  
  // Add details for failed tests if any
  if (failCount > 0) {
    report += `### Failed Tests\n\n`;
    
    resultDirs.forEach(dir => {
      if (dir.includes('failed')) {
        const testName = dir.split('-failed')[0];
        report += `- ${testName}\n`;
        
        // Check if there's a screenshot
        const screenshotDir = path.join(TEST_RESULTS_DIR, dir);
        const screenshots = fs.readdirSync(screenshotDir)
          .filter(file => file.endsWith('.png'));
        
        if (screenshots.length > 0) {
          report += `  - Screenshots: ${screenshots.length}\n`;
          screenshots.forEach(screenshot => {
            report += `  - \`${screenshot}\`\n`;
          });
        }
        
        // Check if there's a trace
        const traces = fs.readdirSync(screenshotDir)
          .filter(file => file.endsWith('.zip'));
        
        if (traces.length > 0) {
          report += `  - Traces: ${traces.length}\n`;
        }
        
        report += `\n`;
      }
    });
  }
  
  // Add recommendations
  report += `## Recommendations\n\n`;
  
  if (failCount > 0) {
    report += `- Review failed tests and fix issues\n`;
    report += `- Check screenshots for visual issues\n`;
    report += `- Run tests with \`--debug\` flag for more detailed information\n`;
  } else {
    report += `- All tests passed! Consider adding more test paths for better coverage\n`;
    report += `- Look for edge cases that aren't currently tested\n`;
  }
  
  report += `- Consider adding tests for: \n`;
  report += `  - Error handling\n`;
  report += `  - Edge cases\n`;
  report += `  - Performance scenarios\n`;
  
  // Write the report to file
  fs.writeFileSync(REPORT_OUTPUT_PATH, report);
  
  console.log(`Report generated: ${REPORT_OUTPUT_PATH}`);
}

// Run the report generator
generateReport();