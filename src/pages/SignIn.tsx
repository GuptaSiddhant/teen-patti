import React from "react";
import styled from "@emotion/styled";
import { signInWithGoogle } from "../firebase";
// import { ReactComponent as Guptasi } from "../assets/icons/guptasi.svg";
import googleSignIn from "../assets/images/googleSignIn.png";
import logo from "../assets/images/logo.png";

const StyledPage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 360px;
  width: 360px;
  background: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f2;
  color: #CCA700;
  font-size: 48px;

  .logo {
    height: 120px;
    margin-top: 40px;
  }
  .google {
    margin-top: 20px;
    height: 60px;
    cursor: pointer;
  }
`;

const SignIn = () => {
  return (
    <StyledPage>
      <img className="logo" alt="G9 Teen Patti" src={logo} />
      <br />
      G9 Teen Patti
      <img
        className="google"
        onClick={() => {
          signInWithGoogle();
        }}
        alt=" Sign in with Google"
        src={googleSignIn}
      />
    </StyledPage>
  );
};
export default SignIn;
