import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import Loading from "../components/Loading";
import { Image, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseapp } from "../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import Toast from "react-native-easy-toast";
import { isLoading } from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';

var { height, width } = Dimensions.get("window");

export default function Dish(props) {
    const { navigation, route } = props;
    const { id, dishName, imagePath, price, idRestaurant } = route.params;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [add, setAdd] = useState(0);

    //const [dish, setDish] = useState([route.params]);
    const [listDish, setListDish] = useState([route.params]);

    const pedidoState = props => {
        const inicialState = {
            dishes: [],
            platillo: null,
        }
    }
    const dishes = {
        ...route.params,
        quantity: add
    }

    const almacenarPedido = pedido => {
        pedido = [pedido]
    }



    // useEffect(() => {
    //     let test = route.params
    //     setDish({
    //         ...test,
    //         quantity: 0

    //     })
    // }, [route.params])

    //  console.log(route.params)



    const onPressRemove = () => {
        if (add > 1) {
            setAdd(add - 1)
        }
    };

    const onPressAdded = () => {
        setAdd(add + 1)
    };


    // const onClickAddCart = async (data) => {
    //     setDish({
    //         ...dish,
    //         quantity: add
    //     })

    // }

    // const carrito = "agua"

    // cartElement.push({
    //     ...carrito
    // })
    const goCart = () => {
        navigation.navigate("Cart",/*Option = { tabBarLabel: 'hhhhhh' },*/ {
            id,
            dishName,
            imagePath,
            price,
            idRestaurant,
            //test: { cartElement }
            //cartElement
            dishes
        }
        );
    }
    navigation.setOptions({ title: "Agregar al carrito" });

    return (

        <View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>{dishName}</Text>
                <View style={{ height: 10 }} />
                <View style={{ backgroundColor: "transparent", flex: 1 }} />
                {/*       {
                    dataCart.map((item, i) => {
                        return ( */}
                <View>
                    <View style={{ width: width - 20, margin: 10, backgroundColor: "transparent", flexDirection: "row", borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}></View>
                    <Image
                        style={{ width: width / 3, height: width / 3, }}
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={imagePath ? { uri: imagePath } : require("../../assets/img/imgj.jpg")
                        }
                    />
                    <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>description</Text>
                            <Text>{dishName}</Text>
                        </View>

                        <View style={{ backgroundColor: "transparent", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20, }}>{route.params.price}</Text>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity onPress={onPressRemove}>
                                    <Icon name="ios-remove-circle" size={20} color={"#33c37d"}></Icon>
                                </TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', paddingHorizontal: 8 }}>{add}</Text>
                                <TouchableOpacity onPress={onPressAdded}>
                                    <Icon name="ios-add-circle" size={20} color={"#33c37d"}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 20 }} />
                    <TouchableOpacity
                        onPress={goCart}
                        style={{
                            backgroundColor: "#33c37d", width: width - 40,
                            alignItems: 'center',
                            padding: 10, borderRadius: 5,
                        }}
                    >
                        <Text style={{
                            fontSize: 24, fontWeight: 'bold', color: "white",
                        }}>
                            Agregar al Carrito
                            </Text>
                    </TouchableOpacity>
                    <br></br>
                    <br></br>
                    <br></br>
                </View>



                {/*       )
                    })} */}

            </View>

            <View style={{ height: 10 }} />

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
