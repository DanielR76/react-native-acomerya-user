import React, { useEffect, useState } from "react";
import Navigation from "./app/navigations/Navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Account from "./app/screens/Account/Account";
import Login from "./app/screens/Account/Login";
import Register from "./app/screens/Account/Register";
import RegisterRestaurant from "./app/screens/Account/RegisterRestaurant";
import RestaurantsStack from "./app/navigations/RestaurantsStack";
import AccountStack from "./app/navigations/AccountStack";
import NavigationAccount from "./app/navigations/NavigationAccount";
import * as firebase from "firebase/app";
import { decode, encode } from "base-64";

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
      {!LoginIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="account"
            component={AccountStack}
            options={{ title: "Cuenta" }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="restaurants"
            component={RestaurantsStack}
            options={{ title: "Restaurantes" }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
