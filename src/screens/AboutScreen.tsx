import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { t } from "../i18n/i18n";
import Constants from "expo-constants";

export default function AboutScreen() {
  const { theme } = useTheme();
  const MOCK_COMMIT_HASH = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0";
  const appVersion = Constants.manifest?.version || "1.0.0";


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>{t('aboutTitle')}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>{t('appName')}</Text>

      <View style={styles.card}>
        <Text style={[styles.label, { color: theme.primary }]}>{t('appVersion')}:</Text>
        <Text style={[styles.value, { color: theme.text }]}>{appVersion}</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.label, { color: theme.primary }]}>{t('commitHash')}:</Text>
        <Text style={[styles.value, { color: theme.text, fontSize: 14 }]}>
            {MOCK_COMMIT_HASH} 
        </Text>
      </View>
      
      <Text style={[styles.footer, { color: theme.text }]}>
        {t('appSubtitle')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 20, 
    color: '#666',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  footer: {
      marginTop: 50,
      textAlign: 'center',
      fontSize: 14,
  }
});