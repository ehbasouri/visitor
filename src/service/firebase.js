import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5mqaRUECRufPdCBaS4UDvdAHLG4sna3o",
    authDomain: "manager-6f97d.firebaseapp.com",
    databaseURL: "https://manager-6f97d.firebaseio.com",
    projectId: "manager-6f97d",
    storageBucket: "manager-6f97d.appspot.com",
    messagingSenderId: "817996313820",
    appId: "1:817996313820:web:7b22ab82a469bffd6f7019",
    measurementId: "G-CNYGQQYYV6"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAnalytics = firebase.analytics()

