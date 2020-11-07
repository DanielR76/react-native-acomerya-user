import React from 'react'
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

export default function CarouselImages(props) {
    const { arrayImages, height, widht } = props;

    const renderItem = ({ item }) => {
        return <Image style={{ height, widht }} source={{ uri: item }} />
    }
    return (
        <Carousel
            layout={"default"}
            data={arrayImages}
            sliderWidth={widht}
            itemWidth={widht}
            renderItem={renderItem}
        />
    )
}
