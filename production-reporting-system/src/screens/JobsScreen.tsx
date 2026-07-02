import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../services/supabase";
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

export default function JobsScreen() {

  const [jobName, setJobName] = useState("");
  const [expectedQty, setExpectedQty] = useState("");

  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("job_name");

    if (!error && data) {
      setJobs(data);
    }
  }

  async function addJob() {

    if (!jobName.trim() || !expectedQty.trim()) {
      return;
    }

    const { error } = await supabase
      .from("jobs")
      .insert([
        {
          job_name: jobName.trim(),
          expected_quantity: Number(expectedQty),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setJobName("");
    setExpectedQty("");

    loadJobs();
  }

  async function deleteJob(id: string) {

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadJobs();
  }

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Manage Jobs
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Job Name"
        value={jobName}
        onChangeText={setJobName}
      />

      <TextInput
        style={styles.input}
        placeholder="Expected Quantity"
        keyboardType="numeric"
        value={expectedQty}
        onChangeText={setExpectedQty}
      />



      <PrimaryButton
        title="Add Job"
        onPress={addJob}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.job}>
                {item.job_name}
              </Text>

              <Text>
                Expected Quantity: {item.expected_quantity}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteJob(item.id)}
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
    marginBottom: 15,
    backgroundColor: Colors.surface,
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

  job: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },
});