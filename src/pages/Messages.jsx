import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";   // ← ADD THIS!
import "./Messages.css";
import envIcon from "../assets/Vector.svg";
import emptyMassage from "../assets/emptyMassage.svg";
import { messages } from "../data/message";
import ComposeMessage from "./ComposeMessage";

export default function Messages() {
  const itemsPerPage = 6;
  const [activeTab, setActiveTab] = useState("inbox");
  const [page, setPage] = useState(1);

  const [showCompose, setShowCompose] = useState(false);
  const tabMessages = messages.filter((m) => m.type === activeTab);
  const totalPages = Math.ceil(tabMessages.length / itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const startIndex = (page - 1) * itemsPerPage;
  const currentMessages = tabMessages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const hasMessages = currentMessages.length > 0;

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (showCompose) {
    return <ComposeMessage onClose={() => setShowCompose(false)} />;
  }

  return (
    <div className="messages-wrapper">
      <div className="messages-header-row">
        <div className="messages-header-left">
          <img src={envIcon} className="messages-header-icon" alt="" />
          <h2 className="messages-header-title">Messages</h2>
        </div>

        <button
          className="messages-compose-button"
          onClick={() => setShowCompose(true)}
        >
          COMPOSE
        </button>
      </div>

      <div className="messages-tabs">
        {["inbox", "sent", "received"].map((tab) => (
          <button
            key={tab}
            className={`messages-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className={`messages-content-box ${!hasMessages ? "empty" : ""}`}>
        {!hasMessages ? (
          <div className="messages-empty-state">
            <div className="messages-empty-icon">
              <img src={emptyMassage} alt="" />
            </div>
            <h3>No messages yet</h3>
            <p>Start by composing a secure message</p>
          </div>
        ) : (
          <>
            <div className="messages-list">
              {currentMessages.map((m, idx) => (
                <Link
                  to={`/messages/${m.id}`} 
                  key={`${m.id}-${idx}`}
                  className="message-row"
                >
                  <div className="message-left">
                    <div className="message-from">{m.from}</div>
                    <div className="message-subject">{m.title}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="messages-pagination">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => changePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
