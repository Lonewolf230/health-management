import React, { useState, useEffect } from "react";
import { apiFetch } from "../api";

export default function Profile({ user, setUser, onBack }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    age: user.age || "",
    blood: user.blood || "",
    city: user.city || "",
    state: user.state || "",
    password: "",
    newPassword: "",
    confirmNew: ""
  });
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Use a random person image (not a doctor) as default
  const defaultProfilePic = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&facepad=2.5&w=400&q=80";

  // Indian states and sample cities
  const stateCityMap = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur']
  };
  const stateList = Object.keys(stateCityMap);
  const cityList = form.state && stateCityMap[form.state] ? stateCityMap[form.state] : [];

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    setLoading(true);
    setErr("");
    try {
      const data = await apiFetch("/auth/me");
      setForm(f => ({ ...f, ...data }));
      setUser(data);
    } catch (e) {
      setErr(e.message || "Failed to load profile");
    }
    setLoading(false);
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setErr(""); setMsg("");
    if (!form.name || !form.email) {
      setErr("Name and email are required.");
      return;
    }
    if (form.newPassword && form.newPassword !== form.confirmNew) {
      setErr("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const updated = await apiFetch("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age: form.age,
          blood: form.blood,
          city: form.city,
          state: form.state,
          password: form.password,
          newPassword: form.newPassword
        })
      });
      setUser(updated);
      setMsg("Profile updated!");
      setEdit(false);
    } catch (e) {
      setErr(e.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="fade-in" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: 'relative', background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)', overflow: 'hidden' }}>
      {/* Abstract SVG Blob */}
      <svg width="700" height="500" style={{ position: 'absolute', top: -120, right: -180, opacity: 0.13, zIndex: 0 }} viewBox="0 0 700 500" fill="none">
        <path d="M 400 60 Q 600 100 650 250 Q 700 400 500 450 Q 300 500 200 400 Q 100 300 180 180 Q 260 60 400 60 Z" fill="#2386c8" />
      </svg>
      {/* Diagonal Grid Pattern */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.06, zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="profilegrid" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="20" height="2" fill="#4caf50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#profilegrid)" />
      </svg>
      <div className="card shadow-lg" style={{
        width: '100%',
        maxWidth: 600,
        minHeight: 520,
        margin: '40px 0',
        padding: 48,
        background: 'linear-gradient(120deg, #e3f0fa 0%, #f8fafc 100%)',
        borderRadius: 32,
        boxShadow: '0 12px 48px rgba(44,62,80,0.18)',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Profile Picture */}
        <img
          src={user.image || defaultProfilePic}
          alt="Profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            boxShadow: '0 4px 24px rgba(44,62,80,0.13)',
            border: '4px solid #fff',
            marginBottom: 18,
            background: '#e0f7fa'
          }}
        />
        <div className="brand-logo text-center" style={{ marginBottom: 24, fontSize: 28, color: '#2386c8', fontWeight: 700 }}>
          Profile
        </div>
        {loading ? (
          <div>Loading profile...</div>
        ) : !edit ? (
          <>
            <div style={{ marginBottom: 16 }}><b>Name:</b> {form.name}</div>
            <div style={{ marginBottom: 16 }}><b>Email:</b> {form.email}</div>
            <div style={{ marginBottom: 16 }}><b>Age:</b> {form.age || <span style={{ color: '#aaa' }}>Not set</span>}</div>
            <div style={{ marginBottom: 16 }}><b>Blood Group:</b> {form.blood || <span style={{ color: '#aaa' }}>Not set</span>}</div>
            <button className="btn-primary" style={{ width: "100%", marginBottom: 12 }} onClick={() => setEdit(true)}>Edit Profile</button>
            <button className="form-control" style={{ width: "100%" }} onClick={onBack}>Back to Dashboard</button>
            {msg && <div style={{ color: "var(--success-color)", marginTop: 10 }}>{msg}</div>}
            {err && <div style={{ color: "var(--error-color)", marginTop: 10 }}>{err}</div>}
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'flex', gap: 18, marginBottom: 22 }}>
              <input className="form-control" name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <input className="form-control" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex', gap: 18, marginBottom: 22 }}>
              <input className="form-control" name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
              <input className="form-control" name="blood" type="text" placeholder="Blood Group" value={form.blood} onChange={handleChange} />
            </div>
            <hr style={{ margin: '32px 0 24px 0' }} />
            <div style={{ display: 'flex', gap: 18, marginBottom: 22 }}>
              <input className="form-control" name="password" type="password" placeholder="Current Password (for update)" value={form.password} onChange={handleChange} />
              <input className="form-control" name="newPassword" type="password" placeholder="New Password (optional)" value={form.newPassword} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <input className="form-control" name="confirmNew" type="password" placeholder="Confirm New Password" value={form.confirmNew} onChange={handleChange} />
            </div>
            <button className="btn-primary" type="submit" style={{ width: "100%", marginBottom: 10 }} disabled={loading}>{loading ? "Updating..." : "Update Profile"}</button>
            <button className="form-control" style={{ width: "100%" }} onClick={e => { e.preventDefault(); setEdit(false); setErr(""); }}>Cancel</button>
            {err && <div style={{ color: "var(--error-color)", marginTop: 10 }}>{err}</div>}
            {msg && <div style={{ color: "var(--success-color)", marginTop: 10 }}>{msg}</div>}
          </form>
        )}
      </div>
    </div>
  );
} 