import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { handleSignIn } from "../helpers/signIn/signIn";

import "../styles/styles.css";

const SignIn = () => {
  const navigate = useNavigate();
  const initialdata = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initialdata);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center cus-padding">
          <div className="card custom-card">
            <div className="card-body">
              <h2 className="card-title">Sign In</h2>
              <form
                onSubmit={(e) => handleSignIn(e, formdata, setError, navigate)}
              >
                <div className="form-group mt-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formdata.email}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formdata.password}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
                <button className="centerbutton btn btn-primary btn-block btn-lg mt-3">
                  Sign In
                </button>
              </form>
              {error && <div className="mt-3 text-danger">{error}</div>}
              <p className="mt-3">
                Don't have an account?<Link to="/signup/">Sign Up</Link>here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
