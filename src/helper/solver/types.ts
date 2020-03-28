export type PlayerCard = string;

export interface HandStatus {
  no: number;
  name: string;
  card1: number;
  card2: number;
  card3: number;
  desc: string;
  score: number;
}

export interface HandResult {
  name: HandStatus["name"];
  desc: HandStatus["desc"];
  score: HandStatus["score"];
}

export interface PlayerCombination {
  cards: string[];
  details?: HandResult;
  remainingPoints?: number;
  remainingCard?: string;
}

export interface CardValue {
  number: number;
  color: string;
  value: string;
  isJoker?: boolean;
}
