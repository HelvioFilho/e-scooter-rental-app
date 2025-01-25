import React from "react";
import { View, ViewProps } from "react-native";

interface ImagesProps extends ViewProps {
  images: { [key: string]: any };
}

export const ShapeSource: React.FC<ViewProps> = ({ children, ...props }) => (
  <View testID="ShapeSourceMock" {...props}>
    {children}
  </View>
);

export const LineLayer: React.FC<ViewProps> = (props) => (
  <View testID="LineLayerMock" {...props} />
);

export const CircleLayer: React.FC<ViewProps> = (props) => (
  <View testID="CircleLayerMock" {...props} />
);

export const Images: React.FC<ImagesProps> = ({ images, ...props }) => (
  // @ts-ignore
  <View testID="ImagesMock" {...props} images={images} />
);

export const SymbolLayer: React.FC<ViewProps & { id: string }> = ({
  id,
  ...props
}) => <View id={id} testID={`SymbolLayerMock-${id}`} {...props} />;

export const MapView: React.FC<ViewProps> = ({ children, ...props }) => (
  <View testID="MapViewMock" {...props}>
    {children}
  </View>
);

export const Camera: React.FC<ViewProps> = (props) => (
  <View testID="CameraMock" {...props} />
);

export const LocationPuck: React.FC<ViewProps> = (props) => (
  <View testID="LocationPuckMock" {...props} />
);

const setAccessToken = jest.fn();

export default {
  ShapeSource,
  LineLayer,
  CircleLayer,
  Images,
  SymbolLayer,
  MapView,
  Camera,
  LocationPuck,
  setAccessToken,
};
