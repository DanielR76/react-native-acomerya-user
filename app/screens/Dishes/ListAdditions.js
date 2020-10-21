import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image, Button,Icon } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Dish from "./Dish"
import { map } from "lodash";
import { firebaseapp } from "./../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
import Cart from './Cart';
 const db = firebase.firestore(firebaseapp);

export default function ListAdittions(props) {
    const{ idRestaurant }= props

    const [additions, setAdditions] = useState([])
    const getAdditions = async () => {
        db.collection("additionalDocument").where("idRestaurant",
        "==", idRestaurant)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setAdditions(state)
            })
    }
    useEffect(() => {
        getAdditions()
    }, [])   
   
    return (
    <View>
   {map(additions, (addition, index)=>(
    <Addition key={index} addition={addition}/>
    ))}
    </View>
    );
}

function Addition (props) {

    const{idRestaurant, id, name, price}=props.addition;
    return(
    <View style={{ flexDirection: "row", padding:10, paddingBottom: 20,borderBottomWidth: 1, borderColor: "#cccccc",  }}>
    <View style={{ flex:1,}}>
    <Text  >{name}</Text>
    <Text style={{marginTop:5, color:"grey", fontSize:12, position:"absolute", right:30, bottom:0 }}>{price}</Text>
    <View style={{marginTop:5,  position:"absolute", right:0}}>
    <Icon type="material-community" name="circle-outline" size={15} color={"#33c37d"}></Icon>
    </View>
    </View>
    
    </View>
        )
        };

const styles = StyleSheet.create({
    loaderDishes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
    , viewPlatos: {
        flexDirection: "row",
        marginBottom: 10
    }
    , viewPlatosImage: {
        marginRight: 15
    }
    , vimageDishes: {
        width: 80,
        height: 80,

    }
    , dishesName: {
        fontWeight: "bold",
    }
    , dishPrice: {
        paddingTop: 2,
        color: "grey",
    }
    , dishDescrip: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    }
}
)

