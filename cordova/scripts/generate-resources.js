#!/usr/bin/env node
// cordova/scripts/generate-resources.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');
const resTemplatesDir = path.join(cordovaDir, 'res-templates');

// Check if Cordova project is initialized
if (!fs.existsSync(path.join(cordovaDir, 'config.xml'))) {
  console.error('Cordova project not initialized. Please run "Initialize Cordova Project" task first.');
  process.exit(1);
}

// Check if cordova-res is installed
try {
  execSync('cordova-res --version', { stdio: 'ignore' });
} catch (error) {
  console.error('cordova-res is not installed. Please install it using:');
  console.error('npm install -g cordova-res');
  process.exit(1);
}

// Check if template resources exist
const iconTemplate = path.join(resTemplatesDir, 'icon.png');
const splashTemplate = path.join(resTemplatesDir, 'splash.png');

if (!fs.existsSync(iconTemplate)) {
  console.error(`Icon template not found: ${iconTemplate}`);
  console.error('Please create a 1024x1024 PNG icon template at this location.');
  process.exit(1);
}

if (!fs.existsSync(splashTemplate)) {
  console.error(`Splash screen template not found: ${splashTemplate}`);
  console.error('Please create a 2732x2732 PNG splash screen template at this location.');
  process.exit(1);
}

// Create resources directory if it doesn't exist
const resDir = path.join(cordovaDir, 'res');
if (!fs.existsSync(resDir)) {
  fs.mkdirSync(resDir, { recursive: true });
}

// Copy templates to resources directory
fs.copyFileSync(iconTemplate, path.join(resDir, 'icon.png'));
fs.copyFileSync(splashTemplate, path.join(resDir, 'splash.png'));

// Generate resources
console.log('Generating app resources...');
try {
  execSync('cordova-res', { 
    cwd: cordovaDir,
    stdio: 'inherit'
  });
  
  console.log('\nApp resources generated successfully!');
} catch (error) {
  console.error('Failed to generate app resources:', error.message);
  process.exit(1);
}