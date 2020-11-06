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
      <View styles={styles.viewContainer}>
      <Image
        source={require("../../../assets/icon/acomerya-logo-name.png")}
        resizeMode="contain"
        style={styles.logo}
      />
        <LoginForm toastRef={toastRef} />
        <CreateAccountClient />
        <CreateAccountRestaurant />
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
    width: "100%",
    height: 300,
    marginTop: 20,
    marginLeft: 15,
  },
  viewContainer: {
    marginRight: 80,
    marginLeft: 80,
  },

  btnRegisterClient: {
    color: "#ED923D",
    fontSize:20,
    fontWeight: "bold",
    marginTop: -120,
    marginLeft: 140,
    marginRight: 50,
  },
  btnRegisterRestaurant: {
    color: "black",
    fontSize:15,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 90,
    marginRight: 50,
  },
});
