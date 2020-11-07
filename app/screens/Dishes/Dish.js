import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../../components/Loading";
import { Image } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import Toast from "react-native-easy-toast";
import { isLoading } from 'expo-font';
import { firebaseapp } from "./../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
import { parseInt } from 'lodash';
const db = firebase.firestore(firebaseapp);

var { height, width } = Dimensions.get("window");

export default function Dish(props) {
    const { navigation, route } = props;
    const { idRestaurant, id } = route.params;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [dishes, setDishes] = useState();
    const [isSelected, setIsSelected] = useState();
    const [isSelectedIngredient, setIsSelectedIngredient] = useState();
    const [finalDish, setFinalDish] = useState();
    const [dishIngredient, setDishIngredient] = useState([])

    useEffect(() => {
        getDishById(id)
        getAdditions()
        // addAdditionItem()
    }, [])


    const getDishById = async (id) => {
        const doc = await db.collection('dishDocument').doc(id).get()
        setFinalDish({ ...doc.data(), addition: [], ingredient: [], priceAddition: doc.data().price, quantity: 1 })
        setDishes({ ...doc.data() })
        let ingrediente = [...doc.data().ingredient]
        let ingredientArr = ingrediente.map((name) => { return { name, isSelectedIngredient: false } })
        setDishIngredient(ingredientArr)
    }
    const goCart = () => {
        navigation.navigate("Cart", {
        }
        );
    }
    const addCart = () => {
        //AsyncStorage.removeItem("cart")
        AsyncStorage.getItem("cart").then(dataCart => {
            let newDish = { ...finalDish, price: finalDish.priceAddition }
            if (dataCart !== null) {
                const cart = JSON.parse(dataCart)
                //cart.push(finalDish)
                cart.push(newDish)
                AsyncStorage.setItem("cart", JSON.stringify(cart))
            } else {
                const cart = []
                cart.push(newDish)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            goCart()
            navigation.goBack();
        })
    }

    const [additions, setAdditions] = useState([])
    const getAdditions = async () => {
        db.collection("additionalDocument").where("idRestaurant",
            "==", idRestaurant)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        id: doc.id,
                        //stateAd:false
                        isSelected: false
                    })
                })
                setAdditions(state)
            })
    }
    const addIngredientItem = (idx) => {
        let arr = dishIngredient.map((item, index) => {
            if (idx == index) {
                item.isSelectedIngredient = !item.isSelectedIngredient
            }
            return { ...item }
        })
        let trueIngredient = []
        arr.map((item) => {
            if (item.isSelectedIngredient) {
                trueIngredient.push(item.name)
            }
        })
        setFinalDish({ ...finalDish, ingredient: trueIngredient })
    }
    //const [addition4, setAddition4] = useState([])
    const addAdditionItem = (idx) => {
        let arr = additions.map((item, index) => {
            if (idx == index) {
                item.isSelected = !item.isSelected
            }
            return { ...item }
        })
        let trueAddition = []
        let totalPriceAddit = 0
        //let totalPrice = []
        arr.map((item) => {
            if (item.isSelected) {
                trueAddition.push(item.name)
                totalPriceAddit += item.price
            }
        })
        let totalPriceDish = finalDish.price + totalPriceAddit
        setFinalDish({ ...finalDish, addition: trueAddition, priceAddition: totalPriceDish/*, price: totalPriceDish */ })
    }
    navigation.setOptions({ title: "Agregar al carrito" });
    if (!dishes) return <Loading isVisible={true} text=" Cargando..." />
    return (
        < ScrollView >
            <View style={{ flex: 1 }}>
                <View style={{ width: width - 20, margin: 12, backgroundColor: '#FFF6F6', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10, borderRadius: 10 }}>
                    <Image
                        style={{ width: width - 10, height: width / 3, margin: 10 }}
                        resizeMode="contain"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={dishes.imagePath ? { uri: dishes.imagePath } : require("../../../assets/img/imgj.jpg")
                        }
                    />
                    <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, justifyContent: "space-between" }}>
                        <View style={{ margin: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{dishes.dishName}</Text>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>{dishes.description}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Image
                                    source={require('../../../assets/icon/Money.png')}
                                    style={{ width: width / 15, height: width / 15 }}
                                />
                                <Text style={{ fontSize: 15, }}> {finalDish.price}</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Ingredientes </Text>
                                <Text style={{ fontSize: 15, color: "black" }}>(Seleccionar ingredientes )</Text>
                            </View>
                            <View style={{ padding: 10, flexDirection: 'row', marginLeft: 10 }}>
                                {
                                    dishIngredient.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={() => addIngredientItem(index)} key={index} style={[/*styles.touchIngredient,*/ item.isSelectedIngredient ? styles.touchIngredientSelect : styles.touchIngredientNoselect]}>
                                                <View >
                                                    <Text style={{ fontSize: 15 }} >{item.name}</Text>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View /*style={{ flex: 1, justifyContent: "center", }}*/>
                            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>Adiciones</Text>
                            <View style={{ padding: 5 }}>
                                {
                                    additions.map((item, index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: "#FFFFFF", margin: 3, height: 40, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.name}</Text>
                                                <View style={{ flexDirection: 'row', position: 'absolute', right: 80 }}>
                                                    <Image
                                                        source={require('../../../assets/icon/Money.png')}
                                                        style={{ width: width / 13, height: width / 13 }}
                                                    />
                                                    <Text style={{ fontSize: 15 /*, position: "absolute", bottom: 0*/ }}>{item.price}</Text>
                                                </View>
                                                <View style={{ position: "absolute", right: 10, }}>
                                                    <Ionicons
                                                        onPress={() => addAdditionItem(index)}
                                                        name={item.isSelected ? "ios-checkmark-circle" : "md-checkmark-circle-outline"}
                                                        size={30}
                                                        color={item.isSelected ? "#ffa500" : "#ffa500"}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })}
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", margin: 30 }}>
                        <TouchableOpacity
                            onPress={addCart}
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
                                    Agregar al Carrito
                                      </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/icon/Money.png')}
                                style={{ width: width / 12, height: width / 12 }}
                            />
                            <Text style={{
                                fontWeight: 'bold', fontSize: 18, marginLeft: 5
                            }}>{finalDish.priceAddition}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    loaderDishes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
    , viewDishess: {
        flexDirection: "column",
        backgroundColor: "#FFF6F6",
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10,
        marginEnd: 10
    }
    , viewImage: {
        alignContent: "center",

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
    , touchIngredientSelect: {
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignContent: "center",
        backgroundColor: "#ffa500",
        borderColor: "#ff8000",
    }
    , touchIngredientNoselect: {
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderColor: "#ff8000",
        alignContent: "center",
        backgroundColor: "white",
    }
    , viewTouch: {
        width: 200,
        height: 10,
        // marginTop: 20,
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#ED923D",
    }
    , textTouch: {
        //width: 200,
        //height: 10,
        // marginLeft: 18,
        //marginTop: -13,
        //textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        alignItems: 'center',
        alignContent: 'center'
    }

}
)