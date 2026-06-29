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
};

export default function PrimaryButton({
  title,
  onPress,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: Spacing.lg,
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});