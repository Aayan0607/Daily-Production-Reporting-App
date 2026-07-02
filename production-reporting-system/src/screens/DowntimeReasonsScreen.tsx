import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";

import { useEffect } from "react";
import { supabase } from "../services/supabase";

export default function DowntimeReasonsScreen() {
  const [reasons, setReasons] = useState<any[]>([]);

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  async function loadReasons() {
  const { data, error } = await supabase
    .from("downtime_reasons")
    .select("*")
    .order("reason_code");

  if (!error && data) {
    setReasons(data);
  }
}

useEffect(() => {
  loadReasons();
}, []);

  const addReason = async () => {

  if (!code.trim() || !description.trim()) {
    Alert.alert("Error", "Fill all fields.");
    return;
  }

  const { error } = await supabase
    .from("downtime_reasons")
    .insert([
      {
        reason_code: code.trim(),
        description: description.trim(),
      },
    ]);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  setCode("");
  setDescription("");

  loadReasons();
};

  const deleteReason = (id: number) => {

  Alert.alert(
    "Delete",
    "Delete this downtime reason?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {

          const { error } = await supabase
            .from("downtime_reasons")
            .delete()
            .eq("id", id);

          if (error) {
            Alert.alert("Error", error.message);
            return;
          }

          loadReasons();
        },
      },
    ]
  );
};

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Downtime Reasons
      </Text>

      <FlatList
        data={reasons}
        keyExtractor={(item) => String(item.id)}
        
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.reasonInfo}>

              <Text style={styles.code}>
  {item.reason_code}
</Text>
              <Text style={styles.description}>
                {item.description}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteReason(item.id)
              }
            >
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

      <View style={styles.form}>

        <Text style={styles.label}>
          Reason Code
        </Text>

        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="D06"
          style={styles.input}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter reason"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addReason}
        >
          <Text style={styles.addButtonText}>
            Add Reason
          </Text>
        </TouchableOpacity>
              </View>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    alignSelf: "center",
  },

  list: {
    flex: 1,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: Colors.surface,

    padding: 15,
    marginBottom: 12,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: Colors.border,
  },

  reasonInfo: {
    flex: 1,
  },

  code: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },

  description: {
    fontSize: 15,
    color: Colors.text,
    marginTop: 4,
  },

  deleteButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  form: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

});