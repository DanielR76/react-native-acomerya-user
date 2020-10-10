import React, { useState, useEffect } from 'react';
//import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { StyleSheet, ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { Image, Button } from "react-native-elements";
//import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { remove } from 'lodash';
import { firebaseapp } from "../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Dish(props) {
    const { navigation, route, elementProps } = props;
    const { id, dishName, imagePath, price, test } = route.params;

    const [dish, setDish] = useState([]);

    useEffect(() => {
        let test = route.params
        setDish({
            ...test,
            quantity: 0
        })
    }, [route.params])

    //console.log(route.params)

    navigation.setOptions({ title: dishName });


    const onPressRemove = () => {
        // const remove = () => { setAdd(add - 1) }
        if (add > 1) {
            setAdd(add - 1)
        }
    };

    const onPressAdded = () => {
        setAdd(add + 1)
    };

    const [add, setAdd] = useState(0);

    const onClickAddCart = async (data) => {
        //test('hola')
        setDish({
            ...dish,
            quantity: add
        })
    }

    console.log(dish)

    return (

        <view>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>Cart food</Text>
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
                            <Text style={{ fontWeight: 'bold', color: "#33c37d", fontSize: 20, }}>{price}</Text>

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
                    <TouchableOpacity onPress={onClickAddCart} style={{
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

                </View>



                {/*       )
                    })} */}

            </View>

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
