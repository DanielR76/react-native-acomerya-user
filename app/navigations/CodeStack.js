import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Code from "../screens/Dishes/Code";
import { LinearGradient } from 'expo-linear-gradient';


const Stack = createStackNavigator();

export default function CodeStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FFF6F6'
            },
        }}>
            <Stack.Screen
                name="Code"
                component={Code}
                options={{ title: "Enlaza con tu restaurante favorito " }}
            />
        </Stack.Navigator >
    )
}


