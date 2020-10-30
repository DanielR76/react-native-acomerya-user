import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {Ionicons,Fontisto} from '@expo/vector-icons'
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
    <View style={styles.formContainer1}>
      <Text style={styles.txTitleRegs}>{`¡Reserva Ya!`}</Text>
       <View style={styles.containerPinkReservation}>
      <Text style={styles.txTitleReg}>{nameRestaurant}</Text>
      <View style={styles.txContainerDate}>
      <Fontisto  name="date" size={45} color="orange" onPress={showDatepicker}  />
      <Text style={styles.txTitleDate}>Fecha</Text>
      </View>
      <View style={styles.txContainerHour} >
      <Ionicons  name="md-time" size={45} color="orange"  onPress={showTimepicker} />
      <Text style={styles.txTitleDate}>Hora</Text>
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
      <View style={styles.txContainerBtnCantidad}>
        
      <Input
        placeholder="Cantidad"
        containerstyle={styles.inputCantidad}
        buttonStyle={styles.inputCantidad}
        onChange={(e) => onChange(e, "quantity")}
      />
         </View>
        <View style={styles.txContainerBtnObservacion}>
      <AutoGrowingTextInput
        placeholder="Observaciones"
        containerstyle={styles.inputObservaciones}
        buttonStyle={styles.inputObservaciones}
        onChange={(e) => onChange(e, "summary")}
      />
       </View>
      <Button
        title="Confirmar"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnReservation}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando Reserva" />
      </View>
    </View>
  );
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
    marginTop: 20,
  },
  inputCantidad: {
    width: "100%",
    marginTop: 20,
  },
  inputObservaciones: {
    width: "100%",
    marginTop: 70,
    textDecorationLine: "underline",
  },

  btnContainerStyles: {
    marginTop: 80,
    width: "80%",
  },
  
  btnReservation: {
    width: "35%",
    marginLeft:100,
    marginTop: 95,
    borderRadius: 0,
    backgroundColor: "#ED923D",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  txTitleReg: {
    fontSize: 24,
    width: 250,
    height: 90,
    marginLeft: 40,
    marginTop: 1,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  txTitleDate: {
    fontSize: 20,
    width: 70,
    height: 35,
    marginLeft: 45,
    marginTop: -38,
    textAlign: "center",
  },
  txContainerBtnCantidad: {
    fontSize: 23,
    width: 100,
    height: 35,
    marginLeft: 5,
    marginTop: 50,
    textAlign: "center",
    //backgroundColor: "white",
    borderRadius: 40,
  },
  txContainerBtnObservacion: {
    fontSize: 23,
    width: 150,
    height: 35,
    marginLeft: 15,
    marginTop: 20,
    textAlign: "center",
    //backgroundColor: "white",
    borderRadius: 40,
    
  },
  txContainerDate: {
    fontSize: 23,
    width: 70,
    height: 35,
    marginLeft: 20,
    marginTop: -10,
    textAlign: "center",
    //backgroundColor: "white",
    borderRadius: 40,
  },
  txContainerHour: {
    fontSize: 23,
    width: 70,
    height: 35,
    marginLeft: 160,
    marginTop: -35,
    textAlign: "center",
    //backgroundColor: "white",
    borderRadius: 40,
  },
  containerPinkReservation: {
    width: 370,
    height: 450,
    marginLeft: -15,
    marginTop: -140,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#FFF6F6",
  },
});
