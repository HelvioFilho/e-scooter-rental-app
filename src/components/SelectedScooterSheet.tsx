import { useEffect, useRef } from "react";
import { Image, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useScooter } from "@/providers/ScooterProvider";

import scooterImage from "@/assets/images/scooter.png";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Button } from "./Button";

export default function SelectedScooterSheet() {
  const {
    selectedScooter,
    selectedRouteTime,
    selectedRouteDistance,

    reservedScooter,
    setReservedScooter,
    selectedDirection,
    setReservedDirection,
    setShouldDisplayRoute,
  } = useScooter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  let buttonText = "Reservar";
  let buttonIcon = <FontAwesome6 name="lock" size={20} color={"white"} />;
  let buttonColor = "#55A4C0";

  if (reservedScooter) {
    if (reservedScooter.id === selectedScooter?.id) {
      buttonText = "Cancelar reserva";
      buttonIcon = <MaterialIcons name="cancel" size={24} color="white" />;
      buttonColor = "#d32f2f";
    } else {
      buttonText = "Alterar reserva";
      buttonIcon = <FontAwesome5 name="exchange-alt" size={24} color="white" />;
      buttonColor = "#d88d1c";
    }
  }

  const handleButtonPress = () => {
    if (!reservedScooter) {
      if (selectedScooter && selectedDirection) {
        setReservedScooter(selectedScooter);
        setReservedDirection(selectedDirection);
        setShouldDisplayRoute(true);
      }
    } else if (reservedScooter.id === selectedScooter?.id) {
      setReservedScooter(undefined);
      setReservedDirection(undefined);
      setShouldDisplayRoute(false);
      bottomSheetRef.current?.close();
    } else {
      if (selectedScooter && selectedDirection) {
        setReservedScooter(selectedScooter);
        setReservedDirection(selectedDirection);
        setShouldDisplayRoute(true);
      }
    }
  };

  useEffect(() => {
    if (selectedScooter !== undefined) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={["1%", 200]}
      enablePanDownToClose
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image source={scooterImage} style={{ width: 60, height: 60 }} />
            <View style={{ flex: 1, gap: 8 }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Roboto_700Bold",
                  fontSize: 20,
                }}
              >
                Interbras e-Scooter
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 18,
                  fontFamily: "Roboto_400Regular",
                }}
              >
                {" "}
                350w - 30km/h
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome6
                  name="flag-checkered"
                  size={20}
                  color={"#55A4C0"}
                />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Roboto_700Bold",
                    fontSize: 18,
                  }}
                >
                  {selectedRouteDistance &&
                    (selectedRouteDistance < 1000
                      ? `${selectedRouteDistance.toFixed(0)} m`
                      : `${(selectedRouteDistance / 1000).toFixed(1)} km`)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome6 name="clock" size={18} color={"#55A4C0"} />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Roboto_700Bold",
                    fontSize: 18,
                  }}
                >
                  {selectedRouteTime &&
                    (selectedRouteTime < 3600
                      ? `${Math.ceil(selectedRouteTime / 60)} min`
                      : `${Math.floor(selectedRouteTime / 3600)} h`)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Button
              onPress={handleButtonPress}
              title={buttonText}
              icon={buttonIcon}
              style={{ backgroundColor: buttonColor }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
