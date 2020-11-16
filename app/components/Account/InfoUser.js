import React from "react";
import { StyleSheet, View, Text } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { Avatar } from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons'

export default function InfoUser(props) {
  const {
    userInfo: {email},
  } = props;

  return (
    <View style={styles.viewUserInfo}>
      <View>
    
      <Avatar.Image size={150}  color= "white" source={require('../../../assets/icon/Profile.jpg')} />
      <View>
        <Text style={styles.containerEmail}>{email ? email : "Social Login"}</Text>
        </View>
        <MaterialIcons name="email" size={24} color="black" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  containerEmail: {
    marginTop: 40,
    fontSize:18,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
