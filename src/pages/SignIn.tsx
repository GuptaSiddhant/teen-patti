import React from "react";
import { signInWithGoogle } from "../firebase";

const SignIn = () => {
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <button
        className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};
export default SignIn;
