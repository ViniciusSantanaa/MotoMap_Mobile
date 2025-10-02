import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createMoto } from "../services/api"; 

export default function MotoFormScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);

  const salvarMoto = async () => {
    if (!modelo || !placa) {
      Alert.alert("Erro", "Modelo e Placa são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const newMoto = {
        modelo,
        placa,
        identificador: placa, 
        ativa: true, 
      };

      await createMoto(newMoto);
      Alert.alert("Sucesso", "Moto salva com sucesso!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao salvar moto:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao salvar a moto. Verifique se o identificador já existe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>➕ Nova Moto</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Modelo"
        placeholderTextColor={theme.text}
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Placa"
        placeholderTextColor={theme.text}
        value={placa}
        onChangeText={setPlaca}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={salvarMoto}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
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