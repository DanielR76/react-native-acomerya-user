import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyReservation from "../screens/Reservations/MyReservations";
import EditReservation from "../screens/Reservations/IntReservation";
const Stack = createStackNavigator();

export default function ReservationStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="MyReservations"
        component={MyReservation}
        options={{ title: "Visualiza tus reservas" }}
      />
       <Stack.Screen
        name="EditReservation"
        component={EditReservation}
        options={{ title: "Editar reserva" }}
      />
    </Stack.Navigator>
  );
}
