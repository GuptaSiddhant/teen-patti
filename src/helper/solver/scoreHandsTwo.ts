import _ from "lodash";
import * as cards from "./cards";
import { PlayerCard, HandStatus, HandResult } from "./types";

export const scoreHandsTwo = (
  playerCards: PlayerCard[]
): HandResult | undefined => {
  if (playerCards.length === 2) {
    const clonePlayerCards = _.sortBy(
      _.map(playerCards, function(n) {
        return cards.cardValue(n);
      }),
      "number"
    );

    // Error
    if (!clonePlayerCards[0] || !clonePlayerCards[1]) return;

    const handStatus: HandStatus = {
      no: 0,
      name: "",
      card1: 0,
      card2: 0,
      card3: 0,
      desc: "",
      score: 0
    };

    const groupByNumber = _.groupBy(clonePlayerCards, "number");
    const groupByColor = _.groupBy(clonePlayerCards, "color");
    const sameNumberCount = _.keys(groupByNumber).length;
    const sameColorCount = _.keys(groupByColor).length;

    const diff1 = clonePlayerCards[1].number - clonePlayerCards[0].number;
    const isSequence =
      diff1 === 1 ||
      (clonePlayerCards[0].number === 1 && clonePlayerCards[1].number === 13);

    // High Card
    handStatus.no = 0;
    handStatus.name = "High Card";
    if (clonePlayerCards[0].number === 1) {
      handStatus.card1 = 14;
      handStatus.card2 = clonePlayerCards[1].number;
      handStatus.desc = "High Card of A";
    } else {
      handStatus.card1 = clonePlayerCards[1].number;
      handStatus.card2 = clonePlayerCards[0].number;
      handStatus.desc = "High Card of " + cards.keyToString(handStatus.card1);
    }

    // Color
    if (sameColorCount === 1) {
      handStatus.no = 1;
      handStatus.name = "Color";
      handStatus.desc =
        "Color of " + cards.keyToString(handStatus.card1) + " High";
    }

    // Sequence
    if (isSequence) {
      if (
        clonePlayerCards[0].number === 1 &&
        clonePlayerCards[1].number === 2
      ) {
        handStatus.card1 = 14;
        handStatus.card2 = 2;
      }
      if (
        clonePlayerCards[0].number === 12 &&
        clonePlayerCards[1].number === 13
      ) {
        handStatus.card1 = 14;
        handStatus.card2 = 13;
      }
      handStatus.no = 2;
      handStatus.name = "Sequence";
      handStatus.desc =
        "Sequence of " + cards.keyToString(handStatus.card1) + " High";
    }

    // Pure Sequence
    if (sameColorCount === 1 && isSequence) {
      handStatus.no = 3;
      handStatus.name = "Pure Sequence";
      handStatus.desc =
        "Pure Sequence of " + cards.keyToString(handStatus.card1) + " High";
    }

    // Pair
    if (sameNumberCount === 1) {
      handStatus.no = 4;
      handStatus.name = "Pair";
      handStatus.desc = "Pair of " + cards.keyToString(handStatus.card1);
    }

    handStatus.score =
      handStatus.no * 10000 + handStatus.card1 * 100 + handStatus.card2 * 1;
    return {
      name: handStatus.name,
      desc: handStatus.desc,
      score: handStatus.score
    };
  } else {
    console.error(new Error("Number of cards in Score Hands Incorrect"));
  }
};
