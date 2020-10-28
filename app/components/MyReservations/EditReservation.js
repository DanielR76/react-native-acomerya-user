import React, { useState } from "react";
import { StyleSheet, View, Text,YellowBox } from "react-native";
import { Input, Icon, Button   } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);
// Validar campo dato complejo pasa ren ves de props declararla global
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);
export default function CreateReservation(props) {
  //const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({...props})
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
    setUpdateReservation();
  };
  const onSubmitCancel = () => {
    setCancelReservation();
  };
  const setUpdateReservation = async () => {
    setLoading(false);
    await
    db.collection("reservationDocument").doc(values.id).update({
      date: values.date,
      quantity: values.quantity,
      summary: values.summary, 
    })
    .then(() => console.log("Se actualizó correctamente la reserva"))
    .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error));
    setLoading(false);
    navigation.navigate("restaurants");
  }; 

  const setCancelReservation = async () => {
    setLoading(false);
    await
    db.collection("reservationDocument").doc(values.id).update({
      status: "cancelado",
    })
    .then(() => console.log("Se canceló correctamente la reserva"))
    .catch(error => console.error("Hubo un error al actualizar en FireStore: ", error));
    setLoading(false);
    navigation.navigate("restaurants");
  }; 
  console.log(values)
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setValues({...values,date: currentDate})
  };
  const onChange = (e, name) => {
    setValues({ ...values, [name]: e.nativeEvent.text });
   };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.txTitleReg}>{`¡Tu reserva!`}</Text>
      <View >
      <Text style={styles.txTitleReg}>{values.nameRestaurant}</Text>
      </View> 
      <View >
      <Button onPress={showDatepicker} title="Fecha" />
      </View> 
      <View >
      <Button onPress={showTimepicker} title="Hora" />
      </View>
      {show && (
        <DateTimePicker
          name = "date"
          testID="dateTimePicker"
          value={values.date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange1}
          locale={"es"}
        />
      )}
      <Input 
        name = "quantity"
        placeholder="Cantidad"
        containerstyle={styles.inputForm}
        value = {values.quantity}
        onChange={(e) => onChange(e, "quantity")}
      />
      <AutoGrowingTextInput
        name = "summary"
        placeholder="Observaciones"
        containerstyle={styles.inputForm}
        value = {values.summary}
        onChange={(e) => onChange(e, "summary")}
      />
       {values.status == "pendiente" ? (
       <View style={styles.ButtonViewContainer}>
       <Button
        title="Actualizar reserva"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
        />
       </View>
         ) : (
          <Text>{``}</Text>
         )}

         {values.status == "pendiente" ? (
         <View style={styles.ButtsonViewContainer}>
       <Button
        title="Cancelar reserva"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnRegister}
        onPress={onSubmitCancel}
        />
       </View>
         ) : (
          <Text>{``}</Text>
         )}
      <Loading isVisible={loading} text="Actualizando Reserva" />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  ButtonViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerStyles: {
    marginTop: 100,
    width: "80%",
  },
  btnRegister: {
    backgroundColor: "#ED923D",
  },
  txTitleReg: {
    //color: 'black',
    fontWeight: "bold",
    fontSize: 24,
  },txTitleStatus: {
    //color: 'black',
    fontWeight: "bold",
    fontSize: 15,
  },
});
