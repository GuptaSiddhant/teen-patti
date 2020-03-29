import * as React from "react";
import styled from "@emotion/styled";
import { Player } from "../helper/typesDefs";

import { PlayerOpponent, Dealer } from "./PlayerOpponent";

const tableWidth = `31.25rem`;
const tableHeight = `12rem`;

const StyledTable = styled.div`
  position: fixed;
  top: calc((90vh - ${tableHeight}) / 2);
  left: calc((100vw - ${tableWidth}) / 2);
  z-index: 0;

  width: ${tableWidth};
  height: ${tableHeight};
  background-color: #1c6900;
  border-radius: 6.5rem;
  border: 0.5rem solid #ffffff;
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f2,
    inset 0.5rem 0.5rem 1rem 0 #00000018, inset -0.5rem -0.5rem 1rem 0 #f2f2f240;

  .tableDealerArea {
    position: absolute;
    height: 1.5rem;
    width: 8rem;
    clip-path: polygon(0 0, 20% 100%, 80% 100%, 100% 0);
    background: #fff;
    left: 11rem;
  }

  .tableCenter {
    margin: 2rem;
    background-color: #fff;
    border-radius: 5rem;
    width: calc(${tableWidth} - 5rem);
    height: calc(${tableHeight} - 5rem);
    box-shadow: 0.5rem 0.5rem 1rem 0 #00000018, -0.5rem -0.5rem 1rem 0 #f2f2f240;
  }
`;

export const Table = ({ opponents }: { opponents: Player[] }) => {
  return (
    <StyledTable>
      <div className="tableDealerArea" />
      <div className="tableCenter"></div>
      <Dealer />
      {opponents.map((opponent, index) => (
        <PlayerOpponent
          key={opponent.uid + index}
          position={index}
          player={opponent}
        />
      ))}
    </StyledTable>
  );
};
