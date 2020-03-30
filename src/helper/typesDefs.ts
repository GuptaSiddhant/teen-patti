// import * as firebase from "firebase/app";

export interface User {
  uid: string;
  isAdmin: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  gamesPlayed: number;
  wallet: {
    bought: number;
    earned: number;
  };
}

export interface IPlayer extends User {
  status?: "default" | "dealer";
  cards?: string[];
}

export type Color = "s" | "h" | "c" | "d" | string;
export interface ICard {
  number: string;
  color: Color;
  isHidden?: boolean;
}

type GameMode = "normal" | "joker" | "jokers";
type GameActionType =
  | "join"
  | "boot"
  | "pack"
  | "blind"
  | "seeCards"
  | "chaal"
  | "raise"
  | "sideshowRequest"
  | "sideShowAccept"
  | "sideShowDecline"
  | "show"
  | "tip"
  | "gift"
  | "buy"
  | "standup";

export interface IGameAction {
  type: GameActionType;
  value: string | number;
  originPlayer: {
    uid: string;
    name: string;
  };
  targetPlayer?: {
    uid: string;
    name: string;
  };
}

export interface IGame {
  isActive: boolean;
  pot: number;
  mode: GameMode;
  message: string;
  startsWith: IPlayer;
  players: IPlayer[];
  actions: IGameAction[];
  winners: IPlayer[];
}
