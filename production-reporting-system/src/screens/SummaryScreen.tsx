import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";

export default function SummaryScreen() {
  const navigation = useNavigation<any>();

  const { session, updateSession } = useProduction();

  // This will later come from the Jobs table in Supabase
  const expectedQuantity =
    session.expectedQuantity ?? 25000;

  const [actualQuantity, setActualQuantity] =
    useState("");

  const waste = useMemo(() => {
    const actual = Number(actualQuantity);

    if (isNaN(actual)) return 0;

    return Math.max(expectedQuantity - actual, 0);
  }, [actualQuantity, expectedQuantity]);

  // Count number of downtimes for each reason
  const downtimeSummary = useMemo(() => {
    const counts: Record<string, number> = {};

    session.downtimeHistory.forEach((item) => {
      counts[item.reason] =
        (counts[item.reason] || 0) + 1;
    });

    return counts;
  }, [session.downtimeHistory]);

  const handleStartNewProduction = () => {
    if (!actualQuantity) {
      Alert.alert(
        "Missing Quantity",
        "Please enter the actual quantity."
      );
      return;
    }

    updateSession({
      actualQuantity: Number(actualQuantity),
      waste,
    });

    navigation.navigate("OperatorInfo");
  };

  const handleEndShift = () => {
    if (!actualQuantity) {
      Alert.alert(
        "Missing Quantity",
        "Please enter the actual quantity."
      );
      return;
    }

    updateSession({
      actualQuantity: Number(actualQuantity),
      waste,
      shiftEnd: new Date(),
    });

    Alert.alert(
      "Success",
      "Production report is ready to save."
    );

    console.log(session);

    navigation.navigate("Login");
  };

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Production Summary
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

        <Text style={styles.section}>
          Production
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Expected Quantity
          </Text>

          <Text style={styles.value}>
            {expectedQuantity}
          </Text>

          <Text style={styles.label}>
            Actual Quantity
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Actual Quantity"
            value={actualQuantity}
            onChangeText={setActualQuantity}
          />

          <Text style={styles.label}>
            Waste
          </Text>

          <Text style={styles.waste}>
            {waste}
          </Text>
        </View>

        <Text style={styles.section}>
          Downtime Summary
        </Text>

        {Object.keys(downtimeSummary).length === 0 ? (
          <View style={styles.card}>
            <Text>No Downtime Recorded</Text>
          </View>
        ) : (
          Object.entries(downtimeSummary).map(
            ([reason, count]) => (
              <View
                key={reason}
                style={styles.card}
              >
                <Text style={styles.reason}>
                  {reason}
                </Text>

                <Text style={styles.count}>
                  {count} Time(s)
                </Text>
              </View>
            )
          )
        )}
                <PrimaryButton
          title="Start New Production"
          onPress={handleStartNewProduction}
        />

        <PrimaryButton
          title="End Shift"
          onPress={handleEndShift}
        />

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 20,
    marginBottom: 12,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  info: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 6,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.secondaryText,
    marginTop: 12,
    marginBottom: 6,
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.surface,
    color: Colors.text,
    fontSize: 16,
  },

  waste: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E53935",
    marginTop: 4,
  },

  reason: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  count: {
    marginTop: 6,
    fontSize: 15,
    color: Colors.secondaryText,
  },
});