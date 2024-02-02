import { Component } from "react";
import logo from '../assets/splitwiselogo.png';
import '../styles/styles.css';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth";
const NavBar =()=>{
    const navigate = useNavigate()
    const Logout = async() => {
        await signOut(auth)
        navigate("/signin/")
    }
        return(
        <nav>
            <div className="navbar-content">
            <ul>
                <li>
                    <Link to="/">
                    <img className='logoimg' src={logo} alt='Splitwise'></img>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                    <p>Splitwise</p>
                    </Link>
                </li>
            </ul>
            <div className="navbar-buttons">
                {auth.currentUser===null?(
                    <>
                    <Link to="/signin/">
                        <button className="btn btn-primary btn-block btn-lg">SignIn</button>
                    </Link>
                    <Link to="/signup/">
                         <button className="rightbutton btn btn-primary btn-lg">SignUp</button>
                    </Link>
                    </>
                ):(
                    <>
                    <h3>{auth.currentUser.displayName}</h3>
                    <button className="navbtn rightbutton btn btn-primary btn-lg" onClick={Logout}>LogOut</button>
                    </>
                )
                }
            </div>
            </div>
        </nav>
        )
    }
export default NavBar