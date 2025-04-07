import React, { useEffect, useState } from "react";
import "../styles/ThreadsAdvertising.css";
import axios from "axios";
import ThreadAd from "./AddThread";
// import { Link } from "react-router-dom";

const ThreadsAdvertising = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  // get threads
  useEffect(() => {
    axios
      .get("http://localhost:5001/threads")
      .then((res) => {
        const threads = res.data;
        const lastVisitedId = localStorage.getItem("lastVisitedThreadId");

        if (lastVisitedId) {
          // move the last visited threads at the top
          const sortedThreads = [
            ...threads.filter((t) => t.id === parseInt(lastVisitedId)),
            ...threads.filter((t) => t.id !== parseInt(lastVisitedId)),
          ];
          setThreads(sortedThreads);
        } else {
          setThreads(threads);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching threads:", err);
        setLoading(false);
      });
  }, []);

  const handleDeleteThread = (id) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== id)
    );
  };

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
          <ThreadAd
            key={thread.id}
            thread={thread}
            onDelete={handleDeleteThread}
          />
        ))}
      </div>
    </main>
  );
};

export default ThreadsAdvertising;
