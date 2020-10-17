import React, { useState, useEffect } from "react";
import { View, AsyncStorage} from "react-native";
import ListPlatos from "../screens/ListPlatos";
import { FlatList } from "react-native-gesture-handler";
import { firebaseapp } from "../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import RequestOnYourTable from "../screens/RequestOnYourTable"

export default function RequestOnYourTable_platos(props) {
    const { navigation, route } = props;
    const { code } = route.params;

    AsyncStorage.setItem('keyCode', code);  

    //funcion que permite traer los platos
    const [dish, setDish] = useState([])
    const getDishes = async () => {
        db.collection("dishDocument").where("idRestaurant",
            "==", code /*"ZooU6ULsozSJ1Y3ijHkD7eAJZjM2" firebase.auth().currentUser.uid*/)
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
