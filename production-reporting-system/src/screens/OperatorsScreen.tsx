import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

export default function OperatorsScreen() {

  const [operatorName, setOperatorName] = useState("");
  const [operatorId, setOperatorId] = useState("");

  const [operators, setOperators] = useState([
    {
      id: "1",
      operatorId: "OP-001",
      name: "Rahul Sharma",
    },
    {
      id: "2",
      operatorId: "OP-002",
      name: "Amit Patil",
    },
    {
      id: "3",
      operatorId: "OP-003",
      name: "Vikram Singh",
    },
  ]);

  function addOperator() {

    if (!operatorName.trim() || !operatorId.trim())
      return;

    setOperators([
      ...operators,
      {
        id: Date.now().toString(),
        operatorId,
        name: operatorName,
      },
    ]);

    setOperatorName("");
    setOperatorId("");
  }

  function deleteOperator(id: string) {
    setOperators(
      operators.filter((item) => item.id !== id)
    );
  }

  return (
    <ScreenContainer>

      <Text style={styles.heading}>
        Manage Operators
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Operator ID"
        value={operatorId}
        onChangeText={setOperatorId}
      />

      <TextInput
        style={styles.input}
        placeholder="Operator Name"
        value={operatorName}
        onChangeText={setOperatorName}
      />

      <PrimaryButton
        title="Add Operator"
        onPress={addOperator}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={operators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.id}>
                {item.operatorId}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteOperator(item.id)}
            >
              <Text style={styles.delete}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: Colors.surface,
    color: Colors.text,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  id: {
    marginTop: 4,
    color: "#666",
  },

  delete: {
    color: "red",
    fontWeight: "bold",
  },

});