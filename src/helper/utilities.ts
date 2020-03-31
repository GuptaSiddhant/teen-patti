import { IPlayer } from "./typesDefs";

export const getDimInREM = (px: number) => px / 16 + "rem";

export const mergePlayers = (a1: IPlayer[], a2: IPlayer[]) => {
  a2.forEach(player2 => {
    if (!a1.some(player1 => player1.uid === player2.uid)) a1.push(player2);
  });
  return a1;
};

export const getTotalWallet = (player: IPlayer) =>
  player.wallet.won + player.wallet.spent + player.wallet.bought;

export const gameModes = {
  normal: "Normal",
  joker: "Joker",
  jokers: "2 Jokers",
  lowest: "Muflisi",
  two: "Assume",
  four: "Discard"
};

export type GameModeType = keyof typeof gameModes;
