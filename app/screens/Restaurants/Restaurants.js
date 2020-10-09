import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { firebaseapp } from "../../utils/firebase";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";
import { useFocusEffect } from "@react-navigation/native";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 10;

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurantsDocument")
        .get()
        .then((snap) => {
          setTotalRestaurants(snap.size);
        });

      const resultRestaurants = [];

      db.collection("restaurantsDocument")
        .orderBy("phone", "desc")
        .limit(limitRestaurants)
        .get()
        .then((response) => {
          setStartRestaurants(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
          });
          setRestaurants(resultRestaurants);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    db.collection("restaurantsDocument")
      .orderBy("phone", "desc")
      .startAfter(startRestaurants.data().phone)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });
        setRestaurants([...restaurants, ...resultRestaurants]);
      });
  };
  return (
    <View>
      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
}
