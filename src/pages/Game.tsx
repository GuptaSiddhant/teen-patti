import * as React from "react";

// import { IPlayer } from "../helper/typesDefs";
import { useAuthPlayer, useGetOnlineUsers } from "../helper/firestore";

import { Table } from "../components/Table";
import { IconButton, GameButtonGroup } from "../components/Button";
import { IPlayer, User } from "../helper/typesDefs";

const useOpponents = (
  allUsers: User[],
  player: IPlayer | undefined
): IPlayer[] => {  
  const [allPlayers, setAllPlayers] = React.useState<IPlayer[]>([]);
  React.useEffect(() => {
    if (player) {
      const playerPosition = player.position;
      setAllPlayers(
        allUsers
          .filter(user => user.uid !== player.uid)
          .map(user => ({
            ...user,
            position:
              user.position > playerPosition
                ? user.position - playerPosition
                : user.position - playerPosition + 9
          }))
      );
    } else setAllPlayers(allUsers);
  }, [allUsers, player]);
  return allPlayers;
};

export const Game = () => {
  const player = useAuthPlayer();
  const allUsers = useGetOnlineUsers();
  const opponents = useOpponents(allUsers, player);
  console.count('render game')
  if (player) {
    player.cards = ["As", "Kc", "5d"];
    return (
      <div style={{ position: "relative" }}>
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
      </div>
    );
  } else return null;
};

export default Game;
