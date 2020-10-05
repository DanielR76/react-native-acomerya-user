import React, { useState, useEffect } from 'react';
//import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { StyleSheet, ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { Image, Button } from "react-native-elements";
//import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { remove } from 'lodash';


const db = firebase.firestore(firebaseApp);
var { height, width } = Dimensions.get("window");

export default function Dish(props) {
    const { navigation, route } = props;
    const { id, dishName, imagePath, price } = route.params;
    //const [dish, setDish] = useState("");


    // const getTotalCart = dataCart.map((item, index) => {
    //     return (
    //         <View> <Text>{item.id}</Text></View>
    //     );
    // });




    navigation.setOptions({ title: dishName });

    // const getDishes = async () => {
    //     db.collection("dishDocument").doc(id).get().then((response) => {
    //         const data = response.data();
    //         data.id = response.id;
    //         setDish(data);
    //     })
    // }
    // useEffect(() => {
    //     getDishes()
    // }, [])

    //funcion que permite traer los platos
    // const [dish, setDish] = useState([])
    // const getDishes = async () => {
    //     db.collection("dishDocument")
    //         .onSnapshot(querySnapshot => {
    //             const state = []
    //             querySnapshot.forEach((doc) => {
    //                 state.push({
    //                     ...doc.data(),
    //                     id: doc.id


    //                 })
    //             })
    //             setDish(state)
    //         })
    // }
    // useEffect(() => {
    //     getDishes()
    // }, [])


    // const [adittion, setAdittion] = useState([])
    // const getAdittion = async () => {
    //     db.collection("additionalDocument").doc().get().then((response) => {
    //         const data = response.data();
    //         data = response;
    //         setDish(data);
    //         console.log("Aqui se imprimen los adicionales " + data);
    //     })
    // }
    // useEffect(() => {
    //     getDishes()
    // }, [])



    // const additional, setAdditional] = useState([])
    // const getAdditional = async () => {
    //     db.collection("additionalDocument").where("idRestaurant", "==", 123465)
    //         .onSnapshot(querySnapshot => {
    //             const state = []
    //             querySnapshot.forEach((doc) => {
    //                 state.push({
    //                     ...doc.data(),
    //                     id: doc.id
    //                 })
    //             })
    //             setAdditional(state)
    //         })
    // }
    // useEffect(() => {
    //     getAdditional()
    // }, [])

    // console.log(additional);

    // if (!dish) return <Loading isVisible={true} text="Cargando..." />


    const dataCart = [];
    //const [dataCart, setDataCart] = useState();

    const [add, setAdd] = useState(1);
    dataCart.push({
        id,
        dishName,
        imagePath,
        price,
        quantity: add
    });

    // const added = () => { setAdd(add + 1) }


    const onPressRemove = () => {
        // const remove = () => { setAdd(add - 1) }
        if (add > 1) {
            setAdd(add - 1)
        }
    };

    const onPressAdded = () => {

        setAdd(add + 1)
    };

    console.log(dataCart);


    // const prevCount = 0;
    // const [count, setCount] = useState(dataCart[0].quantity);
    // const onPress = () => setCount(prevCount => prevCount + 1);
    // console.log(prevCount);



    // function onchangeQuat(type, i) {
    //     const [add, setAdd] = useState(dataCart[i].quantity);
    //     console.log(add);

    //     if (type) {
    //         const added = () => { setAdd(add + 1) }
    //         // cant = cant + 1
    //         // cart[i].quantity = cant
    //         alert("true")
    //         console.log(add);

    //     } else {
    //         const remove = () => { setAdd(add - 1) }
    //         alert("false")
    //         console.log(add);

    //     }
    // }





    // function onchangeQuat(i, type) {
    //     const [cart, setCart] = useState(dataCart);
    //     //const [dataCart, setDataCart] = useState();
    //     let cant = cart[i].quantity;

    //     console.log(cart[i].quantity);
    //     console.log(cant);

    //     if (type) {
    //         cant = cant + 1
    //         cart[i].quantity = cant
    //         console.log("aqi if");
    //         //setCart(cart);

    //     } else if (type == false && cant >= 2) {
    //         cant = cant - 1
    //         cart[i].quantity = cant
    //         console.log("aqi else if ");

    //         // { dataCart: cart }
    //     } else if (type == false && cant >= 1) {
    //         cart.splice(i, 1)
    //         console.log("aqi else ");
    //     }
    // }

    return (

        <view>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>Cart food</Text>
                <View style={{ height: 10 }} />
                <View style={{ backgroundColor: "transparent", flex: 1 }} />
                <ScrollView>
                    {
                        dataCart.map((item, i) => {
                            return (
                                <View>
                                    <View style={{ width: width - 20, margin: 10, backgroundColor: "transparent", flexDirection: "row", borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}></View>
                                    <Image
                                        style={{ width: width / 3, height: width / 3, }}
                                        resizeMode="cover"
                                        PlaceholderContent={<ActivityIndicator color="fff" />}
                                        source={item.imagePath ? { uri: item.imagePath } : require("../../assets/img/imgj.jpg")
                                        }
                                    />
                                    <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>item.description</Text>
                                            <Text>{item.dishName}</Text>
                                        </View>

                                        <View style={{ backgroundColor: "transparent", flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20, }}>{item.price}</Text>

                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity onPress={onPressRemove}>
                                                    <Icon name="ios-remove-circle" size={20} color={"#33c37d"}></Icon>
                                                </TouchableOpacity>
                                                <Text style={{ fontWeight: 'bold', paddingHorizontal: 8 }}>{item.quantity}</Text>
                                                <TouchableOpacity onPress={onPressAdded}>
                                                    <Icon name="ios-add-circle" size={20} color={"#33c37d"}></Icon>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ height: 20 }} />
            <TouchableOpacity style={{
                backgroundColor: "#33c37d", width: width - 40,
                alignItems: 'center',
                padding: 10, borderRadius: 5,
            }}>
                <Text style={{
                    fontSize: 24, fontWeight: 'bold', color: "white",
                }}>
                    CHECKOUT
        </Text>
            </TouchableOpacity>

            <View style={{ height: 10 }} />
        </view>
    )

}

// const goDish = () => {
//     // console.log("ok11");
//     // console.log(navigation);
//     navigation.navigate("dish", {
//         id,
//         dishName,
//         imagePath,
//         price,
//         description
//     });
// };


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
