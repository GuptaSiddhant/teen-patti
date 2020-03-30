import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const firestore = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

export const addNewUserToFirestore = functions.auth.user().onCreate(user => {
  const userRef = firestore.doc(`users/${user.uid}`);
  userRef.get().then(snapshot => {
    if (!snapshot.exists) {
      userRef.set({
        email: user.email,
        isAdmin: false,
        displayName: "Player",
        photoURL: "",
        gamesPlayed: 0,
        wallet: {
          bought: 0,
          earned: 0
        }
      });
    }
  });
});

export const startNewGame = functions.firestore
  .document("games/{gameId}")
  .onUpdate(change => {
    const newValue = change.after.data();
    const prevValue = change.before.data();
    if (prevValue && newValue) {
      if (!newValue.isActive && prevValue.isActive) {
        const winners = prevValue.winners;
        firestore
          .collection("games")
          .doc()
          .set({
            isActive: true,
            pot: 0,
            mode: "normal",
            message: "",
            players: [],
            actions: [],
            winner: [],
            startsWith: winners[0]
          });
      }
    }
    return null;
  });
