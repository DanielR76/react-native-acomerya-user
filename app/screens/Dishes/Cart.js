import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { Image, Button } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import { size } from "lodash";
import "firebase/firestore"; 
const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart (props) {
    const { navigation, route } = props;
    const { id, dishName, imagePath, price, idRestaurant, dishes } = route.params;

    const initialStateValues = {
        idRestaurant: "123456",
        idUser: "654321",
        status: "active",
        table: "Mesa 1",
        totalPrice: null
    }
    const [dishCart, setDishCart] = useState(initialStateValues)

    const addBD = () => {
setDishCart({ ...dishCart, dishes:"hola" 
})      
        db.collection("requestsDocument").doc().set(dishCart).then();
    }

    
    navigation.setOptions({ title: "Carrito" });
    return (

        <View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>{dishName}</Text>
                <View style={{ height: 10 }} />
                <View style={{ backgroundColor: "transparent", flex: 1 }} />
                <View>
                    <View style={{ width: width - 20, margin: 10, backgroundColor: "transparent", flexDirection: "row", borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}></View>
                    <Image
                        style={{ width: width / 3, height: width / 3, }}
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={imagePath ? { uri: imagePath } : require("./../../../assets/img/imgj.jpg")
                        }
                    />
                    <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <Text>{dishName}</Text>
                        </View>

                        <View style={{ backgroundColor: "transparent", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20, }}>{route.params.price}</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <TouchableOpacity
                        onPress={addBD}
                        style={{
                            backgroundColor: "#33c37d", width: width - 40,
                            alignItems: 'center',
                            padding: 10, borderRadius: 5,
                        }}
                    >
                        <Text style={{
                            fontSize: 24, fontWeight: 'bold', color: "white",
                        }}>
                            ¡Confirma tu orden!
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    viewPlatosImage: {
        marginRight: 15
    }
    , viewPlatos: {
        flexDirection: "row",
        marginBottom: 10
    }
    , vimageDishes: {
        width: 80,
        height: 80,

    }
})