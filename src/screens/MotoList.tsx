import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getMotos } from "../services/api"; 

export default function MotoListScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [motos, setMotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMotos();
      setMotos(response.data);
    } catch (err) {
      console.error("Erro ao carregar motos:", err);
      setError("Não foi possível carregar as motos. Verifique a API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMotos();

    const unsubscribe = navigation.addListener('focus', loadMotos);
    return unsubscribe;
  }, [navigation, loadMotos]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Motos</Text>

      {loading && <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />}
      {error && <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>{item.modelo}</Text>
              <Text style={{ color: theme.text }}>Placa: {item.placa}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Nova Moto")}
      >
        <Text style={styles.buttonText}>➕ Nova Moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  errorText: { textAlign: 'center', marginTop: 20, fontSize: 16 } 
});