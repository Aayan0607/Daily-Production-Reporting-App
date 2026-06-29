import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { Spacing } from "../constants/spacing";

type ScreenContainerProps = {
  children: React.ReactNode;
};

export default function ScreenContainer({
  children,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
});