import React from "react";
import { useAuthUser } from "../context/User";
import { firestore } from "../firebase";
import { User, IPlayer } from "./typesDefs";

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

export const getUserDocument = async (
  uid: string
): Promise<User | undefined> => {
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    const userInfo = userDocument.data() as User;
    return {
      uid,
      ...userInfo
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const useAuthPlayer = () => {  
  const authUser = useAuthUser();
  const [player, setPlayer] = React.useState<IPlayer | undefined>(undefined);
  React.useEffect(() => {
    if (authUser) {
      const uid = authUser.uid;
      getUserDocument(uid).then(user =>
        setPlayer({
          uid: uid,
          isAdmin: false,
          displayName: user?.displayName || "",
          email: user?.email || "",
          photoURL: user?.photoURL || "",
          gamesPlayed: 0,
          wallet: {
            bought: 0,
            earned: 0
          },
          position: user?.position || 0
        })
      );
    }
  }, [authUser]);
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
