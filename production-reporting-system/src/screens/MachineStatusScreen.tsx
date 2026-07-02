import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

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
    const [machineData, setMachineData] = useState<any[]>([]);
    useEffect(() => {
    loadMachines();

    const interval = setInterval(loadMachines, 5000);

    return () => clearInterval(interval);
}, []);

async function loadMachines() {
  const { data, error } = await supabase
  .from("machine_status")
  .select(`
    machine_id,
    operator_name,
    current_job,
    ups,
    status,
    down_reason,
    updated_at,
    machines (
      machine_code
    )
  `);

  if (error) {
    console.log(error);
    return;
  }

  setMachineData(data ?? []);
}
  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Live Machine Status
      </Text>

      <FlatList
        data={machineData}
        keyExtractor={(item) => String(item.machine_id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.machineCode}>
  {item.machines?.machine_code ?? `Machine ${item.machine_id}`}
</Text>

            <Text style={styles.operator}>
              👤 {item.operator_name ?? "No Operator Assigned"}
            </Text>

            <Text style={styles.label}>
              Current Job
            </Text>

            <Text style={styles.value}>
              {item.current_job ?? "-"}
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
                  {item.down_reason}
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