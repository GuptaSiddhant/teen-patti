import React from "react";
import { Router } from "@reach/router";
import "./App.css";

import SignIn from "../components/SignIn";
import Profile from "../components/Profile";

import useUser from "../context/User";

// const SignIn = (props: RouteComponentProps) => {
//   const uiConfig = {
//     // Popup sign in flow rather than redirect flow.
//     signInFlow: "popup",
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: "/home",
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
//   };
//   return (
//     <div>
//       <h1>G9 Teen Patti</h1>
//       <p>Please sign-in:</p>
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//     </div>
//   );
// };

function App() {
  const user = useUser();
  return user ? (
    <Profile />
  ) : (
    <Router>
      <SignIn path="/" />
    </Router>
  );
}

export default App;
