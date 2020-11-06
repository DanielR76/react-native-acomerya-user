import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterFormRestaurant from "../../components/Account/RegisterFormRestaurant";

export default function RegisterRestaurant() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
                  source={require('../../../assets/icon/acomerya-logo-name.png')}
                  style={{width: 250, height: 250, marginLeft: 80,}}
       />
      <View style={styles.viewForm}>
        <RegisterFormRestaurant toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 151,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
