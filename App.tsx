import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import MotoListScreen from "./src/screens/MotoList";
import MotoFormScreen from "./src/screens/MotoForm";
import LocationListScreen from "./src/screens/LocalizacaoList";
import LocationFormScreen from "./src/screens/LocalizacaoForm";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.primary}
      />

      <Text style={[styles.title, { color: theme.primary }]}>MotoMap</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Solução inteligente de rastreamento e gestão de motos
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Motos")}
      >
        <Text style={styles.buttonText}>📋 Gerenciar Motos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Localizações")}
      >
        <Text style={styles.buttonText}>📍 Gerenciar Localizações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>🔑 Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>🆕 Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 20, backgroundColor: theme.card }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          {isDark ? "🌞 Modo Claro" : "🌙 Modo Escuro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
            <Stack.Screen name="Motos" component={MotoListScreen} />
            <Stack.Screen name="Nova Moto" component={MotoFormScreen} />
            <Stack.Screen name="Localizações" component={LocationListScreen} />
            <Stack.Screen name="Nova Localização" component={LocationFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
