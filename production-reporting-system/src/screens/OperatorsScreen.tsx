import React, { useEffect, useState } from "react";
import { Alert, TextInput } from "react-native";
import { supabase } from "../services/supabase";
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
    const [operators, setOperators] = useState<any[]>([]);
    const [newOperator, setNewOperator] = useState("");
    const fetchOperators = async () => {
        const { data, error } = await supabase
            .from("operators")
            .select("*")
            .order("operator_name");

        if (!error && data) {
            setOperators(data);
        }
    };

    useEffect(() => {
        fetchOperators();
    }, []);
    const addOperator = async () => {

        if (!newOperator.trim()) {
            Alert.alert("Enter operator name.");
            return;
        }

        const { error } = await supabase
            .from("operators")
            .insert({
                operator_name: newOperator.trim(),
            });

        if (error) {
            Alert.alert(error.message);
            return;
        }

        setNewOperator("");
        fetchOperators();
    };
    const deleteOperator = async (id: number) => {

        Alert.alert(
            "Delete Operator",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {

                        await supabase
                            .from("operators")
                            .delete()
                            .eq("id", id);

                        fetchOperators();
                    },
                },
            ]
        );
    };
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

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteOperator(item.id)}
                        >
                            <Text style={styles.deleteText}>
                                Delete
                            </Text>
                        </TouchableOpacity>

                    </View>

                )}
            />

            <TextInput
                placeholder="Operator Name"
                value={newOperator}
                onChangeText={setNewOperator}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={addOperator}
            >
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

    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        padding: 14,
        backgroundColor: Colors.surface,
        marginBottom: 15,
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