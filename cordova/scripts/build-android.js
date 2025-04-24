#!/usr/bin/env node
// cordova/scripts/build-android.js
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

// Check if Android platform is added
if (!fs.existsSync(path.join(cordovaDir, "platforms", "android"))) {
  console.error(
    'Android platform not added. Please run "Add Android Platform" task first.'
  );
  process.exit(1);
}

// Update www/index.html with latest index.html
console.log("Updating www/index.html with latest index.html...");
fs.copyFileSync(
  path.join(pubDir, "index.html"),
  path.join(wwwDir, "index.html")
);

// Build Android APK
console.log("Building Android APK...");
try {
  execSync("cordova build android", {
    cwd: cordovaDir,
    stdio: "inherit",
  });

  // Get the path to the generated APK
  const apkPath = path.join(
    cordovaDir,
    "platforms",
    "android",
    "app",
    "build",
    "outputs",
    "apk",
    "debug",
    "app-debug.apk"
  );

  console.log("\nAndroid APK built successfully!");
  console.log(`APK location: ${apkPath}`);
} catch (error) {
  console.error("Failed to build Android APK:", error.message);
  process.exit(1);
}
