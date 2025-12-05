import React, { useState, useEffect } from "react";
import "../styles/SettingsPage.css";
import settingsIcon from "../assets/settings2.svg";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setStoredUser(user);
      setFullName(user.fullName || "");
      setEmail(user.username || "");
    }
  }, []);

  const handleSave = () => {
    if (!storedUser) return;

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let updatedPassword = storedUser.password;

    // Validate password change
    if (currentPassword || newPassword || confirmPassword) {
      if (currentPassword !== storedUser.password) {
        alert("Current password is incorrect!");
        return;
      }

      if (newPassword.trim() === "") {
        alert("New password cannot be empty!");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      updatedPassword = newPassword;
    }

    const updatedUser = {
      ...storedUser,
      fullName,
      username: email,
      password: updatedPassword,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsers = allUsers.map((u) =>
      u.id === storedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">
        <span className="icon">
          <img src={settingsIcon} alt="" />
        </span>
        Settings
      </h1>

      <div className="settings-card">
        <h2 className="section-title">Profile Settings</h2>

        <h2 className="settings-section-title">Profile Settings</h2>

        <div className="settings-profile-row">
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="avatar"
            className="settings-profile-img"
          />

          <div className="inputs">
            <label className="settings-label">Your name</label>
            <input
              className="settings-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="settings-label">Your email</label>
            <input
              className="settings-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <h2 className="settings-section-title">Change Password</h2>

        <label className="settings-label">Current Password</label>
        <input
          className="settings-input"
          type="password"
          placeholder="****************"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label className="settings-label">New Password</label>
        <input
          className="settings-input"
          type="password"
          placeholder="****************"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="settings-label">Confirm New Password</label>
        <input
          className="settings-input"
          type="password"
          placeholder="****************"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="settings-save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
