import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   auth.signInWithPopup(provider);
// };
