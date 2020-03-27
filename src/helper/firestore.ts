import React from "react";
import * as firebase from "firebase/app";
import { firestore } from "../firebase";

export const generateUserDocument = async (
  user: firebase.User,
  additionalData: any = {}
) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const useGetAllUserDocuments = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .onSnapshot(querySnapshot => {
        const allUsers: User[] = [];
        querySnapshot.forEach(doc => {
          const user = doc.data() as User;
          user.id = doc.id;
          allUsers.push(user);
        });
        setUsers(allUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

export const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
