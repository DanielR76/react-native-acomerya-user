import React, { Component } from "react";
import { View, Text } from "react-native";

export default class TopRestaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Cart food</Text>

            </View>
        );
    }
}