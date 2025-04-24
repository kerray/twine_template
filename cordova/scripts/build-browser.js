#!/usr/bin/env node
// cordova/scripts/build-browser.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Paths
const rootDir = path.resolve(__dirname, "../..");
const cordovaDir = path.join(rootDir, "cordova");
const pubDir = path.join(rootDir, "dist");
const wwwDir = path.join(cordovaDir, "www");

// Check if Cordova project is initialized
if (!fs.existsSync(path.join(cordovaDir, "config.xml"))) {
  console.error(
    'Cordova project not initialized. Please run "Initialize Cordova Project" task first.'
  );
  process.exit(1);
}

// Check if Browser platform is added
if (!fs.existsSync(path.join(cordovaDir, "platforms", "browser"))) {
  console.error(
    'Browser platform not added. Please run "Add Browser Platform" task first.'
  );
  process.exit(1);
}

// Update www/index.html with latest index.html
console.log("Updating www/index.html with latest index.html...");
fs.copyFileSync(
  path.join(pubDir, "index.html"),
  path.join(wwwDir, "index.html")
);

// Build Browser app
console.log("Building Browser app...");
try {
  execSync("cordova build browser", {
    cwd: cordovaDir,
    stdio: "inherit",
  });

  const browserBuildPath = path.join(cordovaDir, "platforms", "browser", "www");

  console.log("\nBrowser app built successfully!");
  console.log(`Browser app location: ${browserBuildPath}`);
  console.log(
    "You can open the app by opening index.html in the browser app location."
  );
} catch (error) {
  console.error("Failed to build Browser app:", error.message);
  process.exit(1);
}
