import React from "react";
import { render } from "@testing-library/react-native";
import Map from "@/components/Map";
import { useScooter } from "@/providers/ScooterProvider";

jest.mock("@/providers/ScooterProvider");
jest.mock("@/components/LineRoute", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: ({ coordinates }: { coordinates: [number, number][] }) => {
      return <View testID="LineRouteMock" coordinates={coordinates} />;
    },
  };
});
jest.mock("@/components/ScooterMarkers", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => {
      return <View testID="ScooterMarkersMock" />;
    },
  };
});

describe("Map Component", () => {
  const mockUseScooter = useScooter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders MapView, Camera, LocationPuck, and ScooterMarkers", () => {
    mockUseScooter.mockReturnValue({
      reservedScooter: undefined,
      reservedDirectionCoordinates: undefined,
      shouldDisplayRoute: false,
    });

    const { getByTestId, queryByTestId } = render(<Map />);

    expect(getByTestId("MapViewMock")).toBeTruthy();
    expect(getByTestId("CameraMock")).toBeTruthy();
    expect(getByTestId("LocationPuckMock")).toBeTruthy();
    expect(getByTestId("ScooterMarkersMock")).toBeTruthy();
    expect(queryByTestId("LineRouteMock")).toBeNull();
  });

  it("renders LineRoute when shouldDisplayRoute, reservedScooter, and reservedDirectionCoordinates are present", () => {
    const reservedScooter = { id: 1, lat: 40.73061, long: -73.935242 };
    const reservedDirectionCoordinates: [number, number][] = [
      [-73.935242, 40.73061],
      [-73.984016, 40.754932],
    ];

    mockUseScooter.mockReturnValue({
      reservedScooter,
      reservedDirectionCoordinates,
      shouldDisplayRoute: true,
    });

    const { getByTestId } = render(<Map />);

    expect(getByTestId("MapViewMock")).toBeTruthy();
    expect(getByTestId("CameraMock")).toBeTruthy();
    expect(getByTestId("LocationPuckMock")).toBeTruthy();
    expect(getByTestId("ScooterMarkersMock")).toBeTruthy();

    const lineRoute = getByTestId("LineRouteMock");
    expect(lineRoute).toBeTruthy();
    expect(lineRoute.props.coordinates).toEqual(reservedDirectionCoordinates);
  });

  it("does not render LineRoute if shouldDisplayRoute is false", () => {
    const reservedScooter = { id: 1, lat: 40.73061, long: -73.935242 };
    const reservedDirectionCoordinates: [number, number][] = [
      [-73.935242, 40.73061],
      [-73.984016, 40.754932],
    ];

    mockUseScooter.mockReturnValue({
      reservedScooter,
      reservedDirectionCoordinates,
      shouldDisplayRoute: false,
    });

    const { getByTestId, queryByTestId } = render(<Map />);

    expect(getByTestId("MapViewMock")).toBeTruthy();
    expect(getByTestId("CameraMock")).toBeTruthy();
    expect(getByTestId("LocationPuckMock")).toBeTruthy();
    expect(getByTestId("ScooterMarkersMock")).toBeTruthy();
    expect(queryByTestId("LineRouteMock")).toBeNull();
  });

  it("does not render LineRoute if reservedScooter is undefined", () => {
    const reservedDirectionCoordinates: [number, number][] = [
      [-73.935242, 40.73061],
      [-73.984016, 40.754932],
    ];

    mockUseScooter.mockReturnValue({
      reservedScooter: undefined,
      reservedDirectionCoordinates,
      shouldDisplayRoute: true,
    });

    const { getByTestId, queryByTestId } = render(<Map />);

    expect(getByTestId("MapViewMock")).toBeTruthy();
    expect(getByTestId("CameraMock")).toBeTruthy();
    expect(getByTestId("LocationPuckMock")).toBeTruthy();
    expect(getByTestId("ScooterMarkersMock")).toBeTruthy();

    expect(queryByTestId("LineRouteMock")).toBeNull();
  });

  it("does not render LineRoute if reservedDirectionCoordinates is undefined", () => {
    const reservedScooter = { id: 1, lat: 40.73061, long: -73.935242 };

    mockUseScooter.mockReturnValue({
      reservedScooter,
      reservedDirectionCoordinates: undefined,
      shouldDisplayRoute: true,
    });

    const { getByTestId, queryByTestId } = render(<Map />);

    expect(getByTestId("MapViewMock")).toBeTruthy();
    expect(getByTestId("CameraMock")).toBeTruthy();
    expect(getByTestId("LocationPuckMock")).toBeTruthy();
    expect(getByTestId("ScooterMarkersMock")).toBeTruthy();
    expect(queryByTestId("LineRouteMock")).toBeNull();
  });
});
