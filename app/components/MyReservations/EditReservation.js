import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

export default function CreateReservation(props) {
  const { toastRef,  idUser ,nameRestaurant,imageRestaurant} = props;
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const onSubmit = () => {
    if (isEmpty(formData.quantity) || isEmpty(formData.summary)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (size(formData.quantity) < 1) {
      toastRef.current.show("Tienes que dejarnos una observación");
    } else {
      setCreateRestaurant();
    }
  };

  const setCreateRestaurant = async () => {
    setLoading(false);

    db.collection("reservationDocument").add({
      idRestaurant: idUser,
      idUser: firebase.auth().currentUser.uid,
      name:firebase.auth().currentUser.email,
      date: date,
      quantity: formData.quantity,
      requestNumber: "5",
      status: "pendiente",
      summary: formData.summary,
      nameRestaurant: nameRestaurant,
      imageRestaurant: imageRestaurant,
    });
    setLoading(false);
    navigation.navigate("restaurants");
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
   
  };
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.txTitleReg}>{`¡Reserva Ya!`}</Text>
      <View >
      <Button onPress={showDatepicker} title="Fecha" />
      </View>
      <View >
      <Button onPress={showTimepicker} title="Hora" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange1}
        />
      )}
      <Input
        placeholder="Cantidad"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "quantity")}
        
      />
      <Input
        placeholder="Observaciones"
        containerstyle={styles.inputForm}
        onChange={(e) => onChange(e, "summary")}
        
      />
      <Button
        title="Crear reserva"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando Reserva" />
    </View>
  )
}
function defaultFormValue() {
  return {
    date: "",
    quantity: "",
    summary: "",
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerStyles: {
    marginTop: 80,
    width: "80%",
  },
  btnRegister: {
    backgroundColor: "#ED923D",
  },
  txTitleReg: {
    //color: 'black',
    fontWeight: "bold",
    fontSize: 24,
  },
});
