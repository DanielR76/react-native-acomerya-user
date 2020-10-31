import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native'
import { Image } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import { size } from "lodash";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart(props) {
    const { navigation, route } = props;

    const [unitPriceDish, setUnitPriceDish] = useState([])


    useEffect(() => {
        initialStateValues
    }, [])

    const initialStateValues = {
        dishes: [],
        idRestaurant: 'ZooU6ULsozSJ1Y3ijHkD7eAJZjM2',
        table: 'mesa 4',
        idUser: 'kwOZtSWxX9VdsXw0fVsSB30JVP43'/*firebase.auth().currentUser.uid*/,
        status: 'active',
        totalPrice: 0,
    }
    const [dishCart, setDishCart] = useState(initialStateValues)
    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('cart').then((cart) => {
                if (cart !== null) {
                    const dishes = JSON.parse(cart)
                    let total = 0
                    dishes.map((item, index) => {
                        total = parseInt(item.priceAddition + total)
                    })
                    setDishCart({ ...dishCart, dishes: dishes, totalPrice: total })
                    setUnitPriceDish({ ...dishCart })
                }
            })
                .catch((err) => {
                    alert(err)
                })
        }, [],
        ))
    const deleteCartItem = (idx) => {
        let arr = dishCart.dishes.map((item, index) => {
            if (idx == index) {
            }
            return { ...item }
        })
        arr.splice(idx, 1)
        setDishCart({ ...dishCart, dishes: arr })
        AsyncStorage.getItem("cart").then(dataCart => {
            if (dataCart !== null) {
                const cart = JSON.parse(dataCart)
                AsyncStorage.setItem("cart", JSON.stringify(arr))
            } else {
                AsyncStorage.setItem('cart', JSON.stringify(arr));
            }
        })
    }

    // useEffect(() => {
    //     deleteCartItem()
    // }, [])


    //funcion que envia el pedido a la base de datos
    const addBD = () => {
        db.collection("requestsDocument").doc().set(dishCart).then();
        AsyncStorage.removeItem("cart")
    }

    const onChangeQual = (type, index) => {
        let cantPrice
        const dataCarr = dishCart.dishes
        let cantd = dataCarr[index].quantity
        if (type) {
            cantd = cantd + 1
            dataCarr[index].quantity = cantd
            cantPrice = parseInt(cantd * unitPriceDish)
            console.log(unitPriceDish)
            dataCarr[index].priceAddition = cantPrice
            setDishCart({ ...dishCart, dishes: dataCarr })
        }
        else if (type == false && cantd >= 2) {
            cantd = cantd - 1
            dataCarr[index].quantity = cantd
            const precio = dataCarr[index].price
            cantPrice = (precioUnitario * cantd)
            dataCarr[index].price = cantPrice
            setDishCart({ ...dishCart, dishes: dataCarr })
        }
        else if (type == false && cantd == 1) {
            // dataCarr.splice(index, 1)
            //setDishCart({ dishCart: dataCarr })
        }
        AsyncStorage.getItem("cart").then(dataCart => {
            if (dataCart !== null) {
                const cart = JSON.parse(dataCart)
                AsyncStorage.setItem("cart", JSON.stringify(dataCarr))
            } else {
                AsyncStorage.setItem('cart', JSON.stringify(dataCarr));
            }
        })
    }

    navigation.setOptions({ title: "Carrito" });
    return (
        <ScrollView>
            <View>
                {
                    dishCart.dishes.map((item, index) => {
                        return (
                            <View key={index} style={styles.viewDishes}>
                                <View style={styles.viewDishesImage}>
                                    <Image
                                        //style={{ width: width / 3, height: width / 3, }}
                                        style={styles.imageDish}
                                        resizeMode="cover"
                                        PlaceholderContent={<ActivityIndicator color="fff" />}
                                        source={item.imagePath ? { uri: item.imagePath } : require("./../../../assets/img/imgj.jpg")
                                        }
                                    />
                                </View>
                                <View style={styles.containerTextName}>
                                    <Text style={styles.textNameDishes} >{item.dishName}</Text>
                                    <Text style={styles.text} > {(item.priceAddition)}</Text>
                                </View>

                                <View style={{ marginTop: 5, flexDirection: "row" }}>
                                    <Text style={{ fontWeight: 'bold' }}>Adiciones</Text>
                                    <Text style={styles.textAddit} >{item.addition}</Text>
                                </View>
                                <View style={{ marginTop: 50, position: "absolute", right: 10 }}>
                                    <Ionicons
                                        onPress={() => deleteCartItem(index)}
                                        name="ios-trash"
                                        size={20} color={"#ffa500"}
                                    />
                                </View>
                                <View style={{ marginTop: 80, position: "absolute", flexDirection: "row", alignItems: "center", right: 10 }}>
                                    <TouchableOpacity onPress={() => onChangeQual(false, index)}/*onPress={() => onPressRemove(index)}*/>
                                        <Ionicons
                                            name="ios-remove-circle"
                                            size={20} color={"#ffa500"}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', paddingHorizontal: 8 }}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => onChangeQual(true, index)}/*onPress={() => onPressAdded(index)}*/>
                                        <Ionicons
                                            name="ios-add-circle"
                                            size={20} color={"#ffa500"}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    })
                }
                <View style={{ marginTop: 20, flexDirection: "row" }}>
                    <View>
                        <TouchableOpacity
                            onPress={addBD}
                            style={styles.viewTouch}
                        >
                            <Text style={styles.textTouch}>¡Confirma tu orden!</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 14,
                            marginTop: 15,
                            marginLeft: 30,
                        }}> {dishCart.totalPrice}</Text>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    viewDishes: {
        width: 340,
        height: 250,
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
    , imageDish: {
        width: 150,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
    }
    , containerTextName: {
        padding: 14,
    }
    , textNameDishes: {
        width: 183,
        height: 25,
        marginLeft: 126,
        marginTop: -120,
        fontSize: 14,
        fontWeight: "bold",
    }
    , text: {
        width: 130,
        height: 35,
        marginLeft: 125,
        fontSize: 14,
    }
    , textAddit: {
        width: 130,
        height: 105,
        marginLeft: 70,
        fontSize: 14,
    }
    , viewTouch: {
        width: 200,
        height: 10,
        // marginTop: 20,
        marginLeft: 25,
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#ED923D",
    }
    , textTouch: {
        //width: 200,
        //height: 10,
        marginLeft: 18,
        marginTop: -13,
        //textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    }

})
