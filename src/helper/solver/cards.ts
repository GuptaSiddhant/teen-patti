import _ from "lodash";
import { CardValue } from "./types";

export const cardValue = (card: string): CardValue | undefined => {
  if (card.length === 2 && _.isString(card)) {
    let val: string = _.upperCase(card[0]);
    let color: string = _.upperCase(card[1]);
    let number: number = 0;
    switch (val) {
      case "A":
        number = 1;
        break;
      case "T":
        number = 10;
        break;
      case "J":
        number = 1;
        break;
      case "Q":
        number = 12;
        break;
      case "K":
        number = 13;
        break;
      default:
        number = parseInt(val);
    }

    if (val === "A") {
      number = 1;
    } else if (val === "T") {
      number = 10;
    } else if (val === "J") {
      number = 11;
    } else if (val === "Q") {
      number = 12;
    } else if (val === "K") {
      number = 13;
    } else {
      number = parseInt(val);
    }
    switch (color) {
      case "C":
        color = "Clubs";
        break;
      case "S":
        color = "Spades";
        break;
      case "D":
        color = "Diamonds";
        break;
      case "H":
        color = "Hearts";
        break;
      default:
        console.error(new Error("Incorrect Card Color " + card));
        break;
    }
    if (_.isNaN(number)) {
      console.error(new Error("Incorrect Card Number " + card));
    }
    return {
      number: number,
      color: color,
      value: card
    };
  } else {
    console.error(new Error("Incorrect Card Value " + card));
  }
};

export const keyToString = function(key: number) {
  //   key = parseInt(key);
  let retVal = "";
  switch (key) {
    case 1:
      retVal = "A";
      break;
    case 14:
      retVal = "A";
      break;
    case 2:
      retVal = "2";
      break;
    case 3:
      retVal = "3";
      break;
    case 4:
      retVal = "4";
      break;
    case 5:
      retVal = "5";
      break;
    case 6:
      retVal = "6";
      break;
    case 7:
      retVal = "7";
      break;
    case 8:
      retVal = "8";
      break;
    case 9:
      retVal = "9";
      break;
    case 10:
      retVal = "10";
      break;
    case 11:
      retVal = "J";
      break;
    case 12:
      retVal = "Q";
      break;
    case 13:
      retVal = "K";
      break;
  }
  return retVal;
};

export const numberValue = function(card: string) {
  const cardObj = cardValue(card);
  if (cardObj) {
    if (cardObj.number === 1) cardObj.number = 14;
    return cardObj.number;
  }
};

interface Card {
  shortName: string;
  fullName: string;
  colorShort: string;
  colorFull: string;
  numberShort: string;
  numberFull: string;
}

export const getAllCards = function() {
  const allColorsObj = [
    {
      shortName: "s",
      fullName: "Spade"
    },
    {
      shortName: "h",
      fullName: "Heart"
    },
    {
      shortName: "d",
      fullName: "Diamond"
    },
    {
      shortName: "c",
      fullName: "Club"
    }
  ];
  const allNumbersObj = [
    {
      shortName: "A",
      fullName: "Ace"
    },
    {
      shortName: "2",
      fullName: "Two"
    },
    {
      shortName: "3",
      fullName: "Three"
    },
    {
      shortName: "4",
      fullName: "Four"
    },
    {
      shortName: "5",
      fullName: "Five"
    },
    {
      shortName: "6",
      fullName: "Six"
    },
    {
      shortName: "7",
      fullName: "Seven"
    },
    {
      shortName: "8",
      fullName: "Eight"
    },
    {
      shortName: "9",
      fullName: "Nice"
    },
    {
      shortName: "T",
      fullName: "Ten"
    },
    {
      shortName: "J",
      fullName: "Jack"
    },
    {
      shortName: "Q",
      fullName: "Queen"
    },
    {
      shortName: "K",
      fullName: "King"
    }
  ];
  const allCards: Card[] = [];
  _.each(allColorsObj, function(color) {
    _.each(allNumbersObj, function(number) {
      allCards.push({
        shortName: number.shortName + color.shortName,
        fullName: number.fullName + " " + color.fullName,
        colorShort: color.shortName,
        colorFull: color.fullName,
        numberShort: number.shortName,
        numberFull: number.fullName
      });
    });
  });
  return allCards;
};
