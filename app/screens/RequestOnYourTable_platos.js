import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { db } from "../utils/firebase";
import "firebase/firestore";
import ListPlatos from "../screens/ListPlatos";
import { FlatList } from "react-native-gesture-handler";


export default function RequestOnYourTable_platos() {
    //funcion que permite traer los platos
    const [dish, setDish] = useState([])
    const getDishes = async () => {
        db.collection("dishDocument")
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setDish(state)
            })
    }
    useEffect(() => {
        getDishes()
    }, [])

    return (
        <View>
            <ListPlatos dish={dish} />
        </View>
    );

}
