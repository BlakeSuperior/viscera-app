# VISCERA Mobile App - Installation Guide

## Overview

VISCERA is a psychological simulator mobile application that presents users with immersive moral dilemmas and ethical simulations, analyzes their responses, and builds an evolving profile of their psyche. This document provides instructions for installing and deploying the VISCERA mobile app.

## Prerequisites

### For Development

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or Yarn (v1.22.0 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- CocoaPods (for iOS dependencies, macOS only)

### For Users

- Android device running Android 8.0 (Oreo) or higher
- iOS device running iOS 13.0 or higher

## Installation for Developers

### Setting Up the Development Environment

1. Clone the repository:
   ```
   git clone https://github.com/your-organization/viscera-app.git
   cd viscera-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (macOS only):
   ```
   cd ios
   pod install
   cd ..
   ```

### Running the App in Development Mode

#### For Android:

1. Start an Android emulator or connect an Android device
2. Enable USB debugging on your device if using a physical device
3. Run the following command:
   ```
   npx react-native run-android
   ```

#### For iOS (macOS only):

1. Connect an iOS device or use the iOS Simulator
2. Run the following command:
   ```
   npx react-native run-ios
   ```

### Building for Production

#### Android:

1. Generate a signing key:
   ```
   keytool -genkeypair -v -storetype PKCS12 -keystore viscera-app.keystore -alias viscera-app -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Place the keystore file in `android/app` directory

3. Configure signing in `android/gradle.properties`:
   ```
   MYAPP_UPLOAD_STORE_FILE=viscera-app.keystore
   MYAPP_UPLOAD_KEY_ALIAS=viscera-app
   MYAPP_UPLOAD_STORE_PASSWORD=*****
   MYAPP_UPLOAD_KEY_PASSWORD=*****
   ```

4. Build the APK:
   ```
   cd android
   ./gradlew assembleRelease
   ```

5. The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

#### iOS (macOS only):

1. Open the project in Xcode:
   ```
   open ios/VISCERAApp.xcworkspace
   ```

2. Select "Generic iOS Device" as the build target

3. Go to Product > Archive

4. Follow the Xcode distribution process to generate an IPA file

## Installation for Users

### Android

1. Enable installation from unknown sources in your device settings
2. Download the VISCERA APK file
3. Tap on the downloaded file to install
4. Follow the on-screen instructions to complete installation

### iOS

1. Download the VISCERA app from the App Store
2. Tap "Get" to install the app
3. Follow the on-screen instructions to complete installation

## Troubleshooting

### Common Issues

1. **Build fails with dependency errors**
   - Solution: Delete `node_modules` folder and run `npm install` or `yarn install` again

2. **App crashes on startup**
   - Solution: Check that your device meets the minimum OS requirements
   - Solution: Clear app data and cache, then restart the app

3. **UI elements appear distorted**
   - Solution: Ensure you're using the latest version of the app
   - Solution: Try adjusting display settings in the app's Settings screen

### Support

For additional support, please contact:
- Email: support@viscera-app.com
- Website: https://viscera-app.com/support

## Legal Information

VISCERA is licensed under the terms described in the LICENSE file included with this software.

Copyright © 2025 VISCERA Team. All rights reserved.
