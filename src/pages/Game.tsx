import * as React from "react";
import { useAuthPlayer } from "../services";
import { Table } from "../components";
import { IconButton, GameButtonGroup } from "../components/Buttons";
import { IPlayer, User, IGame } from "../helper/typesDefs";

const useOpponents = (
  allUsers: User[],
  player: IPlayer | undefined
): IPlayer[] => {
  const [opponents, setOpponents] = React.useState<IPlayer[]>([]);
  React.useEffect(() => {
    if (player) {
      const playerPosition = player.position;
      setOpponents(
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
    } else setOpponents(allUsers);
  }, [allUsers, player]);
  return opponents;
};

const useMainPlayer = (
  allUsers: User[],
  player: IPlayer | undefined
): IPlayer | undefined => {
  const [mainPlayer, setMainPlayer] = React.useState<IPlayer | undefined>();
  React.useEffect(() => {
    if (player) {
      setMainPlayer(allUsers.find(user => user.uid === player.uid));
    } else setMainPlayer(undefined);
  }, [allUsers, player]);
  return mainPlayer;
};

/**
 *
 * @todo After game finishes, update all user documents with new wallet
 */
export const Game = ({ game }: { game: IGame }) => {
  const player = useAuthPlayer();
  const opponents = useOpponents(game.players, player);
  const mainPlayer = useMainPlayer(game.players, player);
  if (player) {
    const isAdmin = player.isAdmin;
    const isPlaying = game.players.some(
      gamePlayer => gamePlayer.uid === mainPlayer?.uid
    );
    return (
      <div style={{ position: "relative" }}>
        <IconButton type="info" />
        <IconButton type="profile" />
        <IconButton type="refresh" />
        <IconButton type="guptasi" />
        {isAdmin && <IconButton type="review" />}
        <Table
          player={isPlaying ? mainPlayer : undefined}
          opponents={opponents}
          game={game}
        />
        <GameButtonGroup
          player={mainPlayer}
          isPlaying={isPlaying}
          game={game}
        />
      </div>
    );
  } else return null;
};

export default Game;
