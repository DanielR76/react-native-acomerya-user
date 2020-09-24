import React, { useState, useEffect }from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function ListPlatos(props) {
   const { dish } = props;

    return (
    <View>
  {size (dish) >0 ? (
 <FlatList 
    data = {dish}
    renderItem = {(dish) => <Dish plato ={dish}/>}
     keyExtractor = {(item, index)=> index.toString()}
  />    
  ): (
        <View style={styles.loaderDishes}> 
        <ActivityIndicator size= "large"></ActivityIndicator>
        <Text> Cargando menu</Text>
        </View> 
     )}
     </View>
    );}




function Dish (props){
    const {dish} = props;
    console.log(dish);
//   const { imagePath } =  dish.item;
// const imageDishes = imagePath[0];
const initialStateValues = [
    {
        description: "",
        dishName: "sdfsdfsdf",
        imagePath: null,
        ingredient: "",
        price: "",
        idRestaurant: 123465,
        status: true
    },
    {
        description: "",
        dishName: "sdfsfsdf",
        imagePath: null,
        ingredient: "",
        price: "",
        idRestaurant: 123465,
        status: true
    }
]
var listDish = initialStateValues.map((item, index)=>{
<View>
{item.dishName}
</View>
}) ;


    const goDish = () => {
        console.log("ok11");
    };
    return (
        <TouchableOpacity onPress={goDish}>
        <View style = {styles.viewPlatos}>
        <View style = {styles.viewPlatosImage}>
        <Image
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator color="fff"/>}
        source ={
            listDish
            ? { uri: listDish}
            : require ("../../assets/img/imgj.jpg")
        }
        style = {styles.vimageDishes}
        />
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
    ,viewPlatos: {
flexDirection: "row",
marginBottom: 10
    }
    ,viewPlatosImage:{
        marginRight: 15
    }
    ,vimageDishes:{
        width: 80,
        height: 80,

    }
})
 