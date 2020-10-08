import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as firebase from "firebase/app";
import RestaurantsStack from "./RestaurantsStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function NavigationAccount() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#ED923D",
        }}
      >
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
