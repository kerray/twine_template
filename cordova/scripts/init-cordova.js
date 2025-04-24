#!/usr/bin/env node
// cordova/scripts/init-cordova.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const rootDir = path.resolve(__dirname, "../..");
const cordovaDir = path.join(rootDir, "cordova");
const pubDir = path.join(rootDir, "dist");
const configTemplatesDir = path.join(cordovaDir, "config-templates");

// Check if Cordova is installed
try {
  execSync("cordova --version", { stdio: "ignore" });
} catch (error) {
  console.error("Apache Cordova is not installed. Please install it using:");
  console.error("npm install -g cordova");
  process.exit(1);
}

// Create Cordova project if it doesn't exist
if (!fs.existsSync(path.join(cordovaDir, "config.xml"))) {
  console.log("Initializing Cordova project...");

  // Create directories if they don't exist
  if (!fs.existsSync(cordovaDir)) {
    fs.mkdirSync(cordovaDir, { recursive: true });
  }

  // Generate config.xml from templates
  const baseConfig = fs.readFileSync(
    path.join(configTemplatesDir, "base-config.xml"),
    "utf8"
  );
  const androidConfig = fs.readFileSync(
    path.join(configTemplatesDir, "android-config.xml"),
    "utf8"
  );
  const iosConfig = fs.readFileSync(
    path.join(configTemplatesDir, "ios-config.xml"),
    "utf8"
  );
  const windowsConfig = fs.readFileSync(
    path.join(configTemplatesDir, "windows-config.xml"),
    "utf8"
  );

  // Combine configs
  const fullConfig = baseConfig.replace(
    "</widget>",
    `${androidConfig}${iosConfig}${windowsConfig}</widget>`
  );

  // Write config.xml
  fs.writeFileSync(path.join(cordovaDir, "config.xml"), fullConfig);

  // Create www directory and symlink to pub
  const wwwDir = path.join(cordovaDir, "www");
  if (!fs.existsSync(wwwDir)) {
    fs.mkdirSync(wwwDir, { recursive: true });
  }

  // Create symbolic link or copy file
  try {
    // Remove existing link if it exists
    if (fs.existsSync(path.join(wwwDir, "index.html"))) {
      fs.unlinkSync(path.join(wwwDir, "index.html"));
    }

    // Create link from dist/index.html to www/index.html
    fs.symlinkSync(
      path.join(pubDir, "index.html"),
      path.join(wwwDir, "index.html")
    );

    console.log(
      "Created symbolic link from dist/index.html to cordova/www/index.html"
    );
  } catch (error) {
    console.error("Failed to create symbolic link:", error.message);
    console.log("Copying file instead...");

    // Copy file as fallback
    fs.copyFileSync(
      path.join(pubDir, "index.html"),
      path.join(wwwDir, "index.html")
    );
  }

  console.log("Cordova project initialized successfully!");
} else {
  console.log("Cordova project already initialized.");
}
