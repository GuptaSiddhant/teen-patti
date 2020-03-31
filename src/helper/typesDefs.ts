// import * as firebase from "firebase/app";

export interface User {
  uid: string;
  email: string;
  isAdmin: boolean;
  displayName: string;
  photoURL: string;
  gamesPlayed: number;
  online: boolean;
  position: number;
  wallet: {
    bought: number;
    won: number;
    spent: number;
  };
}

export interface IPlayer extends User {
  status?: "default" | "dealer" | "blind";
  cards?: string[];
  isBlind?: boolean;
}

export type Color = "s" | "h" | "c" | "d" | string;
export interface ICard {
  number: string;
  color: Color;
  isHidden?: boolean;
}

type GameActionType =
  | "create"
  | "start"
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
  uid: string;
  isActive: boolean;
  isStarted: boolean;
  pot: number;
  mode: "normal" | "joker" | "jokers" | "lowest" | "two" | "four";
  jokers: string[];
  message: string;
  startsWith?: IPlayer;
  players: IPlayer[];
  actions: IGameAction[];
  winners: IPlayer[];
}
