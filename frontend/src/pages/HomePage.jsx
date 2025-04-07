import React from "react";
import Header from "../components/Header";
import ThreadsAdvertising from "../components/ThreadsAdvertising";
import Sidebar from "../components/Sidebar";
import "../styles/HomePage.css";
import AddThread from "../components/AddThread";
import CreateThreadForm from "../components/CreateThreadForm";

const HomePage = () => {
  return (
    <div className="home-page-section-container">
      <Header />
      <ThreadsAdvertising />
      <AddThread />
      <Sidebar />
      <CreateThreadForm />
    </div>
  );
};

export default HomePage;
