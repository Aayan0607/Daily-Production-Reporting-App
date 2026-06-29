import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import ScreenContainer from "../components/ScreenContainer";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";

export default function OperatorInfoScreen() {

  const { session, updateSession } = useProduction();

  const [machineCode, setMachineCode] = useState("");
  const [jobName, setJobName] = useState("");
  const navigation = useNavigation<any>();

  const machineCodes = [
    "MC-101",
    "MC-102",
    "MC-103",
  ];

  const jobNames = [
    "4 LTR BR",
    "2 LTR BR",
    "1 LTR BR",
    "Other",
  ];

  const handleStart = () => {
    if (!machineCode || !jobName) {
      alert("Please select Machine and Job.");
      return;
    }

    updateSession({
      machineCode,
      jobName,
    });

    navigation.navigate("Production");
  };

  return (
    <ScreenContainer>

      <View style={styles.container}>

        <Text style={styles.heading}>
          Operator Details
        </Text>

        <View style={styles.card}>
          <Text style={styles.operatorName}>
            {session.operatorName}
          </Text>

          <Text style={styles.operatorId}>
            ID : {session.operatorId}
          </Text>
        </View>

        <Text style={styles.label}>
          Machine Code
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={machineCode}
            onValueChange={(value) =>
              setMachineCode(value)
            }
          >
            <Picker.Item
              label="Select Machine"
              value=""
            />

            {machineCodes.map((machine) => (
              <Picker.Item
                key={machine}
                label={machine}
                value={machine}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>
          Job Name
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jobName}
            onValueChange={(value) =>
              setJobName(value)
            }
          >
            <Picker.Item
              label="Select Job"
              value=""
            />

            {jobNames.map((job) => (
              <Picker.Item
                key={job}
                label={job}
                value={job}
              />
            ))}
          </Picker>
        </View>

        <PrimaryButton
          title="Start Production"
          onPress={handleStart}
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },

  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    marginBottom: 30,
  },

  operatorName: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },

  operatorId: {
    marginTop: 5,
    color: Colors.secondaryText,
    fontSize: 16,
  },

  label: {
    marginBottom: 8,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },

});