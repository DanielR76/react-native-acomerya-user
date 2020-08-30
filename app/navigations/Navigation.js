import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RestaurantsStack from "./RestaurantsStack";
import ReservationStack from "./ReservationStack"; 
import RequestOnYourTableStack from "./RequestOnYourTableStack";

import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

export default function Navigation () {
    return (
        <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="restaurants" component={RestaurantsStack} options={{ title:"Restaurantes"}}/ >
        <Tab.Screen name="Reservation" component={ ReservationStack } options={{ title:"Reservas"}}/ >
        <Tab.Screen name="RequestOnYourTable" component={ RequestOnYourTableStack } options={{ title:"Solicita a tu mesa"}}/ >
        <Tab.Screen name="Profile" component={ Profile } options={{ title:"Perfil "}}/ >



        </Tab.Navigator>
        </NavigationContainer>
    )
}