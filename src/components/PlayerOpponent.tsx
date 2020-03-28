import * as React from "react";
import styled from "@emotion/styled";
import { Player } from "../helper/typesDefs";

// const calcDim = (n: number = 1) => `calc(${baseUnit} * ${n})`;

const StyledPlayerOpponent = styled.div<Player>`
  position: relative;
  
  margin: 0.5rem;
  width: 5rem;
  height: 5rem;

  background: url('${props => props.photoURL}');
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: -0.75rem;

  border-radius: 2.5rem;
  border: 0.125rem solid #ffffff;
  box-shadow: 0.5rem 0.5rem 1rem 0 #00000020,
    -0.5rem -0.5rem 1rem 0 #ffff;

  .playerName {
    position: absolute;
    bottom: 0.875rem;
    left: -0.125rem;
    right: -0.125rem;
    height: 1rem;
    padding-top: 0.0625rem;
    background: #fff;
    border-radius: 0.125rem;
    box-shadow: 0 0.25rem 0.5rem 0 #0004;

    text-align: center;
    font-weight: bold;
    font-size: 0.75rem;
    color: #2A2933;
    align-items: center;
  }
  .playerStatus {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    padding-top: 0.125rem;
    background: #CCA700;
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0 0.25rem 0.5rem 0 #0004;
    /* clip-path: polygon(0 0, 10% 100%, 90% 100%, 100% 0); */
    /* clip-path: path('M36,82 L116,82 L111.515155,97.1363533 C111.011901,98.8348325 109.451429,100 107.679962,100 L44.3200379,100 C42.548571,100 40.9880985,98.8348325 40.4848454,97.1363533 L36,82 L36,82 Z'); */
    text-align: center;
    font-weight: bold;
    font-size: 0.75rem;
    color: #fff;
    align-items: center;
  }
`;

export const PlayerOpponent = (player: Player) => {
  return (
    <StyledPlayerOpponent {...player}>
      <div className="playerStatus">G.23030</div>
      <div className="playerName">
        <span>{player.displayName.split(" ")[0]}</span>
      </div>
    </StyledPlayerOpponent>
  );
};
