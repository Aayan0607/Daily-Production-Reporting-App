import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";

export default function ProductionScreen() {

  const { session, updateSession } = useProduction();

  const navigation = useNavigation<any>();

  const [status, setStatus] = useState("NOT STARTED");

  const [showReasonPicker, setShowReasonPicker] =
    useState(false);

  const [selectedReason, setSelectedReason] =
    useState("");

  // Temporary dummy data
  // Later fetch from Supabase
  const [downtimeReasons, setDowntimeReasons] = useState<any[]>([]);

  useEffect(() => {
  loadReasons();
}, []);

async function loadReasons() {
  const { data, error } = await supabase
    .from("downtime_reasons")
    .select("*")
    .order("reason_code");

  if (!error && data) {
    setDowntimeReasons(data);
  }
}

  const handleStart = async () => {

  const startTime = new Date();

  const { data: machine } = await supabase
    .from("machines")
    .select("id")
    .eq("machine_code", session.machineCode)
    .single();

  const { data: job } = await supabase
    .from("jobs")
    .select("id, expected_quantity")
    .eq("job_name", session.jobName)
    .single();

    if (!machine) {
    Alert.alert("Machine not found");
    return;
}

if (!job) {
    Alert.alert("Job not found");
    return;
}

  const { data: shift } = await supabase
    .from("shifts")
    .insert({
      operator_id: Number(session.operatorId),
      machine_id: machine.id,
      shift_start: startTime,
    })
    .select()
    .single();

  const { data: run } = await supabase
    .from("production_runs")
    .insert({
      shift_id: shift.id,
      machine_id: machine.id,
      operator_id: Number(session.operatorId),
      job_id: job.id,
      production_start: startTime,
      expected_quantity: job.expected_quantity,
      produced_quantity: 0,
      waste: 0,
      downtime_count: 0,
      ups: Number(session.ups),
    })
    .select()
    .single();

  updateSession({
    sessionId: run.id.toString(),
    shiftStart: startTime,
    expectedQuantity: job.expected_quantity,
  });

  await supabase
    .from("machine_status")
    .update({
      operator_name: session.operatorName,
      current_job: session.jobName,
      ups: Number(session.ups),
      status: "Running",
      down_reason: null,
    })
    .eq("machine_id", machine.id);

  setStatus("RUNNING");
};

  const handleDown = () => {
    setShowReasonPicker(true);
  };

  const confirmDown = async () => {

    if (!selectedReason) {
      Alert.alert(
        "Downtime",
        "Please select a downtime reason."
      );
      return;
    }

    const downtime = {

      id: Date.now().toString(),

      startTime: new Date(),

      endTime: null,

      durationMinutes: 0,

      reason: selectedReason,

    };

    updateSession({

      downtimeHistory: [
        ...session.downtimeHistory,
        downtime,
      ],

    });

    setStatus("DOWN");

    setShowReasonPicker(false);

    setSelectedReason("");

    const { data: reason } = await supabase
  .from("downtime_reasons")
  .select("description")
  .eq("id", selectedReason)
  .single();

await supabase
  .from("machine_status")
  .update({
    status: "Down",
    down_reason: reason?.description,
  })
  .eq("operator_name", session.operatorName);

  };

  const handleResume = async () => {

    const updatedHistory = [
      ...session.downtimeHistory,
    ];

    const last =
      updatedHistory[
      updatedHistory.length - 1
      ];

    if (last) {

      last.endTime = new Date();

      last.durationMinutes = Math.round(
        (
          last.endTime.getTime() -
          last.startTime.getTime()
        ) / 60000
      );

    }

    updateSession({
      downtimeHistory: updatedHistory,
    });

    setStatus("RUNNING");

    await supabase
  .from("machine_status")
  .update({
    status: "Running",
    down_reason: null,
  })
  .eq("operator_name", session.operatorName);

  };

  const handleEndProduction = () => {
  navigation.navigate("Summary");
};

  return (

    <ScreenContainer>

      <View style={styles.container}>

        <Text style={styles.heading}>
          Production
        </Text>

        <View style={styles.card}>

          <Text style={styles.info}>
            Operator : {session.operatorName}
          </Text>

          <Text style={styles.info}>
            Machine : {session.machineCode}
          </Text>

          <Text style={styles.info}>
            Job : {session.jobName}
          </Text>

          <Text style={styles.info}>
            UPS : {session.ups}
          </Text>

        </View>

        <Text
          style={[
            styles.status,

            {
              color:
                status === "RUNNING"
                  ? "#16A34A"
                  : status === "DOWN"
                    ? "#DC2626"
                    : "#666666",
            },
          ]}
        >
          Status : {status}
        </Text>

        {status === "NOT STARTED" && (

          <PrimaryButton
            title="START"
            color="#16A34A"
            onPress={handleStart}
          />

        )}

        {showReasonPicker && (

          <>

            <Text style={styles.label}>
              Downtime Reason
            </Text>

            <View style={styles.picker}>

              <Picker
    selectedValue={selectedReason}
    onValueChange={(value) => setSelectedReason(value)}
>

                <Picker.Item
    label="Select Reason"
    value={null}
/>

                {downtimeReasons.map((reason) => (
  <Picker.Item
    key={reason.id}
    label={`${reason.reason_code} - ${reason.description}`}
    value={reason.id}
  />
))}

              </Picker>

            </View>

            <PrimaryButton
              title="CONFIRM DOWN"
              color="#F59E0B"
              onPress={confirmDown}
            />

          </>

        )}
        {status === "RUNNING" && !showReasonPicker && (
          <>
            <PrimaryButton
              title="DOWN"
              color="#DC2626"
              onPress={handleDown}
            />

            <PrimaryButton
              title="END PRODUCTION"
              color="#1565C0"
              onPress={handleEndProduction}
            />
          </>
        )}

        {status === "DOWN" && (
          <>
            <PrimaryButton
              title="RESUME"
              color="#16A34A"
              onPress={handleResume}
            />

            <PrimaryButton
              title="END PRODUCTION"
              color="#1565C0"
              onPress={handleEndProduction}
            />
          </>
        )}

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
    marginBottom: 20,
    color: Colors.text,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
  },

  info: {
    fontSize: 16,
    marginBottom: 6,
    color: Colors.text,
  },

  status: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.text,
  },

  picker: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.surface,
    marginBottom: 20,
  },

});