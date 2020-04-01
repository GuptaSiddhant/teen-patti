// import React from "react";
import { User, GuptasiRequest } from "../../helper";
import { firestore } from "../firebase";

export const requestGuptasi = (user: User) => {
  const newRequest: GuptasiRequest = {
    amount: 500,
    approved: false,
    reviewed: false,
    user
  };
  try {
  firestore
    .collection("guptasi")
    .doc()
    .set(newRequest);
  }
  catch(error) {
      console.error("Error while requesting Guptasi", error);
  }
};
