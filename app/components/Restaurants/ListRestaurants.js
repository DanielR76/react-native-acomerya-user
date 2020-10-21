import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
export default function ListRestaurants(props) {
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
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando Restaurantes</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, imagePath, nameRestaurant } = restaurant.item;
  //Array para pasar imagenes del restaurante
  const imageRestaurant = imagePath[0];

  const goRestaurant = () => {
    navigation.navigate("restaurant", {
      id,
      nameRestaurant,
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
          <View style={styles.containerTextName}>
            <Text style={styles.textRestaurant}>{nameRestaurant}</Text>
          </View>
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
        <Text> No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewRestaurants: {
    flexDirection: "row",
    borderRadius: 10,
  },
  viewRestaurantsImage: {
    marginLeft: 22,
  },
  imageRestaurant: {
    width: 370,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  textRestaurant: {
    width: 183,
    height: 25,
    marginLeft: 60,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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