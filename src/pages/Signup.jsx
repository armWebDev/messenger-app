import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myIcon from "../assets/svg.svg";
import data from "../../local.json";
import emailjs from "@emailjs/browser"; 
import "./../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    emailjs.init("LKYqPPj3YkXL0TbTV");
  }, []);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(t);
  }, [error]);

  const generateCode = () => Math.floor(100000 + Math.random() * 900000);

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
    if (storedUsers.find((u) => u.username === email)) {
      setError("User with this email already exists");
      return;
    }

    const code = generateCode();
    setVerificationCode(code);

    localStorage.setItem(
      "tempUser",
      JSON.stringify({ name, email, password, code })
    );

    const expirationTime = new Date(Date.now() + 15 * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );

    emailjs
      .send("service_u3nne0i", "template_kpofckr", {
        passcode: code,
        time: expirationTime,
        email: email,
      })
      .then(() => {
        setCodeSent(true);
      })
      .catch(() => {
        setError("Failed to send verification code");
      });
  };

  const handleVerifyCode = () => {
    const tempUser = JSON.parse(localStorage.getItem("tempUser"));
    if (!tempUser) return setError("No signup in progress");

    if (parseInt(inputCode) === tempUser.code) {
      const storedUsers =
        JSON.parse(localStorage.getItem("users")) || data.users;

      const newUser = {
        id: storedUsers.length ? storedUsers[storedUsers.length - 1].id + 1 : 1,
        fullName: tempUser.name,
        username: tempUser.email,
        password: tempUser.password,
        friends: [],
      };

      localStorage.setItem(
        "users",
        JSON.stringify([...storedUsers, newUser], null, 2)
      );
      localStorage.removeItem("tempUser");

      alert("Account verified and created!");
      navigate("/login");
    } else {
      setError("Verification code is incorrect");
    }
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

        {!codeSent ? (
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
        ) : (
          <div className="auth-form">
            <p className="auth-error">Check your email for the verification code!</p>
            <input
              className="auth-input"
              placeholder="Enter verification code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button onClick={handleVerifyCode} className="auth-button">
              Verify Code
            </button>
            {error && <p className="auth-error">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
