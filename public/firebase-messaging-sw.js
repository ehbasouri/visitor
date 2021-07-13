// // // Give the service worker access to Firebase Messaging.
// // // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// // // Initialize the Firebase app in the service worker by passing in
// // // your app's Firebase config object.
// // // https://firebase.google.com/docs/web/setup#config-object
// // firebase.initializeApp({
// //     apiKey: "AIzaSyD5mqaRUECRufPdCBaS4UDvdAHLG4sna3o",
// //     authDomain: "manager-6f97d.firebaseapp.com",
// //     databaseURL: "https://manager-6f97d.firebaseio.com",
// //     projectId: "manager-6f97d",
// //     storageBucket: "manager-6f97d.appspot.com",
// //     messagingSenderId: "817996313820",
// //     appId: "1:817996313820:web:7b22ab82a469bffd6f7019",
// //     measurementId: "G-CNYGQQYYV6"
// // });

// // // Retrieve an instance of Firebase Messaging so that it can handle background
// // // messages.
// // const messaging = firebase.messaging();

// // importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
// // importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./Firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }

// firebase.initializeApp({
//     apiKey: "AIzaSyD5mqaRUECRufPdCBaS4UDvdAHLG4sna3o",
//     authDomain: "manager-6f97d.firebaseapp.com",
//     databaseURL: "https://manager-6f97d.firebaseio.com",
//     projectId: "manager-6f97d",
//     storageBucket: "manager-6f97d.appspot.com",
//     messagingSenderId: "817996313820",
//     appId: "1:817996313820:web:7b22ab82a469bffd6f7019",
//     measurementId: "G-CNYGQQYYV6"
//   })

// const initMessaging = firebase.messaging()

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
    apiKey: "AIzaSyD5mqaRUECRufPdCBaS4UDvdAHLG4sna3o",
    authDomain: "manager-6f97d.firebaseapp.com",
    databaseURL: "https://manager-6f97d.firebaseio.com",
    projectId: "manager-6f97d",
    storageBucket: "manager-6f97d.appspot.com",
    messagingSenderId: "817996313820",
    appId: "1:817996313820:web:7b22ab82a469bffd6f7019",
    measurementId: "G-CNYGQQYYV6"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();