import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import CreateReservation from "../../components/Restaurants/ReservationCreate";

export default function Reservation(props) {
  const toastRef = useRef();
  const { route } = props;
  const { idUser,nameRestaurant,imageRestaurant } = route.params;

  return (
    <KeyboardAwareScrollView>
     {/*  <Image
        source={require("../../../assets/icon/acomerya-logo-name.svg")}
        resizeMode="contain"
        style={styles.logo}
      /> */}
      <View style={styles.viewForm}>
        <CreateReservation toastRef={toastRef} idUser={idUser} nameRestaurant = {nameRestaurant} imageRestaurant={imageRestaurant} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 151,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
