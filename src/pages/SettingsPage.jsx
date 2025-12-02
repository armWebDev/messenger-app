import "../styles/SettingsPage.css";
import settingsIcon from "../assets/settings2.svg"

export default function SettingsPage() {
  return (
    <div className="settings-page">

      <h1 className="settings-title">
        <span className="icon"><img src={settingsIcon} alt="" /></span> Settings
      </h1>

      <div className="settings-card">

        <h2 className="section-title">Profile Settings</h2>

        <div className="profile-row">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="avatar"
            className="profile-img"
          />
          <div className="inputs">
            <label>Your Name</label>
            <input type="text" value="Jon Snow" />

            <label>Your Email</label>
            <input type="email" value="name.surname@gmail.com" />
          </div>
        </div>

        {/* Change Password */}
        <h2 className="section-title">Change Password</h2>

        <label>Current Password</label>
        <input type="password" value="***************" />

        <label>New Password</label>
        <input type="password" value="***************" />

        <label>Confirm New Password</label>
        <input type="password" value="***************" />

      </div>
    </div>
  );
}
