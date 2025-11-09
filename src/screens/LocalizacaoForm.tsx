import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createLocalizacao } from "../services/api"; 
import { t } from "../i18n/i18n"; 
import { sendPushNotification, getExpoPushToken } from "../services/notifications"; 

export default function LocationFormScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false); 

  const salvarLocalizacao = async () => {
    if (!latitude || !longitude) {
      Alert.alert(t("alertError"), t("requiredFields")); 
      return;
    }

    setLoading(true); 
    
    // Converte os valores para número
    const lat = parseFloat(latitude.replace(',', '.'));
    const long = parseFloat(longitude.replace(',', '.'));

    if (isNaN(lat) || isNaN(long)) {
        setLoading(false);
        Alert.alert(t("alertError"), t("invalidCoords"));
        return;
    }

    try {
      // 🚨 Mapeamento dos dados para o formato do Backend:
      // A API precisa de 'zona' e 'motoId', não lat/long. 
      // Estamos simulando a 'zona' com base nas coordenadas e usando um motoId fixo.
      const newLocalizacaoData = {
        zona: `ZONA-${Math.floor(lat)}-${Math.floor(long)}`, // Mock de Zona
        motoId: 1, // Mock para associar à primeira moto
      };

      await createLocalizacao(newLocalizacaoData);

      const token = getExpoPushToken();
      if (token) {
        await sendPushNotification(token); 
      }

      Alert.alert(t("alertSuccess"), t("notificationSent")); 
      
      navigation.goBack();

    } catch (error: any) {
      console.error("Erro ao salvar localização:", error.message);
      // Mensagem de erro traduzida
      Alert.alert(t("alertError"), t("apiError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>{t('locationFormTitleNew')}</Text>

      {/* Inputs mantidos para atender o formulário visualmente, mas usados apenas para validação */}
      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('latitudePlaceholder')}
        placeholderTextColor={theme.text}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
        editable={!loading} 
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('longitudePlaceholder')}
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
          {loading ? t('saving') : t('save')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
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