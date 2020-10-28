import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebaseapp } from "./../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import { size } from "lodash";
import { Image } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

var { height, width } = Dimensions.get("window");

export default function Dishes(props) {
    const { navigation, route } = props;
    //const { code } = route.params;



    //funcion que permite traer todos los platos de un restaurante en especifico
    const [dishes, setDishes] = useState([])
    useFocusEffect(
        useCallback(() => {
            var code = global.codeValue
            db.collection("dishDocument").where("idRestaurant",
                "==", code /*'ZooU6ULsozSJ1Y3ijHkD7eAJZjM2'*/)
                .onSnapshot(querySnapshot => {
                    const state = []
                    querySnapshot.forEach((doc) => {
                        state.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })
                    setDishes(state)
                })

        }, [])
    )

    // //funcion que permite traer todos los platos de un restaurante en especifico
    // const [dishes, setDishes] = useState([])
    // const [count, setCount] = useState(global.codeValue)
    // // console.log(count)
    // const getDishes = async () => {
    //     // let codeVale = global.codeVale;
    //     console.log(count)
    //     db.collection("dishDocument").where("idRestaurant",
    //         "==", count /*'ZooU6ULsozSJ1Y3ijHkD7eAJZjM2'*/)
    //         .onSnapshot(querySnapshot => {
    //             const state = []
    //             querySnapshot.forEach((doc) => {
    //                 state.push({
    //                     ...doc.data(),
    //                     id: doc.id
    //                 })
    //             })
    //             setDishes(state)
    //         })
    // }
    // useEffect(() => {
    //     getDishes()
    // }, [])



    return (
        <View>
            {size(dishes) > 0 ? (
                <FlatList
                    data={dishes}
                    //numColumns={2}
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
            <View>
                <Text style={styles.dishesName}>{dishName}</Text>
                <Text style={styles.dishPrice}>{price}</Text>
                <Text style={styles.dishDescription}>{description.substr(0, 60)}...</Text>
            </View>
            <View style={{ marginTop: 5, position: "absolute", right: 0 }}>
                <TouchableOpacity onPress={goDish}>
                    <Text >Agregar</Text>
                    <Icon name="ios-add-circle" size={15} color={"white"}></Icon>
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
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#FFF6F6",
        borderRadius: 10,
    }
    , viewDishesImage: {
        marginRight: 15,

    }
    , vimageDishes: {
        width: 80,
        height: 80
    }
    , dishesName: {
        fontWeight: 'bold',
    }
    , dishPrice: {
        paddingTop: 12,
        color: 'grey',
    }
    , dishDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    }
    , viewPlatos: {
        flexDirection: "row",
        marginBottom: 10
    }
    , tobuttonCart: {
        width: (width / 2) - 40,
        backgroundColor: "#33c37d",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        flexDirection: "row",
    }
    , textbuttonCart: {
        color: "white",
        fontWeight: "bold",
    }

}
)
