import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import EditReservation from "../../components/MyReservations/EditReservation";

export default function Reservation(props) {
  const toastRef = useRef();
  const { route } = props;
  const {date1,quantity,summary,id,status,nameRestaurant,imageRestaurant} = route.params;
  const date = date1

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/icon/acomerya-logo-name.svg")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <EditReservation toastRef={toastRef} date = {date} quantity={quantity} summary={summary} id  = {id} status= {status} nameRestaurant={nameRestaurant} imageRestaurant = {imageRestaurant}/>
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
