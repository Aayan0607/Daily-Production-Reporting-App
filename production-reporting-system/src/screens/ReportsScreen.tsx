import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";
import { supabase } from "../services/supabase";

export default function ReportsScreen() {

    const [reports, setReports] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadReports();
}, []);

async function loadReports() {
  setLoading(true);

  const { data, error } = await supabase
  .from("production_runs")
  .select(`
    *,
    machines(machine_code),
    operators(operator_name),
    jobs(job_name)
  `)
  .order("production_start", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    setReports(data || []);
  }

  setLoading(false);
}

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Production Reports
      </Text>

      {loading && (
  <Text style={{ marginBottom: 15 }}>
    Loading Reports...
  </Text>
)}

      <FlatList
  data={reports}
  keyExtractor={(item) => item.id.toString()}
  ListEmptyComponent={
    <Text style={{ textAlign: "center", marginTop: 30 }}>
      No production reports found.
    </Text>
  }
  renderItem={({ item }) => (
            

          <View style={styles.card}>
            

            <View style={styles.row}>
                
              <Text style={styles.machine}>
                {item.machines?.machine_code}
              </Text>

            </View>

            <Text style={styles.info}>
              Operator: {item.operators?.operator_name}
            </Text>

            <Text style={styles.info}>
              Job: {item.jobs?.job_name}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.info}>
              Expected Quantity : {item.expected_quantity}
            </Text>

            <Text style={styles.info}>
              Actual Quantity : {item.produced_quantity}
            </Text>

            <Text style={styles.info}>
              Waste : {item.waste}
            </Text>

            <Text style={styles.info}>
              Total Downtime : {item.downtime_count} min
            </Text>

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
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  machine: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },

  status: {
    color: "green",
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 4,
    color: Colors.text,
  },

});