import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// 1. Configurar como as notificações devem ser tratadas quando o app está aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // CORREÇÃO: Substituído 'shouldShowAlert' pelas novas propriedades:
    shouldShowBanner: true, // Mostra a notificação como um banner
    shouldShowList: true,   // Mostra na lista de notificações
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let expoPushToken: string | undefined;

// 2. Função para registrar o dispositivo e obter o token.
export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    // Solicita permissão
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Falha ao obter token para Push Notification!");
      return;
    }

    // Obtém o token. Use o slug do seu app.json como projectId.
    // O slug do seu projeto é 'MotoMap'.
    const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "MotoMap",
    });

    expoPushToken = tokenData.data;
    console.log("Expo Push Token:", expoPushToken);
  } else {
    console.log("Apenas dispositivos físicos podem receber notificações push.");
  }
  
  // Configuração opcional para Android
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
 }

 return expoPushToken;
}

// 3. Função para enviar a notificação (via Expo Push API).
export async function sendPushNotification(token: string) {
 if (!token) {
     console.log("Token de notificação não encontrado. Não é possível enviar.");
    return;
  }
  
  const message = {
    to: token,
    sound: "default",
    title: "🚨 Nova Localização Rastreada!",
    body: "Um novo ponto foi registrado no mapa do MotoMap.",
    data: { screen: 'Localizações' },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log("Notificação enviada com sucesso.");
  } catch (e) {
    console.error("Erro ao enviar notificação:", e);
  }
}

// Exporta o token para que outros componentes possam acessá-lo.
export const getExpoPushToken = () => expoPushToken;