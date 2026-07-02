import { useState } from "react";
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
  const downtimeReasons = [
    "Power Failure",
    "Machine Breakdown",
    "Material Shortage",
    "Quality Issue",
    "Operator Break",
    "Ink Change",
    "Tool Change",
    "Machine Cleaning",
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

  };

  const handleResume = () => {

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
                onValueChange={setSelectedReason}
              >

                <Picker.Item
                  label="Select Reason"
                  value=""
                />

                {downtimeReasons.map(
                  (reason) => (
                    <Picker.Item
                      key={reason}
                      label={reason}
                      value={reason}
                    />
                  )
                )}

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