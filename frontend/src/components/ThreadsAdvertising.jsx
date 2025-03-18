import React, { useEffect, useState } from "react";
import "../styles/ThreadsAdvertising.css";
import axios from "axios";
import ThreadAd from "./AddThread";
import { Link } from "react-router-dom";

const ThreadsAdvertising = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  // get threads
  useEffect(() => {
    axios
      .get("http://localhost:5001/threads")
      .then((res) => {
        setThreads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching threads:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="threads-advertising-container">
        <div className="loading">Loading threads...</div>
      </main>
    );
  }

  // threads return threads by id
  return (
    <main className="threads-advertising-container">
      <div className="threads-advertising-wrapper">
        {threads.map((thread) => (
          <ThreadAd key={thread.id} thread={thread} />
        ))}
      </div>
    </main>
  );
};

export default ThreadsAdvertising;
