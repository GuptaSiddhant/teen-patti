import React from "react";
import styled from "@emotion/styled";
import { auth } from "../firebase";
import logo from "../assets/images/logo.png";

const StyledPage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 360px;
  background: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1rem 1rem 2rem 0 #00000018, -1rem -1rem 2rem 0 #f2f2f2;
  color: #cca700;
  font-size: 32px;

  .logo {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    div {
      text-align: left;
      margin-left: 20px;
      span {
        font-size: 56px;
      }
    }
    img {
      height: 100px;
    }
  }

  form {
    margin-top: 20px;
    input,
    button {
      font: inherit;
      margin-bottom: 10px;
      border-radius: 5px;
      padding: 0 10px;
      border: 1px solid #ccc;
      box-shadow: none;
      user-select: auto;
      font-size: 20px;
      width: 280px;
      height: 40px;
      color: black;
    }
    button {
      cursor: pointer;
      background: #cca700;
      color: #ffffff;
      &.secondary {
        background: #ffffff;
        color: #cca700;
        height: 32px;
      }
    }
    .error {
      color: red;
      font-size: 16px;
    }
  }

  .google {
    height: 60px;
    cursor: pointer;
  }
`;

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [resetMail, setResetMail] = React.useState(false);
  return (
    <StyledPage>
      <div className="logo">
        <img alt="G9 Teen Patti" src={logo} />
        <div>
          <span>G9</span>
          <br />
          Teen Patti
        </div>
      </div>
      <form
        onSubmit={e => {
          setError("");
          e.preventDefault();
          e.stopPropagation();
          if (email === "") setError("Email is required");
          else if (password === "") setError("Password is required");
          else auth.signInWithEmailAndPassword(email, password).then(
            userCred => userCred,
            errorReason => setError(errorReason.message)
          );
        }}
      >
        <input
          name="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
        <button
          className="secondary"
          type="button"
          onClick={() => {
            setError("");
            if (email === "") setError("Email is required to reset password");
            else
              auth.sendPasswordResetEmail(email).then(() => setResetMail(true), (errorReason) => setError(errorReason.message));
          }}
        >
          {resetMail ? "Reset mail sent" : "Reset password"}
        </button>
        {error !== "" && <div className="error">{error}</div>}
      </form>
    </StyledPage>
  );
};
export default SignIn;
