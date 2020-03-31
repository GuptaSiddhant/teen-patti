import * as React from "react";
import styled from "@emotion/styled";
import logo from "../assets/images/logo.png";
import {
  useAuthPlayer,
  createNewGame,
  setSelectedGameMode,
  joinTheGame
} from "../helper/firestore";
import useCurrentGame from "../context/CurrentGame";
import { IconButton, SimpleButton, GetMoreButton } from "../components/Button";
import { IGame } from "../helper/typesDefs";
import { getDimInREM, gameModes, getTotalWallet } from "../helper/utilities";

const StyledWelcomeCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 360px;
  background: #fff;
  text-align: center;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f2;
  color: #cca700;
  font-size: 32px;
  .logo {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    div {
      text-align: left;
      margin-left: 20px;
      span {
        font-size: 56px;
      }
    }
    img {
      height: 100px;
    }
  }
  button {
    font: inherit;
    border-radius: 5px;
    padding: 0 10px;
    border: 1px solid #ccc;
    box-shadow: none;
    user-select: auto;
    font-size: 20px;
    width: 280px;
    height: 40px;
    cursor: pointer;
    background: #cca700;
    color: #ffffff;
  }
  span {
    font-size: 16px;
  }
`;

const StyledLobby = styled(StyledWelcomeCard)<IGame>`
  width: ${getDimInREM(500)};
  height: ${getDimInREM(320)};
  font-size: ${getDimInREM(16)};
  border-radius: 1rem;

  .onlinePlayers {
    background: #f2f2f7;
    width: 100%;
    border-radius: 0.5rem;
    margin-top: ${getDimInREM(16)};
    margin-bottom: ${getDimInREM(16)};
    height: ${getDimInREM(100)};
    padding: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(${props => props.players.length}, 1fr);
    overflow-x: auto;

    .player {
      display: flex;
      background: #ffffff;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      width: 5rem;
      box-shadow: ${getDimInREM(2)} ${getDimInREM(2)} ${getDimInREM(4)} 0
          #00000040,
        ${getDimInREM(-2)} ${getDimInREM(-2)} ${getDimInREM(4)} 0 #fff;
      padding: 0.5rem;
      align-items: flex-end;
      color: #ffffff;
      text-shadow: 0 0 0.25rem #000;
    }
  }

  .gameModes {
    display: grid;
    gap: 0.5rem;
    justify-content: space-evenly;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1rem;
  }

  .joinGame {
    margin-top: 2rem;
    display: grid;
    justify-content: center;
  }
`;

export const Lobby = () => {
  const player = useAuthPlayer();
  const currentGame = useCurrentGame();
  //   const onlineUsers = useGetOnlineUsers();
  console.log("render lobby", currentGame);
  if (player) {
    const isAdmin = player.isAdmin;

    /** If no currentGame,
     * show admin option to create one
     * show user option to request admin / wait for admin
     */
    if (!currentGame) {
      return (
        <div style={{ position: "relative" }}>
          <IconButton type="info" />
          <IconButton type="profile" />
          <StyledWelcomeCard>
            Welcome to
            <div className="logo">
              <img alt="G9 Teen Patti" src={logo} />
              <div>
                <span>G9</span>
                <br />
                Teen Patti
              </div>
            </div>
            {isAdmin ? (
              <button onClick={() => createNewGame(player)}>
                Create New Game
              </button>
            ) : (
              <span>Request your game host to create a game.</span>
            )}
          </StyledWelcomeCard>
        </div>
      );
    }

    /**
     * If currentGame && is not started,
     * show admin to select a mode and start game
     * show users option to join game and which mode admin has selected
     * show both the current joined users
     */
    const joinedPlayers = currentGame.players;
    const isGameJoined = currentGame.players.some(
      joinedPlayer => joinedPlayer.uid === player.uid
    );
    const enoughMoneyToBoot = getTotalWallet(player) > 100;

    return (
      <div style={{ position: "relative" }}>
        <IconButton type="info" />
        <IconButton type="profile" />
        <StyledLobby {...currentGame}>
          A new game is created and these players have joined (
          {joinedPlayers.length}).
          <div className="onlinePlayers">
            {joinedPlayers.length > 0
              ? joinedPlayers.map(player => (
                  <div
                    key={player.uid}
                    className="player"
                    style={{ backgroundImage: `url(${player.photoURL})` }}
                  >
                    {player.displayName}
                  </div>
                ))
              : "No players have joined yet"}
          </div>
          {isAdmin ? (
            <>
              <div>
                Choose a game Mode to start the game.
                <div className="gameModes">
                  {Object.entries(gameModes).map(mode => (
                    <SimpleButton
                      key={mode[0]}
                      text={mode[1]}
                      onClick={() =>
                        setSelectedGameMode(currentGame.uid, mode[0])
                      }
                    />
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: '-3rem' }}>
                <GetMoreButton />
              </div>
            </>
          ) : enoughMoneyToBoot ? (
            <div>
              Click the join button to join the game.
              <div className="joinGame">
                {isGameJoined ? (
                  "Game joined"
                ) : (
                  <SimpleButton
                    text={"Join the game"}
                    onClick={() => joinTheGame(currentGame, player)}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              You don't have enough Guptasi to play. Buy some by clicking the
              button.
              <div className="joinGame">
                <GetMoreButton />
              </div>
            </div>
          )}
        </StyledLobby>
      </div>
    );
  } else return null;
};

export default Lobby;
