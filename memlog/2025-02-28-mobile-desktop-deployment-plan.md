# Mobile and Desktop Deployment Plan (2025-02-28)

## Overview

This plan outlines the steps needed to extend the Twine Template (TwT) to support deployment as native applications for Android, iOS, and Windows using Apache Cordova. This will allow users to package their Twine games as standalone applications that can be distributed through app stores and other channels.

## Apache Cordova Overview

[Apache Cordova](https://cordova.apache.org/) is an open-source mobile development framework that allows developers to build mobile applications using HTML, CSS, and JavaScript. It provides a set of APIs to access native device functionality (like camera, contacts, etc.) and allows packaging web applications as native applications for various platforms.

Cordova is well-suited for our Twine Template because:
1. Twine games are already HTML/CSS/JavaScript-based
2. Cordova supports multiple platforms (Android, iOS, Windows)
3. It requires minimal changes to the existing codebase
4. It provides a consistent build process across platforms

## Implementation Plan

### 1. Directory Structure Updates

Create a new directory structure to support Cordova:

```
./cordova/
├── config.xml                 # Cordova configuration file
├── hooks/                     # Cordova hooks directory
├── platforms/                 # Platform-specific code (auto-generated)
├── plugins/                   # Cordova plugins (auto-generated)
├── www/                       # Web assets (symlink to pub/ directory)
└── res/                       # Resources (icons, splash screens)
    ├── android/               # Android-specific resources
    ├── ios/                   # iOS-specific resources
    └── windows/               # Windows-specific resources
```

### 2. Required Dependencies

Users will need to install:

- [Node.js and npm](https://nodejs.org/)
- [Apache Cordova](https://cordova.apache.org/)
- Platform-specific requirements:
  - **Android**: Android Studio, Java Development Kit (JDK)
  - **iOS**: Xcode (macOS only), Apple Developer account
  - **Windows**: Visual Studio

### 3. Cordova Configuration

Create a base `config.xml` file with configurable options:

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.example.twinegame" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>TwineGame</name>
    <description>A Twine game created with TwT</description>
    <author email="dev@example.com" href="https://example.com">Your Name</author>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
</widget>
```

### 4. VSCode Tasks

Add new VSCode tasks for Cordova operations:

- Initialize Cordova project
- Add platforms (Android, iOS, Windows)
- Build for specific platforms
- Run on emulator/device
- Package for distribution

### 5. GitHub Actions Workflow Updates

Extend the existing GitHub Actions workflow to:

- Build Cordova applications for Android (and optionally Windows)
- Sign the Android APK with a keystore
- Upload the built applications as artifacts
- (iOS builds will require macOS runners and Apple Developer credentials)

### 6. Documentation Updates

Update documentation to include:

- Setup instructions for Cordova development
- Platform-specific requirements
- Building and testing instructions
- Distribution guidelines

### 7. Template Modifications

Make necessary modifications to the Twine template:

- Ensure the compiled game works well on mobile devices
- Add responsive design considerations
- Handle device-specific events (back button, etc.)
- Add offline capabilities

### 8. Resource Generation

Create templates for:

- App icons in various sizes
- Splash screens
- Store listings

## Detailed Implementation Steps

### Phase 1: Basic Cordova Integration

1. **Create Cordova Project Structure**
   - Create `cordova` directory
   - Create base `config.xml`
   - Set up resource directories

2. **Add VSCode Tasks**
   - Task to initialize Cordova project
   - Task to add platforms
   - Task to build for platforms

3. **Update Documentation**
   - Add basic Cordova setup instructions
   - Document dependencies

### Phase 2: Platform-Specific Configurations

1. **Android Configuration**
   - Set up Android-specific settings in `config.xml`
   - Create icon and splash screen templates
   - Add signing configuration

2. **iOS Configuration**
   - Set up iOS-specific settings in `config.xml`
   - Create icon and splash screen templates
   - Add provisioning profile handling

3. **Windows Configuration**
   - Set up Windows-specific settings in `config.xml`
   - Create icon templates

### Phase 3: Build and Distribution Pipeline

1. **GitHub Actions Integration**
   - Add Cordova build steps to workflow
   - Set up secrets for signing keys
   - Configure artifact uploads

2. **Distribution Documentation**
   - Google Play Store submission guide
   - Apple App Store submission guide
   - Microsoft Store submission guide

### Phase 4: Template Enhancements

1. **Mobile Optimizations**
   - Responsive design improvements
   - Touch input handling
   - Device orientation handling

2. **Offline Capabilities**
   - Service worker integration
   - Asset caching

## Technical Considerations

### 1. HTML Structure

The compiled Twine game is a single HTML file. For Cordova, we need to ensure:
- The HTML file is renamed to `index.html` in the Cordova `www` directory
- All assets (CSS, JS, media) are properly referenced

### 2. Permissions

Mobile apps require explicit permissions. We need to configure:
- Storage permissions for save games
- Internet permissions if the game uses online features
- Other permissions based on game features

### 3. Performance

Mobile devices have different performance characteristics:
- Optimize JavaScript execution
- Minimize DOM manipulations
- Reduce asset sizes

### 4. User Experience

Consider mobile-specific UX:
- Touch-friendly UI elements
- Appropriate font sizes
- Handling of device orientation changes

## Implementation Timeline

1. **Phase 1 (Basic Integration)**: 1-2 weeks
2. **Phase 2 (Platform Configurations)**: 2-3 weeks
3. **Phase 3 (Build Pipeline)**: 1-2 weeks
4. **Phase 4 (Enhancements)**: 2-3 weeks

Total estimated time: 6-10 weeks

## Resources

- [Apache Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [Cordova Platform Guides](https://cordova.apache.org/docs/en/latest/guide/platforms/index.html)
- [Cordova Config.xml Documentation](https://cordova.apache.org/docs/en/latest/config_ref/index.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Next Steps

1. Create initial Cordova project structure
2. Implement basic VSCode tasks
3. Test with a simple Twine game
4. Document the process