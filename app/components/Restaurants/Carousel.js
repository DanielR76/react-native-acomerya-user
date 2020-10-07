import React from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { ScrollView, View, Text, StyleSheet } from "react-native";
export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;

  const renderItem = ({ item, index }) => {
    return (
      <ScrollView>
        <Image style={{ width, height }} source={{ uri: item.imagePath }} />
        <View style={styles.containerNameRestaurant}>
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
    width: 183,
    height: 25,
    marginLeft: 95,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
  },
  containerNameRestaurant: {
    padding: 18,
  },
});
