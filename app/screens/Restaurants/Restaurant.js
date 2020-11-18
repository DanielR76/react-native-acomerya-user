import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Loading } from "../../components/Loading";
import { Image,Button } from "react-native-elements"; 
import { useNavigation } from "@react-navigation/native";
import Carousel from "../../components/Restaurants/Carousel";
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, idUser, nameRestaurant,imagePath,phone ,address, email,imageRestaurant} = route.params;
  const [dish, setDish] = useState([]);
  
  navigation.setOptions({ title: nameRestaurant });

  useEffect(() => {
    getRestaurantById();
  }, []);

  const getRestaurantById = async () => {
    await db
      .collection("restaurantsDocument")
      .doc(id)
      .onSnapshot((response) => {
        const data = response.data();
        const dataIduser = response.data().idUser;
        data.id = response.id;
        getImagesByDish(dataIduser);
      });
  };
  //CONSULTA PARA CARRUOSEL DE IMAGENES
  const getImagesByDish = async (id) => {
    await db
      .collection("dishDocument")
      .where("idRestaurant", "==", id)
      .where("status", "==", true)
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

 
  // Llamar platos del restaurante e la pantalla de informacion

  const arrayImages = [];
  dish.map((i) => {
    arrayImages.push({ imagePath: i.imagePath, dishName: i.dishName });
  });

  // if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      
      <Carousel arrayImages={arrayImages} height={199} width={screenWidth} />
      
      <Image
            resizeMode={"cover"}
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              imageRestaurant
                ? { uri: imageRestaurant }
                : require("../../../assets/favicon.png")
            }
            style={styles.imageRestaurant}
          />
      <View style={styles.containerInformationContact}>
        <Text style={styles.textInformationContact}>
          Información de contacto
        </Text>
        <Text style={styles.textInformationAddress}>{address}</Text>
        <Text style={styles.textInformationEmail}>{email}</Text>
        <Text style={styles.textInformationPhone}>{phone}</Text>
      </View>
      <View style={styles.containerButtonReservation}>
        <CreateReservation />
      </View>
    </ScrollView>
  );

  function CreateReservation() {
    const navigation = useNavigation();
    return (
    
<TouchableOpacity
      onPress={() =>
          navigation.navigate("Reservation", {
            idUser,
            nameRestaurant,
            imageRestaurant,
          })
      }
      >
          <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#FF3838', '#ED923D']}
        style={{padding: 10, alignSelf: 'center', borderRadius: 10, width: screenWidth / 2, height: 40 ,marginTop:25, }}>
        <Text
          style={{
            alignSelf:"center",
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Reserva ya
        </Text>
      </LinearGradient>
      </TouchableOpacity>
      
    );
  }
}

const styles = StyleSheet.create({
  btnContainerStyles: {
    marginTop: 45,
    width: "100%",
  },
  btnRegister: {
    backgroundColor: "#ED923D",
    width: "80%",
    borderRadius:10,
    height:50,
    marginTop: -50,
    alignSelf: "center",
  },
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
    marginLeft: 50,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
  },
  containerInformationContact: {
    width: 295,
    height: 200,
    marginTop: 15,
    marginLeft: 50,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
    
  },
  textInformationContact: {
    width: 220,
    height: 40,
    marginLeft: 12,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInformationAddress: {
    width: 190,
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
    width: "35%",
    marginLeft:100,
    marginTop: 40,
    borderRadius: 0,
    backgroundColor: "#ED923D",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerButtonReservation: {
    width: 220,
    height: 80,
    marginLeft: 85,
    padding: 15,
    marginTop:-6,
    //backgroundColor: "orange",
    borderRadius: 10,
  },
});
