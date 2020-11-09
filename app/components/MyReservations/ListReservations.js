import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
export default function ListReservation(props) {
  const { restaurants, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      {size(restaurants) > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          //onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
         
          <Text style={styles.textNoReservations}>No tienes reservas aun!</Text>
          <Image
        source={require("../../../assets/icon/MyReservations.png")}
        resizeMode="contain"
        style={styles.logo}
      />
        </View>
      )}
    </SafeAreaView>
  );
}



function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { idRestaurant,quantity,summary, idUser, imageRestaurant, nameRestaurant,status,date,id} = restaurant.item;
  const fecha = date.toDate().toString()
  const date1 = date.toDate()
  const fecha2 = date.toDate()
 
  const goRestaurant = () => {
    navigation.navigate("EditReservation", {
      id,
      idRestaurant,
      idUser,
      nameRestaurant,
      date1,
      quantity,
      summary,
      status,
      imageRestaurant,
    });
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestaurants}>
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
        <View>
          <View style={styles.containerTextName}>
            <Text style={styles.textNameRestaurant}>{nameRestaurant}</Text>
            <Text style={styles.textFecha}>{`${fecha2.getDate()}/${fecha2.getMonth()}/${fecha2.getFullYear()} - ${fecha2.getHours()}:${fecha2.getMinutes()}`}</Text>
          </View>

           {status == "pendiente" ? (
             <View style={styles.viewContainerPending}>
          <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#ED923D', '#FF3838']}
        style={{ borderBottomRightRadius:25,padding: 10, paddingTop:5, marginLeft:3, alignSelf:"center", marginTop:10, width:320, height:30}}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
            alignSelf:"center"
          }}>
         Reserva {status}
        </Text>
      </LinearGradient>
              </View>
          )
          : (status == "rechazado")?
          (
            <View style={styles.viewContainerRejected}>
            <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#F38888', '#D3454D']}
        style={{ borderBottomRightRadius:25,padding: 10, paddingTop:5, marginLeft:3, alignSelf:"center", marginTop:10, width:320, height:30}}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
            alignSelf:"center"
          }}>
         Reserva {status}
        </Text>
      </LinearGradient>
            </View>
          )
          : (status == "aceptado")?
          (
            <View style={styles.viewContainerStateAcepted}>
            <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#54E57D', '#4C9B3F']}
        style={{ borderBottomRightRadius:25,padding: 10, paddingTop:5, marginLeft:3, alignSelf:"center", marginTop:10, width:320, height:30}}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
            alignSelf:"center"
          }}>
         Reserva {status}
        </Text>
      </LinearGradient>
            </View>
          )
          :
          (
            <View style={styles.viewContainerStateCanceled}>
           <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0}} //here we are defined x as start position
        end={{x: 0, y: 0}} //here we can define axis but as end position
        colors={['#DADADA', '#989696']}
        style={{  borderBottomRightRadius:25,padding: 10, paddingTop:5, marginLeft:3, alignSelf:"center", marginTop:10, width:320, height:30}}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
            alignSelf:"center"
          }}>
         Reserva {status}
        </Text>
      </LinearGradient>
            </View>
          )
          } 
          </View>     
      </View>
    </TouchableOpacity>
  );
}
function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loaderRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text></Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 80,
    marginBottom: 10,
    alignItems: "center",
  },
  textNoReservations: {
    fontSize:20,
    //width: 40,
  },
  viewRestaurants: {
    width: 321,
    height: 145,
    marginTop: 20,
    marginLeft: 40,
    borderBottomRightRadius:37,
    borderTopRightRadius: 20,
    padding: 35,
    backgroundColor: "#FFF6F6",
  },
  viewContainerStateAcepted: {
    width: 318,
    height: 15,
    marginTop: -73,
    marginLeft: -35,
    borderRadius: 10,
    padding: 15,
    //backgroundColor: "#ED923D",
  },
  viewContainerRejected: {
    width: 318,
    height: 15,
    marginTop: -73,
    marginLeft: -35,
    borderRadius: 10,
    padding: 15,
    //backgroundColor: "#ED923D",
  },
  viewContainerPending: {
    width: 318,
    height: 15,
    marginTop: -73,
    marginLeft: -35,
    borderRadius: 10,
    padding: 15,
    //backgroundColor: "#ED923D",
  },
  viewContainerStateCanceled: {
    width: 318,
    height: 15,
    marginTop: -73,
    marginLeft: -35,
    borderRadius: 10,
    padding: 15,
    //backgroundColor: "#ED923D",
  },
  viewRestaurantsImage: {
    marginLeft: -34,
    marginTop: -17,
  },
  imageRestaurant: {
    width: "55%",
    height: "100%",
    borderTopRightRadius: 10,
  },
  textNameRestaurant: {
    width: 183,
    height: 25,
    marginLeft: 105,
    marginTop: -120,
    fontSize: 14,
    fontWeight: "bold",
  },
  textFecha: {
    width: 130,
    height: 35,
    marginLeft: 105,
    fontSize: 14,
  },
  textStatus: {
    width: 200,
    height: 30,
    marginLeft: 85,
    marginTop: -10,
    //textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  textStatus1: {
    width: 200,
    height: 30,
    marginLeft: 90,
    marginTop: -30,
    //textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  textStatus2: {
    width: 200,
    height: 30,
    marginLeft: 90,
    marginTop: -30,
    //textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  textStatus3: {
    width: 200,
    height: 30,
    marginLeft: 90,
    marginTop: -30,
    //textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "yellow",
  },
  containerTextName: {
    padding: 24,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  });
