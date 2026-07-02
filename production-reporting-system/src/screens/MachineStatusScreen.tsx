import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";
import { machineData } from "../data/dummyData";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Running":
      return "#2ECC71";

    case "Down":
      return "#E74C3C";

    case "Idle":
      return "#F39C12";

    default:
      return "#7F8C8D";
  }
};

export default function MachineStatusScreen() {
  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Live Machine Status
      </Text>

      <FlatList
        data={machineData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.machineCode}>
              {item.machineCode}
            </Text>

            <Text style={styles.operator}>
              👤 {item.operatorName ?? "No Operator Assigned"}
            </Text>

            <Text style={styles.label}>
              Current Job
            </Text>

            <Text style={styles.value}>
              {item.currentJob ?? "-"}
            </Text>

            <Text style={styles.label}>
              UPS
            </Text>

            <Text style={styles.value}>
              {item.ups ?? "-"}
            </Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(item.status),
                },
              ]}
            >
              <Text style={styles.statusText}>
                {item.status}
              </Text>
            </View>

            {item.status === "Down" && (
              <>
                <Text style={styles.label}>
                  Downtime Reason
                </Text>

                <Text style={styles.reason}>
                  {item.downReason}
                </Text>
              </>
            )}

          </View>

        )}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
  },

  machineCode: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 10,
  },

  operator: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
    color: Colors.text,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 8,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  statusBadge: {
    marginTop: 18,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  reason: {
    color: "#E74C3C",
    fontWeight: "600",
    marginTop: 6,
    fontSize: 15,
  },

});