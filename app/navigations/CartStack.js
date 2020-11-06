import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Dishes/Cart"

const Stack = createStackNavigator();

export default function CartStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#efd3d3'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Roboto'

            }
        }}>
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{ title: "Mi carrito. " }}
            />
        </Stack.Navigator>
    )
}


