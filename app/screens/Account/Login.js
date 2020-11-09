import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.viewContainer}>
      <Image
        source={require("../../../assets/icon/acomerya-logo-name.png")}
        resizeMode="contain"
        style={styles.logo}
      />
        <LoginForm toastRef={toastRef} />
        <CreateAccountRestaurant />
        <CreateAccountClient />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccountClient() {
  const navigation = useNavigation();
  return (
    <Text
      style={styles.btnRegisterClient}
      onPress={() => navigation.navigate("register")}
    >
      {" "}
      Registrate
    </Text>
  );
}

function CreateAccountRestaurant() {
  const navigation = useNavigation();
  return (
    <Text
      style={styles.btnRegisterRestaurant}
      onPress={() => navigation.navigate("registerRestaurant")}
    >
      {" "}
      ¿Quieres ser parte de nosotros?
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50%",
    height: 200,
    alignSelf: "center",
  },
  viewContainer: {
   // backgroundColor:"white",
   width:"100%",
    alignSelf: "center",
    height: 570,
  },
  btnRegisterClient: {
    marginTop:30,
    fontSize:18,
    height:"5%",
    alignSelf: "center",
  },
  btnRegisterRestaurant: {
    color:"#ED923D",
   // height:"5%",
    fontSize:15,
    alignSelf: "center",
  },
});
