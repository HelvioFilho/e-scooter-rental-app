import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";
import { getRoute, RouteResponse } from "@/services/directions";

type ScooterProps = {
  id: number;
  lat: number;
  long: number;
};

type ScooterContextValue = {
  selectedScooter: ScooterProps | undefined;
  setSelectedScooter: (scooter: ScooterProps) => void;
  reservedScooter?: ScooterProps;
  setReservedScooter: (scooter?: ScooterProps) => void;

  selectedDirection?: RouteResponse;
  selectedDirectionCoordinates?: [number, number][];
  selectedRouteTime?: number;
  selectedRouteDistance?: number;

  reservedDirection?: RouteResponse;
  setReservedDirection: (direction?: RouteResponse) => void;
  reservedDirectionCoordinates?: [number, number][];
  reservedRouteTime?: number;
  reservedRouteDistance?: number;

  shouldDisplayRoute: boolean;
  setShouldDisplayRoute: (value: boolean) => void;
};

const ScooterContext = createContext<ScooterContextValue | undefined>(
  undefined
);

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<ScooterProps>();
  const [reservedScooter, setReservedScooter] = useState<ScooterProps>();

  const [selectedDirection, setSelectedDirection] = useState<RouteResponse>();
  const [reservedDirection, setReservedDirection] = useState<RouteResponse>();

  const [shouldDisplayRoute, setShouldDisplayRoute] = useState(false);

  useEffect(() => {
    const fetchSelectedDirections = async () => {
      if (!selectedScooter) {
        setSelectedDirection(undefined);
        return;
      }

      const myLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getRoute(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      setSelectedDirection(newDirection);
    };

    fetchSelectedDirections();
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        reservedScooter,
        setReservedScooter,

        selectedDirection,
        selectedDirectionCoordinates:
          selectedDirection?.routes[0].geometry.coordinates,
        selectedRouteTime: selectedDirection?.routes[0].duration,
        selectedRouteDistance: selectedDirection?.routes[0].distance,

        reservedDirection,
        setReservedDirection,
        reservedDirectionCoordinates:
          reservedDirection?.routes[0].geometry.coordinates,
        reservedRouteTime: reservedDirection?.routes[0].duration,
        reservedRouteDistance: reservedDirection?.routes[0].distance,

        shouldDisplayRoute,
        setShouldDisplayRoute,
      }}
    >
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => {
  const context = useContext(ScooterContext);

  if (!context) {
    throw new Error("useScooter must be used within a ScooterProvider");
  }

  return context;
};
