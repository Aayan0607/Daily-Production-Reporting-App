import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";

import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";

import { supabase } from "../services/supabase";

export default function OperatorInfoScreen() {
  const navigation = useNavigation<any>();

  const { session, updateSession } = useProduction();

  const [machines, setMachines] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  const [machineCode, setMachineCode] = useState("");
  const [jobName, setJobName] = useState("");
  const [ups, setUps] = useState("");

  const upsOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "3+3", value: 6 },
  ];


  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setCurrentDate(now.toLocaleDateString());

      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const { data: machinesData } = await supabase
      .from("machines")
      .select("*")
      .order("machine_code");

    const { data: jobsData } = await supabase
      .from("jobs")
      .select("*")
      .order("job_name");

    setMachines(machinesData ?? []);
    setJobs(jobsData ?? []);
  }

  const handleStartProduction = () => {
    if (!machineCode || !jobName || !ups) {
      alert("Please complete all fields.");
      return;
    }

    updateSession({
      machineCode,
      jobName,
      ups,
    });

    navigation.navigate("Production");
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Work Information
          </Text>

          <Text style={styles.headerText}>
            Operator : {session.operatorName}
          </Text>

          <Text style={styles.headerText}>
            Date : {currentDate}
          </Text>

          <Text style={styles.headerText}>
            Time : {currentTime}
          </Text>

        </View>

        {/* Machine */}

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

            {machines.map((machine) => (
              <Picker.Item
                key={machine.id}
                label={machine.machine_code}
                value={machine.machine_code}
              />
            ))}
          </Picker>
        </View>

        {/* Job */}

        <Text style={styles.label}>
          Job Name
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jobName}
            onValueChange={(value) => {
              setJobName(value);
            }
            }
          >
            <Picker.Item
              label="Select Job"
              value=""
            />

            {jobs.map((job) => (
              <Picker.Item
                key={job.id}
                label={job.job_name}
                value={job.job_name}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>
          ups
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={ups}
            onValueChange={(value) => setUps(value)}
          >
            <Picker.Item
              label="Select UPS"
              value=""
            />

            {upsOptions.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <PrimaryButton
          title="Start Production"
          onPress={handleStartProduction}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#EEF3F9",
  },

  header: {
    backgroundColor: "#173D8F",
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },

  headerText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173D8F",
    marginBottom: 8,
    marginTop: 10,
  },

  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 18,
  },
});