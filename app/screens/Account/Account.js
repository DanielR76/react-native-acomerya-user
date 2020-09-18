import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from 'firebase/app';
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading"

export default function Account() {

    const [Login, setLogin] = useState(null)

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true)
        });
    }, []);

    if (Login === null) return <Loading isVisible={true} text="Cargando..." />
    return Login ? <UserLogged /> : <UserGuest />
}