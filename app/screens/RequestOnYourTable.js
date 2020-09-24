import React,{useState, useEffect } from "react";
// import { View, Text } from "react-native";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button, Input} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db } from "../utils/firebase";
import "firebase/firestore";

// const db = firebase.firestore(firebaseApp);

export default function RequestOnYourTable() {
    const navigation = useNavigation();
    // const [restaurants, setRestaurants] = useState([]);
    // const [totalRestaurants, setTotalRestaurants] = useState(0);
    // useEffect(() => { 
    //     db.collection("dishDocument").get().then((snap)=> {
    //         setTotalRestaurants(snap.size)
    //     })
    // }, [])

    //funcion que permite traer los platos

    return (
<ScrollView style={styles.viewBody} >
<View style={styles.view}>
<Text>Digita el siguiente codigo para que veas nuestro menu.</Text><br></br>
<Input></Input>
<Button title="Ver menu" onPress={() => navigation.navigate("RequestOnYourTable_platos")}></Button><br></br>
</View>
</ScrollView>      
    );
}

   


const styles = StyleSheet.create({
    viewBody: {
marginLeft: 30, 
marginRight: 30,
    }
    ,titulo: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    }
    ,view:{
        flex: 1,
        alignItems: "center"
    }
});





