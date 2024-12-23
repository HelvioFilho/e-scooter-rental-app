import React from "react";
import Mapbox, {
  Camera,
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
  const scootersFeatures = featureCollection(points);
  return (
    <>
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
        <Camera followZoomLevel={16} followUserLocation />
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />
        <ShapeSource id="scooters" shape={scootersFeatures}>
          <SymbolLayer
            id="symbolLocationSymbols"
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
