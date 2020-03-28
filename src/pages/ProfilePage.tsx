import React from "react";
import { RouteComponentProps } from "@reach/router";
import { auth } from "../firebase";

export const ProfilePage = (props: RouteComponentProps) => {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
};
export default ProfilePage;
