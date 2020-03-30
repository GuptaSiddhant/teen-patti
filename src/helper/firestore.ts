import React from "react";
import { firestore } from "../firebase";
import { User } from "./typesDefs";

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
