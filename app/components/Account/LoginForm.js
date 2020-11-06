import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

export default function LoginForm(props) {
  const { toastRef } = props;
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          const user = firebase.auth().currentUser;
          getUserById(user.uid);
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Email o password incorrecto");
          /*  setValues({
            ...values,
            password: "",
          }); */
        });
    }
  };

  const getUserById = async (id) => {
    await db
      .collection("usersDocument")
      .where("idUser", "==", id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size) {
          querySnapshot.forEach((doc) => {
            console.log(`Si existe en la BD ${doc.id}`);
          });
        } else {
          console.log("no existe en tabla");
          alert("no existe en tabla");
        }
      })
      .catch((error) => {
        console.log(`este es el error ${error}`);
      });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.txTitle}>{`¡Inicia sesión!`}</Text>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={true}
      />
      <Button
        title="Continuar"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
    
      <Loading isVisible={loading} text="iniciando sesion" />
      </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 80,
    marginLeft: 80,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 50,
    width: "60%",
    height: 200,
  },
  btnLogin: {
     backgroundColor: "#ED923D",
     width: "100%",
     height: 30,
     borderRadius:10,
  },
  txTitle: {
    //color: 'black',
    fontWeight: "bold",
    fontSize: 24,
 
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
