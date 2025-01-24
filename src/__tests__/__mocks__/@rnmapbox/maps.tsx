import React from "react";
import { View, ViewProps } from "react-native";

// Mock simples para ShapeSource e LineLayer
export const ShapeSource: React.FC<ViewProps> = ({ children, ...props }) => (
  <View testID="ShapeSourceMock" {...props}>
    {children}
  </View>
);

export const LineLayer: React.FC<ViewProps> = (props) => (
  <View testID="LineLayerMock" {...props} />
);

// Exportação padrão, se necessário
export default {
  ShapeSource,
  LineLayer,
};
