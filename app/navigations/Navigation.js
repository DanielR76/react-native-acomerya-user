import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as firebase from "firebase/app";
import RestaurantsStack from "../navigations/RestaurantsStack";
import FavoriteStack from "./FavoriteStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import ReservationStack from "./ReservationStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [Login, setLogin] = useState(null);

  /* useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);
  console.log(Login);
  if (Login === null) return( Login ? <UserLogged /> : <UserGuest />)
 */ return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#ED923D",
        }}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
