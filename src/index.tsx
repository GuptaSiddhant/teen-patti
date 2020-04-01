import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./services/firebase";
import * as serviceWorker from "./serviceWorker";
import { CurrentGameProvider, UserProvider } from "./helper";

ReactDOM.render(
  <React.StrictMode>
    <CurrentGameProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CurrentGameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// const root = document.getElementById("root") as HTMLElement;
// ReactDOM.createRoot(root).render(
//   <FirebaseAppProvider firebaseConfig={firebaseConfig}>
//     <App />
//   </FirebaseAppProvider>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
