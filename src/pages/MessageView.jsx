import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { messages } from "../data/message";
import "../styles/MessageView.css";
import lockTop from "../assets/lockTop.svg";
import leftArrow from "../assets/leftArrow.svg";

export default function MessageView() {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let foundMessage = messages.find((m) => m.id === Number(id));

    if (!foundMessage) {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      foundMessage = storedMessages.find((m) => m.id === Number(id));
    }

    setMsg(foundMessage);
  }, [id]);

  if (!msg) return <div>Message not found</div>;

  return (
    <div className="message-view-container">
      <div className="messages-header-left">
        <Link to="/messages"><img src={leftArrow} className="messages-header-icon" alt="" /></Link>
        <h2 className="messages-header-title">Messages</h2>
      </div>
      

      <h2 className="message-title">{msg.title}</h2>

      <div className="message-card">
        <div className="message-header">
          <img src={msg.avatar} className="user-avatar" alt={msg.from} />
          <div>
            <strong>{msg.from}</strong>
            <div className="email">{msg.email}</div>
          </div>
        </div>

        <div className="message-check-box">
          <div className="search-row">
            <input type="text" placeholder="Enter key" />
            <button className="search-btn">Check</button>
          </div>
        </div>

        <textarea className="message-body" defaultValue={msg.body} />

        <div className="info-text">
          <img src={lockTop} alt="" className="lockIconSmal" />
          Messages are encrypted with AES-256 by default
        </div>
      </div>
    </div>
  );
}
