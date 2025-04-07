import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThreadViews from "./pages/ThreadViews";
// import { SearchProvider } from "./SearchContext";
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thread/:category" element={<ThreadViews />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
