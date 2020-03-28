import { PlayerCard, HandResult } from "./types";
import { scoreHandsNormal } from "./scoreHandsNormal";

export const scoreHandsLowest = (
  playerCards: PlayerCard[]
): HandResult | undefined => {
  const retVal = scoreHandsNormal(playerCards);
  if (retVal) {
    retVal.score = 10000000 - retVal.score;
    return { ...retVal };
  }
};
