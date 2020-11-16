import React, { useState } from "react";
import { StyleSheet, View, Text,ScrollView,ActivityIndicator,Modal,TouchableOpacity , Dimensions} from "react-native";
import { Input, Icon, Button,Image } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from 'expo-linear-gradient';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {Ionicons,Fontisto} from '@expo/vector-icons'
import { firebaseapp } from "../../utils/firebase";
import firebase, { firestore } from "firebase//app";
import uuid from 'uuid-random';
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);
const screenWidth = Dimensions.get("window").width;

export default function CreateReservation(props) {
  const { toastRef,  idUser ,nameRestaurant,imageRestaurant} = props;
  const [modalVisible, setModalVisible] = useState(false);
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
      requestNumber: uuid(),
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
  //const fecha = date.getMinutes()
  const fecha2= date
  return (
    <View style={styles.formContainerNameImage}>     
     
      <View style={styles.viewRestaurantsImage}>
           <Image
            resizeMode={"cover"}
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              imageRestaurant
                ? { uri: imageRestaurant }
                : require("../../../assets/favicon.png")
            }
            style={styles.imageRestaurant}
          />
     </View>
  
     <View style={styles.containerPinkReservation}>
         
      <Text style={styles.txTitleReg}>{nameRestaurant}</Text>
      <View style={styles.txContainerDate}>
      <Fontisto  name="date" size={35} color="gray" onPress={showDatepicker}/>
      <Text style={styles.txTitleDate} onPress={showDatepicker}>{`${fecha2.getDate()}/${fecha2.getMonth()}/${fecha2.getFullYear()}`}</Text>
      </View>
      <View style={styles.txContainerHour} >
      <Ionicons  name="md-time" size={35} color="gray"  onPress={showTimepicker} />
      <Text style={styles.txTitleHour} onPress={showTimepicker}>{`${fecha2.getHours()}:${fecha2.getMinutes()}`}</Text>
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
       <View style={styles.txContainerIconCantidad}>
      <Ionicons name="ios-people" size={35} color="gray" />
      </View>
      <View style={styles.txContainerBtnCantidad}>
        
      <Input
        placeholder="# Personas"
        containerstyle={styles.inputCantidad}
        buttonStyle={styles.inputCantidad}
        onChange={(e) => onChange(e, "quantity")}
      />
       </View>
        <View style={styles.txContainerBtnObservacion}>
      <AutoGrowingTextInput
        placeholder="Observaciones: (Ejemplo: Cumpleaños, Boda, Bautizo, si desea alguna decoración, etc...)"
        containerstyle={styles.inputObservaciones}
        buttonStyle={styles.inputObservaciones}
        onChange={(e) => onChange(e, "summary")}
      />
       </View>
       <TouchableOpacity
      onPress={onSubmit} 
      >
          <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#FF3838', '#ED923D']}
        style={{padding: 10, alignSelf: 'center', borderRadius: 10, width: screenWidth / 2, height: 40 , marginTop:45,}}>
        <Text
          style={{
            alignSelf:"center",
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          Confirmar
        </Text>
      </LinearGradient>
      </TouchableOpacity>
      
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
  viewBody: {
    flex: 18,
    backgroundColor: "#fff",
  },
  txTitleReservation: {
    fontSize: 24,
    width: 160,
    height: 50,
    alignSelf:"center",
    marginTop: 15,
    textAlign: "center",
    
   // textDecorationLine: "underline",
  },
  imageRestaurant: {
    width: 330,
    height: 190,
    borderRadius: 10,
    overflow: "hidden",
  },
  formContainer3: {
    flex: 40,
    //backgroundColor: "#fff",    
  },
  formContainerNameImage: {
   // flex: 40,
   marginLeft:-40,
   width: 420,
   height: 750,
    backgroundColor: "#fff",    
  },
  inputCantidad: {
    width: "150%",
      },
  inputObservaciones: {
    width: "100%",
    marginTop: 40,
   // textDecorationLine: "underline",
  },

  btnContainerStyles: {
    marginTop: 10,
    width: "80%",
  },
  txTitleReg: {
    fontSize: 22,
    width: 250,
    height: 80,
    marginLeft: 5,
    marginTop: -15,
    textAlign: "center",
    alignSelf:"center",
    fontWeight: "bold",
  },
  txTitleDate: {
    fontSize: 18,
    width: 100,
    height: 25,
    marginLeft: 55,
    marginTop: -32,
  },
  txTitleHour: {
    fontSize: 18,
    width: 100,
    height: 25,
    marginLeft: 50,
    marginTop: -35,
  },
  txContainerDate: {
    width: 150,
    height: 45,
    marginLeft: -5,
    marginTop: -25,
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
  txContainerBtnCantidad: {
    //fontSize: 23,
    width: "50%",
    height: 35,
    marginLeft:10,
    marginTop: -40,
    alignSelf:"center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  txContainerIconCantidad: {
    width: "100%",
    marginLeft: 35,
    marginTop: 30,
    borderRadius: 5,
  },
  txContainerIconQuantity: {
    //fontSize: 23,
    width: 20,
    height: 0,
    marginLeft: 5,
    marginTop: 10,
    textAlign: "center",
    alignSelf:"center",
  },
  txContainerBtnObservacion: {
    fontSize: 23,
    width: 300,
    height: 150,
    marginLeft: 5,
    marginTop: 20,
    //textAlign: "center",
    alignSelf:"center",
    backgroundColor: "white",
    borderRadius: 10,
    
  },
  containerPinkReservation: {
    width: "80%",
    height: 450,
    marginTop: 27,
    marginLeft:25,
    justifyContent:"center",
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#FFF6F6",
  },
  viewRestaurantsImage:{
    marginLeft:30,

  }
});
