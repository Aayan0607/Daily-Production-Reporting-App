import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";

const reports = [
  {
    id: "1",
    date: "29 Jun 2026",
    operator: "Rahul Sharma",
    machine: "MC-101",
    job: "4 LTR BR",
    expected: 1200,
    actual: 1165,
    waste: 35,
    downtime: "18 min",
    status: "Completed",
  },
  {
    id: "2",
    date: "29 Jun 2026",
    operator: "Amit Patil",
    machine: "MC-102",
    job: "2 LTR BR",
    expected: 900,
    actual: 870,
    waste: 30,
    downtime: "25 min",
    status: "Completed",
  },
  {
    id: "3",
    date: "29 Jun 2026",
    operator: "Vikram Singh",
    machine: "MC-103",
    job: "1 LTR BR",
    expected: 1500,
    actual: 1490,
    waste: 10,
    downtime: "8 min",
    status: "Completed",
  },
];

export default function ReportsScreen() {

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Production Reports
      </Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.row}>
              <Text style={styles.machine}>
                {item.machine}
              </Text>

              <Text style={styles.status}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.info}>
              Date: {item.date}
            </Text>

            <Text style={styles.info}>
              Operator: {item.operator}
            </Text>

            <Text style={styles.info}>
              Job: {item.job}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.info}>
              Expected Quantity : {item.expected}
            </Text>

            <Text style={styles.info}>
              Actual Quantity : {item.actual}
            </Text>

            <Text style={styles.info}>
              Waste : {item.waste}
            </Text>

            <Text style={styles.info}>
              Total Downtime : {item.downtime}
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