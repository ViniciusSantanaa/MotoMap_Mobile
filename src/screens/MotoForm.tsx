import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"; 
import { useTheme } from "../context/ThemeContext";
import { 
  createMoto, 
  getMoto, 
  updateMoto 
} from "../services/api"; 
import { t } from "../i18n/i18n";

type RootStackParamList = {
  Home: undefined; 
  Login: undefined;
  Cadastro: undefined;
  Motos: undefined;
  Localizações: undefined;
  'Nova Localização': undefined;
  'Nova Moto': { motoId?: number };
};

type MotoFormRouteProp = RouteProp<RootStackParamList, 'Nova Moto'>;


export default function MotoFormScreen({ navigation }: any) {
  const { theme } = useTheme();
  const route = useRoute<MotoFormRouteProp>(); 
  const motoId = route.params?.motoId; 
  
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (motoId) {
      navigation.setOptions({ title: t("motoFormTitleEdit") }); 
      setLoading(true);
      getMoto(motoId)
        .then((response: any) => {
          const data = response.data;
          setModelo(data.modelo);
          setPlaca(data.placa);
        })
        .catch((error: any) => {
          console.error("Erro ao carregar moto:", error.message);
          Alert.alert(t("alertError"), t("loadingData")); 
        })
        .finally(() => {
          setLoading(false);
          setInitialLoad(false);
        });
    } else {
      navigation.setOptions({ title: t("motoFormTitleNew") });
      setInitialLoad(false);
    }
  }, [motoId, navigation, t]);

  const salvarMoto = async () => {
    if (!modelo || !placa) {
      Alert.alert(t("alertError"), t("requiredMotoFields")); 
      return;
    }

    setLoading(true);

    try {
      const motoData = { 
          modelo, 
          placa, 
          identificador: placa, 
          ativa: true,
      };

      if (motoId) {
        await updateMoto(motoId, motoData);
        Alert.alert(t("alertSuccess"), t("motoSaved"));
      } else {
        await createMoto(motoData);
        Alert.alert(t("alertSuccess"), t("motoSaved")); 
      }

      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao salvar moto:", error.response?.data || error.message);
      Alert.alert(t("alertError"), t("apiError"));
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
        <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ color: theme.text, textAlign: 'center', marginTop: 10 }}>{t('loadingData')}</Text>
        </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>
        {motoId ? t('motoFormTitleEdit') : t('motoFormTitleNew')}
      </Text>

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('modelPlaceholder')}
        placeholderTextColor={theme.text}
        value={modelo}
        onChangeText={setModelo}
        editable={!loading}
      />

      <TextInput
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholder={t('platePlaceholder')}
        placeholderTextColor={theme.text}
        value={placa}
        onChangeText={setPlaca}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.secondary }]}
        onPress={salvarMoto}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? t('saving') : t('save')}</Text>
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