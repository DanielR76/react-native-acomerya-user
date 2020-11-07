import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, AsyncStorage, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Input, Image } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore"; const db = firebase.firestore(firebaseapp);
import Toast from "react-native-easy-toast";
import { Ionicons } from '@expo/vector-icons';
//import { useFonts, Aileron } from '@expo-google-fonts/inter';


var { height, width } = Dimensions.get("window");


export default function Code(props) {
    const navigation = useNavigation();
    const [codeInput, setCodeInput] = useState("")
    const toastRef = useRef()
    const [code, setCode] = useState("")
    const [table, setTable] = useState("")
    const [exit, setExit] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [idRestaurant, setIdRestaurant] = useState("")


    useFocusEffect(
        useCallback(() => {
            var idRes
            AsyncStorage.getItem('idRestaurant').then(idRestaurant => {
                setIdRestaurant(idRestaurant)
                getRestaurantById(idRestaurant)
            })
        }, [])
    )


    const getCode = () => {
        if (!codeInput) {
            toastRef.current.show("No has ingresado ningun codigo")
        } else {
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

    //funcion que permite consultar restaurantsDocument con el fin de obtener su imagen
    const [restaurant, setRestaurant] = useState([])
    const getRestaurantById = async (idRest) => {
        await db.collection("restaurantsDocument").where("idUser",
            "==", idRest)
            .onSnapshot(querySnapshot => {
                const state = []
                querySnapshot.forEach((doc) => {
                    state.push({
                        ...doc.data(),
                        // id: doc.id,
                    })
                })
                setRestaurant(state)
            })
    }

    const exitCode = () => {
        setCodeInput('')
        AsyncStorage.removeItem("cart")
        AsyncStorage.removeItem("idRestaurant")
        AsyncStorage.removeItem("table")
        setExit(true)
    }

    return (
        <View>
            {  exit ? (
                < View>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Ionicons
                            name="ios-barcode"
                            size={150} color={"black"}
                        />
                    </View>
                    <View style={{ flex: 10, padding: 10, marginTop: 20 }}>
                        <View>
                            <Text style={{ alignSelf: 'center', fontWeight: "bold", fontSize: 15 }}>Digita el código para enlazarte con el restaurante </Text>
                        </View>
                    </View>
                    <View>
                        <Input
                            onChange={(e) => setCodeInput(e.nativeEvent.text)}
                            placeholder="Código"
                            // style={{ alignItems: 'center', }}
                            inputContainerStyle={{ alignSelf: 'center', height: width / 8, width: width / 2, marginTop: 40 }}
                        //containerStyle={{ justifyContent: 'center' }}
                        />
                    </View>
                    <View style={{ marginTop: 60 }}>
                        <TouchableOpacity
                            onPress={getCode}
                        >
                            <LinearGradient
                                start={{ x: 1, y: 0 }} //here we are defined x as start position
                                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                                colors={['#FF3838', '#ED923D']}
                                style={{ padding: 10, alignSelf: 'center', borderRadius: 10, width: width / 2, height: 40 }}>
                                <Text
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: 15,
                                        color: '#fff',
                                        alignSelf: 'center'
                                    }}>
                                    Ver menu
        </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: -250 }}>
                        <Toast ref={toastRef} position="top" opacity={0.9} />
                    </View>
                </View>

            ) :
                <View>

                    <View>
                        <View style={{ marginTop: 20 }}>
                            <Button style={{ backgroundColor: "#ffa500" }} title="Salir" onPress={exitCode}>  </Button>
                        </View>

                    </View>

                </View>

            }
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
    , btnMenu: {
        backgroundColor: "#ED923D",
        width: width / 2,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center'
    }
});
