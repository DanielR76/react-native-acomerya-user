import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
 import Reservation from "../screens/Reservation";

 const Stack = createStackNavigator();

 export default function ReservationStack() {
return (
<Stack.Navigator>
<Stack.Screen name="Reservation" component={Reservation} options={{ title: "Reservas "}}/>
</Stack.Navigator>
)
 }
 