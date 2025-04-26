/**
 * Script to ensure the game is compiled before running tests
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const distDir = path.resolve(__dirname, '../../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const justfilePath = path.resolve(__dirname, '../../justfile');

console.log('Checking if game is compiled...');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('Creating dist directory...');
  fs.mkdirSync(distDir, { recursive: true });
}

// Check if index.html exists and is recent
let needsCompile = true;
if (fs.existsSync(indexHtmlPath)) {
  const stats = fs.statSync(indexHtmlPath);
  const fileModTime = stats.mtime;
  const currentTime = new Date();
  
  // If file was modified in the last 5 minutes, consider it fresh
  const fiveMinutesAgo = new Date(currentTime - 5 * 60 * 1000);
  if (fileModTime > fiveMinutesAgo) {
    console.log('Game was recently compiled, skipping compilation');
    needsCompile = false;
  }
}

// Compile the game if needed
if (needsCompile) {
  console.log('Compiling game...');
  try {
    // Check if we're on Windows
    const isWindows = process.platform === 'win32';
    const justCommand = isWindows ? '.\\just' : './just';
    
    // Execute the compile command
    execSync(`${justCommand} compile`, { 
      cwd: path.resolve(__dirname, '../..'),
      stdio: 'inherit'
    });
    console.log('Game compiled successfully');
  } catch (error) {
    console.error('Failed to compile game:', error);
    process.exit(1);
  }
}

// Verify the compiled file exists
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Game compilation failed: index.html not found');
  process.exit(1);
}

// Run the HTML structure check
console.log('Checking HTML structure...');
try {
  require('./check-compiled-html');
  console.log('HTML structure check completed');
} catch (error) {
  console.warn('HTML structure check failed, but continuing with tests:', error.message);
}

console.log('Game is ready for testing');