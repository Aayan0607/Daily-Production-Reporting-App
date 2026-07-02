import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { Colors } from "../constants/colors";
import { operators } from "../data/operators";

export default function OperatorManagementScreen() {
  return (
    <ScreenContainer>

      <Text style={styles.title}>
        Manage Operators
      </Text>

      <FlatList
        data={operators}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.name}>
              {item.operator_name}
            </Text>

            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>

        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>
          + Add Operator
        </Text>
      </TouchableOpacity>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1565C0",
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  deleteButton: {
    backgroundColor: "#E74C3C",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },

  addButton: {
    backgroundColor: "#1565C0",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

});