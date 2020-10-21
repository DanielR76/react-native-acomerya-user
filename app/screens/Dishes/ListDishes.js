// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
// import { Image } from "react-native-elements";
// import { size } from "lodash";
// import { useNavigation } from "@react-navigation/native";
// import Icon from 'react-native-vector-icons/Ionicons';

// var { height, width } = Dimensions.get("window");
// export default function ListDishes(props) {
//     const { dishes } = props;

//     const navigation = useNavigation();
//         return (
//             <View>
//                 {size(dishes) > 0 ? (                    
//                 <FlatList
//                         data={dishes}
//                        // numColumns={2}
//                         renderItem={(dish) => <Dish dish={dish} navigation={navigation}/> }
//                         keyExtractor={(item, index) => index.toString()}
//                     />              
//                 ) : (
//                         <View style={styles.loaderDishes}>
//                             <ActivityIndicator size="large"></ActivityIndicator>
//                             <Text> Cargando menu</Text>
//                         </View>
//                     )}
//             </View>
//         );    
//     }
    
//     function Dish(props) {
//         const { dish, navigation } = props;
//         const { id, imagePath, dishName, price, description, idRestaurant } = dish.item;
       
//         const pedido = {
//             ...dish.index,
//         }
//         const goDish = () => {
//             navigation.navigate("dish", {
//                 id,
//                 dishName,
//                 imagePath,
//                 price,
//                 description,
//                 idRestaurant,           
//             }
//             );
//         };
    
//         return (
//                 <TouchableOpacity onPress={goDish} style={styles.divFood}>
//                     <Image
//                         PlaceholderContent={<ActivityIndicator color="fff" />}
//                         style={styles.vimageDishes}
//                         resizeMode="contain"
//                         source={imagePath ? { uri: imagePath } : require("../../../assets/img/imgj.jpg")
//                         }
//                     />
//                     <View style={styles.viewPlatosImage}>
//                         <Text style={styles.dishesName}>{dishName}</Text>
//                         <Text style={styles.dishDescription}>{description.substr(0,60)}..</Text>
//                         <Text style={styles.dishPrice}>{price}</Text>
//                     </View>
//                     <TouchableOpacity
//                         style={styles.tobuttonCart}
//                     //  onPress={() => this.onClickAddCart(dish)}
//                     //onPress={() => navigation.navigate("RequestOnYourTable_platos")}
//                     >
//                         <Text style={styles.textbuttonCart}>Agregar</Text>
//                         <View style={{ width: 10 }}></View>
//                         <Icon name="ios-add-circle" size={30} color={"white"}></Icon>
//                     </TouchableOpacity>
//                 </TouchableOpacity>
    
//         )
//     }
//     const styles = StyleSheet.create({
//         loaderDishes: {
//             marginTop: 10,
//             marginBottom: 10,
//             alignItems: "center",
//         }
//         , viewPlatos: {
//             flexDirection: "row",
//             marginBottom: 10
//         }
//         , viewPlatosImage: {
//             height: ((width / 2) - 20) - 90,
//             width: ((width / 2) - 20) - 10,
//             backgroundColor: 'transparent',
//         }
//         , vimageDishes: {
//             width: ((width / 2) - 20) - 10,
//             height: ((width / 2) - 20) - 30,
//             backgroundColor: 'transparent',
//             // position: 'absolute',
//             top: -45,
    
//         }
//         , dishesName: {
//             fontWeight: 'bold',
//             fontSize: 12,
//             textAlign: 'center',
    
//         }
//         , dishPrice: {
//             fontSize: 12,
//             color: 'green',
//         }
//         , divFood: {
//             width: (width / 2) - 20,
//             padding: 10,
//             borderRadius: 10,
//             marginTop: 55,
//             marginBottom: 5,
//             marginLeft: 10,
//             alignItems: 'center',
//             elevation: 8,
//             shadowOpacity: 0.3,
//             shadowRadius: 50,
//             backgroundColor: 'white',
    
//         }
//         , tobuttonCart: {
//             width: (width / 2) - 40,
//             backgroundColor: "#33c37d",
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: 5,
//             padding: 5,
//             flexDirection: "row",
//         }
//         , textbuttonCart: {
//             fontSize: 15,
//             color: "white",
//             fontWeight: "bold",
    
//         }
//         ,dishDescription:{
//             paddingTop:2,
//             color:"grey",
            

//         }
//     }
//     )
    
    