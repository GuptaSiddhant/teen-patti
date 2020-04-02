import { IPlayer, IGame, GameModeType } from "../../helper/typesDefs";
import {
  mergePlayers,
  getTotalWallet,
  getShuffledCards
} from "../../helper/utilities";
import { firestore } from "../firebase";
import { tipDealer } from "./users";

export const createNewGame = async (player: IPlayer) => {
  const doesHostHasBootMoney = getTotalWallet(player) > 100;
  const newGame: IGame = {
    uid: "",
    isActive: true,
    isStarted: false,
    pot: 0,
    currentChaal: 50,
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
  try {
    await firestore
      .collection("games")
      .doc()
      .set(newGame);
  } catch (error) {
    console.error("Error creating a new game", error);
  }
};

export const setSelectedGameMode = async (
  game: IGame,
  modeId: GameModeType
) => {
  const deck = getShuffledCards();

  const newPlayers = game.players.map(player => {
    const cards: string[] = [];
    // Push 2 cards for every game
    cards.push(deck.shift() || "");
    cards.push(deck.shift() || "");

    // Push 3rd if mode in not two (Assume)
    if (game.mode !== "two") cards.push(deck.shift() || "");

    // Push 4th only if mode in four (discard)
    if (game.mode === "four") cards.push(deck.shift() || "");

    return {
      ...player,
      cards
    };
  });

  const jokers: string[] = [];
  if (modeId === "joker") jokers.push("9c");
  if (modeId === "jokers") {
    jokers.push(deck.shift() || "");
    jokers.push(deck.shift() || "");
  }

  try {
    await firestore
      .doc(`games/${game.uid}`)
      .update({ mode: modeId, isStarted: true, jokers, players: newPlayers });
  } catch (error) {
    console.error("Error setting user online status: true", error);
  }
};

export const finishGame = async (game: IGame, winners: IPlayer[]) => {
  /**
   * Finish a game,
   * if n-1 users pack
   * if show is called
   * if pot reaches max limit,
   *
   */
  game.winners = winners;
  game.isActive = false;
  game.isStarted = false;

  // Assign pot to winners
  if (winners.length === 1) {
    const winner = winners[0];
    const winningPlayer = game.players.find(
      player => player.uid === winner.uid
    );
    if (winningPlayer) winningPlayer.wallet.won += game.pot;
  } else {
    const winnerCount = winners.length;
    game.players.forEach(player => {
      const playerWon = winners.some(winner => winner.uid === player.uid);
      if (playerWon) player.wallet.won += game.pot / winnerCount;
    });
  }

  game.actions.push({
    type: "end",
    value: "Game over",
    originPlayer: { uid: winners[0].uid, name: winners[0].displayName }
  });

  try {
    await firestore
      .collection("games")
      .doc(game.uid)
      .update(game);
  } catch (error) {
    console.error("Game could not be finished", error);
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

export const setPlayerBlindFalse = async (game: IGame, player: IPlayer) => {
  const newPlayers = game.players.map(gamePlayer => ({
    ...gamePlayer,
    isBlind: gamePlayer.uid === player.uid ? false : gamePlayer.isBlind
  }));
  try {
    await firestore.doc(`games/${game.uid}`).update({ players: newPlayers });
  } catch (error) {
    console.error("Error setting player blind: false", error);
  }
};

export const tipTheDealerAsGift = (game: IGame, player: IPlayer) => {
  const gamePlayers = game.players;
  gamePlayers.forEach(gamePlayer => {
    if (player.uid === gamePlayer.uid) {
      if (getTotalWallet(gamePlayer) > 50) {
        tipDealer();
        const gameRef = firestore.collection("games").doc(game.uid);
        const wallet = gamePlayer.wallet;
        wallet.spent += 50;
        gameRef.update({ wallet });
      }
    }
  });
};
