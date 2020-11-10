import React, { useState } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)||
      isEmpty(formData.name)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener mas de  6 caracteres"
      );
    } else {
      setLoading(false);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          db.collection("usersDocument").add({
            idUser: firebase.auth().currentUser.uid,
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("El email ya esta en uso");
        });
    }
  };
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.txTitleReg}>{`¡Registrate!`}</Text>
      <Input
        placeholder="Correo electronico"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
      />
      <Input
        placeholder="Nombre"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "name")}
      />
      <Input
        placeholder="Contraseña"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={true}
      />
      <Input
        placeholder="Repetir contraseña"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "repeatPassword")}
        password={true}
        secureTextEntry={true}
      />
      <TouchableOpacity
      onPress={onSubmit}
      >
          <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#FF3838', '#ED923D']}
        style={{borderRadius:25,padding: 10, paddingTop:5, alignItems: 'center', borderRadius: 5 , marginTop:70, width:170, height:30,}}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Unirse
        </Text>
      </LinearGradient>
      </TouchableOpacity>
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}
function defaultFormValue() {
  return {
    email: "",
    name:"",
    password: "",
    repeatPassword: "",
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerStyles: {
    marginTop: 40,
    width: "50%",
  },
  btnRegister: {
    backgroundColor: "#ED923D",

    width: "100%",
  },
  txTitleReg: {
    fontSize: 24,
    paddingTop:10  ,
  },
});
