import React from "react";
import { auth } from "../firebase";
import useUser from "../context/User";
import {
  generateUserDocument,
  useGetAllUserDocuments
} from "../helper/firestore";

const Profile = () => {
  const authUser = useUser();
  const users = useGetAllUserDocuments();

  if (!authUser) return null;
  const { photoURL, displayName, email } = authUser;
  generateUserDocument(authUser);

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      {users.map(user => (
        <div key={user.id} style={{display: 'flex'}}>
          <img src={user.photoURL} alt={user.displayName} width="100" height="100"/>
          <div>
            <h1>{user.displayName}</h1>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
      <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
};
export default Profile;
