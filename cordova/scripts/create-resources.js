#!/usr/bin/env node
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');
const resDir = path.join(cordovaDir, 'res');
const androidDir = path.join(resDir, 'android');

// Create directories
fs.mkdirSync(path.join(androidDir, 'icon'), { recursive: true });
fs.mkdirSync(path.join(androidDir, 'splash'), { recursive: true });

// Create icon
function createIcon() {
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#6A5ACD';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // App name
  ctx.font = 'bold 102px Arial';
  ctx.fillText('Twine Game', 512, 460);
  
  // Subtitle
  ctx.font = '51px Arial';
  ctx.fillText('Made with Twine Template', 512, 564);
  
  // Save file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(androidDir, 'icon', 'icon.png'), buffer);
}

// Create splash screen
function createSplash() {
  const canvas = createCanvas(2732, 2732);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 2732, 2732);
  
  // Text
  ctx.fillStyle = '#333333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // App name
  ctx.font = 'bold 273px Arial';
  ctx.fillText('Twine Game', 1366, 1229);
  
  // Subtitle
  ctx.font = '137px Arial';
  ctx.fillText('Made with Twine Template', 1366, 1503);
  
  // Save file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(androidDir, 'splash', 'splash.png'), buffer);
}

// Create resources
console.log('Creating icon...');
createIcon();
console.log('Creating splash screen...');
createSplash();
console.log('Resources created successfully!');
