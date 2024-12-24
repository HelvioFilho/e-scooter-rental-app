import ScooterProvider from "@/providers/ScooterProvider";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ScooterProvider>
      <Stack />
    </ScooterProvider>
  );
}
