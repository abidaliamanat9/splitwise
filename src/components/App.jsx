import React, { Component } from "react";
import logo from '../assets/splitwiselogo.png';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img className="logoimg" src={logo} alt="Splitwise" />
            Splitwise
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive" // Corrected target ID
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  <button type="button" className="btn btn-primary">
                    Log in
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
    );
  }
}

export default App;
