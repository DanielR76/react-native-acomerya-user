import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";


export default function ListAdittions(props) {
    const { Adittions } = props;
    const navigation = useNavigation();

    return (
        <View>
            {size(dish) > 0 ? (
                <FlatList
                    data={dish}
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
    const { id, imagePath, dishName, price, description } = dish.item;

    const goDish = () => {
        // console.log("ok11");
        // console.log(navvigation);
        navigation.navigate("dish", {
            id,
            dishName,
        });
    };

    return (
        <TouchableOpacity onPress={goDish}>
            <View style={styles.viewPlatos}>
                <View style={styles.viewPlatosImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={imagePath ? { uri: imagePath } : require("../../assets/img/imgj.jpg")
                        }
                        style={styles.vimageDishes}
                    />
                </View>
                <View>
                    <Text style={styles.dishesName}>{dishName}</Text>
                    <Text style={styles.dishPrice}>{price}</Text>
                    <Text tyle={styles.dishDescrip}>{description.substr(0, 20)}..</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

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
        marginRight: 15
    }
    , vimageDishes: {
        width: 80,
        height: 80,

    }
    , dishesName: {
        fontWeight: "bold",
    }
    , dishPrice: {
        paddingTop: 2,
        color: "grey",
    }
    , dishDescrip: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    }
}
)

