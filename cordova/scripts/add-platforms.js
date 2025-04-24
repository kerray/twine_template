#!/usr/bin/env node
// cordova/scripts/add-platforms.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get platform from command line arguments
const platform = process.argv[2];
if (!platform) {
  console.error('Please specify a platform: android, ios, or windows');
  process.exit(1);
}

// Validate platform
const validPlatforms = ['android', 'ios', 'windows', 'browser'];
if (!validPlatforms.includes(platform)) {
  console.error(`Invalid platform: ${platform}. Must be one of: ${validPlatforms.join(', ')}`);
  process.exit(1);
}

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');

// Check if Cordova project is initialized
if (!fs.existsSync(path.join(cordovaDir, 'config.xml'))) {
  console.error('Cordova project not initialized. Please run "Initialize Cordova Project" task first.');
  process.exit(1);
}

// Clean up existing platform if present
const platformPath = path.join(cordovaDir, 'platforms', platform);
if (fs.existsSync(platformPath)) {
  console.log(`Removing existing ${platform} platform directory...`);
  fs.rmSync(platformPath, { recursive: true, force: true });
}

// Add platform
console.log(`Adding ${platform} platform...`);
try {
  // First remove the platform using Cordova command
  try {
    execSync(`cordova platform rm ${platform}`, { 
      cwd: cordovaDir,
      stdio: 'inherit'
    });
  } catch (e) {
    // Ignore removal errors
  }
  
  // Then add the platform
  execSync(`cordova platform add ${platform}`, { 
    cwd: cordovaDir,
    stdio: 'inherit'
  });
  console.log(`${platform} platform added successfully!`);
} catch (error) {
  if (error.message.includes('ERR_INVALID_ARG_TYPE')) {
    // If we get the exit code error but the platform was actually added, consider it a success
    if (fs.existsSync(platformPath)) {
      console.log(`${platform} platform appears to be added successfully despite error.`);
      process.exit(0);
    }
  }
  console.error(`Failed to add ${platform} platform:`, error.message);
  process.exit(1);
}
