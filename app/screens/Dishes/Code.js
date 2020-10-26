import React, { useState, useEffect, useRef } from "react";
// import { View, Text } from "react-native";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Button, Input, Container } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import Toast from "react-native-easy-toast";
import Dishes from "./Dishes";
import Dish from "./Dish";


export default function Code(props) {
    const navigation = useNavigation();
    const [codeInput, setCodeInput] = useState("")
    const toastRef = useRef()

    const [code, setCode] = useState("")

    const getCode = () => {
        //let code
        if (!codeInput) {
            toastRef.current.show("No has ingresado ningun codigo")
        } else {
            //AsyncStorage.removeItem("cart")
            db.collection("codesDocument").where("code", "==", parseInt(codeInput)).get().then((response) => {
                if (response.size) {
                    response.forEach((doc) => {
                        setCode(doc.data().idRestaurant);
                    })
                    navigation.navigate("Dishes", {
                        code
                    });
                } else {
                    toastRef.current.show("Por favor valida el codigo ingresado")
                }
            });
        }
    }

    //global.codeValue = code;

    return (

        < View style={styles.view} >
            <View>
                <Text>Digita el código para sincronizarte con el restaurante¡</Text><br></br>
                <Input
                    onChange={(e) => setCodeInput(e.nativeEvent.text)}
                    placeholder="Digita aqui tu codigo" />
                <Button title="Ver menu" onPress={getCode} style={styles.boton} code={code}>  </Button>
            </View>
            <View>
                <Toast ref={toastRef} position="center" opacity={0.9} />
            </View>

        </View >

    );
}

// function Dish(props) {
//     const { code, navigation } = props;

//     const goDishes = () => {
//         navigation.navigate("Dish", {
//             code,
//         }
//         );
//     };
//     return (
//         <Dishes></Dishes>
//     )
// }
const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    }
    , titulo: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    }
    , view: {
        flex: 1,
        alignItems: "center"
    }
    , contenido: {
        marginHorizontal: '2.5%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    boton: {
        backgroundColor: '#FFFF'
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    }
});