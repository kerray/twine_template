#!/usr/bin/env node
// cordova/scripts/build-ios.js
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

// Check if iOS platform is added
if (!fs.existsSync(path.join(cordovaDir, "platforms", "ios"))) {
  console.error(
    'iOS platform not added. Please run "Add iOS Platform" task first.'
  );
  process.exit(1);
}

// Check if running on macOS
const platform = process.platform;
if (platform !== "darwin") {
  console.error("iOS builds are only supported on macOS.");
  process.exit(1);
}

// Update www/index.html with latest index.html
console.log("Updating www/index.html with latest index.html...");
fs.copyFileSync(
  path.join(pubDir, "index.html"),
  path.join(wwwDir, "index.html")
);

// Build iOS app
console.log("Building iOS app...");
try {
  execSync("cordova build ios", {
    cwd: cordovaDir,
    stdio: "inherit",
  });

  const xcodeProjectPath = path.join(cordovaDir, "platforms", "ios");

  console.log("\niOS app built successfully!");
  console.log(`Xcode project location: ${xcodeProjectPath}`);
  console.log("Open the Xcode project to run on a simulator or device.");
} catch (error) {
  console.error("Failed to build iOS app:", error.message);
  process.exit(1);
}
