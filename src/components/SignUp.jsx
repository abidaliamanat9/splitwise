import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleSignUp } from "../helpers/signUp/signUp";
import { InputField } from "../utils/commons";
import { handleInputChange } from "../helpers/share";

import "../styles/styles.css";

const SignUp = () => {
  const navigate = useNavigate();
  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  return (
    <>
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleSignUp(e, formData, setError, navigate)}>
          <InputField
            label={"Name"}
            type={"text"}
            name={"name"}
            placeholder={"Enter your name"}
            value={formData.name}
            onChange={(e) => {
              handleInputChange(e, setFormData);
            }}
          />
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"Enter your email"}
            value={formData.email}
            onChange={(e) => {
              handleInputChange(e, setFormData);
            }}
          />
          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Enter password"}
            value={formData.password}
            onChange={(e) => {
              handleInputChange(e, setFormData);
            }}
          />
          <InputField
            label={"Confirm Password"}
            type={"password"}
            name={"confirmpassword"}
            placeholder={"Enter confirm password"}
            value={formData.confirmPassword}
            onChange={(e) => {
              handleInputChange(e, setFormData);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && <div className="error">{error}</div>}
        <p>
          Already have an account?<Link to="/signin/">Sign In</Link> here
        </p>
      </div>
    </>
  );
};
export default SignUp;
