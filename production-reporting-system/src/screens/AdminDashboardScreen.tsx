import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";

export default function AdminDashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer>
      <View style={styles.container}>

        <PrimaryButton
          title="Manage Operators"
          onPress={() => navigation.navigate("Operators")}
        />

        <PrimaryButton
          title="Manage Machines"
          onPress={() => navigation.navigate("Machines")}
        />

        <PrimaryButton
          title="Manage Jobs"
          onPress={() => navigation.navigate("Jobs")}
        />

        <PrimaryButton
          title="View Reports"
          onPress={() => navigation.navigate("Reports")}
        />

        <PrimaryButton
          title="Machine Status"
          onPress={() => navigation.navigate("MachineStatus")}
        />

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
});