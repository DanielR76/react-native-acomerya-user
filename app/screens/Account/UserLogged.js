import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { firebaseapp } from "../../utils/firebase";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import { LinearGradient } from 'expo-linear-gradient';
const screenWidth = Dimensions.get("window").width;

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
  }, []);

  const deleteAsynStora = () => {
    //setCodeInput('')
    AsyncStorage.removeItem("cart")
    AsyncStorage.removeItem("idRestaurant")
    AsyncStorage.removeItem("table")
    //setExit(true)
  }
  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser userInfo={userInfo} />}

      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut()
          deleteAsynStora()
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          start={{ x: 1, y: 0 }} //here we are defined x as start position
          end={{ x: 0, y: 0 }} //here we can define axis but as end position
          colors={['#FF3838', '#ED923D']}
          style={{ padding: 10, alignSelf: 'center', borderRadius: 10, width: screenWidth / 2, height: 40, marginTop: 25, }}>
          <Text
            style={{
              alignSelf: "center",
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}>
            Cerrar sesión
        </Text>
        </LinearGradient>
      </TouchableOpacity>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "white",
  },
  btnCloseSession: {
    width: "30%",
    marginLeft: 140,
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#ED923D",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },

});
