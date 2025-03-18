import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/GroupChatt.css";
import { FaThumbsUp } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const GroupChat = () => {
  const { category } = useParams();
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [likedMessages, setLikedMessages] = useState([]);
  const [isShaking, setShaking] = useState(false);

  // get all threads based on category
  useEffect(() => {
    axios
      .get(`http://localhost:5001/threads/${category}`)
      .then((res) => {
        setThread(res.data.thread);
        setMessages(res.data.messages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching thread:", err);
        setLoading(false);
      });
  }, [category]);

  // Send message to the server
  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    axios
      .post(`http://localhost:5001/threads/${thread.id}/messages`, {
        text: newMessage,
      })
      .then((res) => {
        const newComment = {
          id: res.data.id,
          username: "User",
          user_image: "/img/user-image.png",
          text: newMessage,
          created_at: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, newComment]);
        setNewMessage("");
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  //Controll like message
  const toggleLike = (index) => {
    setLikedMessages((prevLiked) =>
      prevLiked.includes(index)
        ? prevLiked.filter((i) => i !== index)
        : [...prevLiked, index]
    );
  };

  //Shaking affect on textarea
  const handleCommentClick = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  //Delete message
  const handleDeleteMessage = (msg) => {
    axios
      .delete(`http://localhost:5001/threads/messages/${msg.id}`) // Använd rätt ID
      .then(() => {
        setMessages(
          (prevMessages) =>
            prevMessages.filter((message) => message.id !== msg.id) // Filtrera bort meddelandet
        );
      })
      .catch((err) => console.error("Error deleting message:", err));
  };

  if (loading) {
    return <h1>Loading chat...</h1>;
  }

  return (
    <main className="main-group-chat-container">
      <div className="group-chat-wrapper">
        <div className="deafult-comment-chat-container">
          <div className="group-chat-content-wrapper">
            <div className="group-chat-profile-container">
              <div className="group-chat-image-container">
                <img
                  src={thread.image_url}
                  alt={`${thread.category}-profile`}
                />
              </div>
              <div className="group-chat-name-container-1">
                <h3>r/{thread.category}</h3>
              </div>
            </div>

            <div className="group-chat-headline">
              <h1>{thread.headline}</h1>
            </div>

            <div className="text-comments-container">
              {messages.map((msg, index) => (
                <div key={index} className="comment-box-container">
                  <div className="user-profile-image-container">
                    <div className="user-image-container">
                      <img src={msg.user_image} alt="user-profile" />
                    </div>
                    <div className="user-name-container">
                      <h3>{msg.username}</h3>
                    </div>
                  </div>

                  <div className="user-comment-container">
                    <h3>{msg.text}</h3>
                  </div>
                  <div className="add-comment-option-container">
                    <div className="add-comment-option-wrapper">
                      <div
                        className="like-comment-container"
                        onClick={() => toggleLike(index)}
                      >
                        <FaThumbsUp
                          className={`like-comment-icon ${
                            likedMessages.includes(index) ? "liked" : ""
                          }`}
                        />
                      </div>

                      {msg.username === "User" && (
                        <div
                          className="delete-comment-container"
                          onClick={() => handleDeleteMessage(msg)}
                        >
                          <div className="delete-comment-wrapper">
                            <div className="delete-comment-tooltip">Delete</div>
                            <FaTrash className="delete-comment-icon" />
                          </div>
                        </div>
                      )}

                      <div className="add-comment-button-container">
                        <button onClick={handleCommentClick}>Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="write-comment-container">
          <div className="write-comment-wrapper">
            <label className="write-comment-label" htmlFor="comment-message">
              <textarea
                id="comment-message"
                placeholder="Write Comment"
                required
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={isShaking ? "shake" : ""}
              ></textarea>
              <div className="send-icon-container" onClick={handleSendMessage}>
                <div className="send-icon-wrapper">
                  <div className="send-icon-tooltip">Send</div>
                  <IoIosSend className="send-icon" />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GroupChat;
