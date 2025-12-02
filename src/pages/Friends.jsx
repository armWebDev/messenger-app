import { friends } from "../data/friends";
import "../styles/Friends.css";
import usersIcon from "../assets/userss.svg"
import usersIconTop from "../assets/user-icon.svg"


export default function Friends() {
  return (
    <div className="friends-container">

      <div className="friends-header">
        <h2><img src={usersIconTop} alt="" />Friends</h2>
        <button className="add-friend-btn">ADD FRIEND</button>
      </div>

      <div className="friends-box">

        {friends.length === 0 ? (
          <div className="friends-empty-state">
            <div className="friends-empty-icon"><img src={usersIcon} alt="" /></div>
            <div className="friends-empty-title">No friends added yet</div>
            <div className="friends-empty-text">
              Search for registered users to add as friends
            </div>
          </div>
        ) : (
          friends.map((f) => (
            <div key={f.id} className="friend-row">
              <div className="friend-info">
                <img src={f.avatar} className="friend-avatar" />
                <span className="friend-name">{f.name}</span>
              </div>

              <button className="write-btn">WRITE</button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}
