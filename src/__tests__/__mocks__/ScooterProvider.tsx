import React, { createContext, useContext, ReactNode } from "react";

interface ScooterContextType {
  selectedScooter:
    | {
        id: number;
        lat: number;
        long: number;
      }
    | undefined;
  setSelectedScooter: (scooter: {
    id: number;
    lat: number;
    long: number;
  }) => void;
  reservedScooter?: {
    id: number;
    lat: number;
    long: number;
  };
  setReservedScooter: (scooter?: {
    id: number;
    lat: number;
    long: number;
  }) => void;

  selectedDirection?: any;
  selectedDirectionCoordinates?: [number, number][];
  selectedRouteTime?: number;
  selectedRouteDistance?: number;

  reservedDirection?: any;
  setReservedDirection: (direction?: any) => void;
  reservedDirectionCoordinates?: [number, number][];
  reservedRouteTime?: number;
  reservedRouteDistance?: number;

  shouldDisplayRoute: boolean;
  setShouldDisplayRoute: (value: boolean) => void;
}

const ScooterContext = createContext<ScooterContextType>({
  selectedScooter: undefined,
  setSelectedScooter: jest.fn(),
  reservedScooter: undefined,
  setReservedScooter: jest.fn(),
  selectedDirection: undefined,
  selectedDirectionCoordinates: undefined,
  selectedRouteTime: undefined,
  selectedRouteDistance: undefined,
  reservedDirection: undefined,
  setReservedDirection: jest.fn(),
  reservedDirectionCoordinates: undefined,
  reservedRouteTime: undefined,
  reservedRouteDistance: undefined,
  shouldDisplayRoute: false,
  setShouldDisplayRoute: jest.fn(),
});

interface ScooterProviderProps {
  children: ReactNode;
}

export const ScooterProvider: React.FC<ScooterProviderProps> = ({
  children,
}) => (
  <ScooterContext.Provider
    value={{
      selectedScooter: undefined,
      setSelectedScooter: jest.fn(),
      reservedScooter: undefined,
      setReservedScooter: jest.fn(),
      selectedDirection: undefined,
      selectedDirectionCoordinates: undefined,
      selectedRouteTime: undefined,
      selectedRouteDistance: undefined,
      reservedDirection: undefined,
      setReservedDirection: jest.fn(),
      reservedDirectionCoordinates: undefined,
      reservedRouteTime: undefined,
      reservedRouteDistance: undefined,
      shouldDisplayRoute: false,
      setShouldDisplayRoute: jest.fn(),
    }}
  >
    {children}
  </ScooterContext.Provider>
);

export const useScooter = () => useContext(ScooterContext);
