import _ from "lodash";
import Combinatorics from "js-combinatorics";
import * as cards from "./cards";
import { PlayerCard, PlayerCombination, HandResult } from "./types";
import { scoreHandsNormal } from "./scoreHandsNormal";

export const scoreHandsFour = (
  playerCards: PlayerCard[]
): HandResult | undefined => {
  if (playerCards.length === 4) {
    const only3Cards = Combinatorics.combination(playerCards, 3);
    const playerCombinations = [];
    let a: string[] = [];
    while ((a = only3Cards.next())) {
      const obj: PlayerCombination = {
        cards: a,
        details: scoreHandsNormal(a),
        remainingCard: _.head(_.difference(playerCards, a))
      };
      obj.remainingPoints = cards.numberValue(obj.remainingCard || "");
      // obj.details.score = obj.details.score * 100 + obj.remainingPoints;
      playerCombinations.push(obj);
    }
    const playerScoreObj = _.maxBy(playerCombinations, n => n.details?.score);
    return playerScoreObj?.details;
  } else {
    console.error(new Error("Number of cards in Score Hands Incorrect"));
  }
};
