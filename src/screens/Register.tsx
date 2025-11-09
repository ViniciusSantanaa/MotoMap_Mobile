import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { t } from "../i18n/i18n"; // 1. Importar a função de tradução

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      // 2. Traduzindo alerta de campos obrigatórios
      Alert.alert(t('alertError'), t('requiredFields'));
      return;
    }

    try {
      // Nota: A autenticação ainda é simulada via AsyncStorage, 
      // mas a mensagem de feedback é traduzida.
      await AsyncStorage.setItem("user", JSON.stringify({ email, password }));
      
      // 3. Traduzindo alerta de sucesso
      Alert.alert(t('alertSuccess'), t('userRegisteredSuccess')); 
      
      // 'Login' é o nome da rota, que não deve ser traduzido.
      navigation.replace("Login"); 
    } catch (error) {
      console.error(error);
      // 4. Traduzindo erro de cadastro
      Alert.alert(t('alertError'), t('registerError'));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 5. Título da tela traduzido */}
      <Text style={[styles.title, { color: theme.primary }]}>{t('registerTitle')}</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('emailPlaceholder')} // 6. Placeholder traduzido
        placeholderTextColor={theme.text}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('passwordPlaceholder')} // 7. Placeholder traduzido
        placeholderTextColor={theme.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>{t('registerButton')}</Text> {/* 8. Botão traduzido */}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.link, { color: theme.primary }]}>
          {t('hasAccount')} {/* 9. Link de navegação traduzido */}
        </Text>
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