import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createLocalizacao } from "../services/api"; 
// 1. Importado para Internacionalização
import { t } from "../i18n/i18n"; 
// 2. Importado para Notificação Push (Critério 3)
import { sendPushNotification, getExpoPushToken } from "../services/notifications"; 

export default function LocationFormScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false); 

  const salvarLocalizacao = async () => {
    // 3. Validação de campos vazios traduzida
    if (!latitude || !longitude) {
      Alert.alert(t("alertError"), t("requiredFields")); 
      return;
    }

    setLoading(true); 
    
    // Converte os valores para número, tratando casos de erro
    const lat = parseFloat(latitude.replace(',', '.'));
    const long = parseFloat(longitude.replace(',', '.'));

    // 4. Validação numérica traduzida
    if (isNaN(lat) || isNaN(long)) {
        setLoading(false);
        Alert.alert(t("alertError"), t("invalidCoords"));
        return;
    }

    try {
      const newLocalizacao = {
        latitude: lat,
        longitude: long,
        zona: "A", 
        motoId: 1, 
        dataHora: new Date().toISOString(),
      };

      await createLocalizacao(newLocalizacao);
      
      // 5. Lógica para enviar a notificação após o sucesso (Critério 3)
      const token = getExpoPushToken();
      if (token) {
        await sendPushNotification(token); 
      }
      
      // 6. Feedback de Sucesso traduzido
      Alert.alert(t("alertSuccess"), t("notificationSent")); 
      
      navigation.goBack();

    } catch (error: any) {
      // 7. Tratamento de Erros da Rede traduzido
      console.error("Erro ao salvar localização:", error.message);
      Alert.alert(t("alertError"), t("apiError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 8. Título da tela traduzido */}
      <Text style={[styles.title, { color: theme.primary }]}>{t('locationFormTitleNew')}</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('latitudePlaceholder')} // 9. Placeholder traduzido
        placeholderTextColor={theme.text}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
        editable={!loading} 
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('longitudePlaceholder')} // 10. Placeholder traduzido
        placeholderTextColor={theme.text}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
        editable={!loading} 
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={salvarLocalizacao}
        disabled={loading} 
      >
        <Text style={styles.buttonText}>
          {/* 11. Texto do botão traduzido */}
          {loading ? t('saving') : t('save')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
        {/* 12. Botão Cancelar traduzido */}
        <Text style={[styles.link, { color: theme.primary }]}>{t('cancel')}</Text>
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