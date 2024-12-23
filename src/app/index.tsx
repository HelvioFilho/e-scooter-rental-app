import { Stack } from "expo-router";
import React from "react";

import Map from "@/components/Map";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <Map />
    </>
  );
}
