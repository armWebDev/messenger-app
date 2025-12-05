import { useParams, Link } from "react-router-dom";
import { messages } from "../data/message"; 
import "../styles/MessageView.css";

export default function MessageView() {
  const { id } = useParams();
  const msg = messages.find((m) => m.id === Number(id));

  if (!msg) return <div>Message not found</div>;

  return (
    <div className="message-view-container">

      <Link to="/messages" className="back-btn">← Back</Link>

      <h2 className="message-title">{msg.title}</h2> 

      <div className="message-card">
        
       


        <div className="message-header">
          <img src={msg.avatar} className="user-avatar" />
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

        <textarea
          className="message-body"
          defaultValue={msg.body}
        />

        <div className="info-text">
          🔒 Messages are encrypted with AES-256 by default
        </div>
      </div>

    </div>
  );
}
