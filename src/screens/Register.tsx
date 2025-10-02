import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    try {
      await AsyncStorage.setItem("user", JSON.stringify({ email, password }));
      Alert.alert("Usuário cadastrado com sucesso!");
      navigation.replace("Login"); 
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>🆕 Cadastro</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Email"
        placeholderTextColor={theme.text}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder="Senha"
        placeholderTextColor={theme.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.link, { color: theme.primary }]}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { marginTop: 15, fontSize: 16 },
});
