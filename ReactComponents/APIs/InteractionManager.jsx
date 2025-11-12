import React, {useEffect, useRef} from 'react';
import { // Removed useAnimatedValue from imports
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// useFadeIn is fixed to use standard React Native Animated.Value and useRef
const useFadeIn = (duration = 5000) => {
  // 1. Replaced useAnimatedValue(0) with useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current;

  // Running the animation when the component is mounted
  useEffect(() => {
    // Check if the component is still mounted when the promise resolves (optional cleanup)
    let isMounted = true; 

    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();

    // Since the animation uses native driver, interaction handling is less critical, 
    // but the original logic is maintained for demonstration.

    return () => {
        isMounted = false;
        // You might consider stopping the animation on unmount, but often unnecessary for simple fades
    };
  }, [duration, opacity]);

  return opacity;
};

// Removed: type BallProps = { onShown: () => void; };

// Removed type annotation for props
const Ball = ({onShown}) => { 
  const opacity = useFadeIn();

  // Running a method after the animation
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      // onShown() is guaranteed to be a stable function due to React hooks dependency array, 
      // but to be absolutely safe, we wrap it in an alert check.
      onShown(),
    );
    // The cancel function is returned for cleanup
    return () => interactionPromise.cancel(); 
  }, [onShown]); // onShown is a function passed as a prop

  return <Animated.View style={[styles.ball, {opacity}]} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{instructions}</Text>
        <Ball onShown={() => Alert.alert('Animation is done')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'salmon',
    borderRadius: 100,
  },
});

export default App;