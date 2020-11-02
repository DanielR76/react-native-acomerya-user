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
        db.collection("reservationDocument")
        .get()
        .then((snap) => {
          setTotalRestaurants(snap.size);
        });
        const resultRestaurants = [];
            db.collection("reservationDocument")
           .where("idUser", "==", firebase.auth().currentUser.uid)
        //  .orderBy("quantity", "desc")
         // .limit(limitRestaurants)
         .onSnapshot((response) => {
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
  
    /* const handleLoadMore =  () => {
      const resultRestaurants = [];
      restaurants.length < totalRestaurants && setIsLoading(true);
       db.collection("reservationDocument")
      .where("idUser", "==", firebase.auth().currentUser.uid)
       // .orderBy("quantity", "desc")
        //.startAfter(startRestaurants.data().quantity)
        //.limit(limitRestaurants)   
        .onSnapshot((response) => {
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
        console.log(restaurants)
    }; */
 
    return (
      <View>
        <ListReservations
          restaurants={restaurants}
         // handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </View>
    );
  }