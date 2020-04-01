import { IPlayer } from "./typesDefs";
import { keyToString } from "./solver/cards";

export const getDimInREM = (px: number) => px / 16 + "rem";

export const mergePlayers = (a1: IPlayer[], a2: IPlayer[]) => {
  a2.forEach(player2 => {
    if (!a1.some(player1 => player1.uid === player2.uid)) a1.push(player2);
  });
  return a1;
};

export const getTotalWallet = (player: IPlayer) =>
  player.wallet.won + player.wallet.bought - player.wallet.spent;

export const gameModes = {
  normal: "Normal",
  joker: "Joker",
  jokers: "2 Jokers",
  lowest: "Muflisi",
  two: "Assume",
  four: "Discard"
};

export function getShuffledCards() {
  const newDeck = Array.from(new Array(52), (x, i) => i);
  const riffleShuffle = (deck: number[]) => {
    const cutDeckVariant = deck.length / 2 + Math.floor(Math.random() * 9) - 4;
    const leftHalf = deck.splice(0, cutDeckVariant);
    let leftCount = leftHalf.length;
    let rightCount = deck.length - Math.floor(Math.random() * 4);
    while (leftCount > 0) {
      const takeAmount = Math.floor(Math.random() * 4);
      deck.splice(rightCount, 0, ...leftHalf.splice(leftCount, takeAmount));
      leftCount -= takeAmount;
      rightCount = rightCount - Math.floor(Math.random() * 4) + takeAmount;
    }
    deck.splice(rightCount, 0, ...leftHalf);
  };
  for (let i = 0; i < 7; i++) riffleShuffle(newDeck);
  const shuffledCards: string[] = [];
  newDeck.forEach(i => {
    const weightMinusOne = i % 13;
    const color0To3 = Math.floor(i / 13);
    let color = "";
    switch (color0To3) {
      case 0:
        color = "s";
        break;
      case 1:
        color = "d";
        break;
      case 2:
        color = "h";
        break;
      case 3:
        color = "c";
        break;
    }
    const weight = keyToString(weightMinusOne + 1);
    shuffledCards.push(`${weight}${color}`);
  });
  return shuffledCards;
}