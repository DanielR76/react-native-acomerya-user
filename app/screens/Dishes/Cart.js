import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native'
import { Image, Button, ListItem, List } from "react-native-elements";
import Dish from "./Dish"
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import { size } from "lodash";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Cart(props) {
    const { navigation, route } = props;

    const addBD = () => {
        db.collection("requestsDocument").doc().set(dishCart).then();
    }
    const initialStateValues = {
        dishes: [],
        idRestaurant: 'ZooU6ULsozSJ1Y3ijHkD7eAJZjM2',
        table: 'mesa 4',
        idUser: 'kwOZtSWxX9VdsXw0fVsSB30JVP43'/*firebase.auth().currentUser.uid*/,
        status: 'active'
    }
    const [dishCart, setDishCart] = useState(initialStateValues)
    useEffect(() => {
        gettCart()

    }, [])

    console.log(dishCart)
    const gettCart = () => {
        AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null) {
                const dishes = JSON.parse(cart)
                setDishCart({ ...dishCart, dishes: dishes })
            }
        })
            .catch((err) => {
                alert(err)
            })
    }

    //console.log(dishCart)
    navigation.setOptions({ title: "Carrito" });
    return (
        <ScrollView>
            <View>
                {
                    dishCart.dishes.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={{ backgroundColor: "transparent", flex: 1 }} />
                                <View >
                                    <View style={{ width: width - 20, margin: 10, backgroundColor: "transparent", flexDirection: "row", borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}></View>
                                    <Image
                                        style={{ width: width / 3, height: width / 3, }}
                                        resizeMode="cover"
                                        PlaceholderContent={<ActivityIndicator color="fff" />}
                                        source={item.imagePath ? { uri: item.imagePath } : require("./../../../assets/img/imgj.jpg")
                                        }
                                    />
                                    <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: 'space-between' }}>
                                        <View>
                                            <Text>{item.dishName}</Text>
                                        </View>

                                        <View style={{ backgroundColor: "transparent", flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20, }}>{item.price}</Text>
                                        </View>
                                    </View>
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

        </ScrollView>
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

    }, Contenedor: {

        width: 295,
        height: 60,
        marginLeft: 61,
        borderRadius: 10,
        padding: 24,
        backgroundColor: "#FFF6F6",
    }
})