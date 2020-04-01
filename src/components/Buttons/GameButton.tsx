import * as React from "react";
import styled from "@emotion/styled";

import { getDimInREM, IPlayer, IGame } from "../../helper";
import { ReactComponent as GuptasiIcon } from "../../assets/icons/guptasi.svg";

import { StyleButton } from "./Base";

const StyledGameButton = styled(StyleButton)`
  height: ${getDimInREM(32)};
  width: ${getDimInREM(100)};
  padding: ${getDimInREM(8)};

  svg {
    height: 0.7rem;
  }
`;

const PlayButton = ({ isBlind }: { isBlind: boolean }) => {
  const style: React.CSSProperties = {
    color: "#1b6700",
    width: getDimInREM(120)
  };
  return (
    <StyledGameButton style={style}>
      {isBlind ? "BLIND" : "CHAAL"} <GuptasiIcon /> 200
    </StyledGameButton>
  );
};

const PackButton = () => {
  const style: React.CSSProperties = { color: "#880000" };
  return <StyledGameButton style={style}>PACK</StyledGameButton>;
};

const RaiseButton = () => {
  const style: React.CSSProperties = { color: "#000080" };
  return (
    <StyledGameButton style={style}>
      RAISE <GuptasiIcon /> 400
    </StyledGameButton>
  );
};

const ShowButton = ({
  mainPlayer,
  game
}: {
  mainPlayer: IPlayer;
  game: IGame;
}) => {
  const style: React.CSSProperties = { color: "#3B0067" };

  const nonPackedPlayers = game.players.filter(player =>
    player.isPacked ? false : true
  );
  const nonPackedPlayersCount = nonPackedPlayers.length;

  const isAnyPlayerBlind = nonPackedPlayers.some(player =>
    player.isBlind ? true : false
  );

  const currentPlayerIndex = nonPackedPlayers.findIndex(
    player => player.uid === mainPlayer.uid
  );
  const prevPlayerIndex =
    currentPlayerIndex === 0
      ? nonPackedPlayers.length - 1
      : currentPlayerIndex - 1;
  const prevPlayer = nonPackedPlayers[prevPlayerIndex];
  const isPrevPlayerBlind = prevPlayer?.isBlind ? true : false;

  if (nonPackedPlayersCount === 2) {
    if (isPrevPlayerBlind) return null;
    return <StyledGameButton style={style}>SIDE SHOW</StyledGameButton>;
  } else {
    if (isAnyPlayerBlind) return null;
    return <StyledGameButton style={style}>SHOW</StyledGameButton>;
  }
};

export const SimpleButton = ({
  text,
  onClick
}: {
  text: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const style: React.CSSProperties = { color: "#000" };
  return (
    <StyledGameButton style={style} onClick={onClick}>
      {text}
    </StyledGameButton>
  );
};

export const SeeCardsButton = ({
  onClick
}: {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const style: React.CSSProperties = { color: "#000" };
  return (
    <StyledGameButton style={style} onClick={onClick}>
      SEE CARDS
    </StyledGameButton>
  );
};

const StyledGameButtonGroup = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 1rem;
  right: 1rem;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 1rem;
`;

export const GameButtonGroup = ({
  player,
  isPlaying,
  game
}: {
  player?: IPlayer;
  isPlaying: boolean;
  game: IGame;
}) => {
  return (
    <StyledGameButtonGroup>
      {player && isPlaying && (
        <>
          <PackButton />
          <PlayButton isBlind={player.isBlind ? true : false} />
          <RaiseButton />
          <ShowButton game={game} mainPlayer={player} />
        </>
      )}
    </StyledGameButtonGroup>
  );
};
