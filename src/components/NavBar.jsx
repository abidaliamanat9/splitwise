import { Link, useNavigate } from "react-router-dom";

import { auth } from "../utils/firebase";

import logo from "../assets/splitwiselogo.png";

import { logout } from "../helpers/logout/logout";

import { LinkElement } from "../utils/commons";

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
              <LinkElement tos={"/signin/"} text={"SignIn"} className={"btn"} />
              <LinkElement tos={"/signup/"} text={"SignUp"} className={"btn"} />
            </>
          ) : (
            <>
              <p>{auth.currentUser.displayName}</p>
              <button className="btn" onClick={() => logout(navigate)}>
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
