import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, Button } from 'react-native'
import { Image } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { size } from "lodash";

const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart(props) {
    const { navigation, route } = props;

    // useEffect(() => {
    //     AsyncStorage.removeItem("cart")
    // }, [])

    const initialStateValues = {
        dishes: [],
        idRestaurant: "",
        table: "",
        idUser: firebase.auth().currentUser.uid,
        status: 'active',
        totalPrice: 0,
        date: new Date().getDate()
    }
    // const [addition, setAddition] = useState([])
    const [dishCart, setDishCart] = useState(initialStateValues)
    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('cart').then((cart) => {
                if (cart !== null) {
                    const dishes = JSON.parse(cart)
                    let total = 0
                    dishes.map((item) => {
                        total = parseInt(item.priceAddition + total)
                    })
                    AsyncStorage.getItem('idRestaurant').then(responseId => {
                        // setDishCart({ ...dishCart, dishes: dishes, totalPrice: total, idRestaurant: response })
                        AsyncStorage.getItem('table').then(responseTable => {
                            setDishCart({ ...dishCart, dishes: dishes, totalPrice: total, table: responseTable, idRestaurant: responseId })
                        })
                    })

                    //console.log(additionss)
                }
            })
                .catch((err) => {
                    alert(err)
                })
        }, [],
        ))

    //funcion que envia el pedido a la base de datos
    const addBD = () => {
        db.collection("requestsDocument").doc().set(dishCart).then();
        setDishCart({ ...initialStateValues })
        AsyncStorage.removeItem("cart")
    }
    //Eliminar plato del carrito
    const deleteCartItem = (idx) => {
        let arr = dishCart.dishes.map((item, index) => {
            if (idx == index) {
            }
            return { ...item }
        })
        arr.splice(idx, 1)
        let newTotal = calculateTotalPrice(arr)
        setDishCart({ ...dishCart, dishes: arr, totalPrice: newTotal })
        AsyncStorage.getItem("cart").then(dataCart => {
            AsyncStorage.setItem("cart", JSON.stringify(arr))
        })
    }
    //Aumentar o disminuir cantidad
    const onChangeQual = (type, index) => {
        let newPrice
        let dataCart = dishCart.dishes
        let amount = dataCart[index].quantity
        if (type) {
            amount = amount + 1
        }
        else if (type == false && amount > 1) {
            amount = amount - 1
        }
        dataCart[index].quantity = amount
        newPrice = parseInt(amount * dataCart[index].price)
        dataCart[index].priceAddition = newPrice
        let newTotal = calculateTotalPrice(dataCart)
        setDishCart({ ...dishCart, dishes: dataCart, totalPrice: newTotal })
        AsyncStorage.getItem("cart").then(data => {
            AsyncStorage.setItem("cart", JSON.stringify(dataCart))
        })
    }

    const calculateTotalPrice = (value) => {
        let total = 0
        value.map((item) => {
            total = parseInt(item.priceAddition + total)
        })
        return total
    }
    console.log(dishCart)
    //navigation.setOptions({ title: "Carrito" });
    return (
        <ScrollView>
            <View>
                {
                    dishCart.dishes.map((item, index) => {
                        return (
                            <View key={index} style={{ flex: 1 }} /*style={styles.viewDishes}*/>
                                <View style={{ width: width - 20, margin: 10, marginTop: 5, backgroundColor: '#FFF6F6', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10, borderRadius: 10 }}>
                                    <View style={{ width: width - 20, flexDirection: 'row', }}>
                                        <Image
                                            style={{ width: width / 3, height: width / 3 }}
                                            // style={styles.imageDish}
                                            resizeMode="contain"
                                            PlaceholderContent={<ActivityIndicator color="fff" />}
                                            source={item.imagePath ? { uri: item.imagePath } : require("./../../../assets/img/imgj.jpg")
                                            }
                                        />
                                        <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, justifyContent: "space-between" }}>
                                            <View>
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.dishName}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text> {(item.priceAddition)}</Text>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => onChangeQual(false, index)}>
                                                        <Ionicons
                                                            name="ios-remove-circle"
                                                            size={30} color={"#ffa500"}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={{ paddingHorizontal: 8, fontWeight: 'bold' }}>{item.quantity}</Text>
                                                    <TouchableOpacity onPress={() => onChangeQual(true, index)}>
                                                        <Ionicons
                                                            name="ios-add-circle"
                                                            size={30} color={"#ffa500"}
                                                        />
                                                    </TouchableOpacity>
                                                    <View style={{ position: 'relative', marginLeft: 20 }}>
                                                        <Ionicons
                                                            onPress={() => deleteCartItem(index)}
                                                            name="ios-trash"
                                                            size={30} color={"#ffa500"}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 17, marginEnd: 10 }}> Ingredientes</Text>
                                        <View>
                                            <Text> {(item.ingredient).join(' , ')}</Text>
                                        </View>
                                        <Text style={{ fontWeight: "bold", fontSize: 17, marginEnd: 10 }}> Adiciones</Text>
                                        <View>
                                            <Text> {(item.addition).join(' , ')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )
                    })
                }
                <View style={{ height: 20 }} />
                {size(dishCart.dishes) > 0 ? (
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
                ) : (
                        <View>
                            <View style={{ alignItems: 'center', alignContent: 'center', marginTop: 50 }}>
                                <Ionicons
                                    name="ios-cart"
                                    size={100} color={"gray"}
                                />
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ height: 20 }} />
                                    <Text style={{ fontSize: 23 }}>Tu carrito de compras esta vacío</Text>
                                    <View style={{ height: 10 }} />
                                    <Text style={{ fontSize: 18, color: "gray" }}>Elige tu plato favorito</Text>
                                </View>
                            </View>
                        </View>
                    )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <Text>Hello World!</Text>

            </Modal>
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
        //backgroundColor: 'transparent'
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
        backgroundColor: "#ED923D",
        width: width - 120,
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        // marginLeft: 25,
    }
    , textTouch: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        //marginLeft: 18,
        //marginTop: -13,
    }

})
