import React from "react";

import { signInWithGoogle } from "./firebase";

import { generateUserDocument } from "./helper/firestore";
import useAuthUser from "./context/User";
import Game from "./pages/Game";

function App() {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const authUser = useAuthUser();

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      signInWithGoogle();
    }, 2000);

    if (authUser && !authUser.isAnonymous) {
      clearTimeout(timeout);
      generateUserDocument(authUser);
      setAuthenticated(true);
    }

    return () => clearTimeout(timeout);
  }, [authUser]);

  if (isAuthenticated) return <Game />;
  return (
    <div>
      Loading...
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
