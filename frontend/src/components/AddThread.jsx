import React from "react";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddThread = ({ thread }) => {
  if (!thread) return null;

  return (
    <div className={`${thread.category}-container`}>
      <Link
        to={`/thread/${thread.category}`}
        className={`${thread.category}-container-wrapper`}
      >
        <div className="group-chat-name-container">
          <div className="group-image-container">
            <img src={thread.image_url} alt={`${thread.category}-profile`} />
          </div>
          <div className="group-name-container">
            <h3>r/{thread.category}</h3>
          </div>
        </div>

        <div className="group-advertising-text-header">
          <h1>{thread.headline}</h1>
        </div>

        <div className={`${thread.category}-group-text-1`}>
          <h3>{thread.text1}</h3>
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
                className="view-button-link"
                to={`/thread/${thread.category}`}
              >
                <button className={`visit-${thread.category}-chat-button`}>
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AddThread;
