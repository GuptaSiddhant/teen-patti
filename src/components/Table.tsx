import * as React from "react";
import styled from "@emotion/styled";
import { Player } from "../helper/typesDefs";
import { getDimInREM } from "../helper/utilities";
import { ReactComponent as ClockWise } from "../assets/icons/clockwise.svg";
import { ReactComponent as GuptasiIcon } from "../assets/icons/guptasi.svg";

import { PlayerOpponent, Dealer } from "./PlayerOpponent";
import { Card } from "./Card";

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
    position: relative;
    margin: 2rem;
    padding: 0.75rem;
    background-color: #fff;
    border-radius: 5rem;
    width: calc(${tableWidth} - 5rem);
    height: calc(${tableHeight} - 5rem);
    box-shadow: 0.5rem 0.5rem 1rem 0 #00000018, -0.5rem -0.5rem 1rem 0 #f2f2f240;
    text-align: center;
    color: #808080;

    svg.clockwise {
      position: absolute;
      color: #d8d8d8;
      &.left {
        top: 0.5rem;
        left: 0.6rem;
      }
      &.right {
        right: 0.6rem;
        top: 0.65rem;
        transform: rotate(180deg);
      }
    }

    .tableContent {
      margin-top: 0.5rem;
      height: ${getDimInREM(60)};
      display: grid;
      grid-template-columns: 1fr max-content 1fr;
      grid-gap: 1rem;

      .gameMode {
        height: inherit;
        color: #880000;
        text-align: right;
        padding-top: 0.5rem;
      }
      .gamePot {
        height: inherit;
        width: ${getDimInREM(100)};
        color: #fff;
        background: #cca700;
        box-shadow: inset 0.5rem 0.5rem 1rem 0 #00000020,
          inset -0.5rem -0.5rem 1rem 0 #f2f2f240;
        border-radius: 0.5rem;
        padding-top: 0.5rem;
      }
      .gameJoker {
        height: inherit;
        color: #191980;
        text-align: left;

        &.none {
          padding-top: 0.5rem;
          opacity: 0.5;
        }
      }

      .gameValue {
        font-size: 1.5rem;
      }

      .cards {
        text-align: center;
        padding-top: 0.25rem;
        display: grid;
        grid-template-columns: repeat(3, max-content);
        grid-gap: 0.5rem;
        font-size: 1rem;
      }
    }
  }
`;

export const Table = ({
  opponents,
  mode,
  pot,
  jokers
}: {
  opponents: Player[];
  mode: string;
  pot: number;
  jokers: string[]; // Jc
}) => {
  const jokerCount = jokers.length;
  return (
    <StyledTable>
      <div className="tableDealerArea" />
      <div className="tableCenter">
        <div className="message">Siddhant tipped the dealer G.500</div>
        <div className="tableContent">
          <div className="gameMode">
            <span className="gameValue">{mode.toUpperCase()}</span>
            <br />
            MODE
          </div>
          <div className="gamePot">
            <span className="gameValue">
              <GuptasiIcon /> {pot.toString()}
            </span>
            <br />
            POT
          </div>
          <div className={"gameJoker " + (jokerCount === 0 ? "none" : "")}>
            <div className={"gameValue " + (jokerCount !== 0 ? "cards" : "")}>
              {jokerCount === 0
                ? "NO"
                : jokers.map(joker => (
                    <Card
                      key={joker}
                      number={joker[0]}
                      size="sm"
                      color={joker[1]}
                    />
                  ))}
            </div>
            JOKER
          </div>
        </div>
        <ClockWise className="clockwise left" />
        <ClockWise className="clockwise right" />
      </div>
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
