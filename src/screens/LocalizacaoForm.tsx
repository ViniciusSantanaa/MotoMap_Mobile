import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function LocationFormScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const salvarLocalizacao = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>➕ Nova Localização</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Latitude"
        placeholderTextColor={theme.text}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Longitude"
        placeholderTextColor={theme.text}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={salvarLocalizacao}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.link, { color: theme.primary }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { marginTop: 15, textAlign: "center", fontSize: 16 },
});
