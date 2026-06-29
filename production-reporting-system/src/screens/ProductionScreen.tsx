import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";
import { useNavigation } from "@react-navigation/native";

export default function ProductionScreen() {
  const { session, updateSession } = useProduction();

  const [status, setStatus] = useState("NOT STARTED");

  const [showReasonPicker, setShowReasonPicker] = useState(false);

  const [selectedReason, setSelectedReason] = useState("");

  const navigation = useNavigation<any>();

  const downtimeReasons = [
    "Power Failure",
    "Machine Breakdown",
    "Material Shortage",
    "Maintenance",
    "Tool Change",
    "Quality Issue",
    "Operator Break",
    "Other",
  ];

  const handleStart = () => {
    updateSession({
      shiftStart: new Date(),
    });

    setStatus("RUNNING");
  };

  const handleDown = () => {
    setShowReasonPicker(true);
  };

  const confirmDown = () => {
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

    setShowReasonPicker(false);
    setStatus("DOWN");
  };

  const handleResume = () => {
    const updatedHistory = [...session.downtimeHistory];

    const last =
      updatedHistory[updatedHistory.length - 1];

    if (last) {
      last.endTime = new Date();

      last.durationMinutes = Math.round(
        (last.endTime.getTime() -
          last.startTime.getTime()) /
          60000
      );
    }

    updateSession({
      downtimeHistory: updatedHistory,
    });

    setStatus("RUNNING");
  };

  const handleEnd = () => {
    updateSession({
      shiftEnd: new Date(),
    });

    console.log("Navigate to Summary Screen");
    navigation.navigate("Summary")
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Production
        </Text>

        <View style={styles.card}>
          <Text>
            Operator : {session.operatorName}
          </Text>

          <Text>
            Machine : {session.machineCode}
          </Text>

          <Text>Job : {session.jobName}</Text>
        </View>

        <Text style={styles.status}>
          Status : {status}
        </Text>

        {status === "NOT STARTED" && (
          <PrimaryButton
            title="START"
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
                onValueChange={(value) =>
                  setSelectedReason(value)
                }
              >
                <Picker.Item
                  label="Select Reason"
                  value=""
                />

                {downtimeReasons.map((reason) => (
                  <Picker.Item
                    key={reason}
                    label={reason}
                    value={reason}
                  />
                ))}
              </Picker>
            </View>

            <PrimaryButton
              title="Confirm Down"
              onPress={confirmDown}
            />
          </>
        )}

        {status === "RUNNING" && !showReasonPicker && (
          <>
            <PrimaryButton
              title="DOWN"
              onPress={handleDown}
            />

            <PrimaryButton
              title="END"
              onPress={handleEnd}
            />
          </>
        )}

        {status === "DOWN" && (
          <>
            <PrimaryButton
              title="RESUME"
              onPress={handleResume}
            />

            <PrimaryButton
              title="END"
              onPress={handleEnd}
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
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  status: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: Colors.text,
  },

  picker: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
});