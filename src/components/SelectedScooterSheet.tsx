import { useEffect, useRef } from "react";
import { Image, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useScooter } from "@/providers/ScooterProvider";

import scooterImage from "@/assets/images/scooter.png";
import { FontAwesome6 } from "@expo/vector-icons";

export default function SelectedScooterSheet() {
  const { selectedScooter } = useScooter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enablePanDownToClose
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            padding: 10,
          }}
        >
          <Image source={scooterImage} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1, gap: 8 }}>
            <Text>Interbras e-Scooter</Text>
            <Text> 350w - 30km/h</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <FontAwesome6 name="bolt-lightning" size={24} color="green" />
            <Text>12 km</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
