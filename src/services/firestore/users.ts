import React from "react";
import { User, IPlayer, useAuthUser } from "../../helper";
import { firestore } from "../firebase";

export const useGetAllUserDocuments = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .onSnapshot(querySnapshot => {
        const allUsers: User[] = [];
        querySnapshot.forEach(doc => {
          const user = doc.data() as User;
          user.uid = doc.id;
          allUsers.push(user);
        });
        setUsers(allUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

export const useGetOnlineUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .where("online", "==", true)
      .onSnapshot(querySnapshot => {
        const allUsers: User[] = [];
        querySnapshot.forEach(doc => {
          const user = doc.data() as User;
          user.uid = doc.id;
          allUsers.push(user);
        });
        setUsers(allUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

export const useUserDocument = (uid: string) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        const userInfo = doc.data() as User;
        userInfo.uid = doc.id;
        setUser(userInfo);
      });
    return () => {
      unsubscribe();
    };
  }, [uid]);
  return user;
};

export const useAuthPlayer = () => {
  const authUser = useAuthUser();
  const user = useUserDocument(authUser?.uid || "");
  const [player, setPlayer] = React.useState<IPlayer | undefined>(undefined);
  React.useEffect(() => {
    setPlayer({
      uid: user?.uid || "",
      isAdmin: user?.isAdmin || false,
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      gamesPlayed: user?.gamesPlayed || 0,
      online: user?.online || false,
      position: user?.position || 0,
      isBlind: true,
      wallet: {
        bought: user?.wallet.bought || 0,
        spent: user?.wallet.spent || 0,
        won: user?.wallet.won || 0
      }
    });

    return () => setPlayer(undefined);
  }, [user]);
  return player;
};

export const setUserOnlineStatusTrue = async (uid: string) => {
  try {
    await firestore.doc(`users/${uid}`).update({ online: true });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const setUserOnlineStatusFalse = async (uid: string) => {
  try {
    await firestore.doc(`users/${uid}`).update({ online: false });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const tipDealer = (amount: number = 50) => {
  const dealerRef = firestore.doc(`users/dealer`);
  try {
    firestore.runTransaction(t =>
      t.get(dealerRef).then(doc => {
        if (doc.exists) {
          const newWallet = (doc.data()?.wallet || 0) + amount;
          t.update(dealerRef, { wallet: newWallet });
        }
      })
    );
  } catch (error) {
    console.error("Error tipping dealer", error);
  }
};
