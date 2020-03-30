import * as React from "react";
import styled from "@emotion/styled";

import useAuthUser from "../context/User";
import { Player } from "../helper/typesDefs";
import { getUserDocument } from "../helper/firestore";

import { Table } from "../components/Table";
import { IconButton, GameButtonGroup } from "../components/Button";

const useAuthPlayer = () => {
  const authUser = useAuthUser();
  const [player, setPlayer] = React.useState<Player | undefined>(undefined);
  if (authUser) {
    const uid = authUser.uid;
    getUserDocument(uid).then(user =>
      setPlayer({
        uid: uid,
        isAdmin: false,
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
        gamesPlayed: 0,
        wallet: {
          bought: 0,
          earned: 0
        }
      })
    );
  }

  return player;
};

const StyledGame = styled.div`
  position: relative;
`;

export const Game = () => {
  const player = useAuthPlayer();
  if (player) {
    player.cards = ["As", "Kc", "5d"];
    const opponents: Player[] = Array(8).fill(player);
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
