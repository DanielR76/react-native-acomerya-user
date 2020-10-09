import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Loading } from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../../components/Restaurants/Carousel";
import { firebaseapp } from "../../utils/firebase";
import firebase from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, nombreRestaurante } = route.params;
  const [dish, setDish] = useState([]);
  const [dataAddress, setdataAddress] = useState(null);
  const [dataNameRestaurant, setNameRestaurant] = useState(null);
  const [dataPhone, setdataPhone] = useState(null);
  const [dataEmail, setdataEmail] = useState(null);

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
        const dataEmail = response.data().email;
        data.id = response.id;
        setdataAddress(dataAddress);
        setNameRestaurant(dataNameRestaurant);
        setdataPhone(dataPhone);
        setdataEmail(dataEmail);
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
        <Text style={styles.textInformationAddress}>{dataAddress}</Text>
        <Text style={styles.textInformationEmail}>{dataEmail}</Text>
        <Text style={styles.textInformationPhone}>{dataPhone}</Text>
      </View>
      <View style={styles.containerButtonReservation}>
        <CreateReservation />
      </View>
    </ScrollView>
  );

  function CreateReservation() {
    const navigation = useNavigation();
    return (
      <Button
        buttonStyle={styles.buttonReservation}
        title="Reservar"
        onPress={() => navigation.navigate("Reservation")}
      />
    );
  }
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
    fontSize: 19,
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
    height: 200,
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
    textDecorationLine: "underline",
  },
  textInformationAddress: {
    width: 183,
    height: 40,
    marginLeft: 30,
    textAlign: "center",
    fontSize: 15,
  },
  textInformationPhone: {
    width: 183,
    height: 40,
    marginLeft: 30,
    textAlign: "center",
    fontSize: 15,
  },
  textInformationEmail: {
    width: 220,
    height: 40,
    marginLeft: 20,
    textAlign: "center",
    fontSize: 15,
  },
  buttonReservation: {
    color: "#ED923D",
    borderRadius: 10,
  },
  containerButtonReservation: {
    width: 295,
    height: 60,
    marginLeft: 61,
    padding: 24,
  },
});
