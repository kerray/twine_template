/**
 * Script to check the structure of the compiled HTML file
 * This helps debug issues with the Playwright tests
 */
const fs = require('fs');
const path = require('path');

// Define paths
const distDir = path.resolve(__dirname, '../../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('Checking compiled HTML structure...');

// Check if index.html exists
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: index.html not found in dist directory');
  process.exit(1);
}

// Read the HTML file
try {
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Check for key elements
  const checks = [
    { name: '#passages', regex: /id=["']passages["']/i },
    { name: 'SugarCube', regex: /SugarCube/i },
    { name: 'Start passage', regex: /The Neural Nest/i },
    { name: 'Story title', regex: /<title>.*<\/title>/i }
  ];
  
  console.log('HTML file size:', (html.length / 1024).toFixed(2), 'KB');
  
  let allPassed = true;
  for (const check of checks) {
    const passed = check.regex.test(html);
    console.log(`Check for ${check.name}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (!passed) {
      allPassed = false;
    }
  }
  
  // Extract and log the title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) {
    console.log('Page title:', titleMatch[1]);
  }
  
  // Check for the passages div
  const passagesMatch = html.match(/<div id=["']passages["'][^>]*>([\s\S]*?)<\/div>/i);
  if (passagesMatch) {
    console.log('Passages div found with content');
  } else {
    console.log('WARNING: Passages div not found or empty');
  }
  
  // Log the first 500 characters of the HTML for inspection
  console.log('\nFirst 500 characters of HTML:');
  console.log(html.substring(0, 500) + '...');
  
  if (allPassed) {
    console.log('\nAll structure checks PASSED');
  } else {
    console.log('\nSome structure checks FAILED');
  }
  
} catch (error) {
  console.error('Error reading or parsing HTML file:', error);
  process.exit(1);
}