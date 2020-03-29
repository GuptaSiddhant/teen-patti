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
  height: 12rem;
  width: 12rem;
  background: #fff;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f2;
  color: #CCA700;

  .logo {
    height: 4rem;
    margin-top: 1rem;
  }
  .google {
    margin-top: 1rem;
    height: 2rem;
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
