import React from "react";
import useAuthUser from "./context/User";
import useCurrentGame from "./context/CurrentGame";
import { setUserOnlineStatusTrue } from "./helper/firestore";
import Game from "./pages/Game";
import SignIn from "./pages/SignIn";
import Lobby from "./pages/Lobby";

function App() {
  const authUser = useAuthUser();
  const currentGame = useCurrentGame();
  if (authUser) {
    setUserOnlineStatusTrue(authUser.uid);
    if (currentGame && currentGame.isStarted)
      return <Game game={currentGame} />;
    return <Lobby />;
  }
  return <SignIn />;
}

export default App;
