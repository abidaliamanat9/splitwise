import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { handleSignIn } from "../helpers/signIn/signIn";

import { InputField } from "../utils/commons";

import { handleInputChange } from "../helpers/share";

import "../styles/styles.css";

const SignIn = () => {
  const navigate = useNavigate();
  const initialdata = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initialdata);
  const [error, setError] = useState("");

  return (
    <>
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={(e) => handleSignIn(e, formdata, setError, navigate)}>
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"Enter your email"}
            value={formdata.email}
            onChange={(e) => {
              handleInputChange(e, setFormdata);
            }}
          />
          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Enter password"}
            value={formdata.password}
            onChange={(e) => {
              handleInputChange(e, setFormdata);
            }}
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <div className="error">{error}</div>}
        <p className="mt-3">
          Don't have an account?<Link to="/signup/">Sign Up</Link>here
        </p>
      </div>
    </>
  );
};

export default SignIn;
