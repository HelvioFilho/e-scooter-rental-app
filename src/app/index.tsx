import { Stack } from "expo-router";
import React from "react";

import Map from "@/components/Map";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <Map />
    </>
  );
}
