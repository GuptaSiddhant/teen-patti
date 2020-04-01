import * as React from "react";
import styled from "@emotion/styled";

import { ReactComponent as GuptasiIcon } from "../assets/icons/guptasi.svg";
import { setPlayerBlindFalse } from "../services";
import {
  getDimInREM,
  getTotalWallet,
  useCurrentGame,
  IPlayer,
  IGame
} from "../helper";
import * as solver from "../helper/solver";

import { Card } from "./Card";
import { SeeCardsButton } from "./Buttons";

const playerComponentWidth = getDimInREM(80);

const getPlayerStatusBgColor = (status: IPlayer["status"] = "default") => {
  switch (status) {
    case "dealer":
      return "#B3248F";
    case "blind":
      return "#000000";
    default:
      return "#CCA700";
  }
};

const StyledPlayerOpponent = styled.div<IPlayer>`
  position: relative;
  width: ${playerComponentWidth};
  height: ${playerComponentWidth};

  background: url('${props => props.photoURL}');
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: -0.75rem;

  border-radius: 2.5rem;
  border: 0.125rem solid #ffffff;
  box-shadow: 0 0 1rem 0 #00000020;    

  cursor: pointer;

  .playerName {
    position: absolute;
    bottom: 0.875rem;
    left: -0.125rem;
    right: -0.125rem;
    height: 1rem;
    padding-top: 0.15rem;
    background: #fff;
    border-radius: 0.125rem;
    box-shadow: 0 0.25rem 0.5rem 0 #0004;

    text-align: center;
    font-weight: bold;
    font-size: 0.75rem;
    color: #2A2933;
    align-items: center;
  }
  
  .playerStatus {
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    right: 0;
    height: 1.25rem;
    padding-top: 0.15rem;

    background: ${props => getPlayerStatusBgColor(props.status)};
    
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0 0.25rem 0.5rem 0 #0004;
    /* clip-path: polygon(0 0, 10% 100%, 90% 100%, 100% 0); */
    /* clip-path: path('M36,82 L116,82 L111.515155,97.1363533 C111.011901,98.8348325 109.451429,100 107.679962,100 L44.3200379,100 C42.548571,100 40.9880985,98.8348325 40.4848454,97.1363533 L36,82 L36,82 Z'); */
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    color: #fff;
    text-align: center;

    svg {
      height: 0.75rem;
      width: 0.75rem;
    }
  }

  .cards {
    position: relative;
    display: flex;
    margin-left: -2rem;
    margin-right: -2rem;
    margin-top: -0.25rem;
    justify-content: space-evenly;

    .seeButton {
      position: absolute;
      top: 0.6rem;

    }
  }
`;

const getTopLeftPosition = (pos: number) => {
  // Pixel distance from inner border;
  switch (pos) {
    case 1:
      return [getDimInREM(150), getDimInREM(60)];
    case 2:
      return [getDimInREM(90), getDimInREM(-48)];
    case 3:
      return [getDimInREM(-18), getDimInREM(-48)];
    case 4:
      return [getDimInREM(-60), getDimInREM(80)];
    case 5:
      return [getDimInREM(-60), getDimInREM(320)];
    case 6:
      return [getDimInREM(-18), getDimInREM(450)];
    case 7:
      return [getDimInREM(90), getDimInREM(450)];
    case 8:
      return [getDimInREM(150), getDimInREM(340)];
    default:
      return ["100vh", "100vw"];
  }
};

const usePlayerStatus = (player: IPlayer): [IPlayer["status"], any] => {
  let playerStatus: IPlayer["status"] = player.status || "default";
  if (player.isBlind) playerStatus = "blind";

  const totalWallet = getTotalWallet(player);

  let statusContent = null;
  switch (playerStatus) {
    case "blind":
      statusContent = "BLIND";
      break;
    default:
      statusContent = (
        <>
          <GuptasiIcon /> {totalWallet}
        </>
      );
      break;
  }
  return [playerStatus, statusContent];
};

export const Opponent = ({
  player,
  position
}: {
  player: IPlayer;
  position: number;
}) => {
  const [status, statusContent] = usePlayerStatus(player);

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    top: getTopLeftPosition(position)[0],
    left: getTopLeftPosition(position)[1]
  };

  return (
    <div style={positionStyle}>
      <StyledPlayerOpponent {...player} status={status}>
        <div className="playerStatus">{statusContent}</div>
        <div className="playerName">{player.displayName.split(" ")[0]}</div>
      </StyledPlayerOpponent>
    </div>
  );
};

export const Dealer = () => {
  const dealer: IPlayer = {
    displayName: "Dealer",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/g9teenpatti.appspot.com/o/images%2Fdealer.jpg?alt=media&token=241024d4-915c-4070-87cd-62bda116b48c",
    status: "dealer"
  } as IPlayer;

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    top: getDimInREM(-60),
    left: getDimInREM(200)
  };
  return (
    <div style={positionStyle}>
      <StyledPlayerOpponent {...dealer}>
        <div className="playerStatus">
          Tip <GuptasiIcon /> 50
        </div>
        <div className="playerName">{dealer.displayName.split(" ")[0]}</div>
      </StyledPlayerOpponent>
    </div>
  );
};

const solveCardsScore = (game: IGame, player: IPlayer) => {
  const gameMode = game.mode;
  const playerCards = game.players.find(
    gamePlayer => gamePlayer.uid === player.uid
  )?.cards;
  const jokers = game.jokers;
  if (playerCards) {
    switch (gameMode) {
      case "normal":
        return solver.scoreHandsNormal(playerCards);
      case "two":
        return solver.scoreHandsTwo(playerCards);
      case "four":
        return solver.scoreHandsFour(playerCards);
      case "lowest":
        return solver.scoreHandsLowest(playerCards);
      case "joker":
      case "jokers":
        return solver.scoreHandsJokers(playerCards, jokers);
    }
  }
};

export const MainPlayer = (player: IPlayer) => {
  const currentGame = useCurrentGame();

  if (currentGame) {
    const positionStyle: React.CSSProperties = {
      position: "absolute",
      top: getDimInREM(150),
      left: getDimInREM(200)
    };
    const totalWallet = getTotalWallet(player);
    const cardScore = solveCardsScore(currentGame, player);
    const bestCardScoreName = player.isBlind ? "YOU" : cardScore?.name || "YOU";
    return (
      <div style={positionStyle}>
        <StyledPlayerOpponent {...player} photoURL="">
          <div className="cards">
            {player.cards?.map(card => (
              <Card
                key={card}
                number={card[0]}
                color={card[1]}
                isHidden={player.isBlind}
              />
            ))}

            {player.isBlind && (
              <div className="seeButton">
                <SeeCardsButton
                  onClick={() => setPlayerBlindFalse(currentGame, player)}
                />
              </div>
            )}
          </div>
          <div className="playerStatus">
            <GuptasiIcon /> {totalWallet}
          </div>
          <div className="playerName">{bestCardScoreName}</div>
        </StyledPlayerOpponent>
      </div>
    );
  }
  return null;
};
