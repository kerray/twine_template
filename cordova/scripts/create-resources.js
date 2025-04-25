#!/usr/bin/env node
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');
const resDir = path.join(cordovaDir, 'res');
const androidDir = path.join(resDir, 'android');
const iosDir = path.join(resDir, 'ios');

// iOS icon sizes
const iosIconSizes = [
  { size: 1024, name: 'icon-1024.png' },
  { size: 180, name: 'icon-60@3x.png' },
  { size: 120, name: 'icon-60@2x.png' },
  { size: 76, name: 'icon-76.png' },
  { size: 152, name: 'icon-76@2x.png' },
  { size: 40, name: 'icon-40.png' },
  { size: 80, name: 'icon-40@2x.png' },
  { size: 167, name: 'icon-83.5@2x.png' }
];

// iOS splash screen sizes
const iosSplashSizes = [
  { width: 2732, height: 2732, name: 'Default@2x~universal~anyany.png' },
  { width: 2208, height: 1242, name: 'Default-Landscape-736h@3x.png' },
  { width: 1242, height: 2208, name: 'Default-Portrait-736h@3x.png' },
  { width: 2048, height: 1536, name: 'Default-Landscape@2x~ipad.png' },
  { width: 1536, height: 2048, name: 'Default-Portrait@2x~ipad.png' }
];

// Create directories
fs.mkdirSync(path.join(androidDir, 'icon'), { recursive: true });
fs.mkdirSync(path.join(androidDir, 'splash'), { recursive: true });
fs.mkdirSync(path.join(iosDir, 'icon'), { recursive: true });
fs.mkdirSync(path.join(iosDir, 'splash'), { recursive: true });

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

// Create iOS icons
function createIosIcons() {
  console.log('Creating iOS icons...');
  for (const icon of iosIconSizes) {
    const canvas = createCanvas(icon.size, icon.size);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#6A5ACD';
    ctx.fillRect(0, 0, icon.size, icon.size);
    
    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Scale text size based on icon size
    const fontSize = Math.floor(icon.size / 10);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText('Twine Game', icon.size/2, icon.size/2 - fontSize/2);
    
    const subtitleSize = Math.floor(fontSize / 2);
    ctx.font = `${subtitleSize}px Arial`;
    ctx.fillText('Made with TwT', icon.size/2, icon.size/2 + fontSize/2);
    
    // Save file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(iosDir, 'icon', icon.name), buffer);
  }
}

// Create iOS splash screens
function createIosSplash() {
  console.log('Creating iOS splash screens...');
  for (const splash of iosSplashSizes) {
    const canvas = createCanvas(splash.width, splash.height);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, splash.width, splash.height);
    
    // Text
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Scale text size based on smallest dimension
    const minDimension = Math.min(splash.width, splash.height);
    const fontSize = Math.floor(minDimension / 10);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText('Twine Game', splash.width/2, splash.height/2 - fontSize/2);
    
    const subtitleSize = Math.floor(fontSize / 2);
    ctx.font = `${subtitleSize}px Arial`;
    ctx.fillText('Made with TwT', splash.width/2, splash.height/2 + fontSize/2);
    
    // Save file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(iosDir, 'splash', splash.name), buffer);
  }
}

// Create all resources
console.log('Creating Android resources...');
createIcon();
createSplash();
console.log('Creating iOS resources...');
createIosIcons();
createIosSplash();
console.log('Resources created successfully!');
