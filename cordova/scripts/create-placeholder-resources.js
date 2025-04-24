#!/usr/bin/env node
// cordova/scripts/create-placeholder-resources.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const resTemplatesDir = path.join(rootDir, 'cordova/res-templates');

// Create directory if it doesn't exist
if (!fs.existsSync(resTemplatesDir)) {
  fs.mkdirSync(resTemplatesDir, { recursive: true });
}

// Create placeholder icon.png (1024x1024)
console.log('Creating placeholder icon.png...');
const iconPath = path.join(resTemplatesDir, 'icon.png');

// Create placeholder splash.png (2732x2732)
console.log('Creating placeholder splash.png...');
const splashPath = path.join(resTemplatesDir, 'splash.png');

// Function to create a simple HTML file with a canvas
function createImageHtml(width, height, text, color, bgColor) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Generate Image</title>
  <style>
    body { margin: 0; padding: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas" width="${width}" height="${height}"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '${bgColor}';
    ctx.fillRect(0, 0, ${width}, ${height});
    
    // Text
    ctx.fillStyle = '${color}';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw app name
    ctx.font = 'bold ${Math.floor(width/10)}px Arial';
    ctx.fillText('Twine Game', ${width/2}, ${height/2 - Math.floor(width/15)});
    
    // Draw "Made with TwT"
    ctx.font = '${Math.floor(width/20)}px Arial';
    ctx.fillText('Made with Twine Template', ${width/2}, ${height/2 + Math.floor(width/15)});
    
    // Save as PNG
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  </script>
</body>
</html>
  `;
}

// Create HTML files
const iconHtml = createImageHtml(1024, 1024, 'Icon', '#FFFFFF', '#6A5ACD');
const splashHtml = createImageHtml(2732, 2732, 'Splash', '#333333', '#FFFFFF');

// Write HTML files
fs.writeFileSync(path.join(resTemplatesDir, 'icon.html'), iconHtml);
fs.writeFileSync(path.join(resTemplatesDir, 'splash.html'), splashHtml);

console.log('HTML files created. Please open these files in a browser:');
console.log(`- ${path.join(resTemplatesDir, 'icon.html')}`);
console.log(`- ${path.join(resTemplatesDir, 'splash.html')}`);
console.log('Then save the generated images as:');
console.log(`- ${iconPath}`);
console.log(`- ${splashPath}`);
console.log('\nAlternatively, you can create these images using any image editor.');
console.log('The icon.png should be 1024x1024 pixels.');
console.log('The splash.png should be 2732x2732 pixels.');