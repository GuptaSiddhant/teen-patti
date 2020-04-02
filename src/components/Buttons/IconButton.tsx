import * as React from "react";
import styled from "@emotion/styled";

import { getDimInREM } from "../../helper";
import {
  setUserOnlineStatusFalse,
  auth,
  useAuthPlayer,
  requestGuptasi,
  useGetAllGuptasiRequest,
  approveReviewRequest,
  declineReviewRequest
} from "../../services";
import UserIcon from "../../assets/icons/user.svg";
import InfoIcon from "../../assets/icons/info.svg";
import RefreshIcon from "../../assets/icons/refresh.svg";
import GuptasiIcon from "../../assets/icons/guptasi.svg";
import CheckIcon from "../../assets/icons/check.svg";

import { RightModal, LeftModal } from "../Modal";

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

type IconButtonType = "profile" | "info" | "refresh" | "guptasi" | "review";

const ReviewRequests = () => {
  const ReviewList = styled.div`
    margin-top: 1rem;
    text-align: left;
    font-size: 1rem;
    overflow: auto;
    height: ${getDimInREM(220)};

    div {
      margin-bottom: 0.5rem;
    }

    button {
      border-radius: 0.25rem;
      background: #f2f2f2;
      margin-right: 0.5rem;
    }
  `;
  const requests = useGetAllGuptasiRequest();
  return (
    <ReviewList>
      {requests.length > 0 ? (
        requests.map(req => (
          <div key={req.uid}>
            {req.user.displayName} ({req.amount})<br />
            <button onClick={() => approveReviewRequest(req)}>
              <span role="img" aria-label="Approve">
                ✅
              </span>{" "}
              Approve
            </button>
            <button onClick={() => declineReviewRequest(req)}>
              <span role="img" aria-label="Decline">
                ❌
              </span>{" "}
              Decline
            </button>
          </div>
        ))
      ) : (
        <div>No requests</div>
      )}
    </ReviewList>
  );
};

const InfoView = () => {
  return (
    <div style={{ fontSize: "1rem", marginTop: "1rem" }}>
      <div>Boot amount : G.50</div>
      <br />
      <div>Chaal limit : G.1000</div>
      <br />
      <div>Pot limit : G.10000</div>
      <br />
      <div>Max. blind : 2</div>
      <br />
    </div>
  );
};

const UserView = () => {
  const authUser = useAuthPlayer();
  const UserInfo = styled.div`
    margin-top: 1rem;
    text-align: left;
    font-size: 1rem;
    overflow: auto;
    height: ${getDimInREM(220)};

    img {
      width: ${getDimInREM(50)};
      height: ${getDimInREM(50)};
    }

    button {
      border-radius: 0.25rem;
      background: #f2f2f2;
      margin-right: 0.5rem;
      height: ${getDimInREM(28)};
      width: ${getDimInREM(100)};
    }
  `;
  return (
    <UserInfo>
      <img src={authUser?.photoURL} alt={"Profile"} />
      <div>{authUser?.displayName}</div>
      <div>{authUser?.email}</div>
      <br />
      <div>Bought: G.{authUser?.wallet.bought}</div>
      <div>Won : G.{authUser?.wallet.won}</div>
      <div>Spent : G.{authUser?.wallet.spent}</div>
      <br />
      <button
        onClick={() => {
          setUserOnlineStatusFalse(auth.currentUser?.uid || "");
          auth.signOut();
        }}
      >
        Logout
      </button>
    </UserInfo>
  );
};

export const IconButton = ({ type }: { type: IconButtonType }) => {
  const player = useAuthPlayer();

  let handleClick: () => any = () => null;
  let icon: string = "";
  let tooltip: string = "";
  let modalContent: any = null;
  let modalPos = "right";
  const style: React.CSSProperties = { top: "1rem" };
  const [showModal, setShowModal] = React.useState(false);

  switch (type) {
    case "profile":
      handleClick = () => setShowModal(prev => !prev);
      icon = UserIcon;
      tooltip = "Profile";
      style.left = "1rem";
      modalPos = "left";
      modalPos = "left";
      modalContent = (
        <div>
          Profile <UserView />
        </div>
      );
      break;
    case "info":
      icon = InfoIcon;
      tooltip = "Info / Help";
      style.right = "1rem";
      handleClick = () => setShowModal(prev => !prev);
      modalContent = (
        <div>
          Info <InfoView />
        </div>
      );
      modalPos = "right";
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
    case "review":
      handleClick = () => setShowModal(prev => !prev);
      icon = CheckIcon;
      tooltip = "Review Guptasi requests";
      style.left = "6rem";
      modalPos = "left";
      modalContent = (
        <div>
          Requests <ReviewRequests />
        </div>
      );
      break;
  }

  return (
    <>
      <StyledIconButton onClick={handleClick} title={tooltip} style={style}>
        <img src={icon} alt={tooltip} />
      </StyledIconButton>
      {showModal ? (
        modalPos === "left" ? (
          <LeftModal onClose={() => setShowModal(false)}>
            {modalContent}
          </LeftModal>
        ) : (
          <RightModal onClose={() => setShowModal(false)}>
            {modalContent}
          </RightModal>
        )
      ) : null}
    </>
  );
};
