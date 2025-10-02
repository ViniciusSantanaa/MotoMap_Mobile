import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MotoList from "../screens/MotoList";
import MotoForm from "../screens/MotoForm";
import LocalizacaoList from "../screens/LocalizacaoList";
import LocalizacaoForm from "../screens/LocalizacaoForm";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Motos" component={MotoList} />
            <Stack.Screen name="Nova Moto" component={MotoForm} />
            <Stack.Screen name="Localizações" component={LocalizacaoList} />
            <Stack.Screen name="Nova Localização" component={LocalizacaoForm} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
