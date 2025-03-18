import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <section>
      <header className="header-container">
        <div className="threadit-left-container">
          <h1>Threadit</h1>
        </div>

        <div className="search-bar-middle-container">
          <div className="search-bar-wrapper">
            <label className="search-bar-label" htmlFor="search-bar">
              <input
                type="search"
                id="search-bar"
                placeholder="Search On Threadit"
              />
            </label>
          </div>
        </div>
        <div className="profile-information-right-container ">
          <div className="right-container-wrapper">
            <div className="profile-icon-container">
              <FaUser className="profile-icon" />
            </div>

            <div className="sign-in-button-container">
              <button>Sign in</button>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;
