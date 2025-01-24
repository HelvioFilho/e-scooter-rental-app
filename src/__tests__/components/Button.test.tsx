import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Button } from "@/components/Button";

describe("Button Component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(<Button title="Click Here" />);
    const buttonTitle = getByText("Click Here");
    expect(buttonTitle).toBeTruthy();
  });

  it("calls the onPress function when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button title="Click Here" onPress={mockOnPress} />
    );
    fireEvent.press(getByRole("button"));
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders the icon when passed", () => {
    const Icon = () => <Text>TestIcon</Text>;
    const { getByText } = render(<Button icon={<Icon />} />);
    expect(getByText("TestIcon")).toBeTruthy();
  });

  it("does not break if no title is passed", () => {
    const { queryByText } = render(<Button />);
    expect(queryByText("Click Here")).toBeNull();
  });
});
