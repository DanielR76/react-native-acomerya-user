import React, { useState } from "react";
import { StyleSheet, View, Text,YellowBox,ActivityIndicator,TouchableOpacity} from "react-native";
import { Input, Icon, Button,Image } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import {Ionicons,Fontisto} from '@expo/vector-icons'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { LinearGradient } from 'expo-linear-gradient';
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
    navigation.navigate("MyReservations");
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
    navigation.navigate("MyReservations");
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
           <View style={styles.viewRestaurantsImage}>
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
          </View>
          <View style={styles.viewRestauranName}>
          </View>

          <View style={styles.containerPinkReservation}> 
          <Text style={styles.txTitleReg}>{values.nameRestaurant}</Text>

     
      <View style={styles.txContainerDate}>
      <Fontisto  name="date" size={35} color="gray" onPress={showDatepicker}  />
      <Text style={styles.txTitleDate} onPress={showDatepicker} >{`${fecha2.getDate()}/${fecha2.getMonth()}/${fecha2.getFullYear()}`}</Text>
      </View>
      <View style={styles.txContainerHour} >
      <Ionicons  name="md-time" size={35} color="gray"  onPress={showTimepicker} />
      <Text style={styles.txTitleHour} onPress={showTimepicker} >{`${fecha2.getHours()}:${fecha2.getMinutes()}`}</Text>
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
       <View style={styles.txContainerIconCantidad}>
      <Ionicons name="ios-people" size={35} color="gray" />
      </View>
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
        containerstyle={styles.inputObservaciones}
        value = {values.summary}
        onChange={(e) => onChange(e, "summary")}
      />
      </View>
       {values.status == "pendiente" ? (
      <TouchableOpacity
      onPress={onSubmit}
      >
          <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#FF3838', '#ED923D']}
        style={{ padding: 10, alignItems: 'center', borderRadius: 5, width: "35%",height: 50, marginLeft:165, marginTop: 20, paddingTop: 15, }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Actualizar
        </Text>
      </LinearGradient>
      </TouchableOpacity>
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
  viewRestauranName:{
    marginTop:30,
    marginLeft:70,

  },
  viewRestaurantsImage:{
    marginLeft:30,
  },
  imageRestaurant: {
    width: 330,
    height: 190,
    borderRadius: 10,
    overflow: "hidden",
    //marginLeft:40,
  },
  formContainer: {
    marginLeft:-40,
    width: 420,
    height: 750,
     backgroundColor: "#fff",   
  },
  inputCantidad: {
    width: "100%",
    marginTop: 20,
  },
  inputObservaciones: {
    width: "100%",
    marginTop: 40,
   // textDecorationLine: "underline",
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
    fontSize: 22,
    width: 250,
    height: 30,
    marginLeft: 5,
    marginTop: -5,
    textAlign: "center",
    alignSelf:"center",
    fontWeight: "bold",

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
    marginLeft: 45,
    marginTop: -35,
  },
  txContainerDate: {
    width: 150,
    height: 45,
    marginLeft: -5,
    marginTop: 10,
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
    alignSelf:"center",
  },
  txContainerIconCantidad: {
    width: "100%",
    marginLeft: 40,
    marginTop: 30,
    borderRadius: 5,
  },
  txContainerBtnCantidad: {
     //fontSize: 23,
     width: 120,
     height: 35,
     marginLeft: -5,
     marginTop: -35,
     textAlign: "center",
     alignSelf:"center",
     backgroundColor: "white",
     borderRadius: 5,
  },
  txContainerBtnObservacion: {
    fontSize: 23,
    width: 300,
    height: 150,
    marginLeft: 5,
    marginTop: 40,
    //textAlign: "center",
    alignSelf:"center",
    backgroundColor: "white",
    borderRadius: 10,
    
  },
  containerPinkReservation: {
    width: "80%",
    height: 500,
    marginTop: 0,
    marginLeft:25,
    justifyContent:"center",
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
  },
  btnContainerStyles: {
    marginTop: 100,
    width: "20%",
    height: 50,
  },
  btnCanceled: {
    width: "35%",
    height: 50,
    marginLeft: 25,
    marginTop: -50,
    backgroundColor: "#C4C4C4",
  },
});
