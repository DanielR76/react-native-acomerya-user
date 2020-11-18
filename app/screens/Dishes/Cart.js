import React, { useState, useEffect, useRef, useCallback } from "react";
import { Alert, TouchableHighlight, StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, Modal } from 'react-native'
import { Image } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { size } from "lodash";

const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart(props) {
    const { navigation, route } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [idRestaurant, setIdRestaurant] = useState("")


    useFocusEffect(
        useCallback(() => {
            var idRes
            AsyncStorage.getItem('idRestaurant').then(idRestaurant => {
                setIdRestaurant(idRestaurant)
                getRestaurantById(idRestaurant)
            })
            if (size(dishCart.dishes) == 0) {
                setDishCart({ ...initialStateValues })
            }
        }, [])
    )


    //funcion que permite consultar restaurantsDocument con el fin de obtener su imagen
    const [restaurant, setRestaurant] = useState([])
    const getRestaurantById = async (idRest) => {
        await db.collection("restaurantsDocument").where("idUser",
            "==", idRest)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        // id: doc.id,
                    })
                })
                setRestaurant(state)
            })
    }

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
        setModalVisible(true);
        //setDishCart({ ...initialStateValues })
        // AsyncStorage.removeItem("cart")
    }
    const removeAsyn = () => {
        setDishCart({ ...initialStateValues })
        AsyncStorage.removeItem("cart")
        setModalVisible(!modalVisible);
    }

    const btnCancelar = () => {
        setModalVisible(!modalVisible);
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
    //navigation.setOptions({ title: "Carrito" });
    return (
        <ScrollView>
            <View>
                {size(dishCart.dishes) > 0 ? (
                    <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 10 }}>
                        <View>
                            {
                                restaurant.map((item, index) => {
                                    return (
                                        <View key={index} style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center",
                                            textAlign: "center",
                                            marginTop: 10
                                        }}>
                                            <View style={{ marginTop: 5, alignSelf: 'center' }}>
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.nameRestaurant}</Text>
                                            </View>
                                            <Image
                                                style={{
                                                    /*width: width - 13, height: width / 3,*/
                                                    resizeMode: "stretch",
                                                    height: 125,
                                                    width: 250,
                                                    marginTop: 8
                                                }}
                                                // style={styles.imageDish}
                                                //resizeMode='stretch'
                                                // PlaceholderContent={<ActivityIndicator color="fff" />}
                                                source={{ uri: (item.imagePath).toString() }}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>

                        {
                            dishCart.dishes.map((item, index) => {
                                return (
                                    <View key={index} style={{ flex: 1 }} /*style={styles.viewDishes}*/>
                                        <View style={{ margin: 10, marginTop: 15, backgroundColor: '#FFF6F6', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10, borderRadius: 10 }}>
                                            <View style={{ width: width - 20, flexDirection: "row", justifyContent: "space-around" }}>
                                                <Image
                                                    style={{ width: width / 3, height: width / 3, resizeMode: "contain", margin: 5 }}
                                                    // style={styles.imageDish}
                                                    // resizeMode="center"
                                                    PlaceholderContent={<ActivityIndicator color="fff" />}
                                                    source={item.imagePath ? { uri: item.imagePath } : require("./../../../assets/img/imgj.jpg")
                                                    }
                                                />
                                                <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, justifyContent: "space-between" }}>
                                                    <View>
                                                        <Text style={{ fontWeight: "bold", fontSize: 20, margin: 5 }}>{item.dishName}</Text>
                                                        <Text style={{ fontSize: 15, margin: 5 }}>{item.description}</Text>
                                                    </View>
                                                    <View style={{ position: 'absolute', right: 25 }}>
                                                        <Ionicons
                                                            onPress={() => deleteCartItem(index)}
                                                            name="ios-trash"
                                                            size={30} color={"#F4AD7B"}
                                                        />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image
                                                                source={require('../../../assets/icon/Money.png')}
                                                                style={{ width: width / 15, height: width / 15, marginLeft: 5 }}
                                                            />
                                                            <Text style={{ fontSize: 15 }}> {(item.priceAddition)}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', right: 15 }}>
                                                            <TouchableOpacity onPress={() => onChangeQual(false, index)}>
                                                                <Ionicons
                                                                    name="ios-remove-circle"
                                                                    size={30} color={"#F4AD7B"}
                                                                />
                                                            </TouchableOpacity>
                                                            <Text style={{ paddingHorizontal: 8, fontWeight: 'bold' }}>{item.quantity}</Text>
                                                            <TouchableOpacity onPress={() => onChangeQual(true, index)}>
                                                                <Ionicons
                                                                    name="ios-add-circle"
                                                                    size={30} color={"#F4AD7B"}
                                                                />
                                                            </TouchableOpacity>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            {size(item.ingredient) > 0 ? (
                                                <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontWeight: "bold", fontSize: 17, marginEnd: 10, alignSelf: 'center' }}> Ingredientes</Text>
                                                    <View>
                                                        <Text> {(item.ingredient).join(', ')}</Text>
                                                    </View>
                                                </View>
                                            ) : (
                                                    <View></View>
                                                )}

                                            {size(item.addition) > 0 ? (
                                                <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontWeight: "bold", fontSize: 17, marginEnd: 10, alignSelf: 'center' }}> Adiciones</Text>
                                                    <View>
                                                        <Text> {(item.addition).join(', ')}</Text>
                                                    </View>

                                                </View>
                                            ) : (
                                                    <View></View>
                                                )}
                                        </View>
                                    </View>
                                )
                            }
                            )
                        }

                        <View style={{ margin: 20, flexDirection: "row" }}>
                            <View>
                                <TouchableOpacity
                                    onPress={addBD}
                                >
                                    <LinearGradient
                                        start={{ x: 1, y: 0 }} //here we are defined x as start position
                                        end={{ x: 0, y: 0 }} //here we can define axis but as end position
                                        colors={['#FF3838', '#ED923D']}
                                        style={{ padding: 10, alignSelf: 'flex-start', borderRadius: 10, width: width / 2, height: 40 }}>
                                        <Text
                                            style={{
                                                backgroundColor: 'transparent',
                                                fontSize: 15,
                                                color: '#fff',
                                                alignSelf: 'center'
                                            }}>
                                            ¡Confirma tu orden!
                                      </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center' }}>
                                <Image
                                    source={require('../../../assets/icon/Money.png')}
                                    style={{ width: width / 12, height: width / 12 }}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginLeft: 5,
                                }}> {dishCart.totalPrice}</Text>
                            </View>
                        </View>

                    </View>
                ) : (
                        <View style={{ alignItems: 'center', alignContent: 'center', marginTop: 150 }}>
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
                    )

                }

            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                //  onRequestClose={() => {
                //  Alert.alert("Modal has been closed.");
                // }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <TouchableHighlight >
                                <Text style={styles.modalText}>¿Deseas enviar este pedido?</Text>
                            </TouchableHighlight>
                            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>

                                <TouchableOpacity
                                    onPress={() => btnCancelar()}
                                    style={{ padding: 10, alignSelf: 'flex-start', borderRadius: 10, width: width / 4, height: 40, margin: 5, backgroundColor: 'gray' }}
                                >
                                    <Text
                                        style={{
                                            backgroundColor: 'transparent',
                                            fontSize: 15,
                                            color: '#fff',
                                            alignSelf: 'center'
                                        }}>
                                        Cancelar
                                      </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        removeAsyn()
                                        // setModalVisible(!modalVisible);
                                    }}
                                >
                                    <LinearGradient
                                        start={{ x: 1, y: 0 }} //here we are defined x as start position
                                        end={{ x: 0, y: 0 }} //here we can define axis but as end position
                                        colors={['#FF3838', '#ED923D']}
                                        style={{ padding: 10, alignSelf: 'flex-start', borderRadius: 10, width: width / 4, height: 40, margin: 5 }}>
                                        <Text
                                            style={{
                                                backgroundColor: 'transparent',
                                                fontSize: 15,
                                                color: '#fff',
                                                alignSelf: 'center'
                                            }}>
                                            Aceptar
                                      </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    , centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
