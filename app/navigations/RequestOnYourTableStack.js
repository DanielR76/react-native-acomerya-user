import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RequestOnYourTable from "../screens/RequestOnYourTable";
import RequestOnYourTable_platos from "../screens/RequestOnYourTable_platos";
import Dish from "../screens/Dish";
import Cart from "../screens/Cart"

const Stack = createStackNavigator();

export default function RequestOnYourTableStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:'#efd3d3'
        },
        headerTitleStyle:{
          fontWeight:'bold'
        }
        }}>
      <Stack.Screen
        name="RequestOnYourTable" 
        component={RequestOnYourTable} 
        options={{ title: "Solicita a tu mesa "}}
         />
        <Stack.Screen name="RequestOnYourTable_platos" 
        component={RequestOnYourTable_platos} 
        options={{ title: "¡ Selecciona tu plato! " }}
         />
        <Stack.Screen 
        name="dish" 
        component={Dish} 
        />
        </Stack.Navigator>
    )}

    
