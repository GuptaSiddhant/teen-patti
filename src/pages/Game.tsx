import * as React from "react";
import styled from "@emotion/styled";

import useAuthUser from "../context/User";
import { Player, User } from "../helper/typesDefs";

import { Table } from "../components/Table";
import { IconButton, GameButtonGroup } from "../components/Button";

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

const StyledGame = styled.div`
  position: relative;
`;

export const Game = () => {
  const authUser = useAuthUser();
  if (authUser) {
    const player: Player = getUserFromFirebaseUser(authUser);
    player.cards = ["As", "Kc", "5d"];
    const opponents: Player[] = Array(8).fill(
      getUserFromFirebaseUser(authUser)
    );
    return (
      <StyledGame>
        <IconButton type="info" />
        <IconButton type="profile" />
        <Table
          player={player}
          opponents={opponents}
          pot={4000}
          mode="Jokers"
          jokers={["9S", "5H"]}
        />
        <GameButtonGroup />
      </StyledGame>
    );
  } else return null;
};

export default Game;
