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
  selectedScooter: ScooterProps | null;
  setSelectedScooter: (scooter: ScooterProps) => void;
  direction?: RouteResponse;
  directionCoordinates?: [number, number][]; // Adicionado ao tipo
};

const ScooterContext = createContext<ScooterContextValue | undefined>(
  undefined
);

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<ScooterProps | null>(
    null
  );
  const [direction, setDirection] = useState<RouteResponse>();

  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();

      if (selectedScooter) {
        const newDirection = await getRoute(
          [myLocation.coords.longitude, myLocation.coords.latitude],
          [selectedScooter.long, selectedScooter.lat]
        );
        setDirection(newDirection);
      }
    };

    if (selectedScooter) {
      fetchDirections();
    }
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction?.routes[0].geometry.coordinates,
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
