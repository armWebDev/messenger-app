import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myIcon from "../assets/svg.svg";
import data from "../../local.json";
import "./../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || data.users;

    const exists = storedUsers.find((u) => u.username === email);
    if (exists) {
      setError("User with this email already exists");
      return;
    }

    const newUser = {
      id: storedUsers.length ? storedUsers[storedUsers.length - 1].id + 1 : 1,
      fullName: name,
      username: email,
      password: password,
      friends: [],
    };

    const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers, null, 2));

    setName("");
    setEmail("");
    setPassword("");
    setError("");
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">
          <img src={myIcon} alt="" />
        </div>

        <h1 className="auth-main-title">Secure Data Transfer</h1>
        <p className="auth-subtitle">End-to-end encrypted messaging platform</p>

        <div className="auth-tabs">
          <a href="/login" className="auth-tab">
            Login
          </a>
          <a href="/signup" className="auth-tab active">
            Sign Up
          </a>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <label className="auth-label">Your Name</label>
          <input
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
