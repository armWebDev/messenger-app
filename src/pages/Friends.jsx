import { useState } from "react";
import { friends } from "../data/friends";
import "../styles/Friends.css";
import usersIcon from "../assets/userss.svg";
import usersIconTop from "../assets/user-icon.svg";

export default function Friends() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="friends-container">
      <div className="friends-header">
        <h2>
          <img src={usersIconTop} alt="" />
          Friends
        </h2>
        <button
          className="add-friend-btn"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? "CANCEL" : "ADD FRIEND"}
        </button>
      </div>

      {isAdding ? (
        <div className="friends-search-box">
          <label>Search by name or ID</label>
          <div className="search-row">
            <input type="text" placeholder="Select friend" />
            <button className="search-btn">SEARCH</button>
          </div>
        </div>
      ) : (
        <div className="friends-box">
          {friends.length === 0 ? (
            <div className="friends-empty-state">
              <div className="friends-empty-icon">
                <img src={usersIcon} alt="" />
              </div>
              <div className="friends-empty-title">No friends added yet</div>
              <div className="friends-empty-text">
                Search for registered users to add as friends
              </div>
            </div>
          ) : (
            friends.map((f) => (
              <div key={f.id} className="friend-row">
                <div className="friend-info">
                  <img src={f.avatar} className="friend-avatar" alt={f.name} />
                  <span className="friend-name">{f.name}</span>
                </div>
                <button className="write-btn">WRITE</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
