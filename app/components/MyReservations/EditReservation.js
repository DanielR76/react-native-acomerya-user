import React, { useState } from "react";
import { StyleSheet, View, Text,YellowBox,ActivityIndicator } from "react-native";
import { Input, Icon, Button,Image } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import {Ionicons,Fontisto} from '@expo/vector-icons'
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

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setValues({...values,date: currentDate})
  };
  const onChange = (e, name) => {
    setValues({ ...values, [name]: e.nativeEvent.text });
   };
   const fecha2= values.date
  return (
    <View style={styles.formContainer}>
      
     
      <Text style={styles.txTitleReservation}>{`¡Tu reserva!`}</Text>
      <View style={styles.containerPinkReservation}>
            <Image
            resizeMode={"cover"}
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              values.imageRestaurant
                ? { uri: values.imageRestaurant }
                : require("../../../assets/favicon.png")
            }
            style={styles.imageRestaurant}
          />

      <Text style={styles.txTitleReg}>{values.nameRestaurant}</Text>
      <View style={styles.txContainerDate}>
      <Fontisto  name="date" size={45} color="black" onPress={showDatepicker}  />
      <Text style={styles.txTitleDate}>{`${fecha2.getDate()}/${fecha2.getMonth()}/${fecha2.getFullYear()}`}</Text>
      </View>
      <View style={styles.txContainerHour} >
      <Ionicons  name="md-time" size={45} color="black"  onPress={showTimepicker} />
      <Text style={styles.txTitleHour}>{`${fecha2.getHours()}:${fecha2.getMinutes()}`}</Text>
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
      <View style={styles.txContainerBtnCantidad}>
      <Input 
        name = "quantity"
        placeholder="Cantidad"
        containerstyle={styles.inputForm}
        value = {values.quantity}
        onChange={(e) => onChange(e, "quantity")}
      />
      </View>
      <View style={styles.txContainerBtnObservacion}>
      <AutoGrowingTextInput
        name = "summary"
        placeholder="Observaciones"
        containerstyle={styles.inputForm}
        value = {values.summary}
        onChange={(e) => onChange(e, "summary")}
      />
      </View>
       {values.status == "pendiente" ? (
       <View style={styles.ButtonViewContainer}>
       <Button
        title="Actualizar"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
        />
       </View>
         ) : (
          <Text>{''}</Text>
         )}
         {values.status == "pendiente" ? (
         <View style={styles.ButtsonViewContainer}>
       <Button
        title="Cancelar"
        containerstyle={styles.btnContainerStyles}
        buttonStyle={styles.btnCanceled}
        onPress={onSubmitCancel}
        />
       </View>
         ) : (
          <Text>{``}</Text>
         )}
          </View> 
      <Loading isVisible={loading} text="Actualizando Reserva" />
    </View>
  )
}

const styles = StyleSheet.create({
  imageRestaurant: {
    marginTop:20,
    width: 330,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
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
    width: 220,
    height: 100,
    marginLeft: 40,
    marginTop: 1,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  txTitleReservation: {
    fontSize: 24,
    width: 170,
    height: 50,
    marginLeft: 70,
    marginTop: -5,
    textAlign: "center",
   // textDecorationLine: "underline",
  },
  txTitleDate: {
    fontSize: 20,
    width: 100,
    height: 25,
    marginLeft: 55,
    marginTop: -35,
  },
  txTitleHour: {
    fontSize: 20,
    width: 100,
    height: 25,
    marginLeft: 60,
    marginTop: -35,
  },
  txContainerDate: {
    width: 150,
    height: 45,
    marginLeft: 13,
    marginTop: -30,
    //backgroundColor: "orange",
    borderRadius: 10,
  },
  txContainerHour: {
    width: 120,
    height: 45,
    marginLeft: 190,
    marginTop: -40,
    //backgroundColor: "white",
    borderRadius: 10,
  },
  txContainerBtnCantidad: {
    width: 120,
    height: 35,
    marginLeft: 12,
    marginTop: 15,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  txContainerBtnObservacion: {
    fontSize: 23,
    width: 300,
    height: 150,
    marginLeft: 15,
    marginTop: 25,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    
  },
  containerPinkReservation: {
    width: 380,
    height: 740,
    marginLeft: 5,
    marginTop: -10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#FFF6F6",
  },
  btnContainerStyles: {
    marginTop: 100,
    width: "20%",
    height: 50,
  },
  btnRegister: {
    width: "35%",
    height: 50,
    marginLeft:30,
    marginTop: 60,
    backgroundColor: "#8bc34a",
  },
  btnCanceled: {
    width: "35%",
    height: 50,
    marginLeft:165,
    marginTop: -50,
    backgroundColor: "#C4C4C4",
  },
});
