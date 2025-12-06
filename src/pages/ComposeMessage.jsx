import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ComposeMessage.css";
import lockTop from "../assets/lockTop.svg";

export default function ComposeMessage() {
  const navigate = useNavigate();
  const location = useLocation();

  const prefillEmail = location.state?.email || "";

  const [to, setTo] = useState(prefillEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isActive =
    to.trim() !== "" && subject.trim() !== "" && message.trim() !== "";

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSend = () => {
    if (!isActive) return;

    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  const newId = Math.floor(Math.random() * (999 - 501 + 1)) + 501;

    const newMessage = {
      id: newId,
      from: "Me", 
      email: "me@secure.com",
      avatar: "https://i.pravatar.cc/150?img=12",
      title: subject,
      body: message,
      date: new Date().toLocaleString(),
      type: "sent",
    };

    localStorage.setItem(
      "messages",
      JSON.stringify([...storedMessages, newMessage])
    );

    navigate("/messages");
  };

  return (
    <div className="compose-wrapper">
      <div className="compose-header">
        <h2>
          <img src={lockTop} alt="" /> Compose Secure Message
        </h2>
      </div>

      <div className="compose-card">
        <label className="input-label">To</label>

        <input
          className="input-field"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Type"
        />

        <label className="input-label">Subject</label>
        <input
          className="input-field"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Message subject"
        />

        <label className="input-label">Message</label>
        <textarea
          className="textarea-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        ></textarea>

        <div className="encryption-info">
          <img src={lockTop} alt="" className="lockIconSmal" />
          Messages are encrypted with AES-256 by default
        </div>

        <div className="btn-row">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button
            className={`send-btn ${isActive ? "active" : ""}`}
            disabled={!isActive}
            onClick={handleSend}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
