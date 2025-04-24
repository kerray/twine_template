#!/usr/bin/env node
// cordova/scripts/build-windows.js
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

// Check if Windows platform is added
if (!fs.existsSync(path.join(cordovaDir, "platforms", "windows"))) {
  console.error(
    'Windows platform not added. Please run "Add Windows Platform" task first.'
  );
  process.exit(1);
}

// Check if running on Windows
const platform = process.platform;
if (platform !== "win32") {
  console.warn("Warning: Building Windows apps is best supported on Windows.");
  console.warn("The build may succeed, but you might encounter issues.");
}

// Update www/index.html with latest index.html
console.log("Updating www/index.html with latest index.html...");
fs.copyFileSync(
  path.join(pubDir, "index.html"),
  path.join(wwwDir, "index.html")
);

// Build Windows app
console.log("Building Windows app...");
try {
  execSync("cordova build windows", {
    cwd: cordovaDir,
    stdio: "inherit",
  });

  const appPath = path.join(cordovaDir, "platforms", "windows", "AppPackages");

  console.log("\nWindows app built successfully!");
  console.log(`App packages location: ${appPath}`);
} catch (error) {
  console.error("Failed to build Windows app:", error.message);
  process.exit(1);
}
