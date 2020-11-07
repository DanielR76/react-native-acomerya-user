import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dishes from "../screens/Dishes/Dishes";
import Dish from "../screens/Dishes/Dish";

const Stack = createStackNavigator();

export default function RequestOnYourTableStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'white'
      },
      // headerTitleStyle: {
      //   fontWeight: 'bold'
      // }
    }}>
      <Stack.Screen
        name="Dishes"
        component={Dishes}
        options={{ title: "Selecciona tu plato. " }}
      />
      <Stack.Screen
        name="Dish"
        component={Dish}
      />
    </Stack.Navigator>


  )
}


