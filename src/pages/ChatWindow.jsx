import { useState, useEffect } from "react";
import "../styles/ChatWindow.css";

export default function ChatWindow({ friend, onClose }) {
  const storageKey = `chat_${friend.id}`;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ from: friend.name, text: "Hey! 😊" }]);
    }
  }, [friend.id]);

  const saveMessages = (msgs) => {
    localStorage.setItem(storageKey, JSON.stringify(msgs));
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const updated = [...messages, { from: "Me", text: input }];

    setMessages(updated);
    saveMessages(updated);

    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>{friend.name}</span>
        <button className="chat-close-btn" onClick={onClose}>x</button>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.from === "Me" ? "me" : "them"}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
