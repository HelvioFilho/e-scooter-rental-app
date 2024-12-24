import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";

import scooters from "@/data/scooters.json";

import pin from "@/assets/images/pin.png";
import { useScooter } from "@/providers/ScooterProvider";

export default function ScooterMarkers() {
  const { setSelectedScooter } = useScooter();

  const points = scooters.map((scooter) =>
    point([scooter.long, scooter.lat], { scooter })
  );

  const onPointPress = async (event: OnPressEvent) => {
    if (event?.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };

  return (
    <ShapeSource
      id="scooters"
      cluster
      shape={featureCollection(points)}
      onPress={onPointPress}
    >
      <SymbolLayer
        id="pointCount"
        style={{
          textField: ["get", "point_count"],
          textSize: 16,
          textColor: "#ffffff",
          textPitchAlignment: "map",
        }}
      />
      <CircleLayer
        id="clusteredScooters"
        belowLayerID="pointCount"
        filter={["has", "point_count"]}
        style={{
          circlePitchAlignment: "map",
          circleColor: "#55A4C0",
          circleRadius: 20,
          circleOpacity: 0.5,
          circleStrokeWidth: 1.5,
          circleStrokeColor: "white",
        }}
      />
      <SymbolLayer
        id="symbolLocationSymbols"
        filter={["!", ["has", "point_count"]]}
        minZoomLevel={1}
        style={{
          iconImage: "pin",
          iconAllowOverlap: true,
          iconSize: 0.5,
          iconAnchor: "bottom",
        }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
}
