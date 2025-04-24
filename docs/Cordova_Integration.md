# Mobile and Desktop Deployment with Apache Cordova

This guide explains how to package your Twine game as a native application for Android, iOS, macOS, Windows, and browser using Apache Cordova.

## Overview

The Twine Template (TwT) includes built-in support for packaging your Twine games as native applications using Apache Cordova. This allows you to distribute your games through app stores and other channels, reaching a wider audience.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [Apache Cordova](https://cordova.apache.org/): `npm install -g cordova`
- [Cordova Resource Generator](https://github.com/ionic-team/cordova-res): `npm install -g cordova-res`

### Platform-Specific Requirements

#### Android
The template includes an automated setup script for Android development environment:

1. Run the "Setup Android Development Environment" task in VSCode
2. The script will:
   - Download and install Android command-line tools
   - Set up the Android SDK
   - Accept SDK licenses
   - Install required SDK packages
   - Configure environment variables
3. Follow the instructions displayed after setup to add environment variables to your shell configuration

Manual requirements (if not using the automated setup):
- [Android Studio](https://developer.android.com/studio)
- Java Development Kit (JDK) 8 or newer
- Set ANDROID_HOME environment variable to your Android SDK location

#### iOS (macOS only)
- [Xcode](https://developer.apple.com/xcode/)
- Xcode Command Line Tools
- [CocoaPods](https://cocoapods.org/): `sudo gem install cocoapods`

#### Windows
- [Visual Studio](https://visualstudio.microsoft.com/) with Universal Windows Platform development workload

#### Browser
- No additional requirements
- Works with any modern web browser

## Getting Started

### Using VSCode Tasks

The template includes numbered tasks to guide you through the build and packaging process:

1. **Compile Game**
   - `1. Compile Game`: One-time compilation
   - `1a. Watch and Compile`: Auto-compile on changes
   - `1b. Test Compilation`: Verify compilation

2. **Initialize Cordova Project**
   - Run `2. Initialize Cordova Project`
   - Sets up the basic Cordova project structure

3. **Setup Development Environment**
   - For Android: Run `3. Setup Android Development Environment`
   - Automatically downloads and configures Android SDK
   - Follow the displayed instructions to set environment variables

4. **Generate Resources**
   - Run `4. Generate App Resources`
   - Creates icons and splash screens for all platforms

5. **Add Platform**
   - Choose the appropriate platform task:
     - `5a. Add Android Platform`
     - `5b. Add iOS Platform`
     - `5c. Add Windows Platform`
     - `5d. Add Browser Platform`

6. **Build Application**
   - Build for your target platform:
     - `6a. Build Android App`
     - `6b. Build iOS App`
     - `6c. Build Windows App`
     - `6d. Build Browser App`

The tasks are numbered to make it clear which steps should be performed and in what order. Each task will display its progress and any necessary instructions in a new terminal panel.

### Using GitHub Actions

The template also includes GitHub Actions workflows to automatically build your game for different platforms:

1. Push your changes to GitHub
2. The workflow will automatically:
   - Compile your Twine game
   - Build Android, iOS, and Windows packages (depending on the platform)
   - Upload the built applications as artifacts

## Customizing Your App

### App Information

Edit the `cordova/config.xml` file to customize:
- App ID (`widget id` attribute)
- App name (`name` element)
- App description (`description` element)
- Author information (`author` element)

### App Icons and Splash Screens

The template includes an automated resource generation system that creates platform-specific icons and splash screens. You can either:

1. **Use Automated Generation**
   - Run the "Generate App Resources" task in VSCode
   - This will create default icons and splash screens with your app name

2. **Use Custom Images**
   - Place your custom images in the `cordova/res-templates` directory:
     - `icon.png` (1024x1024 pixels)
     - `splash.png` (2732x2732 pixels)
   - Run the "Generate App Resources" task to create platform-specific versions

The generated resources will be placed in the appropriate platform directories and configured in your app automatically.

## Mobile Optimizations

The template includes several optimizations for mobile devices:

### Responsive Design
- Adapts to different screen sizes and orientations
- Optimized touch targets for better usability
- Platform-specific styling

### Mobile Features
- Offline support
- Auto-save functionality
- Export/import save data
- Font size and theme settings

### Performance Optimizations
- Image lazy loading
- Hardware-accelerated animations
- Touch event optimizations

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

### Browser

1. **Build for Browser**
   ```
   cd cordova
   cordova build browser
   ```

2. **Distribution Options**
   - **Self-hosting**: Upload the contents of `cordova/platforms/browser/www` to any web server
   - **Progressive Web App**: Add a manifest.json and service worker to make it installable
   - **Electron**: Package as a desktop application using Electron

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

#### Browser Build Fails
- Check that you have the latest version of Cordova installed
- Ensure your browser is compatible with the features used in your game

## Additional Resources

- [Apache Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [Cordova Platform Guides](https://cordova.apache.org/docs/en/latest/guide/platforms/index.html)
- [Cordova Config.xml Documentation](https://cordova.apache.org/docs/en/latest/config_ref/index.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
