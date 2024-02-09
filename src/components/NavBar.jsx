import { Link, useNavigate } from "react-router-dom";

import { auth } from "../utils/firebase";

import logo from "../assets/splitwiselogo.png";

import { logout } from "../helpers/logout/logout";

import "../styles/styles.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="navbar-content">
        <ul>
          <li>
            <Link to="/">
              <img className="logoimg" src={logo} alt="Splitwise"></img>
            </Link>
          </li>
          <li>
            <Link to="/">
              <p>Splitwise</p>
            </Link>
          </li>
        </ul>
        <div className="navbar-buttons">
          {auth.currentUser === null ? (
            <>
              <Link to="/signin/">
                <button className="btn">
                  SignIn
                </button>
              </Link>
              <Link to="/signup/">
                <button className="btn">
                  SignUp
                </button>
              </Link>
            </>
          ) : (
            <>
              <p>{auth.currentUser.displayName}</p>
              <button
                className="navbtn rightbutton btn btn-primary btn-lg"
                onClick={() => logout(navigate)}
              >
                LogOut
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
