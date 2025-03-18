import React from "react";
import "../styles/Sidebar.css";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="sidebar-section-container">
      <div className="sidebar-category-header-container">
        <div className="category-header-wrapper">
          <div className="header-arrow-icon-container">
            <GoArrowUpRight className="arrow-icon" />
          </div>
          <div className="header-text-container">
            <h2>Popular</h2>
          </div>
        </div>
      </div>

      <div className="news-sidebar-container">
        <div className="news-header-container">
          <div className="news-header-wrapper">
            <h3>NEWS</h3>
          </div>
        </div>

        <div className="news-sidebar-content-container">
          <Link to="/thread/news" className="news-sidebar-wrapper">
            <div className="explore-icon-container">
              <MdOutlineExplore className="expore-icon" />
            </div>
            <div className="explore-news-text-container">
              <h2>Explore</h2>
            </div>
          </Link>

          <Link to="/thread/news" className="news-sidebar-wrapper">
            <div className="chat-icon-container">
              <IoIosChatbubbles className="chat-icon" />
            </div>
            <div className="chat-news-text-container">
              <h2>Chat</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="gym-sidebar-container">
        <div className="gym-header-container">
          <div className="gym-header-wrapper">
            <h3>GYM</h3>
          </div>
        </div>

        <div className="gym-sidebar-content-container">
          <Link to="/thread/gym" className="gym-sidebar-wrapper">
            <div className="explore-icon-container">
              <MdOutlineExplore className="expore-icon" />
            </div>
            <div className="explore-gym-text-container">
              <h2>Explore</h2>
            </div>
          </Link>

          <Link to="/thread/gym" className="gym-sidebar-wrapper">
            <div className="chat-icon-container">
              <IoIosChatbubbles className="chat-icon" />
            </div>
            <div className="chat-gym-text-container">
              <h2>Chat</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="food-sidebar-container">
        <div className="food-header-container">
          <div className="food-header-wrapper">
            <h3>FOOD</h3>
          </div>
        </div>

        <div className="food-sidebar-content-container">
          <Link to="/thread/food" className="food-sidebar-wrapper">
            <div className="explore-icon-container">
              <MdOutlineExplore className="expore-icon" />
            </div>
            <div className="explore-food-text-container">
              <h2>Explore</h2>
            </div>
          </Link>

          <Link to="/thread/food" className="food-sidebar-wrapper">
            <div className="chat-icon-container">
              <IoIosChatbubbles className="chat-icon" />
            </div>
            <div className="chat-food-text-container">
              <h2>Chat</h2>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
