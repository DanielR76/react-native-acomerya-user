import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native'
import { Image, Icon,Button } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import { size } from "lodash";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
//import Icon from 'react-native-vector-icons/Ionicons';

const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart(props) {
    const { navigation, route } = props;
    const [add, setAdd] = useState(1);

    //funcion que envia el pedido a la base de datos
    const addBD = () => {
        db.collection("requestsDocument").doc().set(dishCart).then();
        AsyncStorage.removeItem("cart")
    }
    const onPressRemove = (idx) => {
        // let arr = dishCart
        // console.log(arr)
        if (add > 1) {
            setAdd(add - 1)
        }
    };

    const onPressAdded = () => {
        setAdd(add + 1)
    };

    const initialStateValues = {
        dishes: [],
        idRestaurant: 'ZooU6ULsozSJ1Y3ijHkD7eAJZjM2',
        table: 'mesa 4',
        idUser: 'kwOZtSWxX9VdsXw0fVsSB30JVP43'/*firebase.auth().currentUser.uid*/,
        status: 'active',
        totalPrice: '',
        quantity: 1,
    }

    const [dishCart, setDishCart] = useState(initialStateValues)
    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('cart').then((cart) => {
                if (cart !== null) {
                    const dishes = JSON.parse(cart)
                    setDishCart({ ...dishCart, dishes: dishes })

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
    }

    //console.log(dishCart)


    // const onChangeQual = (index, type) => {
    //     const dataCarr = [dishCart]
    //     let cantd = dataCarr[index].quantity;
    //     console.log(cantd)
    //     if (type) {
    //         cantd = cantd + 1
    //         dataCarr[index].quantity = cantd
    //         setDishCart({ dishCart: dataCarr })
    //     }
    //     else if (type == false && cantd >= 2) {
    //         cantd = cantd - 1
    //         dataCarr[index].quantity = cantd
    //         // setDishCart({ dishCart: dataCarr })
    //     }
    //     else if (type == false && cantd == 1) {
    //         // dataCarr.splice(index, 1)
    //         //setDishCart({ dishCart: dataCarr })
    //     }
    // }

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
                                        style={{ width: width / 3, height: width / 3, }}
                                        resizeMode="cover"
                                        PlaceholderContent={<ActivityIndicator color="fff" />}
                                        source={item.imagePath ? { uri: item.imagePath } : require("./../../../assets/img/imgj.jpg")
                                        }
                                    />
                                </View>
                                <View>
                                    <Text style={styles.dishesName} >{item.dishName}</Text>
                                    <Text style={styles.dishesName} >{item.addition}</Text>
                                    <Text>${item.totalPrice + parseInt(item.price)}</Text>
                                </View>
                                <View style={{ marginTop: 10, position: "absolute", right: 10 }}>
                                    <Button onPress={() => deleteCartItem(index)}  size={20} color={"#33c37d"}/>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", right: 10 }}>
                                    <TouchableOpacity onPress={() => onPressRemove(index)}>
                                        <Button  size={20} color={"#33c37d"}/>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', paddingHorizontal: 8 }}>{dishCart.quantity}</Text>
                                    <TouchableOpacity onPress={() => onPressAdded(index)}>
                                        <Button  size={20} color={"#33c37d"}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
                <View>
                    <TouchableOpacity
                        onPress={addBD}
                        style={{
                            backgroundColor: "#33c37d",
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
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    viewDishes: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#FFF6F6",
        borderRadius: 10,
    }
    , viewDishesImage: {
        marginRight: 15,
    }
    , dishesName: {
        fontWeight: 'bold',
    }
})