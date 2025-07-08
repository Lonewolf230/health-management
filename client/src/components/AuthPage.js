import React, { useState } from "react";
import { apiFetch, setToken } from "../api";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regAge, setRegAge] = useState("");
  const [regBlood, setRegBlood] = useState("");
  // Error and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setLoading(false);
      onAuth(res.user);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    if (!regName || !regEmail || !regPassword || !regConfirm || !regAge || !regBlood) {
      setError("Please fill all fields.");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword, age: regAge, blood: regBlood })
      });
      setLoading(false);
      setIsLogin(true); // Go to login page after register
      setError("");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      background: "#f4f8fb"
    }}>
      {/* Decorative SVG background graphic */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 220,
          zIndex: 0
        }}
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#2a7fba"
          fillOpacity="0.18"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
      <div style={{
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        maxWidth: 440,
        width: "100%",
        padding: "56px 40px 40px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1,
        marginTop: 40,
        marginBottom: 40
      }}>
        <div style={{ marginBottom: 18 }}>
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="#2a7fba"/>
            <rect x="9" y="6" width="6" height="12" rx="3" fill="#fff"/>
            <rect x="6" y="9" width="12" height="6" rx="3" fill="#fff"/>
          </svg>
        </div>
        <div style={{
          fontWeight: 800,
          fontSize: 32,
          textAlign: "center",
          marginBottom: 4,
          lineHeight: 1.1
        }}>
          Welcome to <span style={{ color: "#2a7fba" }}>MediBook</span> <span style={{ color: "#ff7e33" }}>Pro</span>
        </div>
        <div style={{
          textAlign: "center",
          color: "#888",
          fontSize: 18,
          marginBottom: 24,
          marginTop: 4
        }}>
          Sign in to your account
        </div>
        {isLogin ? (
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <div style={{ marginBottom: 32 }}>
              <label style={{
                fontWeight: 500,
                color: "#444",
                display: "block",
                marginBottom: 8
              }}>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                style={{ width: "100%", marginBottom: 0, padding: "14px 16px", fontSize: 17, borderRadius: 8, border: "1px solid #e0e6ed", background: "#f4f8fb" }}
                autoComplete="username"
              />
            </div>
            <div style={{ marginBottom: 40 }}>
              <label style={{
                fontWeight: 500,
                color: "#444",
                display: "block",
                marginBottom: 8
              }}>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                style={{ width: "100%", marginBottom: 0, padding: "14px 16px", fontSize: 17, borderRadius: 8, border: "1px solid #e0e6ed", background: "#f4f8fb" }}
                autoComplete="current-password"
              />
            </div>
            <button className="btn-primary" type="submit" style={{
              width: "100%",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 10,
              padding: "12px 0",
              marginBottom: 8
            }} disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
            {error && <div style={{ color: "var(--error-color)", marginTop: 10, textAlign: "center" }}>{error}</div>}
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
                autoComplete="name"
              />
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
                autoComplete="username"
              />
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
              <input
                className="form-control"
                type="number"
                placeholder="Age"
                value={regAge}
                onChange={e => setRegAge(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
              />
              <select
                className="form-control"
                value={regBlood}
                onChange={e => setRegBlood(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
                required
              >
                <option value="" disabled>Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
                autoComplete="new-password"
              />
              <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                style={{ flex: 1, marginBottom: 0 }}
                autoComplete="new-password"
              />
            </div>
            <button className="btn-primary" type="submit" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <div style={{ color: "var(--error-color)", marginTop: 8 }}>{error}</div>}
          </form>
        )}
        <div className="text-center" style={{ marginTop: 18, fontSize: 15 }}>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={e => { e.preventDefault(); setIsLogin(false); setError(""); }} style={{ color: "#2a7fba", fontWeight: 600 }}>
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={e => { e.preventDefault(); setIsLogin(true); setError(""); }} style={{ color: "#2a7fba", fontWeight: 600 }}>
                Login
              </a>
            </>
          )}
        </div>
      </div>
      {/* Additional SVG graphic at the bottom */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 180,
          zIndex: 0
        }}
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#ff7e33"
          fillOpacity="0.13"
          d="M0,288L60,272C120,256,240,224,360,197.3C480,171,600,149,720,154.7C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
      {/* Third SVG graphic for extra background effect */}
      <svg
        style={{
          position: "absolute",
          top: 120,
          right: 0,
          width: 320,
          height: 120,
          zIndex: 0
        }}
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <ellipse cx="160" cy="60" rx="160" ry="60" fill="#2a7fba" fillOpacity="0.07" />
      </svg>
    </div>
  );
}