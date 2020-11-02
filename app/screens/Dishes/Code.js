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
    const [table, setTable] = useState("")
    //const [idRestaurant, setIdRestaurant] = useState()
    const [exit, setExit] = useState(true)

    const getCode = () => {
        if (!codeInput) {
            toastRef.current.show("No has ingresado ningun codigo")
        } else {
            //AsyncStorage.removeItem("cart")
            db.collection("codesDocument").where("code", "==", parseInt(codeInput)).get().then((response) => {
                if (response.size) {
                    response.forEach((doc) => {
                        AsyncStorage.setItem('idRestaurant', doc.data().idRestaurant)
                        AsyncStorage.setItem('table', doc.data().table)
                    })
                    AsyncStorage.removeItem("cart")
                    navigation.navigate("Dishes", {
                    });
                    setExit(false)
                } else {
                    toastRef.current.show("Por favor valida el codigo ingresado")
                }
            });
        }
    }

    const exitCode = () => {
        AsyncStorage.removeItem("cart")
        AsyncStorage.removeItem("idRestaurant")
        AsyncStorage.removeItem("table")
        setExit(true)
    }

    return (
        <View>
            {  exit ? (
                < View style={styles.view}>
                    <View>
                        <Text>Digita el código para sincronizarte con el restaurante¡</Text>
                    </View>
                    <View>
                        <Input
                            onChange={(e) => setCodeInput(e.nativeEvent.text)}
                            placeholder="Digita aqui tu codigo" />
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Button title="Ver menu" onPress={getCode} color="#ED923D"></Button>
                    </View>
                    <View>
                        <Toast ref={toastRef} position="center" opacity={0.9} />
                    </View>
                </View>
            ) :
                <View>
                    <Button style={{ backgroundColor: "#ED923D" }} title="Salir" onPress={exitCode}>  </Button>
                </View>}
        </View >
    );
}
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
        width: 2000,
        height: 30,
        marginLeft: 25,
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#ED923D"
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    }
});