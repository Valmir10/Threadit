import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import CreateThreadForm from "./CreateThreadForm";
import "../styles/Header.css";
import { SearchContext } from "./SearchContext";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  // Hämta alla trådar och extrahera unika kategorier
  useEffect(() => {
    axios
      .get("http://localhost:5001/threads")
      .then((res) => {
        const uniqueCategories = Array.from(
          new Set(res.data.map((thread) => thread.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching threads:", err));
  }, []);

  const handleInputFocus = () => {
    setShowSearchMenu(true);
  };

  const handleCategoryClick = (category) => {
    navigate(`/thread/${category}`);
    setShowSearchMenu(false);
  };

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
                onFocus={handleInputFocus}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </label>
          </div>
          {showSearchMenu && (
            <div className="menu-search-container">
              <div className="menu-search-wrapper">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="thread-menu-search-container"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-information-right-container">
          <div className="right-container-wrapper">
            <div className="profile-icon-container">
              <FaUser className="profile-icon" />
            </div>
            <div className="add-thread-button-container">
              <button onClick={() => setShowForm(!showForm)}>Thread</button>
            </div>
          </div>
        </div>
      </header>

      <CreateThreadForm className={showForm ? "show" : ""} />
    </section>
  );
};

export default Header;
