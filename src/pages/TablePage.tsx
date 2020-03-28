import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import useAuthUser from "../context/User";
import { PlayerOpponent } from "../components/PlayerOpponent";
import { Player, User } from "../helper/typesDefs";

const getUserFromFirebaseUser = (authUser: firebase.User): User => ({
  uid: authUser.uid,
  isAdmin: false,
  displayName: authUser.displayName || "",
  email: authUser.email || "",
  photoURL: authUser.photoURL || "",
  gamesPlayed: 0,
  wallet: {
    bought: 0,
    earned: 0
  }
});

export const TablePage = (props: RouteComponentProps) => {
  const authUser = useAuthUser();
  if (authUser) {
    const player: Player = getUserFromFirebaseUser(authUser);
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
        <PlayerOpponent {...player} />
      </div>
    );
  } else return null;
};

export default TablePage;
