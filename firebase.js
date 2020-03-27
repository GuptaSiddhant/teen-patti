import firebase from "firebase";
var config = {
  /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyActKYUXcABBb__i7XmgMvVEKYR4euCcWM",
  authDomain: "g9teenpatti.firebaseapp.com",
  databaseURL: "https://g9teenpatti.firebaseio.com",
  projectId: "g9teenpatti",
  storageBucket: "g9teenpatti.appspot.com",
  messagingSenderId: "1001835871499",
  appId: "1:1001835871499:web:b7a40489ff72723855f60e",
  measurementId: "G-4GNRCKBR32"
};
var fire = firebase.initializeApp(config);
export default fire;
