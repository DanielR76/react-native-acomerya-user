import React, { useEffect, useState } from "react";
import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {  Icon ,Image } from "react-native-elements";
import RestaurantsStack from "./app/navigations/RestaurantsStack";
import DishStack from "./app/navigations/DishStack";
import CodeStack from "./app/navigations/CodeStack";
import Cart from "./app/screens/Dishes/Cart"
import Code from "./app/screens/Dishes/Code"
import AccountStack from "./app/navigations/AccountStack";
import PerfilStack from "./app/navigations/ProfileStack";
import * as firebase from "firebase/app";
import ReservationStack from "./app/navigations/ReservationStack";
import { decode, encode } from "base-64";
import { Ionicons } from "@expo/vector-icons"
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
      {!LoginIn ? (
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
          <Tab.Navigator
          initialRouteName="restaurants" 
          tabBarOptions={{
            activeTintColor: "#ED923D",
            activeBackgroundColor: "#FBF4F4",
           // inactiveTintColor: "#FFF",
            //inactiveBackgroundColor: "#527318"
          }}  >
            <Tab.Screen
              name="restaurants"
              component={RestaurantsStack}
              options={{ title: "Restaurantes",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/Restaurants.png')}
                  style={{width: 35, height: 35,  tintColor: tintColor}}
                />
              )
            }
            
            }
            />
            <Tab.Screen
              name="MyReservations"
              component={ReservationStack}
              options={{ title: "Mis Reservas",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/MyReservations.png')}
                  style={{width: 35, height: 35, tintColor: tintColor}}
                />
              )
             }}
            />
            <Tab.Screen
              name="Code"
              component={CodeStack}
              options={{ title: "Codigo",
            
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/Code.png')}
                  style={{width: 35, height: 35, tintColor: tintColor}}
                />
              )
            }}
            />
            <Tab.Screen
              name="Dishes"
              component={DishStack}
              options={{ title: "Platos",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/Dishes.png')}
                  style={{width: 35, height: 35, tintColor: tintColor}}
                />
              )
            }}
            />
            <Tab.Screen
              name="Cart"
              component={Cart}
              options={{ title: "Carrito",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/Car.png')}
                  style={{width: 35, height: 35, tintColor: tintColor}}
                />
              )
              /*tabBarLabel:'prueba'tabBarVisible: false*/ }}
            />
             <Tab.Screen
              name="perfil"
              component={PerfilStack}
              options={{ title: "Perfil", 
              /* tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" size={size} color={color} />
              ) */
              
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('./assets/icon/Profile.png')}
                  style={{width: 35, height: 35,  tintColor: tintColor}}
                />
              )
            }
            
            }
            />
          </Tab.Navigator>
        )}
    </NavigationContainer>
  );
}
