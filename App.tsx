import React, { useEffect } from "react";
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
import AboutScreen from "./src/screens/AboutScreen"; 

import { t } from "./src/i18n/i18n"; 
import { registerForPushNotificationsAsync } from "./src/services/notifications"; 

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.primary}
      />

      <Text style={[styles.title, { color: theme.primary }]}>{t('appName')}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        {t('appSubtitle')}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Motos")}
      >
        <Text style={styles.buttonText}>{t('manageMotos')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Localizações")}
      >
        <Text style={styles.buttonText}>{t('manageLocations')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>{t('loginTitle')}</Text> 
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.buttonText}>{t('registerTitle')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Sobre o App")}
      >
        <Text style={styles.buttonText}>{t('aboutTitle')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>{t('logout')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 20, backgroundColor: theme.card }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>
          {isDark ? t('darkMode') : t('lightMode')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default function App() {
  
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []); 

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
            <Stack.Screen name="Sobre o App" component={AboutScreen} />
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