import React, { useState, useCallback, useRef } from "react";
// import { View, Text } from "react-native";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Button, Input, Container } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import Toast from "react-native-easy-toast";

export default function Code(props) {
    const navigation = useNavigation();
    const [codeInput, setCodeInput] = useState("")
    const toastRef = useRef()
    const [code, setCode] = useState("")



    global.codeValue = code;
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
                    AsyncStorage.removeItem("cart")
                    navigation.navigate("Dishes", {
                    });
                } else {
                    toastRef.current.show("Por favor valida el codigo ingresado")
                }
            });
        }
    }

    return (

        < View style={styles.view} >
            <View>
                <Text>Digita el código para sincronizarte con el restaurante¡</Text>
                <View>
                <Input
                    onChange={(e) => setCodeInput(e.nativeEvent.text)}
                    placeholder="Digita aqui tu codigo" 
                    />
                 </View>
                <Button title="Ver menu" onPress={getCode} style={styles.boton}>  </Button>
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