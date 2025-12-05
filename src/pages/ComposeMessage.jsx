import React from "react";
import "../styles/ComposeMessage.css";
import lockTop from "../assets/lockTop.svg"


export default function ComposeMessage({ onClose }) {
  return (
    <div className="compose-wrapper">
      <div className="compose-header">

        <h2><img src={lockTop} alt="" />Compose Secure Message</h2>
      </div>

      <div className="compose-card">
        <label className="input-label">To</label>
        <input className="input-field" type="text" placeholder="Type" />

        <label className="input-label">Subject</label>
        <input className="input-field" type="text" placeholder="Message subject" />

        <label className="input-label">Message</label>
        <textarea
          className="textarea-field"
          placeholder="Type your message"
        ></textarea>

        <div className="encryption-info">
          🔒 Messages are encrypted with AES-256 by default
        </div>

        <div className="btn-row">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="send-btn">Send Message</button>
        </div>
      </div>
    </div>
  );
}
