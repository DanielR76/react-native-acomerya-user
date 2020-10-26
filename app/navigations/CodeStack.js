import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Code from "../screens/Dishes/Code";
import Dish from "../screens/Dishes/Dish";
import Cart from "../screens/Dishes/Cart"
import Dishes from "../screens/Dishes/Dishes";

const Stack = createStackNavigator();

export default function CodeStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#efd3d3'
            },
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <Stack.Screen
                name="Code"
                component={Code}
                options={{ title: "Enlaza con tu restaurante favorito. " }}
            />
        </Stack.Navigator>
    )
}


