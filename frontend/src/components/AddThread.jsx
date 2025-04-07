import React, { useContext } from "react";
import { FaRegComment, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { highlightText } from "../utils/highlightText";

const AddThread = ({ thread, onDelete }) => {
  const { searchTerm } = useContext(SearchContext);
  if (!thread) return null;

  const defaultCategories = ["news", "gym", "food"];
  const isUserCreated = !defaultCategories.includes(thread.category);

  const handleDeleteThread = () => {
    axios
      .delete(`http://localhost:5001/threads/${thread.id}`)
      .then(() => {
        if (onDelete) {
          onDelete(thread.id);
        }
      })
      .catch((err) => console.error("Error deleting thread:", err));
  };

  return (
    <div className={`${thread.category}-container`} id="new-thread-container">
      <div
        className={`${thread.category}-container-wrapper`}
        id="new-thread-container-wrapper"
      >
        <div className="group-chat-name-container">
          <div className="group-image-container">
            <img src={thread.image_url} alt={`${thread.category}-profile`} />
          </div>
          <div className="group-name-container">
            <h3>r/{thread.category}</h3>
          </div>
          {isUserCreated && (
            <div
              className="delete-thread-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteThread();
              }}
            >
              <FaTrash title="Delete thread" />
            </div>
          )}
        </div>
        <div className="group-advertising-text-header">
          <h1>{highlightText(thread.headline, searchTerm)}</h1>
        </div>
        <div
          className={`${thread.category}-group-text-1`}
          id="new-thread-group-text-1"
        >
          <h3>{highlightText(thread.text1, searchTerm)}</h3>
        </div>
        <div className="visit-chat-container">
          <div className="visit-chat-wrapper">
            <div className="comment-icon-visit-container">
              <div className="comment-icon-visit-wrapper">
                <div className="comment-icon-container">
                  <FaRegComment className="comment-icon" />
                </div>
                <div className="comment-number-container">
                  <h3>4</h3>
                </div>
              </div>
            </div>
            <div className="visit-button-container">
              <Link
                className="visit-button-link"
                to={`/thread/${thread.category}`}
              >
                <button
                  className={`visit-${thread.category}-chat-button`}
                  id="new-thread-chat-button"
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddThread;
