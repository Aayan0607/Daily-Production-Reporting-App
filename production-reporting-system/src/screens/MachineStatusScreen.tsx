import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";

const machines = [
  { id: "1", code: "MC-101", status: "Running", updated: "09:12 AM" },
  { id: "2", code: "MC-102", status: "Down", updated: "09:18 AM" },
  { id: "3", code: "MC-103", status: "Idle", updated: "08:55 AM" },
  { id: "4", code: "MC-104", status: "Running", updated: "09:20 AM" },
  { id: "5", code: "MC-105", status: "Maintenance", updated: "08:40 AM" },
  { id: "6", code: "MC-106", status: "Running", updated: "09:21 AM" },
  { id: "7", code: "MC-107", status: "Down", updated: "09:03 AM" },
  { id: "8", code: "MC-108", status: "Idle", updated: "09:15 AM" },
  { id: "9", code: "MC-109", status: "Running", updated: "09:22 AM" },
  { id: "10", code: "MC-110", status: "Running", updated: "09:19 AM" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Running":
      return "#22C55E"; // Green

    case "Down":
      return "#EF4444"; // Red

    case "Idle":
      return "#F59E0B"; // Orange

    case "Maintenance":
      return "#3B82F6"; // Blue

    default:
      return "#9CA3AF";
  }
}

export default function MachineStatusScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.heading}>
        Live Machine Status
      </Text>

      <FlatList
        data={machines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View>
              <Text style={styles.machine}>
                {item.code}
              </Text>

              <Text style={styles.time}>
                Updated: {item.updated}
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: getStatusColor(item.status),
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {item.status}
              </Text>
            </View>

          </View>
        )}
      />
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

  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  machine: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  time: {
    marginTop: 5,
    color: "#777",
    fontSize: 14,
  },

  badge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  badgeText: {
    color: "white",
    fontWeight: "bold",
  },

});