import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import Restaurant from "../screens/Restaurants/Restaurant";
import Reservation from "../screens/Restaurants/Reservation";
const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen name="restaurant" component={Restaurant} />
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={{ title: "Agenda tu reserva" }}
      />
    </Stack.Navigator>
  );
}
