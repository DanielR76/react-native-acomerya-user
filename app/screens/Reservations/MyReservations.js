import React, { useState, useEffect, useCallback } from "react"
import { View, Text } from "react-native"
import ListReservations from "../../components/MyReservations/ListReservations"
import { useFocusEffect } from "@react-navigation/native"
import { firebaseapp } from "../../utils/firebase"
import firebase, { firestore } from "firebase//app"
import "firebase/firestore"
const db = firebase.firestore(firebaseapp)

export default function MyReservations() {
    const [restaurants, setRestaurants] = useState([])
    const [totalRestaurants, setTotalRestaurants] = useState(0)
    const [startRestaurants, setStartRestaurants] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const limitRestaurants = 10;
  
    useFocusEffect(
      useCallback(() => {
        getRestaurantsDocuments()
        getRestaurantsAllDocuments()
      }, [])
    );
  
    const resultRestaurants = [];
    const getRestaurantsAllDocuments= async () => {
      await
    db.collection("reservationDocument")
      .orderBy("quantity", "desc")
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
    }
    const getRestaurantsDocuments= async () => {
      await
    db.collection("reservationDocument")
      .get()
      .then((snap) => {
        setTotalRestaurants(snap.size);
      });
    }
    const handleLoadMore = () => {
      const resultRestaurants = [];
      restaurants.length < totalRestaurants && setIsLoading(true);
      db.collection("reservationDocument")
        .orderBy("quantity", "desc")
        .startAfter(startRestaurants.data().quantity)
        .limit(limitRestaurants)
       // .where("idUser", "==", firebase.auth().currentUser.uid)
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
        <ListReservations
          restaurants={restaurants}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </View>
    );
  }