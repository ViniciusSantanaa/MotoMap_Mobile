import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert // 1. Importado para feedback e confirmação
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { 
  getMotos, 
  deleteMoto // 2. Importado para a operação Delete
} from "../services/api"; 
import { t } from "../i18n/i18n"; // 3. Importado para Internacionalização

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
      // 4. Tradução da mensagem de erro de carregamento
      setError(t("apiError")); 
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 5. Função para navegação de Edição (Update - Critério 4.b)
  const handleEdit = (motoId: number) => {
    navigation.navigate("Nova Moto", { motoId });
  };

  // 6. Função de Exclusão (Delete - Critério 4.b)
  const excluirMoto = useCallback(async (id: number) => {
    Alert.alert(
      t("confirmDelete"), // Título Traduzido
      t("deleteMotoConfirm"), // Mensagem Traduzida
      [
        {
          text: t("cancel"), // Botão Cancelar Traduzido
          style: "cancel",
        },
        {
          text: t("confirmDelete"), // Botão Confirmar Traduzido
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteMoto(id);
              // Feedback de sucesso traduzido
              Alert.alert(t("alertSuccess"), t("motoDeletedSuccess")); 
              loadMotos(); // Recarrega a lista
            } catch (err: any) {
              console.error("Erro ao excluir moto:", err.message);
              // Feedback de erro traduzido
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
      {/* 7. Título da Tela Traduzido */}
      <Text style={[styles.title, { color: theme.primary }]}>{t('motoListTitle')}</Text>

      {/* 8. Mensagens de Loading e Erro Traduzidas */}
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
              {/* 9. Área clicável para Edição (Update) */}
              <TouchableOpacity onPress={() => handleEdit(item.id)} style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{item.modelo}</Text>
                {/* Tradução do Label 'Placa:' */}
                <Text style={{ color: theme.text }}>{t('platePlaceholder')}: {item.placa}</Text>
              </TouchableOpacity>
              
              {/* 10. Botão de Excluir (Delete) */}
              <TouchableOpacity onPress={() => excluirMoto(item.id)}>
                <Text style={{ color: theme.error, fontSize: 24 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* 11. Botão "Nova Moto" Traduzido */}
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