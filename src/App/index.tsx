import React from "react";
import { Router } from "@reach/router";
import "./App.css";

import SignIn from "../pages/SignIn";
import TablePage from "../pages/TablePage";
import ProfilePage from "../pages/ProfilePage";

import useAuthUser from "../context/User";
import { generateUserDocument } from "../helper/firestore";

function App() {
  const authUser = useAuthUser();
  // if (!authUser) {
  //   return <div>Loading...</div>;
  // }
  if (!authUser) return <SignIn />;
  else generateUserDocument(authUser);
  return (
    <Router>
      <TablePage path="/" />
      <ProfilePage path="profile" />
    </Router>
  );
}

export default App;
