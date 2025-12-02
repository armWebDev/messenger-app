import { useState } from "react";
import "./EncryptionPage.css";
import lockTop from "../assets/lockTop.svg"

export default function EncryptionPage() {
  const [selected, setSelected] = useState("AES");

  return (
    <div className="encryption-page">
      <div className="encryption-header">

        <h2><img src={lockTop} alt="" />Encryption</h2>
      </div>
      <div className="encryption-options">
        {["AES", "RSA", "Blowfish"].map((algo) => (
          <label
            key={algo}
            className={`option`}
          >
            <input
              type="radio"
              name="encryption"
              value={algo}
              checked={selected === algo}
              onChange={() => setSelected(algo)}
            />
            <div className="option-content">
              <div className="option-title">
                {algo} {algo === "AES" && <span className="recommended">Recommended</span>}
              </div>
              <div className="option-desc">
                {algo === "AES" &&
                  "Symmetric encryption. Fast and highly secure. Industry standard for secure data transfer."}
                {algo === "RSA" &&
                  "Asymmetric encryption. Uses a public and a private key. Provides strong security for key exchange and digital signatures."}
                {algo === "Blowfish" &&
                  "Symmetric encryption. Fast and flexible. Designed for efficient data encryption with variable key lengths."}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
