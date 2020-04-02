import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const firestore = admin.firestore();
// const auth = admin.auth();

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
        online: false,
        position: 0,
        wallet: {
          bought: 0,
          won: 0,
          spent: 0
        }
      });
    }
  });
});

export const updateUserWhenGameEnds = functions.firestore
  .document("games/{gameId}")
  .onUpdate(change => {
    const newValue = change.after.data();
    const prevValue = change.before.data();
    if (prevValue && newValue) {
      if (!newValue.isActive && prevValue.isActive) {
        let batch = firestore.batch();
        const players = newValue.players;
        players.forEach((player: any) => {
          const userRef = firestore.collection("users").doc(player.uid);
          batch.update(userRef, { wallet: player.wallet });
        });
        batch.commit().then(val => console.log("Batch write", val));
      }
    }
    return null;
  });

export const reviewGuptasiRequest = functions.firestore
  .document(`guptasi/{requestId}`)
  .onUpdate(change => {
    const newValue = change.after.data();
    const prevValue = change.before.data();
    if (prevValue && newValue) {
      if (newValue.reviewed && !prevValue.reviewed) {
        const userId: string = newValue.user.uid;
        const amount: number = newValue.amount;
        const approved: boolean = newValue.approved;
        if (approved) {
          // Update user doc
          const userRef = firestore.collection("users").doc(userId);
          firestore.runTransaction(t => {
            return t.get(userRef).then(doc => {
              if (doc.exists) {
                const oldWallet = doc.data()?.wallet;
                const newBoughtAmount = (oldWallet.bought || 0) + amount;
                const newWallet = { ...oldWallet, bought: newBoughtAmount };
                t.update(userRef, { wallet: newWallet });
              } else return;
            });
          });

          // Update current active game - player
          const gamesRef = firestore
            .collection("games")
            .where("isActive", "==", true);
          gamesRef.get().then(snapshot => {
            if (!snapshot.empty) {
              snapshot.forEach(doc => {
                const gameId = doc.id;
                const gameRef = firestore.collection("games").doc(gameId);
                firestore.runTransaction(t => {
                  return t.get(gameRef).then(gameDoc => {
                    const game = gameDoc.data();
                    const players: any[] = game?.players || [];
                    const newPlayers = players.map((player: any) => {
                      if (player.uid === userId) {
                        const currentBoughtAmount = player.wallet.bought;
                        const newBoughtAmount = currentBoughtAmount + amount;
                        const newWallet = {
                          ...player.wallet,
                          bought: newBoughtAmount
                        };
                        return { ...player, wallet: newWallet };
                      } else return player;
                    });
                    t.update(gameRef, { players: newPlayers });
                  });
                });
              });
            } else return;
          });
        }
      }
    }
  });
