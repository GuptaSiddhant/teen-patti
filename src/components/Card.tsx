import * as React from "react";
import styled from "@emotion/styled";
import cardBack from "../assets/images/cardBack.png";

import { getDimInREM } from "../helper/utilities";
import { CardType, Size } from "../helper/typesDefs";

const calcHeight = (size: Size = "md") =>
  size === "sm" ? getDimInREM(30) : getDimInREM(50);

const calcWidth = (size: Size = "md") =>
  size === "sm" ? getDimInREM(21) : getDimInREM(35);

const StyledCard = styled.div<CardType>`
  width: ${props => calcWidth(props.size)};
  height: ${props => calcHeight(props.size)};
  background: ${props => (props.hidden ? "blue" : "#f2f2f7")};
  border: ${getDimInREM(1)} solid #000066;
  border-radius: ${getDimInREM(2)};
`;

export const Card = (props: CardType) => {
  const { number, color, hidden = false } = props;
  return (
    <StyledCard {...props}>
      {!hidden ? (
        <div>
          {number} {color}
        </div>
      ) : (
        cardBack.toString()
      )}
    </StyledCard>
  );
};
