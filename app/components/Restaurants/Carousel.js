import React from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { ScrollView, View, Text, StyleSheet } from "react-native";
export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;

  const renderItem = ({ item, index }) => {
    return (
      <ScrollView>
         <Text style={styles.textPagination}>{""}</Text>
        <Image style={{ width, height }} source={{ uri: item.imagePath }} />
        <View style={styles.containerNameRestaurant}>
         <Text style={styles.textPagination}>{""}</Text>
         <Text style={styles.textNameRestaurant}>{item.dishName}</Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <Carousel
      layout={"default"}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  textNameRestaurant: {
    width: 350,
    height: 25,
    marginLeft: 10,
    marginTop:-25,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "normal",
    fontWeight: "bold",
  },
  textPagination: {
    marginLeft: 45,
    fontWeight: "bold",
    color: "#ED923D",
    fontSize:25,
  },
  containerNameRestaurant: {
    padding: 18,
  },
});
