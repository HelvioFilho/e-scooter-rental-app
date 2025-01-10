import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

type ButtonProps = {
  title?: string;
  icon?: React.ReactElement;
} & TouchableOpacityProps;

export function Button({ onPress, title, icon, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, style]}
      onPress={onPress}
      {...props}
    >
      {icon && icon}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#55A4C0",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
