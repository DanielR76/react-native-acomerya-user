import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebaseapp } from "./../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import { size } from "lodash";
import { Image, Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
var { height, width } = Dimensions.get("window");

export default function Dishes(props) {
    const { navigation, route } = props;
    const [idRestaurant, setIdRestaurant] = useState("")


    useFocusEffect(
        useCallback(() => {
            var idRes
            AsyncStorage.getItem('idRestaurant').then(idRestaurant => {
                setIdRestaurant(idRestaurant)
                getDishesById(idRestaurant)
            })
        }, [])
    )


    //funcion que permite traer todos los platos de un restaurante en especifico
    const [dishes, setDishes] = useState([])
    const getDishesById = async (idRest) => {
        await db.collection("dishDocument").where("idRestaurant",
            "==", idRest)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })
                setDishes(state)
            })
    }
    return (
        <View>
            {size(dishes) > 0 ? (
                <FlatList
                    data={dishes}
                    renderItem={(dish) => <Dish dish={dish} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                    <View style={styles.loaderDishes}>
                        <ActivityIndicator size="large"></ActivityIndicator>
                        <Text> Cargando menu</Text>
                    </View>
                )}
        </View>
    );
}

function Dish(props) {
    const { dish, navigation } = props;
    const { id, imagePath, dishName, price, description, idRestaurant } = dish.item;

    const goDish = () => {
        navigation.navigate("Dish", {
            id,
            idRestaurant,
        }
        );
    };


    return (
        <View style={styles.viewDishes}>
            <View style={styles.viewDishesImage}>
                <Image
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator color="fff" />}
                    style={styles.vimageDishes}
                    source={imagePath ? { uri: imagePath } : require("../../../assets/img/imgj.jpg")
                    }
                />
            </View>
            <View style={styles.containerTextName}>
                <Text style={styles.textNameDishes}>{dishName}</Text>
                <Text style={styles.text}>{description.substr(0, 60)}...</Text>
                <Text style={styles.text}>$ {price}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={goDish} style={styles.viewTouch}>
                    <Text style={styles.textTouch}>Agregar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    loaderDishes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
    , viewDishes: {
        width: 340,
        height: 150,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 10,
        padding: 35,
        backgroundColor: "#FFF6F6",
        //flexDirection: "row",
    }
    , viewDishesImage: {
        // marginRight: 15,
        marginLeft: -15,
        marginTop: -15,

    }
    , vimageDishes: {
        width: 150,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
    }
    , textNameDishes: {
        width: 183,
        height: 25,
        marginLeft: 146,
        marginTop: -110,
        fontSize: 14,
        fontWeight: "bold",
    }
    , text: {
        width: 130,
        height: 35,
        marginLeft: 145,
        fontSize: 14,
    }
    , viewTouch: {
        width: 75,
        height: 10,
        marginTop: -4,
        marginLeft: 225,
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#ED923D",
    }
    , textTouch: {
        //width: 200,
        //height: 10,
        marginLeft: 10,
        marginTop: -8,
        //textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
    }

}
)