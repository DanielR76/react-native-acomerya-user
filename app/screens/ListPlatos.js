import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Cart from './Cart';
import { ScrollView } from 'react-native-gesture-handler';

var { height, width } = Dimensions.get("window");
export default function ListPlatos(props) {
    const { dish } = props;
    const navigation = useNavigation();

    const [add, setAdd] = useState(1);


    // const cartElement = (element) => {
    //     console.log(element);
    // }


    return (
        <View>
            {size(dish) > 0 ? (
                <FlatList
                    data={dish}
                    numColumns={2}
                    renderItem={(dish) => <Dish dish={dish} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                    <View style={styles.loaderDishes}>
                        <ActivityIndicator size="large"></ActivityIndicator>
                        <Text> Cargando menu</Text>
                    </View>
                )}
        </View>
    );
}

function Dish(props) {
    const { dish, navigation } = props;
    const { id, imagePath, dishName, price, description, cant } = dish.item;

    const cartElement = (element) => {
        console.log(element);
    }

    const goDish = () => {
        // console.log("ok11");
        // console.log(navigation);
        navigation.navigate("dish", {
            id,
            dishName,
            imagePath,
            price,
            description,
            test: { cartElement }
        },
        );

    };



    return (
        <ScrollView>
            <TouchableOpacity onPress={goDish} style={styles.divFood}>
                <Image
                    PlaceholderContent={<ActivityIndicator color="fff" />}
                    style={styles.vimageDishes}
                    resizeMode="contain"
                    source={imagePath ? { uri: imagePath } : require("../../assets/img/imgj.jpg")
                    }
                />
                <View style={styles.viewPlatosImage}>
                    <Text style={styles.dishesName}>{dishName}</Text>
                    <Text>{description}</Text>
                    <Text style={styles.dishPrice}>{price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.tobuttonCart}
                //  onPress={() => this.onClickAddCart(dish)}
                //onPress={() => navigation.navigate("RequestOnYourTable_platos")}

                >
                    <Text style={styles.textbuttonCart}>Add Cart</Text>
                    <View style={{ width: 10 }}></View>
                    <Icon name="ios-add-circle" size={30} color={"white"}></Icon>
                </TouchableOpacity>
            </TouchableOpacity>
        </ScrollView>

    )
}

// onClickAddCart(data){
//     const itemcart = {
//         food: data,
//         quantity: 1,
//         price: data.price
//     }

//     AsyncStorage.getItem('cart').then((datacart) => {
//         if (datacart !== null) {
//             // We have data!!
//             const cart = JSON.parse(datacart)
//             cart.push(itemcart)
//             AsyncStorage.setItem('cart', JSON.stringify(cart));
//         }
//         else {
//             const cart = []
//             cart.push(itemcart)
//             AsyncStorage.setItem('cart', JSON.stringify(cart));
//         }
//         alert("Add Cart")
//     })
//         .catch((err) => {
//             alert(err)
//         })
// }

const styles = StyleSheet.create({
    loaderDishes: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
    , viewPlatos: {
        flexDirection: "row",
        marginBottom: 10
    }
    , viewPlatosImage: {
        height: ((width / 2) - 20) - 90,
        width: ((width / 2) - 20) - 10,
        backgroundColor: 'transparent',
    }
    , vimageDishes: {
        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
        // position: 'absolute',
        top: -45,

    }
    , dishesName: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',

    }
    , dishPrice: {
        fontSize: 12,
        color: 'green',
    }
    , divFood: {
        width: (width / 2) - 20,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',

    }
    , tobuttonCart: {
        width: (width / 2) - 40,
        backgroundColor: "#33c37d",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        flexDirection: "row",
    }
    , textbuttonCart: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold",

    }
}
)




