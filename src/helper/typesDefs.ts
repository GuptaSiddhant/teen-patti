import * as firebase from "firebase/app";

export interface User extends Partial<firebase.User> {
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

export interface Player extends User {
  status?: "default" | "dealer";
}
