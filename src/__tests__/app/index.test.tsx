import React from "react";
import { render } from "@testing-library/react-native";
import Home from "@/app/index";

jest.mock("expo-router", () => ({
  Stack: {
    Screen: jest.fn(() => null),
  },
}));

jest.mock("@/components/Map", () => {
  const { View } = require("react-native");
  return jest.fn(() => <View testID="map" />);
});

jest.mock("@/components/SelectedScooterSheet", () => {
  const { View } = require("react-native");
  return jest.fn(() => <View testID="selected-scooter-sheet" />);
});

describe("Home Screen", () => {
  it("should render the StatusBar, Stack.Screen, Map, and SelectedScooterSheet components", () => {
    const { getByTestId, queryByText } = render(<Home />);

    expect(getByTestId("map")).toBeTruthy();
    expect(getByTestId("selected-scooter-sheet")).toBeTruthy();
    expect(queryByText("Home")).toBeNull();
  });

  it("should match the snapshot", () => {
    const tree = render(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
