import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Layout from "@/app/_layout";
import * as SplashScreen from "expo-splash-screen";

jest.mock("expo-router", () => ({
  Stack: ({ children }: any) => <>{children}</>,
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("@expo-google-fonts/roboto", () => {
  return {
    useFonts: jest.fn().mockReturnValue([true, null]),
    Roboto_400Regular: jest.fn(),
    Roboto_500Medium: jest.fn(),
    Roboto_700Bold: jest.fn(),
  };
});

describe("Layout Screen", () => {
  it("should render null if fonts are not loaded yet", async () => {
    jest
      .spyOn(require("@expo-google-fonts/roboto"), "useFonts")
      .mockReturnValueOnce([false, null]);

    const { queryByTestId } = render(<Layout />);

    expect(queryByTestId("layout-content")).toBeNull();
  });

  it("should render the layout content after fonts are loaded", async () => {
    const { getByTestId } = render(<Layout />);

    await waitFor(() => {
      expect(getByTestId("layout-content")).toBeTruthy();
    });

    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  it("should call hideAsync if there was an error loading fonts", async () => {
    jest
      .spyOn(require("@expo-google-fonts/roboto"), "useFonts")
      .mockReturnValueOnce([false, new Error("Font load error")]);

    render(<Layout />);

    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalled();
    });
  });
});
