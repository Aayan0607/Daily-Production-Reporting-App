import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../services/supabase";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function MachinesScreen() {

  const [machineName, setMachineName] = useState("");

  const [machines, setMachines] = useState<any[]>([]);

  const fetchMachines = async () => {

    const { data, error } = await supabase
      .from("machines")
      .select("*")
      .order("machine_code");

    if (!error && data) {
      setMachines(data);
    }

  };

  useEffect(() => {
    fetchMachines();
  }, []);

  async function addMachine() {

  if (!machineName.trim()) return;

  const { data, error } = await supabase
  .from("machines")
  .insert({
    machine_code: machineName,
  })
  .select()
  .single();

if (error) {
  console.log("Machine insert error:", error);
  return;
}

console.log(data);

const { error: statusError } = await supabase
  .from("machine_status")
  .insert({
    machine_id: data.id,
    status: "Idle",
    operator_name: null,
    current_job: null,
    ups: null,
    down_reason: null,
  });

console.log("Status insert error:", statusError);

setMachineName("");
fetchMachines();
}

  async function deleteMachine(id: number) {

  Alert.alert(
    "Delete Machine",
    "Are you sure?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {

          // Get machine code first
          const { data } = await supabase
            .from("machines")
            .select("machine_code")
            .eq("id", id)
            .single();

          if (data) {
            await supabase
              .from("machine_status")
              .delete()
              .eq("machine_id", id);
          }

          await supabase
            .from("machines")
            .delete()
            .eq("id", id);

          fetchMachines();

        },
      },
    ]
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.machine}>
              {item.machine_code}
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