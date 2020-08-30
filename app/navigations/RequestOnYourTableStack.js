import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RequestOnYourTable from "../screens/RequestOnYourTable";

 const Stack = createStackNavigator();

 export default function RequestOnYourTableStack() {
return (
<Stack.Navigator>
<Stack.Screen name="RequestOnYourTable" component={RequestOnYourTable} options={{ title: "Solicita a tu mesa "}}/>
</Stack.Navigator>
)
 }
 