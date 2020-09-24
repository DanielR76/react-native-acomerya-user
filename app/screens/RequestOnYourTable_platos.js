import React,{useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { db } from "../utils/firebase";
import "firebase/firestore";
import ListPlatos from "../screens/ListPlatos";


export default function RequestOnYourTable_platos() {
      //funcion que permite traer los platos
const [dish, setDish] = useState([])
const getDishes = async () => {
    db.collection("dishDocument").where("idRestaurant", "==", 123465)
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

// const exportDishesList = ()=>{
//     return (
//         <View>
//         <Text>RequestOnYourTable_platos</Text>
//         <ListPlatos dish = {dish}></ListPlatos>
//         </View>
//     );
// }
    return (
        <View>
       <ListPlatos dish={ dish }/>
       </View>
    );
}