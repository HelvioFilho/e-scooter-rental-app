import React, { useEffect } from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ScooterProvider from "@/providers/ScooterProvider";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView testID="layout-content" style={{ flex: 1 }}>
      <ScooterProvider>
        <Stack />
      </ScooterProvider>
    </GestureHandlerRootView>
  );
}
