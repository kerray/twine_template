# Cordova Implementation Details (2025-02-28)

This document provides detailed implementation steps for integrating Apache Cordova with the Twine Template (TwT) to enable packaging games as native applications for Android, iOS, and Windows.

## Initial Setup Files

### 1. Cordova Project Structure

Create the following directory structure:

```
./cordova/
├── config-templates/
│   ├── base-config.xml         # Base configuration template
│   ├── android-config.xml      # Android-specific additions
│   ├── ios-config.xml          # iOS-specific additions
│   └── windows-config.xml      # Windows-specific additions
├── scripts/
│   ├── init-cordova.js         # Script to initialize Cordova project
│   ├── add-platforms.js        # Script to add platforms
│   ├── build-android.js        # Script to build Android package
│   ├── build-ios.js            # Script to build iOS package
│   ├── build-windows.js        # Script to build Windows package
│   └── generate-resources.js   # Script to generate icons and splash screens
└── res-templates/
    ├── icon.png                # Base icon template (1024x1024)
    └── splash.png              # Base splash screen template (2732x2732)
```

### 2. Base Config.xml Template

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.example.twinegame" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>TwineGame</name>
    <description>A Twine game created with TwT</description>
    <author email="dev@example.com" href="https://example.com">Your Name</author>
    
    <!-- Web page to launch -->
    <content src="index.html" />
    
    <!-- Permissions -->
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <!-- Preferences -->
    <preference name="DisallowOverscroll" value="true" />
    <preference name="Orientation" value="default" />
    <preference name="SplashScreenDelay" value="3000" />
    <preference name="AutoHideSplashScreen" value="true" />
    <preference name="ShowSplashScreenSpinner" value="false" />
    <preference name="FadeSplashScreen" value="true" />
    <preference name="FadeSplashScreenDuration" value="500" />
    <preference name="SplashMaintainAspectRatio" value="true" />
    <preference name="BackgroundColor" value="#ffffff" />
    
    <!-- Core plugins that will be automatically added -->
    <plugin name="cordova-plugin-splashscreen" spec="^5.0.4" />
    <plugin name="cordova-plugin-whitelist" spec="^1.3.4" />
    <plugin name="cordova-plugin-statusbar" spec="^2.4.3" />
</widget>
```

### 3. Platform-Specific Config Additions

#### Android Config Additions
```xml
<platform name="android">
    <allow-intent href="market:*" />
    <preference name="android-minSdkVersion" value="22" />
    <preference name="android-targetSdkVersion" value="33" />
    
    <!-- Icons -->
    <icon density="ldpi" src="res/android/icon/ldpi.png" />
    <icon density="mdpi" src="res/android/icon/mdpi.png" />
    <icon density="hdpi" src="res/android/icon/hdpi.png" />
    <icon density="xhdpi" src="res/android/icon/xhdpi.png" />
    <icon density="xxhdpi" src="res/android/icon/xxhdpi.png" />
    <icon density="xxxhdpi" src="res/android/icon/xxxhdpi.png" />
    
    <!-- Splash Screens -->
    <splash density="land-ldpi" src="res/android/splash/land-ldpi.png" />
    <splash density="land-mdpi" src="res/android/splash/land-mdpi.png" />
    <splash density="land-hdpi" src="res/android/splash/land-hdpi.png" />
    <splash density="land-xhdpi" src="res/android/splash/land-xhdpi.png" />
    <splash density="land-xxhdpi" src="res/android/splash/land-xxhdpi.png" />
    <splash density="land-xxxhdpi" src="res/android/splash/land-xxxhdpi.png" />
    <splash density="port-ldpi" src="res/android/splash/port-ldpi.png" />
    <splash density="port-mdpi" src="res/android/splash/port-mdpi.png" />
    <splash density="port-hdpi" src="res/android/splash/port-hdpi.png" />
    <splash density="port-xhdpi" src="res/android/splash/port-xhdpi.png" />
    <splash density="port-xxhdpi" src="res/android/splash/port-xxhdpi.png" />
    <splash density="port-xxxhdpi" src="res/android/splash/port-xxxhdpi.png" />
</platform>
```

#### iOS Config Additions
```xml
<platform name="ios">
    <allow-intent href="itms:*" />
    <allow-intent href="itms-apps:*" />
    <preference name="deployment-target" value="13.0" />
    <preference name="BackupWebStorage" value="none" />
    <preference name="StatusBarOverlaysWebView" value="false" />
    <preference name="StatusBarStyle" value="default" />
    
    <!-- Icons -->
    <icon height="20" src="res/ios/icon/icon-20.png" width="20" />
    <icon height="40" src="res/ios/icon/icon-20@2x.png" width="40" />
    <icon height="60" src="res/ios/icon/icon-20@3x.png" width="60" />
    <icon height="29" src="res/ios/icon/icon-29.png" width="29" />
    <icon height="58" src="res/ios/icon/icon-29@2x.png" width="58" />
    <icon height="87" src="res/ios/icon/icon-29@3x.png" width="87" />
    <icon height="40" src="res/ios/icon/icon-40.png" width="40" />
    <icon height="80" src="res/ios/icon/icon-40@2x.png" width="80" />
    <icon height="120" src="res/ios/icon/icon-40@3x.png" width="120" />
    <icon height="120" src="res/ios/icon/icon-60@2x.png" width="120" />
    <icon height="180" src="res/ios/icon/icon-60@3x.png" width="180" />
    <icon height="76" src="res/ios/icon/icon-76.png" width="76" />
    <icon height="152" src="res/ios/icon/icon-76@2x.png" width="152" />
    <icon height="167" src="res/ios/icon/icon-83.5@2x.png" width="167" />
    <icon height="1024" src="res/ios/icon/icon-1024.png" width="1024" />
    
    <!-- Splash Screens -->
    <splash height="2732" src="res/ios/splash/Default@2x~universal~anyany.png" width="2732" />
</platform>
```

#### Windows Config Additions
```xml
<platform name="windows">
    <preference name="windows-target-version" value="10.0" />
    <preference name="windows-phone-target-version" value="10.0" />
    
    <!-- Icons -->
    <icon src="res/windows/icon/Square30x30Logo.scale-100.png" target="Square30x30Logo" />
    <icon src="res/windows/icon/Square44x44Logo.scale-100.png" target="Square44x44Logo" />
    <icon src="res/windows/icon/Square44x44Logo.scale-240.png" target="Square44x44Logo.scale-240" />
    <icon src="res/windows/icon/Square70x70Logo.scale-100.png" target="Square70x70Logo" />
    <icon src="res/windows/icon/Square71x71Logo.scale-100.png" target="Square71x71Logo" />
    <icon src="res/windows/icon/Square71x71Logo.scale-240.png" target="Square71x71Logo.scale-240" />
    <icon src="res/windows/icon/Square150x150Logo.scale-100.png" target="Square150x150Logo" />
    <icon src="res/windows/icon/Square150x150Logo.scale-240.png" target="Square150x150Logo.scale-240" />
    <icon src="res/windows/icon/Square310x310Logo.scale-100.png" target="Square310x310Logo" />
    <icon src="res/windows/icon/Wide310x150Logo.scale-100.png" target="Wide310x150Logo" />
    <icon src="res/windows/icon/Wide310x150Logo.scale-240.png" target="Wide310x150Logo.scale-240" />
    
    <!-- Splash Screen -->
    <splash src="res/windows/splash/SplashScreen.scale-100.png" target="SplashScreen" />
    <splash src="res/windows/splash/SplashScreen.scale-240.png" target="SplashScreen.scale-240" />
</platform>
```

## VSCode Tasks

Add the following tasks to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    // ... existing tasks ...
    
    {
      "label": "Initialize Cordova Project",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/init-cordova.js"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Add Android Platform",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/add-platforms.js",
        "android"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Add iOS Platform",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/add-platforms.js",
        "ios"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Add Windows Platform",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/add-platforms.js",
        "windows"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Build Android App",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/build-android.js"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Build iOS App",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/build-ios.js"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Build Windows App",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/build-windows.js"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Generate App Resources",
      "type": "shell",
      "command": "node",
      "args": [
        "${workspaceFolder}/cordova/scripts/generate-resources.js"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    }
  ]
}
```

## Implementation Scripts

### 1. init-cordova.js

This script will:
1. Check if Cordova is installed
2. Create the Cordova project structure
3. Generate the config.xml file from templates
4. Create a symbolic link from `cordova/www` to `pub`

```javascript
// cordova/scripts/init-cordova.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');
const pubDir = path.join(rootDir, 'pub');
const configTemplatesDir = path.join(cordovaDir, 'config-templates');

// Check if Cordova is installed
try {
  execSync('cordova --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Apache Cordova is not installed. Please install it using:');
  console.error('npm install -g cordova');
  process.exit(1);
}

// Create Cordova project if it doesn't exist
if (!fs.existsSync(path.join(cordovaDir, 'config.xml'))) {
  console.log('Initializing Cordova project...');
  
  // Create directories if they don't exist
  if (!fs.existsSync(cordovaDir)) {
    fs.mkdirSync(cordovaDir, { recursive: true });
  }
  
  // Generate config.xml from templates
  const baseConfig = fs.readFileSync(path.join(configTemplatesDir, 'base-config.xml'), 'utf8');
  const androidConfig = fs.readFileSync(path.join(configTemplatesDir, 'android-config.xml'), 'utf8');
  const iosConfig = fs.readFileSync(path.join(configTemplatesDir, 'ios-config.xml'), 'utf8');
  const windowsConfig = fs.readFileSync(path.join(configTemplatesDir, 'windows-config.xml'), 'utf8');
  
  // Combine configs
  const fullConfig = baseConfig.replace('</widget>', 
    `${androidConfig}${iosConfig}${windowsConfig}</widget>`);
  
  // Write config.xml
  fs.writeFileSync(path.join(cordovaDir, 'config.xml'), fullConfig);
  
  // Create www directory and symlink to pub
  const wwwDir = path.join(cordovaDir, 'www');
  if (!fs.existsSync(wwwDir)) {
    fs.mkdirSync(wwwDir, { recursive: true });
  }
  
  // Create symbolic link
  try {
    // Remove existing link if it exists
    if (fs.existsSync(path.join(wwwDir, 'index.html'))) {
      fs.unlinkSync(path.join(wwwDir, 'index.html'));
    }
    
    // Create link from pub/game.html to www/index.html
    fs.symlinkSync(
      path.join(pubDir, 'game.html'),
      path.join(wwwDir, 'index.html')
    );
    
    console.log('Created symbolic link from pub/game.html to cordova/www/index.html');
  } catch (error) {
    console.error('Failed to create symbolic link:', error.message);
    console.log('Copying file instead...');
    
    // Copy file as fallback
    fs.copyFileSync(
      path.join(pubDir, 'game.html'),
      path.join(wwwDir, 'index.html')
    );
  }
  
  console.log('Cordova project initialized successfully!');
} else {
  console.log('Cordova project already initialized.');
}
```

### 2. add-platforms.js

This script will add the specified platform to the Cordova project:

```javascript
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
const validPlatforms = ['android', 'ios', 'windows'];
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

// Add platform
console.log(`Adding ${platform} platform...`);
try {
  execSync(`cordova platform add ${platform}`, { 
    cwd: cordovaDir,
    stdio: 'inherit'
  });
  console.log(`${platform} platform added successfully!`);
} catch (error) {
  console.error(`Failed to add ${platform} platform:`, error.message);
  process.exit(1);
}
```

### 3. build-android.js

This script will build the Android APK:

```javascript
// cordova/scripts/build-android.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Paths
const rootDir = path.resolve(__dirname, '../..');
const cordovaDir = path.join(rootDir, 'cordova');
const pubDir = path.join(rootDir, 'pub');
const wwwDir = path.join(cordovaDir, 'www');

// Check if Cordova project is initialized
if (!fs.existsSync(path.join(cordovaDir, 'config.xml'))) {
  console.error('Cordova project not initialized. Please run "Initialize Cordova Project" task first.');
  process.exit(1);
}

// Check if Android platform is added
if (!fs.existsSync(path.join(cordovaDir, 'platforms', 'android'))) {
  console.error('Android platform not added. Please run "Add Android Platform" task first.');
  process.exit(1);
}

// Update www/index.html with latest game.html
console.log('Updating www/index.html with latest game.html...');
fs.copyFileSync(
  path.join(pubDir, 'game.html'),
  path.join(wwwDir, 'index.html')
);

// Build Android APK
console.log('Building Android APK...');
try {
  execSync('cordova build android', { 
    cwd: cordovaDir,
    stdio: 'inherit'
  });
  
  // Get the path to the generated APK
  const apkPath = path.join(cordovaDir, 'platforms', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  
  console.log('\nAndroid APK built successfully!');
  console.log(`APK location: ${apkPath}`);
} catch (error) {
  console.error('Failed to build Android APK:', error.message);
  process.exit(1);
}
```

Similar scripts would be created for iOS and Windows builds.

## GitHub Actions Workflow Update

Update the GitHub Actions workflow to include Cordova builds:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Set up Tweego
      run: |
        mkdir -p $HOME/tweego
        cp -r bin/tweego-2.1.1-linux-x64/* $HOME/tweego/
        chmod +x $HOME/tweego/tweego
        echo "$HOME/tweego" >> $GITHUB_PATH
    
    - name: Compile Game
      run: |
        tweego -o pub/game.html -f sugarcube-2 src
    
    - name: Test Compilation
      run: |
        tweego -t -o pub/game.html -f sugarcube-2 src
    
    - name: Upload Web Artifact
      uses: actions/upload-artifact@v4
      with:
        name: web-game
        path: pub/game.html
    
    - name: Deploy to GitHub Pages
      if: github.event_name != 'pull_request'
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: pub
        branch: gh-pages
    
    - name: Set up Cordova
      run: |
        npm install -g cordova
        npm install -g cordova-res
    
    - name: Initialize Cordova Project
      run: node cordova/scripts/init-cordova.js
    
    - name: Add Android Platform
      run: node cordova/scripts/add-platforms.js android
    
    - name: Generate Resources
      run: node cordova/scripts/generate-resources.js
    
    - name: Build Android APK
      run: node cordova/scripts/build-android.js
    
    - name: Upload Android Artifact
      uses: actions/upload-artifact@v4
      with:
        name: android-app
        path: cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## Documentation Updates

Create a new documentation file for Cordova deployment:

```markdown
# Mobile and Desktop Deployment

This guide explains how to package your Twine game as a native application for Android, iOS, and Windows using Apache Cordova.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [Apache Cordova](https://cordova.apache.org/): `npm install -g cordova`
- [Cordova Resource Generator](https://github.com/ionic-team/cordova-res): `npm install -g cordova-res`

### Platform-Specific Requirements

#### Android
- [Android Studio](https://developer.android.com/studio)
- Java Development Kit (JDK) 8 or newer
- Set ANDROID_HOME environment variable to your Android SDK location

#### iOS (macOS only)
- [Xcode](https://developer.apple.com/xcode/)
- Xcode Command Line Tools
- [CocoaPods](https://cocoapods.org/): `sudo gem install cocoapods`

#### Windows
- [Visual Studio](https://visualstudio.microsoft.com/) with Universal Windows Platform development workload

## Getting Started

1. **Initialize Cordova Project**
   - In VSCode, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   - Type "Tasks: Run Task"
   - Select "Initialize Cordova Project"

2. **Add Platform**
   - Run the appropriate task for your target platform:
     - "Add Android Platform"
     - "Add iOS Platform"
     - "Add Windows Platform"

3. **Generate Resources**
   - Run the "Generate App Resources" task
   - This will create icons and splash screens for all platforms

4. **Build Application**
   - Run the appropriate build task:
     - "Build Android App"
     - "Build iOS App"
     - "Build Windows App"

## Customizing Your App

### App Information

Edit the `cordova/config.xml` file to customize:
- App ID (`widget id` attribute)
- App name (`name` element)
- App description (`description` element)
- Author information (`author` element)

### App Icons and Splash Screens

Replace the template images in the `cordova/res-templates` directory:
- `icon.png` (1024x1024 pixels)
- `splash.png` (2732x2732 pixels)

Then run the "Generate App Resources" task to regenerate all resources.

## Distribution

### Android

1. **Create a Keystore**
   ```
   keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Build Release APK**
   ```
   cd cordova
   cordova build android --release -- --keystore=path/to/my-release-key.keystore --storePassword=password --alias=alias_name --password=password
   ```

3. **Submit to Google Play Store**
   - Create a [Google Play Developer account](https://play.google.com/console/signup)
   - Follow the submission process in the Google Play Console

### iOS

1. **Create an Apple Developer Account**
   - Sign up at [Apple Developer Program](https://developer.apple.com/programs/)

2. **Configure Code Signing**
   - Open the Xcode project in `cordova/platforms/ios`
   - Configure your provisioning profile and certificates

3. **Build for App Store**
   ```
   cd cordova
   cordova build ios --release
   ```

4. **Submit to App Store**
   - Use Xcode or Application Loader to submit your app

### Windows

1. **Create a Microsoft Developer Account**
   - Sign up at [Microsoft Partner Center](https://partner.microsoft.com/en-us/dashboard/windows/overview)

2. **Build for Microsoft Store**
   ```
   cd cordova
   cordova build windows --release -- --archs="x86 x64 arm"
   ```

3. **Submit to Microsoft Store**
   - Follow the submission process in the Partner Center

## Troubleshooting

### Common Issues

#### Android Build Fails
- Ensure ANDROID_HOME is set correctly
- Make sure you have accepted all SDK licenses: `sdkmanager --licenses`

#### iOS Build Fails
- Make sure Xcode and Command Line Tools are up to date
- Check that CocoaPods is installed correctly

#### Windows Build Fails
- Ensure Visual Studio is installed with the correct workloads
- Check that Windows 10 SDK is installed
```

This detailed implementation plan provides the foundation for integrating Apache Cordova with the Twine Template. The next steps would involve creating the actual scripts and testing the integration with a sample Twine game.