# Push notifications helper

A simple helper app for push notification service development.
Its based on react-native and expo framework and builds for the following targets:

* Web
* Android
* iOS

## Requirements

* `yarn`
* Expo account (required for building apps)
* Firbase account for Android notifications
* Apple developer account for building and APNS

## Installation

Install yarn dependencies and start the dev server
```
> yarn install
> cp app.json-dist app.json
> yarn run start
```

## Configuration

### Web optimized bundle

Add the following section in the config.

```javascript
{
    "expo": {
        "notification": {
            "serviceWorkerPath": "/expo-service-worker.js",
            "vapidPublicKey": "<VAPID PUBLIC KEY>"
        }
    }
}
```

Then run the following command to start the build

```
> ./node_modules/expo-cli/bin/expo.js build:web
```

### Android

Configure the firebase app used for notification, download the `google-services.json`file
and put it in the top level of the repository. Then configure the `android` section under `app.json`.

```javascript
{
    "expo": {
        "android": {
            "googleServicesFile": "./google-services.json",
            "package": "<Package name from google-services.json>",
            "versionCode": "<Version>"
        }
    }
}
```

Then run the following command to start the build and follow the instructions

```
> ./node_modules/expo-cli/bin/expo.js build:android
```

### iOS

Configure the iOS section of the config.

```javascript
{
    "expo": {
        "ios": {
            "bundleIdentifier": "<Bundle identifier>",
            "buildNumber": "<Build number>",
            "supportsTablet": true
        }
    }
}
```

Then run the following command to start the build and follow the instructions

```
> ./node_modules/expo-cli/bin/expo.js build:ios
```