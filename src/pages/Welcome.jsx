import React from "react";
import "../styles/Welcome.css";

export default function Welcome() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="welcome-title">
          Welcome  {currentUser?.fullName.split(' ')[0]}👋
        </h1>

        <p className="welcome-text">
          Select a conversation to start sending secure messages.
        </p>

        <p className="welcome-subtext">
          Your data is encrypted end-to-end for maximum privacy.
        </p>
      </div>
    </div>
  );
}
