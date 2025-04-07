//CreateThreadForm

import React, { useState } from "react";
import "../styles/CreateThreadForm.css";

const CreateThreadForm = ({ className }) => {
  const [threadName, setThreadName] = useState("r/");
  const [headline, setHeadline] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate fields
    if (!threadName.trim() || !headline.trim() || !message.trim()) {
      setError("❌ All fields are required");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Prepare data for backend
    const newThread = {
      category: threadName.replace("r/", ""),
      headline,
      text1: message,
      text2: message.length > 50 ? message.substring(0, 50) : "", // Ensure text2 is never NULL
      text3: "",
    };

    try {
      const response = await fetch("http://localhost:5001/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newThread),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess("✅ Thread created!");
      setTimeout(() => setSuccess(null), 3000);

      // Clear fields
      setThreadName("r/");
      setHeadline("");
      setMessage("");

      // Reload the page after successful submission
      window.location.reload();
    } catch (err) {
      setError("❌ " + err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <form
      className={`create-thread-form-container ${className}`}
      onSubmit={handleSubmit}
    >
      <h2>Create a New Thread</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>Thread Name (Optional)</label>
      <input
        type="text"
        value={threadName}
        onChange={(e) =>
          setThreadName(
            e.target.value.startsWith("r/")
              ? e.target.value
              : "r/" + e.target.value
          )
        }
        required
      />
      <label>Headline (Optional)</label>
      <input
        type="text"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />
      <label>Message (Optional)</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>
      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateThreadForm;
