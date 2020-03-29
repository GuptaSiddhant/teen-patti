import * as React from "react";
import styled from "@emotion/styled";
import cardBack from "../assets/images/cardBack.png";
import { ReactComponent as Club } from "../assets/icons/club.svg";
import { ReactComponent as Spade } from "../assets/icons/spade.svg";
import { ReactComponent as Heart } from "../assets/icons/heart.svg";
import { ReactComponent as Diamond } from "../assets/icons/diamond.svg";

import { getDimInREM } from "../helper/utilities";
import { CardType } from "../helper/typesDefs";

const StyledCard = styled.div<CardType>`
  width: ${getDimInREM(35)};
  height: ${getDimInREM(50)};
  background: ${props => (props.isHidden ? `url(${cardBack})` : "#fff")};
  background-size: cover;
  background-position: center;
  border: ${getDimInREM(1)} solid #000066;
  border-radius: ${getDimInREM(2)};
  box-shadow: 0.25rem 0.25rem 0.5rem 0 #00000040,
    -0.25rem -0.25rem 0.5rem 0 #ccc4;
  text-align: center;
  color: ${props => props.color};

  .number {
    font-size: 1.5rem;
  }

  svg {
    margin-top: 0.25rem;
    width: 1rem;
    height: 1rem;
  }
`;

export const Card = (props: CardType) => {
  const { number, color, isHidden = false } = props;

  let ColorIcon = Spade;
  let isBlack = false;
  switch (color.toUpperCase()) {
    case "C":
      ColorIcon = Club;
      isBlack = true;
      break;
    case "S":
      ColorIcon = Spade;
      isBlack = true;
      break;
    case "H":
      ColorIcon = Heart;
      break;
    case "D":
      ColorIcon = Diamond;
      break;
  }

  return (
    <StyledCard {...props} color={isBlack ? "black" : "red"}>
      {!isHidden && (
        <>
          <ColorIcon />
          <div className="number">{number}</div>
        </>
      )}
    </StyledCard>
  );
};
