import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions, AsyncStorage, ScrollView } from 'react-native'
import Loading from "../../components/Loading";
import { Image, Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { isLoading } from 'expo-font';
import { firebaseapp } from "./../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
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
    const [finalDish, setFinalDish] = useState(dishes);
    const [dishIngredient, setDishIngredient] = useState([])


    useEffect(() => {
        getDishById(id)
        getAdditions()
    }, [])

    // useEffect(() => {
    //     db.collection("dishDocument").doc(id).get().then((response) => {
    //         response.forEach((doc) => {
    //             const data = doc.data();
    //             data.id = response.id;
    //             setDishes(data)
    //             setFinalDish({ ...data, addition: [] })
    //             setDishIngredient(data.ingredient)
    //         })
    //     });
    // }, [])



    const getDishById = async (id) => {
        const doc = await db.collection('dishDocument').doc(id).get()
        //console.log(doc)
        setDishes({ ...doc.data() })
        setFinalDish({ ...doc.data(), addition: [] })
        let ingrediente = [...doc.data().ingredient]
        console.log(typeof ingrediente)
        let ingredientArr = ingrediente.forEach({ ...ingrediente, isSelectedIngredient: false })
        setDishIngredient(ingredientArr)

    }
    // console.log(dishIngredient)
    // console.log(dishes)

    const goCart = () => {
        navigation.navigate("Cart",/*Option = { tabBarLabel: 'hhhhhh' },*/ {
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
        // let arr = dishIngredient.map((item, index) => {
        //     if (idx == index) {
        //         item.isSelectedIngredient = !item.isSelectedIngredient
        //     }
        //     return { ...item }
        // })
        // let trueIngredient = []
        // arr.map((item) => {
        //     if (item.isSelectedIngredient) {
        //         trueIngredient.push(item.name)
        //     }
        // })
        // setDishIngredient({ ...dishIngredient })
        // //setFinalDish({ ...finalDish, addition: trueIngredient })
        // //setAdditions(arr)
    }

    const addAdditionItem = (idx) => {
        let arr = additions.map((item, index) => {
            if (idx == index) {
                item.isSelected = !item.isSelected
            }
            return { ...item }
        })
        let trueAddition = []
        arr.map((item) => {
            if (item.isSelected) {
                trueAddition.push(item.name)
            }
        })
        setFinalDish({ ...finalDish, addition: trueAddition })
        //setAdditions(arr)
    }

    navigation.setOptions({ title: "Agregar al carrito" });

    if (!dishes) return <Loading isVisible={true} text=" Cargando..." />
    return (
        <ScrollView>
            <View style={styles.viewDishes}>
                <View >
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
                </View>

                <View>
                    <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>Ingredientes</Text>
                </View>


                <View>
                    <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>Adiciones</Text>
                </View>
                <View>
                    {
                        additions.map((item, index) => {
                            return (
                                // <TouchableOpacity key={index} onPress={() => addAdditionItem(index)} style={{ marginTop: 5, paddingVertical: 13, paddingHorizontal: 70, borderRadius: 12, backgroundColor: "#FFF6F6", alignContent: "center" }}>
                                <View key={index} style={{ marginTop: 5, paddingVertical: 13, paddingHorizontal: 70, borderRadius: 12, backgroundColor: "#FFF6F6", alignContent: "center" }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 12 }}>{item.name}</Text>
                                        <Text style={{ marginTop: 5, color: "grey", fontSize: 12, position: "absolute", right: 30, bottom: 0 }}>{item.price}</Text>
                                        <View style={{ marginTop: 5, position: "absolute", right: 0 }}>
                                            <Icon
                                                onPress={() => addAdditionItem(index)}
                                                type="material-community"
                                                name={item.isSelected ? "circle" : "circle-outline"} size={15}
                                                color={item.isSelected ? "#33c37d" : "#orange"}></Icon>
                                        </View>
                                    </View>
                                </View>
                                // </TouchableOpacity>
                            )
                        })}
                </View>
                <View>
                    <TouchableOpacity
                        onPress={addCart}
                        style={{
                            backgroundColor: "#33c37d",
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
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    loaderDishes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
    , viewDishes: {
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


}
)