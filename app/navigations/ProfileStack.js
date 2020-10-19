import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Perfil from "../screens/Account/UserLogged";
import RegisterRestaurant from "../screens/Account/RegisterRestaurant";
import { Avatar, Icon } from "react-native-elements";
const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="perfil"
        component={Perfil}
        options={{ title: "Perfil" }}
      />
    </Stack.Navigator>
  );
}
