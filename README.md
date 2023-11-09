# Ball Animation React Native App

This React Native app animates a ball on the screen that reacts to the device's accelerometer, simulating the effect of gravity and collision with the edges of the screen.

## Features

- Uses device accelerometer to determine the direction of gravity.
- Ball bounces off the screen edges with damping effect.
- Friction is applied to simulate natural ball movement.

## Requirements

- Node.js
- npm or Yarn
- A physical device with an accelerometer (for testing)

## Setup

To run this project, install it locally using npm (or Yarn):

```bash
npm install
# or
yarn install
```

## Running the App

To start the app, run the following command:

    expo start

This will open a new tab in your default web browser with the Expo developer tools. From there, you can run the app on an iOS or Android simulator, or on a physical device by scanning the QR code with the Expo Go app (available on the App Store and Google Play).

## Testing the App

To test the accelerometer animation, you will need to run the app on a physical device:

- Open the Expo Go app on your device.
- Scan the QR code provided by the Expo developer tools.
- Tilt your device to see the ball react to the accelerometer data.

## Notes

The app uses expo-sensors to access accelerometer data.
The ball's movement is managed by a combination of useState and useEffect hooks to create an animation loop at 60 FPS.
The Animated.View from react-native-reanimated is used to apply dynamic styles for the ball's position.
