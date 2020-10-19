import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyReservation from "../screens/Reservations/MyReservations";
const Stack = createStackNavigator();

export default function ReservationStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="MyReservations"
        component={MyReservation}
        options={{ title: "Mis Reservas" }}
      />
    </Stack.Navigator>
  );
}
