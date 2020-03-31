import React from "react";
import { useAuthUser } from "../context/User";
import { firestore } from "../firebase";
import { User, IPlayer, IGame } from "./typesDefs";
import { mergePlayers, getTotalWallet } from "./utilities";

export const useGetAllUserDocuments = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .onSnapshot(querySnapshot => {
        const allUsers: User[] = [];
        querySnapshot.forEach(doc => {
          const user = doc.data() as User;
          user.uid = doc.id;
          allUsers.push(user);
        });
        setUsers(allUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

export const useGetOnlineUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .where("online", "==", true)
      .onSnapshot(querySnapshot => {
        const allUsers: User[] = [];
        querySnapshot.forEach(doc => {
          const user = doc.data() as User;
          user.uid = doc.id;
          allUsers.push(user);
        });
        setUsers(allUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

export const createNewGame = (player: IPlayer) => {
  const doesHostHasBootMoney = getTotalWallet(player) > 100;
  const newGame: IGame = {
    uid: "",
    isActive: true,
    isStarted: false,
    pot: 0,
    mode: "normal",
    jokers: [],
    message: "New game created",
    players: doesHostHasBootMoney ? [player] : [],
    actions: [
      {
        type: "create",
        value: "new game",
        originPlayer: { uid: player.uid, name: player.displayName }
      }
    ],
    winners: []
  };
  firestore
    .collection("games")
    .doc()
    .set(newGame);
};

export const setSelectedGameMode = async (gameId: string, modeId: string) => {
  try {
    await firestore
      .doc(`games/${gameId}`)
      .update({ mode: modeId, isStarted: true });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const joinTheGame = async (game: IGame, player: IPlayer) => {
  const players = mergePlayers(game.players, [player]);
  try {
    await firestore.doc(`games/${game.uid}`).update({
      players
    });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const getUserDocument = async (
  uid: string
): Promise<User | undefined> => {
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    const userInfo = userDocument.data() as User;
    return {
      ...userInfo,
      uid
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const useAuthPlayer = () => {
  const authUser = useAuthUser();
  const [player, setPlayer] = React.useState<IPlayer | undefined>(undefined);
  React.useEffect(() => {
    if (authUser) {
      const uid = authUser.uid;
      getUserDocument(uid).then(user =>
        setPlayer({
          uid: uid,
          isAdmin: user?.isAdmin || false,
          displayName: user?.displayName || "",
          email: user?.email || "",
          photoURL: user?.photoURL || "",
          gamesPlayed: user?.gamesPlayed || 0,
          online: user?.online || false,
          position: user?.position || 0,
          isBlind: true,
          wallet: {
            bought: user?.wallet.bought || 0,
            spent: user?.wallet.spent || 0,
            won: user?.wallet.won || 0
          }
        })
      );
    }
  }, [authUser]);
  return player;
};

export const setUserOnlineStatusTrue = async (uid: string) => {
  try {
    await firestore.doc(`users/${uid}`).update({ online: true });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const setUserOnlineStatusFalse = async (uid: string) => {
  try {
    await firestore.doc(`users/${uid}`).update({ online: false });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const setPlayerBlindFalse = async (game: IGame, player: IPlayer) => {
  const newPlayers = game.players.map(gamePlayer => {
    if (gamePlayer.uid === player.uid) return { ...player, isBlind: false };
    else return player;
  });
  try {
    await firestore.doc(`games/${game.uid}`).update({ players: newPlayers });
  } catch (error) {
    console.error("Error setting player blind: false", error);
  }
};
