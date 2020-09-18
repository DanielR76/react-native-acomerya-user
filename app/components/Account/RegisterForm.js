import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Input, Icon, Button } from "react-native-elements"
import { validateEmail } from "../../utils/validations"
import { size, isEmpty } from "lodash"
import * as firebase from "firebase//app"
import { firebaseapp } from "../../utils/firebase"
import { useNavigation } from "@react-navigation/native"
import Loading from "../../components/Loading"

export default function RegisterForm(props) {
    const { toastRef } = props
    const [formData, setFormData] = useState(defaultFormValue())
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            toastRef.current.show("Todos los campos son obligatorios")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("El email no es correcto")
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas tienen que ser iguales")
        } else if (size(formData.password) < 6) {
            toastRef.current.show("La contraseña tiene que tener mas de  6 caracteres")
        } else {
            setLoading(false)
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    setLoading(false)
                    navigation.navigate("account")

                }).catch(() => {
                    setLoading(false)
                    toastRef.current.show("El email ya esta en uso")
                })
        }
    }
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    return (

        <View style={styles.formContainer}>
            <Input placeholder="Correo electronico"
                containerstyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Contraseña"
                containerstyle={styles.inputForm}
                onChange={(e) => onChange(e, "password")}
            //    password="true"
            //  SecureTextEntry="true"
            />
            <Input
                placeholder="Repetir contraseña"
                containerstyle={styles.inputForm}
                onChange={(e) => onChange(e, "repeatPassword")}
            // password="true"
            // SecureTextEntry="true"
            />
            <Button
                title="Unirse"
                containerstyle={styles.btnContainerStyles}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    )
}
function defaultFormValue() {

    return {
        email: "",
        password: "",
        repeatPassword: "",

    }

}
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },

    btnContainerStyles: {
        marginTop: 80,
        width: "80%",
    },
    btnRegister: {
        backgroundColor: "#ED923D",
    },
})