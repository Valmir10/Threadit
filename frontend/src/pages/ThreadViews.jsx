import React from "react";
// import "../styles/ThreadViews.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GroupChatt from "../components/GroupChatt";

const ThreadViews = () => {
  return (
    <div className="thread-views-container">
      <Header />
      <Sidebar />
      <GroupChatt />
    </div>
  );
};

export default ThreadViews;
