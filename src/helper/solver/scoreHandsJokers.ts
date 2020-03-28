import _ from "lodash";
import * as cards from "./cards";
import { PlayerCard, HandResult } from "./types";
import { scoreHandsNormal } from "./scoreHandsNormal";

export const scoreHandsJokers = (
  playerCards: PlayerCard[],
  jokers: string[]
): HandResult | undefined => {
  const jokerNumbers = jokers.map(joker => cards.cardValue(joker)?.number);
  let playerScoreObj = scoreHandsNormal(playerCards);

  if (playerScoreObj) {
    const playerCardObjects = _.map(playerCards, function(n) {
      const cardObj = cards.cardValue(n);
      const isJoker = _.find(jokerNumbers, n => cardObj?.number === n);
      if (cardObj) {
        cardObj.isJoker = isJoker ? true : false;
        return cardObj;
      }
    });

    const numberOfJokers = _.filter(playerCardObjects, "isJoker").length;

    const getNonJokerCards = () =>
      playerCardObjects
        .filter(obj => (obj?.isJoker ? false : true))
        .map(object => object?.value);

    const nonJokerCards = getNonJokerCards();
    let card1: string = "";
    let card2: string = "";

    switch (numberOfJokers) {
      case 1:
        card1 = nonJokerCards[0] || "";
        card2 = nonJokerCards[1] || "";

        const allCards = _.map(cards.getAllCards(), "shortName");
        const allCasesObjects = allCards.map(card =>
          scoreHandsNormal([card1, card2, card])
        );
        playerScoreObj = _.maxBy(allCasesObjects, function(n) {
          return n?.score;
        });
        break;
      case 2:
        card1 = nonJokerCards[0] || "";
        playerScoreObj = scoreHandsNormal([card1, card1, card1]);
        break;
      case 3:
        playerScoreObj = scoreHandsNormal(["As", "Ad", "Ac"]);
        break;
    }
    return playerScoreObj;
  }
};
