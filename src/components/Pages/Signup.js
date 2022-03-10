import React from "react";
import Illustration from "../Illustration";
import SignupFrom from "../SignupFrom";

const Signup = () => {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <SignupFrom />
      </div>
    </>
  );
};

export default Signup;
