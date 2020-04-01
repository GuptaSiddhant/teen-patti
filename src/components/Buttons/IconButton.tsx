import * as React from "react";
import styled from "@emotion/styled";

import { getDimInREM } from "../../helper";
import {
  setUserOnlineStatusFalse,
  auth,
  useAuthPlayer,
  requestGuptasi
} from "../../services";
import UserIcon from "../../assets/icons/user.svg";
import InfoIcon from "../../assets/icons/info.svg";
import RefreshIcon from "../../assets/icons/refresh.svg";
import GuptasiIcon from "../../assets/icons/guptasi.svg";

import { StyleButton } from "./Base";

export const StyledIconButton = styled(StyleButton)`
  position: fixed;
  width: ${getDimInREM(28)};
  height: ${getDimInREM(28)};
  img {
    width: ${getDimInREM(16)};
    height: ${getDimInREM(16)};
  }
`;

type IconButtonType = "profile" | "info" | "refresh" | "guptasi";

export const IconButton = ({ type }: { type: IconButtonType }) => {
  const player = useAuthPlayer();

  let handleClick: () => any = () => null;
  let icon: string = "";
  let tooltip: string = "";
  const style: React.CSSProperties = { top: "1rem" };

  switch (type) {
    case "profile":
      handleClick = () => {
        setUserOnlineStatusFalse(auth.currentUser?.uid || "");
        auth.signOut();
      };
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
    case "refresh":
      handleClick = () => window.location.reload();
      icon = RefreshIcon;
      tooltip = "Refresh";
      style.left = "3.5rem";
      break;
    case "guptasi":
      handleClick = () => (player ? requestGuptasi(player) : null);
      icon = GuptasiIcon;
      tooltip = "Get more Guptasi";
      style.right = "3.5rem";
      break;
  }

  return (
    <StyledIconButton onClick={handleClick} title={tooltip} style={style}>
      <img src={icon} alt={tooltip} />
    </StyledIconButton>
  );
};
