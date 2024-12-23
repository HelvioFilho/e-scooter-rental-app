const URL = "https://api.mapbox.com/directions/v5/mapbox";

type RouteResponse = {
  routes: Array<{
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
  }>;
};

export const getRoute = async (
  origin: [number, number],
  dest: [number, number]
): Promise<RouteResponse> => {
  const res = await fetch(
    `${URL}/walking/${origin[0]},${origin[1]};${dest[0]},${dest[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAPBOX_TOKEN}`
  );
  return await res.json();
};
