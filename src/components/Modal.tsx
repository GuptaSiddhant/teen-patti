import * as React from "react";
import styled from "@emotion/styled";
import { getDimInREM } from "../helper";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${getDimInREM(200)};
  width: ${getDimInREM(500)};
  background: #fff;
  text-align: center;
  padding: ${getDimInREM(20)};
  border-radius: ${getDimInREM(10)};
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f280;
  color: #cca700;
  font-size: 32px;
  z-index: 200;

  .closeIcon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    height: 1rem;
    width: 1rem;
    cursor: pointer;
  }
`;

const CloseButton = ({ onClose }: { onClose: (e: any) => void }) => {
  return (
    <div className="closeIcon" onClick={onClose}>
      x
    </div>
  );
};

export const CenterModal = ({
  onClose,
  children
}: {
  children: any;
  onClose: (e: any) => void;
}) => {
  return (
    <StyledModal>
      <CloseButton onClose={onClose} />
      {children}
    </StyledModal>
  );
};

const StyledLeftModal = styled(StyledModal)`
  left: 1rem;
  top: 3rem;
  transform: none;
  height: ${getDimInREM(300)};
  width: ${getDimInREM(200)};
  z-index: 100;
`;

const StyledRightModal = styled(StyledModal)`
  right: 1rem;
  top: 3rem;
  left: unset;
  transform: none;
  height: ${getDimInREM(300)};
  width: ${getDimInREM(200)};
  z-index: 100;
`;

export const LeftModal = ({
  onClose,
  children
}: {
  children: any;
  onClose: (e: any) => void;
}) => {
  return (
    <StyledLeftModal>
      <CloseButton onClose={onClose} />
      {children}
    </StyledLeftModal>
  );
};

export const RightModal = ({
  onClose,
  children
}: {
  children: any;
  onClose: (e: any) => void;
}) => {
  return (
    <StyledRightModal>
      <CloseButton onClose={onClose} />
      {children}
    </StyledRightModal>
  );
};
