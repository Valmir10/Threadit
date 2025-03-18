import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThreadViews from "./pages/ThreadViews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thread/:category" element={<ThreadViews />} />
      </Routes>
    </Router>
  );
}

export default App;
