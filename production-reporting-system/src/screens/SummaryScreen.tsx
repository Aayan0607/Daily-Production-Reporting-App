import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { Colors } from "../constants/colors";
import { useProduction } from "../context/ProductionContext";

export default function SummaryScreen() {
  const { session } = useProduction();

  const [expectedQuantity, setExpectedQuantity] = useState("");
  const [actualQuantity, setActualQuantity] = useState("");
  const [waste, setWaste] = useState("");
  const [ups, setUps] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async () => {
    Alert.alert(
      "Success",
      "Production report ready to save."
    );

    console.log(session);
  };

  return (
    <ScreenContainer>
      <ScrollView>

        <Text style={styles.heading}>
          Shift Summary
        </Text>

        <Text style={styles.section}>
          Downtime History
        </Text>

        {session.downtimeHistory.length === 0 ? (
          <Text>No Downtime Recorded</Text>
        ) : (
          session.downtimeHistory.map((item) => (
            <View
              key={item.id}
              style={styles.card}
            >
              <Text>
                Reason : {item.reason}
              </Text>

              <Text>
                Duration : {item.durationMinutes} min
              </Text>
            </View>
          ))
        )}

        <TextInput
          placeholder="Expected Quantity"
          keyboardType="numeric"
          value={expectedQuantity}
          onChangeText={setExpectedQuantity}
          style={styles.input}
        />

        <TextInput
          placeholder="Actual Quantity"
          keyboardType="numeric"
          value={actualQuantity}
          onChangeText={setActualQuantity}
          style={styles.input}
        />

        <TextInput
          placeholder="Waste"
          keyboardType="numeric"
          value={waste}
          onChangeText={setWaste}
          style={styles.input}
        />

        <TextInput
          placeholder="UPS"
          keyboardType="numeric"
          value={ups}
          onChangeText={setUps}
          style={styles.input}
        />

        <TextInput
          placeholder="Remarks"
          value={remarks}
          onChangeText={setRemarks}
          style={styles.input}
          multiline
        />

        <PrimaryButton
          title="Submit Report"
          onPress={handleSubmit}
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
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    backgroundColor: Colors.surface,
    color: Colors.text,
  },
});