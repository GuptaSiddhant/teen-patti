import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { IGame } from "../helper/typesDefs";

const CurrentGameContext = createContext<IGame | undefined>(undefined);

export const CurrentGameProvider: React.FC = ({ children }) => {
  const [game, setGame] = useState<IGame | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firestore
      .collection("games")
      .where("isActive", "==", true)
      .onSnapshot(querySnapshot => {
        let newGame: IGame | undefined = undefined;
        querySnapshot.forEach(doc => {
          newGame = {
            ...doc.data(),
            uid: doc.id,
          } as IGame;
        });
        setGame(newGame);
      });
    return () => unsubscribe();
  }, []);

  return (
    <CurrentGameContext.Provider value={game}>
      {children}
    </CurrentGameContext.Provider>
  );
};

export const useCurrentGame = () => useContext(CurrentGameContext);

export default useCurrentGame;
