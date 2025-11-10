import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { 
  getMotos, 
  deleteMoto 
} from "../services/api"; 
import { t } from "../i18n/i18n"; 

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
    } catch (err: any) {
      console.error("Erro ao carregar motos:", err.message);
      setError(t("apiError")); 
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleEdit = (motoId: number) => {
    navigation.navigate("Nova Moto", { motoId });
  };

  const excluirMoto = useCallback(async (id: number) => {
    Alert.alert(
      t("confirmDelete"), 
      t("deleteMotoConfirm"), 
      [
        {
          text: t("cancel"), 
          style: "cancel",
        },
        {
          text: t("confirmDelete"), 
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteMoto(id);
              Alert.alert(t("alertSuccess"), t("motoDeletedSuccess")); 
              loadMotos(); 
            } catch (err: any) {
              console.error("Erro ao excluir moto:", err.message);
              setError(t("apiDeleteError")); 
              setLoading(false);
            }
          },
        },
      ],
    );
  }, [loadMotos]);

  useEffect(() => {
    loadMotos();

    const unsubscribe = navigation.addListener('focus', loadMotos);
    return unsubscribe;
  }, [navigation, loadMotos]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>{t('motoListTitle')}</Text>

      {loading && <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />}
      {error && <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { 
              backgroundColor: theme.card,
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }]}>
              <TouchableOpacity onPress={() => handleEdit(item.id)} style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{item.modelo}</Text>
                <Text style={{ color: theme.text }}>{t('platePlaceholder')}: {item.placa}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluirMoto(item.id)}>
                <Text style={{ color: theme.error, fontSize: 24 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={() => navigation.navigate("Nova Moto")}
      >
        <Text style={styles.buttonText}>➕ {t('motoFormTitleNew')}</Text>
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