import React from "react";

// SVG graphics for background
const bgGraphics = (
  <>
    {/* Abstract SVG Blob */}
    <svg width="700" height="500" style={{ position: 'absolute', top: -120, right: -180, opacity: 0.13, zIndex: 0 }} viewBox="0 0 700 500" fill="none">
      <path d="M 400 60 Q 600 100 650 250 Q 700 400 500 450 Q 300 500 200 400 Q 100 300 180 180 Q 260 60 400 60 Z" fill="#2386c8" />
    </svg>
    {/* Diagonal Grid Pattern */}
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.06, zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0" y="0" width="20" height="2" fill="#4caf50" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Stethoscope */}
    <svg width="140" height="140" style={{ position: 'absolute', top: 100, left: 30, opacity: 0.10, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="#2386c8" strokeWidth="4" /><path d="M32 44c6 0 10-4 10-10V18" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" /><circle cx="32" cy="44" r="4" fill="#ff7e33" /></svg>
    {/* Medical cross */}
    <svg width="100" height="100" style={{ position: 'absolute', top: 320, right: 40, opacity: 0.08, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><rect x="28" y="8" width="8" height="48" rx="4" fill="#2386c8"/><rect x="8" y="28" width="48" height="8" rx="4" fill="#2386c8"/></svg>
    {/* Heart */}
    <svg width="120" height="120" style={{ position: 'absolute', bottom: 120, left: 100, opacity: 0.10, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><path d="M32 56s-20-12-20-28a12 12 0 0 1 24 0 12 12 0 0 1 24 0c0 16-20 28-20 28z" stroke="#ff7e33" strokeWidth="4" fill="none"/></svg>
    {/* Pills */}
    <svg width="120" height="120" style={{ position: 'absolute', bottom: 40, right: 60, opacity: 0.09, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><rect x="12" y="36" width="40" height="16" rx="8" fill="#4caf50"/><rect x="12" y="12" width="40" height="16" rx="8" fill="#ff7e33"/></svg>
    {/* DNA Helix */}
    <svg width="120" height="120" style={{ position: 'absolute', top: 200, left: 220, opacity: 0.08, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><path d="M16 8c16 16 32 32 32 48" stroke="#2386c8" strokeWidth="4"/><path d="M48 8C32 24 16 40 16 56" stroke="#ff7e33" strokeWidth="4"/><ellipse cx="32" cy="32" rx="6" ry="2" fill="#4caf50"/></svg>
    {/* Syringe */}
    <svg width="90" height="90" style={{ position: 'absolute', top: 60, right: 120, opacity: 0.09, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><rect x="40" y="10" width="8" height="32" rx="2" fill="#2386c8"/><rect x="16" y="42" width="32" height="8" rx="2" fill="#ff7e33"/><rect x="28" y="18" width="8" height="24" rx="2" fill="#4caf50"/></svg>
    {/* ECG Wave */}
    <svg width="180" height="60" style={{ position: 'absolute', bottom: 10, left: 320, opacity: 0.07, zIndex: 1 }} viewBox="0 0 180 60" fill="none"><polyline points="0,30 30,30 40,10 60,50 80,20 100,40 120,10 140,30 180,30" stroke="#2386c8" strokeWidth="4" fill="none"/></svg>
    {/* Bandage */}
    <svg width="80" height="80" style={{ position: 'absolute', top: 420, left: 40, opacity: 0.08, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><rect x="14" y="28" width="36" height="8" rx="4" fill="#ff7e33"/><rect x="28" y="14" width="8" height="36" rx="4" fill="#4caf50"/></svg>
    {/* Molecules */}
    <svg width="100" height="100" style={{ position: 'absolute', bottom: 180, right: 120, opacity: 0.08, zIndex: 1 }} viewBox="0 0 64 64" fill="none"><circle cx="16" cy="32" r="8" fill="#2386c8"/><circle cx="48" cy="16" r="6" fill="#ff7e33"/><circle cx="48" cy="48" r="6" fill="#4caf50"/><line x1="22" y1="32" x2="42" y2="18" stroke="#2386c8" strokeWidth="2"/><line x1="22" y1="32" x2="42" y2="46" stroke="#4caf50" strokeWidth="2"/></svg>
  </>
);

export default function About({ onBack }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)',
      padding: '0 0 60px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative SVG Wave */}
      <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
        <svg viewBox="0 0 500 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path d="M0,40 C150,100 350,0 500,40 L500,00 L0,0 Z" style={{ stroke: 'none', fill: '#fff' }}></path>
        </svg>
      </div>
      {/* Background SVG graphics */}
      {bgGraphics}
      <div style={{
        maxWidth: 850,
        margin: '80px auto 0 auto',
        padding: 36,
        background: 'linear-gradient(120deg, #e3f0fa 0%, #f8fafc 100%)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(44,62,80,0.13)',
        textAlign: 'left',
        position: 'relative',
        zIndex: 3
      }}>
        {/* Header with image */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", marginBottom: 24 }}>
          <img
            src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=200&q=80"
            alt="Medical Team"
            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 12px rgba(44,62,80,0.10)" }}
          />
          <div>
            <h1 style={{ color: "#2386c8", fontWeight: 700, fontSize: 32, marginBottom: 8 }}>About MediBook Pro</h1>
            <p style={{ fontSize: 18, color: "#333", marginBottom: 0 }}>
              <b>MediBook Pro</b> is your trusted partner in healthcare appointment management. Our mission is to make healthcare accessible, efficient, and patient-focused by connecting you with top medical professionals and streamlining the booking process.
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
          alt="Medicine and Pills"
          style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12, marginBottom: 28, boxShadow: "0 2px 12px rgba(44,62,80,0.10)" }}
        />
        <h2 style={{ color: "#ff7e33", fontSize: 24, marginBottom: 12 }}>Our Mission</h2>
        <p style={{ fontSize: 16, color: "#444", marginBottom: 18 }}>
          We believe every patient deserves timely, convenient, and quality care. MediBook Pro empowers you to find the right doctor, book appointments with ease, and manage your health journey—all in one place.
        </p>
        <h2 style={{ color: "#4caf50", fontSize: 22, marginBottom: 12 }}>Key Features</h2>
        <ul style={{ fontSize: 16, color: "#444", marginBottom: 18, paddingLeft: 24 }}>
          <li>Wide network of specialist doctors</li>
          <li>24/7 online appointment booking</li>
          <li>Personalized patient profiles</li>
          <li>Easy appointment management and reminders</li>
          <li>Secure and private health data</li>
          <li>Patient-centric care and support</li>
        </ul>
        {/* Patient-Centric Care Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", margin: "40px 0 24px 0" }}>
          <img
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=300&q=80"
            alt="Hospital Corridor"
            style={{ width: 180, height: 120, borderRadius: 12, objectFit: "cover", boxShadow: "0 2px 12px rgba(44,62,80,0.10)" }}
          />
          <div>
            <h2 style={{ color: "#4caf50", fontSize: 22, marginBottom: 10 }}>How is MediBook Pro Patient-Centric?</h2>
            <ul style={{ fontSize: 16, color: "#444", marginBottom: 0, paddingLeft: 20 }}>
              <li><b>Personalized Experience:</b> Patients can view, manage, and update their profiles and appointments, ensuring care is tailored to their needs.</li>
              <li><b>Easy Access:</b> Find and book appointments with the right specialists anytime, anywhere, reducing wait times and barriers to care.</li>
              <li><b>Supportive Journey:</b> Appointment reminders, clear communication, and a user-friendly interface help patients feel supported at every step.</li>
              <li><b>Privacy & Security:</b> Patient data is protected with robust security measures, so users can focus on their health with peace of mind.</li>
              <li><b>Continuous Improvement:</b> We listen to patient feedback to continually enhance our platform and services.</li>
            </ul>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80"
          alt="Doctor with Stethoscope"
          style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 12, marginBottom: 28, boxShadow: "0 2px 12px rgba(44,62,80,0.10)" }}
        />
        <p style={{ fontSize: 16, color: "#444", marginBottom: 24 }}>
          At MediBook Pro, your health and comfort are our top priorities. We are committed to providing a seamless, supportive, and empowering healthcare experience for every patient.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <button onClick={onBack} style={{ background: "#2386c8", color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Back</button>
        </div>
      </div>
    </div>
  );
} 