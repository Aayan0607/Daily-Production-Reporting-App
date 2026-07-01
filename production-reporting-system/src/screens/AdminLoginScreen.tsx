import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function AdminLoginScreen() {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Temporary credentials
    if (username === "admin" && password === "admin123") {
      navigation.navigate("AdminDashboard");
    } else {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: Colors.surface,
    color: Colors.text,
  },
});