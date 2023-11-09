import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const BALL_SIZE = 64;
const BOUND_X = width / 2 - BALL_SIZE / 2;
const BOUND_Y = height / 2 - BALL_SIZE / 2;
const SENSITIVITY = 7; // Sensitivity of accelerometer
const FRICTION = 0.98; // Friction factor on the ball's velocity
const BOUNCE_DAMPING = 0.7; // Energy lost on bounce, 0 for perfect bounce, higher for more damping
const MIN_VELOCITY_TO_SETTLE = 0.1; // Minimum velocity at which the ball will stop bouncing

export default function App() {
  // Position and velocity of the ball
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  // Update position based on velocity
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Apply friction to the velocity
        let frictionedVelocity = {
          x: velocity.x * FRICTION,
          y: velocity.y * FRICTION,
        };
        setVelocity(frictionedVelocity);

        // Calculate new position and check for wall collisions
        let newX = prevPosition.x + frictionedVelocity.x;
        let newY = prevPosition.y + frictionedVelocity.y;

        // Bounce off the walls with damping
        if (newX > BOUND_X || newX < -BOUND_X) {
          newX = newX > BOUND_X ? BOUND_X : -BOUND_X; // Correct the position
          if (Math.abs(frictionedVelocity.x) > MIN_VELOCITY_TO_SETTLE) {
            frictionedVelocity.x = -frictionedVelocity.x * BOUNCE_DAMPING;
          } else {
            frictionedVelocity.x = 0; // Stop bouncing
          }
        }
        if (newY > BOUND_Y || newY < -BOUND_Y) {
          newY = newY > BOUND_Y ? BOUND_Y : -BOUND_Y; // Correct the position
          if (Math.abs(frictionedVelocity.y) > MIN_VELOCITY_TO_SETTLE) {
            frictionedVelocity.y = -frictionedVelocity.y * BOUNCE_DAMPING;
          } else {
            frictionedVelocity.y = 0; // Stop bouncing
          }
        }

        // Update the velocity if a bounce occurred
        setVelocity(frictionedVelocity);

        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [velocity]);

  // Subscribe to the accelerometer
  useEffect(() => {
    Accelerometer.setUpdateInterval(16);
    const subscription = Accelerometer.addListener(({ x, y }) => {
      setVelocity((prevVelocity) => {
        // Update velocity based on current accelerometer data
        return {
          x: prevVelocity.x + x * SENSITIVITY,
          y: prevVelocity.y - y * SENSITIVITY, // Invert the y-axis
        };
      });
    });

    return () => subscription.remove();
  }, []);

  // Animated style for the ball
  const ballStyle = {
    ...styles.ball,
    transform: [{ translateX: position.x }, { translateY: position.y }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={ballStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "blue",
    position: "absolute",
  },
});
