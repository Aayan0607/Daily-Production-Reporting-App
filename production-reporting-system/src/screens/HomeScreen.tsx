import { StyleSheet, Text } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Home Screen</Text>
      <PrimaryButton
    title="Continue"
    onPress={() => {}}
/>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});