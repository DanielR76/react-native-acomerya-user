import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import RegisterRestaurant from "../screens/Account/RegisterRestaurant";
const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesion" }}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registro" }}
      />
      <Stack.Screen
        name="registerRestaurant"
        component={RegisterRestaurant}
        options={{ title: "Registro de restaurante" }}
      />
    </Stack.Navigator>
  );
}
