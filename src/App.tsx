import React from "react";
import useAuthUser from "./context/User";
import { setUserOnlineStatusTrue } from "./helper/firestore";
import Game from "./pages/Game";
import SignIn from "./pages/SignIn";

function App() {
  const authUser = useAuthUser();
  if (authUser) {
    setUserOnlineStatusTrue(authUser.uid);
    return <Game />;
  }
  return <SignIn />;
}

export default App;
