import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../constants/colors";
import { Spacing } from "../constants/spacing";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;

  // Optional
  color?: string;
  textColor?: string;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  color = Colors.primary,
  textColor = "white",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? "#BDBDBD"
            : color,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: Spacing.lg,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});