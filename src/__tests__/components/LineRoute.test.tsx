import React from "react";
import { render } from "@testing-library/react-native";
import LineRoute from "@/components/LineRoute";

describe("LineRoute Component", () => {
  it("renders ShapeSource with correct shape data", () => {
    const coordinates: [number, number][] = [
      [-73.935242, 40.73061],
      [-73.984016, 40.754932],
    ];

    const { getByTestId } = render(<LineRoute coordinates={coordinates} />);
    const shapeSource = getByTestId("ShapeSourceMock");

    expect(shapeSource.props.shape).toMatchObject({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
    });
    expect(shapeSource.props.lineMetrics).toBe(true);
  });

  it("renders LineLayer with correct style", () => {
    const coordinates: [number, number][] = [
      [-73.935242, 40.73061],
      [-73.984016, 40.754932],
    ];

    const { getByTestId } = render(<LineRoute coordinates={coordinates} />);
    const lineLayer = getByTestId("LineLayerMock");

    expect(lineLayer.props.style).toMatchObject({
      lineColor: "#42A2D9",
      lineCap: "round",
      lineJoin: "round",
      lineWidth: 7,
    });
  });
});
