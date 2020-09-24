import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RequestOnYourTable from "../screens/RequestOnYourTable";
import RequestOnYourTable_platos from "../screens/RequestOnYourTable_platos";

const Stack = createStackNavigator()

export default function RequestOnYourTableStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="RequestOnYourTable" component={RequestOnYourTable} options={{ title: "Solicita a tu mesa " }} />
        <Stack.Screen name="RequestOnYourTable_platos" component={RequestOnYourTable_platos} options={{ title: "¡ Selecciona tu plato! " }} />
    </Stack.Navigator>
    )
}
