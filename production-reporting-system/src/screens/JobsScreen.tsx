import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function JobsScreen() {

  const [jobName, setJobName] = useState("");
  const [expectedQty, setExpectedQty] = useState("");
  const [ups, setUps] = useState("UPS-A");

  const [jobs, setJobs] = useState([
    {
      id: "1",
      name: "4 LTR BR",
      expectedQty: "1200",
      ups: "UPS-A",
    },
    {
      id: "2",
      name: "2 LTR BR",
      expectedQty: "900",
      ups: "UPS-B",
    },
  ]);

  function addJob() {
    if (!jobName.trim()) return;

    setJobs([
      ...jobs,
      {
        id: Date.now().toString(),
        name: jobName,
        expectedQty,
        ups,
      },
    ]);

    setJobName("");
    setExpectedQty("");
    setUps("UPS-A");
  }

  function deleteJob(id: string) {
    setJobs(jobs.filter((item) => item.id !== id));
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

      <View style={styles.picker}>
        <Picker
          selectedValue={ups}
          onValueChange={(value) => setUps(value)}
        >
          <Picker.Item label="UPS-A" value="UPS-A" />
          <Picker.Item label="UPS-B" value="UPS-B" />
          <Picker.Item label="UPS-C" value="UPS-C" />
        </Picker>
      </View>

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
                {item.name}
              </Text>

              <Text>
                Expected: {item.expectedQty}
              </Text>

              <Text>
                UPS: {item.ups}
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

  picker: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
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