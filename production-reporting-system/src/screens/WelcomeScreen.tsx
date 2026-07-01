import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useNavigation } from "@react-navigation/native";
import { useProduction } from "../context/ProductionContext";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function WelcomeScreen() {
  const [operatorId, setOperatorId] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const navigation = useNavigation<any>();
  const { session, updateSession } = useProduction();

  const handleContinue = () => {

    if (!operatorId || !operatorName) {
      alert("Please fill all fields.");
      return;
    }

    updateSession({
      sessionId: Date.now().toString(),
      operatorId,
      operatorName,
    });

    navigation.navigate("OperatorInfo");
  };

  const handleAdminPortal = () => {
    console.log("Admin");
    navigation.navigate("AdminLogin")
  };

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("test")
        .select("*");

      console.log(data);
      console.log(error);
    }

    testConnection();
  }, []);
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>
          Daily Production
        </Text>

        <Text style={styles.subtitle}>
          Reporting System
        </Text>

        <TextInput
          placeholder="Operator ID"
          value={operatorId}
          onChangeText={setOperatorId}
          style={styles.input}
        />

        <TextInput
          placeholder="Operator Name"
          value={operatorName}
          onChangeText={setOperatorName}
          style={styles.input}
        />

        <PrimaryButton
          title="Continue"
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