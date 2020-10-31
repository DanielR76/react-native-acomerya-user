import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, ScrollView } from 'react-native'
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
const screenWidth = Dimensions.get("window").width;

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
        setFinalDish({ ...doc.data(), addition: [], priceAddition: doc.data().price, quantity: 1 })
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
            if (dataCart !== null) {
                const cart = JSON.parse(dataCart)
                cart.push(finalDish)
                AsyncStorage.setItem("cart", JSON.stringify(cart))
            } else {
                const cart = []
                cart.push(finalDish)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            goCart()
            navigation.goBack();
        })
    }

    //console.log(finalDish)
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

    const addAdditionItem = (idx) => {
        let arr = additions.map((item, index) => {
            if (idx == index) {
                item.isSelected = !item.isSelected
            }
            return { ...item }
        })
        let trueAddition = []
        let totalPriceAddit = []
        //let totalPrice = []
        arr.map((item) => {
            if (item.isSelected) {
                trueAddition.push(item.name)
                totalPriceAddit = parseInt(totalPriceAddit + item.price)/*priceAdit/*parseInt(totalPriceAddit + priceAdit)*/;
            }
        })
        let totalPriceDish = finalDish.price + totalPriceAddit
        setFinalDish({ ...finalDish, addition: trueAddition, priceAddition: totalPriceDish, price: totalPriceDish })
    }
    navigation.setOptions({ title: "Agregar al carrito" });
    if (!dishes) return <Loading isVisible={true} text=" Cargando..." />
    return (

        < ScrollView >
            <View >
                <View style={styles.viewDishess}>
                    <Image
                        style={{ height: 200, width: 200, borderRadius: 10 }}
                        resizeMode="contain"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={dishes.imagePath ? { uri: dishes.imagePath } : require("../../../assets/img/imgj.jpg")
                        }
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{dishes.dishName}</Text>
                    <Text style={{ fontSize: 15, }}>{dishes.description}</Text>
                    <Text style={{ fontSize: 15, }}>$ {finalDish.price}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center", }}>
                    <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>Ingredientes</Text>
                    <View>
                        {
                            dishIngredient.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => addIngredientItem(index)} key={index} style={[/*styles.touchIngredient,*/ item.isSelectedIngredient ? styles.touchIngredientSelect : styles.touchIngredientNoselect]}>
                                        <View>
                                            <View style={{ flex: 1, }}>
                                                <Text style={{ fontSize: 12 }} >{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>Adiciones</Text>
                    <View>
                        {
                            additions.map((item, index) => {
                                return (
                                    <View key={index} style={{ marginTop: 5, marginLeft: 10, marginRight: 10, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, backgroundColor: "#FFFFFF", borderColor: "#ff8000", alignContent: "center" }}>
                                        <View>
                                            <Text style={{ fontSize: 12 }}>{item.name}</Text>
                                            <Text style={{ marginTop: 5, fontSize: 12, position: "absolute", right: 45, bottom: 0 }}>{item.price}</Text>
                                            <View style={{ marginTop: 5, position: "absolute", right: 10 }}>
                                                <Ionicons
                                                    onPress={() => addAdditionItem(index)}
                                                    name={item.isSelected ? "ios-checkmark-circle" : "md-checkmark-circle-outline"}
                                                    size={20}
                                                    color={item.isSelected ? "#ffa500" : "#ffa500"}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                </View>



                <View style={{ marginTop: 20, flexDirection: "row", marginTop: 20 }}>
                    <View>
                        <TouchableOpacity
                            style={styles.viewTouch}
                            onPress={addCart}
                        >
                            <Text style={styles.textTouch}> Agregar al Carrito </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 14,
                            marginTop: 15,
                            marginLeft: 30,
                        }}>$ {finalDish.priceAddition}</Text>
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

}
)