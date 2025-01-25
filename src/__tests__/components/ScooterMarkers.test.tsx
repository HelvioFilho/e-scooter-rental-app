import React from "react";
import { render } from "@testing-library/react-native";
import ScooterMarkers from "@/components/ScooterMarkers";
import { useScooter } from "@/providers/ScooterProvider";
import scooters from "@/data/scooters.json";

jest.mock("@/providers/ScooterProvider");

describe("ScooterMarkers Component", () => {
  const mockSetSelectedScooter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useScooter as jest.Mock).mockReturnValue({
      setSelectedScooter: mockSetSelectedScooter,
      selectedScooter: undefined,
      setReservedScooter: jest.fn(),
      reservedScooter: undefined,
      setReservedDirection: jest.fn(),
      reservedDirection: undefined,
      reservedDirectionCoordinates: undefined,
      reservedRouteTime: undefined,
      reservedRouteDistance: undefined,
      shouldDisplayRoute: false,
      setShouldDisplayRoute: jest.fn(),
      selectedDirection: undefined,
      selectedDirectionCoordinates: undefined,
      selectedRouteTime: undefined,
      selectedRouteDistance: undefined,
    });
  });

  it("renders ShapeSource with correct shape data and cluster", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const shapeSource = getByTestId("ShapeSourceMock");

    expect(shapeSource).toBeTruthy();
    expect(shapeSource.props.id).toBe("scooters");
    expect(shapeSource.props.cluster).toBe(true);

    const expectedFeatureCollection = {
      type: "FeatureCollection",
      features: scooters.map((scooter) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [scooter.long, scooter.lat],
        },
        properties: {
          scooter,
        },
      })),
    };

    expect(shapeSource.props.shape).toMatchObject(expectedFeatureCollection);
  });

  it("renders SymbolLayer with correct style for 'symbolLocationSymbols'", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const symbolLayer = getByTestId("SymbolLayerMock-symbolLocationSymbols");

    expect(symbolLayer).toBeTruthy();
    expect(symbolLayer.props.filter).toEqual(["!", ["has", "point_count"]]);
    expect(symbolLayer.props.minZoomLevel).toBe(1);
    expect(symbolLayer.props.style).toMatchObject({
      iconImage: "pin",
      iconAllowOverlap: true,
      iconSize: 0.5,
      iconAnchor: "bottom",
    });
  });

  it("renders SymbolLayer with correct style for 'pointCount'", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const symbolLayer = getByTestId("SymbolLayerMock-pointCount");

    expect(symbolLayer).toBeTruthy();
    expect(symbolLayer.props.id).toBe("pointCount");
    expect(symbolLayer.props.style).toMatchObject({
      textField: ["get", "point_count"],
      textSize: 16,
      textColor: "#ffffff",
      textPitchAlignment: "map",
    });
  });

  it("renders CircleLayer with correct style and filter", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const circleLayer = getByTestId("CircleLayerMock");

    expect(circleLayer).toBeTruthy();
    expect(circleLayer.props.id).toBe("clusteredScooters");
    expect(circleLayer.props.belowLayerID).toBe("pointCount");
    expect(circleLayer.props.filter).toEqual(["has", "point_count"]);
    expect(circleLayer.props.style).toMatchObject({
      circlePitchAlignment: "map",
      circleColor: "#55A4C0",
      circleRadius: 20,
      circleOpacity: 0.5,
      circleStrokeWidth: 1.5,
      circleStrokeColor: "white",
    });
  });

  it("renders Images with correct images prop", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const images = getByTestId("ImagesMock");

    expect(images).toBeTruthy();
    expect(images.props.images).toHaveProperty("pin");
  });

  it("calls setSelectedScooter when a scooter point is pressed", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const shapeSource = getByTestId("ShapeSourceMock");

    const pressEvent = {
      features: [
        {
          properties: {
            scooter: scooters[0],
          },
        },
      ],
    };

    shapeSource.props.onPress(pressEvent);

    expect(mockSetSelectedScooter).toHaveBeenCalledWith(scooters[0]);
    expect(mockSetSelectedScooter).toHaveBeenCalledTimes(1);
  });

  it("does not call setSelectedScooter if no scooter is found in the press event", () => {
    const { getByTestId } = render(<ScooterMarkers />);
    const shapeSource = getByTestId("ShapeSourceMock");

    const pressEvent = {
      features: [
        {
          properties: {},
        },
      ],
    };

    shapeSource.props.onPress(pressEvent);

    expect(mockSetSelectedScooter).not.toHaveBeenCalled();
  });
});
