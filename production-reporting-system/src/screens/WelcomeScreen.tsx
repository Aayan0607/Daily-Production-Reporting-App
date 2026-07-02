import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigation } from "@react-navigation/native";
import { useProduction } from "../context/ProductionContext";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function WelcomeScreen() {

  const navigation = useNavigation<any>();

  const { updateSession } = useProduction();

  const [operatorName, setOperatorName] = useState("");

  const handleContinue = async () => {

  if (!operatorName.trim()) {
    Alert.alert(
      "Missing Operator",
      "Please enter your name."
    );
    return;
  }

  const { data, error } = await supabase
    .from("operators")
    .select("id, operator_name")
    .ilike("operator_name", operatorName.trim())
    .single();

  if (error || !data) {
    Alert.alert(
      "Operator Not Found",
      "This operator has not been added by the admin."
    );
    return;
  }

  updateSession({
    sessionId: Date.now().toString(),
    operatorId: data.id.toString(),
    operatorName: data.operator_name,
  });

  navigation.navigate("OperatorInfo");
};

  const handleAdminPortal = () => {
    navigation.navigate("AdminLogin");
  };
  return (
    <ScreenContainer>

      <View style={styles.container}>

        <Text style={styles.title}>
          Daily Production
        </Text>

        <Text style={styles.subtitle}>
          Reporting System
        </Text>

        <Text style={styles.label}>
          Operator Name
        </Text>

        <TextInput
          placeholder="Enter your name"
          value={operatorName}
          onChangeText={setOperatorName}
          style={styles.input}
        />

        <PrimaryButton
          title="Login"
          onPress={handleContinue}
        />

        <TouchableOpacity
          onPress={handleAdminPortal}
        >
          <Text style={styles.adminButton}>
            Admin Portal
          </Text>
        </TouchableOpacity>

      </View>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.text,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: Colors.secondaryText,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: Colors.surface,
    color: Colors.text,
  },

  adminButton: {
    textAlign: "center",
    marginTop: 30,
    color: Colors.secondaryText,
    fontSize: 15,
  },
});