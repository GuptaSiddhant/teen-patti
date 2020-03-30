import React from "react";
import useAuthUser from "./context/User";
import Game from "./pages/Game";
import SignIn from "./pages/SignIn";

function App() {
  const authUser = useAuthUser();
  if (authUser) {
    return <Game />;
  }
  return <SignIn />;
}

export default App;
