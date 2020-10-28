import React, { useEffect, useState } from "react";
import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RestaurantsStack from "./app/navigations/RestaurantsStack";
import DishStack from "./app/navigations/DishStack";
import CodeStack from "./app/navigations/CodeStack";
import Cart from "./app/screens/Dishes/Cart"
import AccountStack from "./app/navigations/AccountStack";
import PerfilStack from "./app/navigations/ProfileStack";
import * as firebase from "firebase/app";
import ReservationStack from "./app/navigations/ReservationStack";
import { decode, encode } from "base-64";
import Dishes from './app/screens/Dishes/Dishes'

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function App() {
  const [LoginIn, setLoginIn] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLoginIn(false) : setLoginIn(true);
    });
  }, []);


  return (

    <NavigationContainer>
      {!LoginIn  ? (
        <Tab.Navigator>
          <Tab.Screen
            name="account"
            component={AccountStack}
            options={{ title: "Cuenta" }, {
              tabBarVisible: false
            }}
          />
        </Tab.Navigator >
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="restaurants"
            component={RestaurantsStack}
            options={{ title: "Restaurantes" }}
          />
          <Tab.Screen
            name="perfil"
            component={PerfilStack}
            options={{ title: "perfil" }}
          />
           <Tab.Screen
            name="MyReservations"
            component={ReservationStack}
            options={{ title: "Mis Reservas" }}
          />
          <Tab.Screen
              name="Code"
              component={DishStack}
              options={{ title: "Codigo" }}
            />
            <Tab.Screen
            name="Cart"
            component={Cart}
            options={{ title: "carrito", /*tabBarLabel:'prueba'tabBarVisible: false*/ }}
          />  
          <Tab.Screen 
          name="Dishes" 
        component={Dishes} 
        options={{ title: "Platos " }}
         />
          {/* <Tab.Screen
              name="RequestOnYourTable"
              component={RequestOnYourTableStack}
              options={{ title: "Solicita a tu mesa" }}
            /> */}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
