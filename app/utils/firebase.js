import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDu_WflKM1aqYjIAV3Z_CuC7P810MspvFY",
    authDomain: "acomerya-native.firebaseapp.com",
    databaseURL: "https://acomerya-native.firebaseio.com",
    projectId: "acomerya-native",
    storageBucket: "acomerya-native.appspot.com",
    messagingSenderId: "861205142453",
    appId: "1:861205142453:web:90b7615e8ba3793613d7fc",
};

export const firebApp = firebase.initializeApp(firebaseConfig);