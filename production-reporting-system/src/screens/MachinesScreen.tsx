import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function MachinesScreen() {

  const [machineName, setMachineName] = useState("");

  const [machines, setMachines] = useState([
    { id: "1", code: "MC-101" },
    { id: "2", code: "MC-102" },
    { id: "3", code: "MC-103" },
  ]);

  function addMachine() {

    if (!machineName.trim()) return;

    setMachines([
      ...machines,
      {
        id: Date.now().toString(),
        code: machineName,
      },
    ]);

    setMachineName("");
  }

  function deleteMachine(id: string) {
    setMachines(
      machines.filter((item) => item.id !== id)
    );
  }

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Manage Machines
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Machine Code"
        value={machineName}
        onChangeText={setMachineName}
      />

      <PrimaryButton
        title="Add Machine"
        onPress={addMachine}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.machine}>
              {item.code}
            </Text>

            <TouchableOpacity
              onPress={() => deleteMachine(item.id)}
            >
              <Text style={styles.delete}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.surface,
    marginBottom: 15,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  machine: {
    fontSize: 18,
    color: Colors.text,
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },

}); 