import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext<firebase.User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useAuthUser = () => useContext(UserContext);

export default useAuthUser;
