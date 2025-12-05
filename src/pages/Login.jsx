import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import protectIcon from "../assets/svg.svg";
import data from "../../local.json";
import "./../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔥 Auto-hide error after 2 seconds
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const users = [...storedUsers, ...data.users];

    const user = users.find(
      (u) => u.username === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/welcome");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">
          <img src={protectIcon} alt="" />
        </div>

        <h1 className="auth-main-title">Secure Data Transfer</h1>
        <p className="auth-subtitle">End-to-end encrypted messaging platform</p>

        <div className="auth-tabs">
          <a href="/login" className="auth-tab active">Login</a>
          <a href="/signup" className="auth-tab">Sign Up</a>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
}
