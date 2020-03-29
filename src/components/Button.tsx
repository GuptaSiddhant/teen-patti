import * as React from "react";
import styled from "@emotion/styled";
import { auth } from "../firebase";
import { getDimInREM } from "../helper/utilities";
import UserIcon from "../assets/icons/user.svg";
import InfoIcon from "../assets/icons/info.svg";
import { ReactComponent as GuptasiIcon } from "../assets/icons/guptasi.svg";

const StyleButton = styled.div`
  padding: ${getDimInREM(6)};
  border-radius: ${getDimInREM(4)};
  box-shadow: ${getDimInREM(2)} ${getDimInREM(2)} ${getDimInREM(4)} 0 #00000040,
    ${getDimInREM(-2)} ${getDimInREM(-2)} ${getDimInREM(4)} 0 #f2f2f280;
  background: #fff;
  text-align: center;
  cursor: pointer;
`;

const StyledIconButton = styled(StyleButton)`
  position: fixed;
  width: ${getDimInREM(28)};
  height: ${getDimInREM(28)};
`;

type IconButtonType = "profile" | "info";

export const IconButton = ({ type }: { type: IconButtonType }) => {
  let handleClick: () => any = () => null;
  let icon: string = "";
  let tooltip: string = "";
  const style: React.CSSProperties = { top: "1rem" };

  switch (type) {
    case "profile":
      handleClick = () => auth.signOut();
      icon = UserIcon;
      tooltip = "Profile";
      style.left = "1rem";
      break;
    case "info":
      //   handleClick = () => auth.signOut();
      icon = InfoIcon;
      tooltip = "Info / Help";
      style.right = "1rem";
      break;
  }

  return (
    <StyledIconButton onClick={handleClick} title={tooltip} style={style}>
      <img src={icon} alt={tooltip} />
    </StyledIconButton>
  );
};

const StyledGameButton = styled(StyleButton)`
  height: ${getDimInREM(32)};
  width: ${getDimInREM(100)};
  padding: ${getDimInREM(8)};

  svg {
    height: 0.7rem;
  }
`;

const PlayButton = () => {
  const style: React.CSSProperties = {
    color: "#1b6700",
    width: getDimInREM(120)
  };
  return (
    <StyledGameButton style={style}>
      CHAAL <GuptasiIcon />200
    </StyledGameButton>
  );
};

const PackButton = () => {
  const style: React.CSSProperties = { color: "#880000" };
  return <StyledGameButton style={style}>PACK</StyledGameButton>;
};

const RaiseButton = () => {
  const style: React.CSSProperties = { color: "#000080" };
  return (
    <StyledGameButton style={style}>
      RAISE <GuptasiIcon />400
    </StyledGameButton>
  );
};

const GetMoreButton = () => {
  const style: React.CSSProperties = { color: "#CCA700" };
  return (
    <StyledGameButton style={style}>
      GET MORE <GuptasiIcon />
    </StyledGameButton>
  );
};

const SideShowButton = () => {
  const style: React.CSSProperties = { color: "#3B0067" };
  return <StyledGameButton style={style}>SIDE SHOW</StyledGameButton>;
};

const StyledGameButtonGroup = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 1rem;
`;

export const GameButtonGroup = () => {
  return (
    <StyledGameButtonGroup>
      <GetMoreButton />
      <PackButton />
      <PlayButton />
      <RaiseButton />
      <SideShowButton />
    </StyledGameButtonGroup>
  );
};
