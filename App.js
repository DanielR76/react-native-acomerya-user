import React, { useEffect, useState } from "react";
import Navigation from "./app/navigations/Navigation";
import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Account from "./app/screens/Account/Account";
import Login from "./app/screens/Account/Login";
import Register from "./app/screens/Account/Register";
import RegisterRestaurant from "./app/screens/Account/RegisterRestaurant";
import RestaurantsStack from "./app/navigations/RestaurantsStack";
import RequestOnYourTableStack from "./app/navigations/RequestOnYourTableStack";
import Cart from "./app/screens/Cart"
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
  const [userCode, setUserCode] = useState(null);

  useEffect(() => {
    const userCode = async()=>await AsyncStorage.getItem('keyCode', (a,b)=>console.log(b + a)); 
    setUserCode()
  console.log(userCode)
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLoginIn(false) : setLoginIn(true);
    });
  }, []);

  return (

    <NavigationContainer>
      {/*!LoginIn &&*/ !userCode ? (
        <Tab.Navigator>
          <Tab.Screen
            name="account"
            component={AccountStack}
            options={{ title: "Cuenta" }}
          />
          <Tab.Screen
              name="Cart"
              component={Cart}
              options={{ title: "carrito", /*tabBarLabel:'prueba'tabBarVisible: false*/ }}
            />  
        </Tab.Navigator >
      ) : (
          <Tab.Navigator
          //initialRouteName="RequestOnYourTableStack"
            tabBarOptions={{
              activeTintColor: '#e91e63',

              //showLabel: false
            }}>
            <Tab.Screen
              name="restaurants"
              component={RestaurantsStack}
              options={{ title: "Restaurantes" }}

            />
            <Tab.Screen
              name="RequestOnYourTable"
              component={RequestOnYourTableStack}
              options={{ title: "Codigo" }}
            />
            

                 
             
          </Tab.Navigator>
        
        )}

    </NavigationContainer>
  );
}