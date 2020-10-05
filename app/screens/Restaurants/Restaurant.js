import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Loading } from "../../components/Loading";
import Carousel from "../../components/Restaurants/Carousel";
import { firebaseapp } from "../../utils/firebase";
import firebase from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, nombreRestaurante } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [dish, setDish] = useState([]);
  const [dataAddress, setdataAddress] = useState(null);
  const [dataNameRestaurant, setNameRestaurant] = useState(null);
  const [dataPhone, setdataPhone] = useState(null);

  navigation.setOptions({ title: nombreRestaurante });
  const getRestaurantById = async () => {
    await db
      .collection("restaurantsDocument")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        const dataIduser = response.data().idUser;
        const dataAddress = response.data().address;
        const dataNameRestaurant = response.data().nameRestaurant;
        const dataPhone = response.data().phone;
        data.id = response.id;
        setRestaurant(data);
        setdataAddress(dataAddress);
        setNameRestaurant(dataNameRestaurant);
        setdataPhone(dataPhone);
        getImagesByDish(dataIduser);
      });
  };
  //CONSULTA PARA CARRUOSEL DE IMAGENES
  const getImagesByDish = async (id) => {
    await db
      .collection("dishDocument")
      .where("idRestaurant", "==", id)
      .onSnapshot((querySnapshot) => {
        const state = [];
        querySnapshot.forEach((doc) => {
          state.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setDish(state);
      });
  };

  useEffect(() => {
    getRestaurantById();
  }, []);

  // Llamar platos del restaurante e la pantalla de informacion

  const arrayImages = [];
  dish.map((i) => {
    arrayImages.push({ imagePath: i.imagePath, dishName: i.dishName });
  });

  // if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carousel arrayImages={arrayImages} height={199} width={screenWidth} />
      <View style={styles.containerTextNameRestaurant}>
        <Text style={styles.textNameRestaurant}>{dataNameRestaurant}</Text>
      </View>
      <View style={styles.containerInformationContact}>
        <Text style={styles.textInformationContact}>
          Información de contacto
        </Text>
        <Text>{dataAddress}</Text>
        <Text>{dataPhone}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 18,
    backgroundColor: "#fff",
  },
  textNameRestaurant: {
    width: 183,
    height: 25,
    marginLeft: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTextNameRestaurant: {
    width: 295,
    height: 60,
    marginLeft: 61,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
  },
  containerInformationContact: {
    width: 295,
    height: 149,
    marginTop: 15,
    marginLeft: 61,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
  },
  textInformationContact: {
    width: 183,
    height: 40,
    marginLeft: 30,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
