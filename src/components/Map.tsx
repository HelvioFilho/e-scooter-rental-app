import React from "react";
import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";

import pin from "@/assets/images/pin.png";
import scooters from "@/data/scooters.json";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN || "");

export default function Map() {
  const points = scooters.map((scooter) => point([scooter.long, scooter.lat]));

  return (
    <>
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
        <Camera followZoomLevel={16} followUserLocation />
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />
        <ShapeSource
          id="scooters"
          cluster
          shape={featureCollection(points)}
          onPress={(event) => console.log(JSON.stringify(event, null, 2))}
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
      </MapView>
    </>
  );
}
