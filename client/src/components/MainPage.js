import React, { useState, useEffect } from "react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#b0b8c1"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#b0b8c1"/></svg>
  ) },
  { key: "profile", label: "Profile", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#b0b8c1"/><rect x="4" y="16" width="16" height="4" rx="2" fill="#b0b8c1"/></svg>
  ) },
  { key: "find", label: "Doctor", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#b0b8c1"/><rect x="10" y="7" width="4" height="10" rx="2" fill="#fff"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#fff"/></svg>
  ) },
  { key: "appointments", label: "Appointment", icon: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="#b0b8c1"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/><rect x="7" y="13" width="7" height="2" rx="1" fill="#fff"/></svg>
  ) }
];

const services = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#2386c8"/><rect x="9" y="6" width="6" height="12" rx="3" fill="#fff"/><rect x="6" y="9" width="12" height="6" rx="3" fill="#fff"/></svg>
    ),
    title: "Specialist Doctors",
    desc: "Access to a wide range of specialist doctors across various medical fields."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#ff7e33"/><rect x="10" y="7" width="4" height="10" rx="2" fill="#fff"/><rect x="7" y="10" width="10" height="4" rx="2" fill="#fff"/></svg>
    ),
    title: "Easy Booking",
    desc: "Book appointments 24/7 with our easy-to-use online scheduling system."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4caf50"/><circle cx="12" cy="10" r="4" fill="#fff"/><rect x="7" y="16" width="10" height="2" rx="1" fill="#fff"/></svg>
    ),
    title: "Patient-Centric Care",
    desc: "We prioritize your health and comfort at every step of your journey."
  }
];

const heroImages = [
  // Doctor with stethoscope
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
  // Medicine and pills
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
  // Hospital corridor
  "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
  // Medical team
  "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=80"
];

export default function MainPage({ user, onNav, onLogout, bookings = [] }) {
  const [active, setActive] = React.useState("dashboard");
  const [slide, setSlide] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(s => (s + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = key => {
    setActive(key);
    if (key !== "dashboard") onNav(key);
  };

  // Find the next upcoming appointment
  const now = new Date();
  const upcoming = Array.isArray(bookings)
    ? bookings
        .filter(b => b.status !== 'cancelled' && new Date(b.datetime) > now)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))[0]
    : null;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "var(--background-light)", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <section className="hero-fullwidth" style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0 0 32px 32px",
        boxShadow: "0 4px 24px rgba(44, 62, 80, 0.07)",
        overflow: "hidden",
        position: "relative",
        minHeight: 420
      }}>
        {/* Image Slider */}
        <div style={{ width: "100%", height: 420, position: "relative" }}>
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Healthcare slide ${idx + 1}`}
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
                position: "absolute",
                left: 0,
                top: 0,
                opacity: slide === idx ? 1 : 0,
                transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)",
                zIndex: 1
              }}
            />
          ))}
          {/* Overlay for readability */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(30, 44, 70, 0.45)",
            zIndex: 2
          }} />
          {/* Text and Buttons overlayed on the image */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            textAlign: "center"
          }}>
            <h1 className="hero-title" style={{ fontSize: 40, fontWeight: 700, margin: 0, color: "#fff", letterSpacing: 1, textShadow: "0 2px 16px rgba(0,0,0,0.25)" }}>
              Welcome to <span className="hero-highlight" style={{ color: "#ffd600" }}>MediBook Pro</span>
            </h1>
            <div className="hero-quote" style={{ fontSize: 20, color: "#fff", margin: "16px 0 24px 0", textShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>Your premium healthcare appointment platform</div>
            <div className="hero-btn-row" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <button className="hero-btn-orange" onClick={() => onNav("find")}>FIND A DOCTOR</button>
              <button className="hero-btn-orange" onClick={() => onNav("appointments")}>MY APPOINTMENTS</button>
            </div>
          </div>
          {/* Navigation dots */}
          <div style={{ position: "absolute", bottom: 16, left: 0, width: "100%", display: "flex", justifyContent: "center", zIndex: 4 }}>
            {heroImages.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setSlide(idx)}
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: slide === idx ? "#ffd600" : "#fff",
                  border: "2px solid #ffd600",
                  margin: "0 6px",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
              />
            ))}
          </div>
        </div>
      </section>
      {/* SVG Wave Divider */}
      <div style={{ width: "100%", overflow: "hidden", lineHeight: 0, marginTop: -10 }}>
        <svg viewBox="0 0 500 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,30 C150,80 350,0 500,30 L500,00 L0,0 Z" style={{ stroke: "none", fill: "#e0f7fa" }}></path>
        </svg>
      </div>
      {/* Upcoming Appointment Section */}
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '32px 0 0 0', background: 'linear-gradient(120deg, #e3f0fa 0%, #f8fafc 100%)', padding: '32px 0' }}>
        <div
          className="upcoming-appointment-card"
          style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(44,62,80,0.13)',
            padding: 36,
            minWidth: 320,
            maxWidth: 480,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            transition: 'transform 0.18s, box-shadow 0.18s',
            cursor: 'pointer',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(35,134,200,0.18)';
            e.currentTarget.style.background = '#e0f7fa';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,62,80,0.13)';
            e.currentTarget.style.background = '#fff';
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2386c8', marginBottom: 8 }}>Upcoming Appointment</div>
          {upcoming ? (
            <>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#26344a' }}>{upcoming.doctorName || upcoming.doctor?.name || 'Doctor'}</div>
              <div style={{ color: '#4caf50', fontWeight: 500 }}>{upcoming.doctor?.specialty || 'Specialty'}</div>
              <div style={{ color: '#888', margin: '8px 0' }}>{new Date(upcoming.datetime).toLocaleString()}</div>
              <div style={{ color: '#444', fontSize: 15 }}>{upcoming.doctor?.hospital || ''}</div>
              <div style={{ marginTop: 10 }}>
                <button className="hero-btn-orange" onClick={() => onNav('appointments')}>View All Appointments</button>
              </div>
            </>
          ) : (
            <div style={{ color: '#888', fontSize: 16 }}>No upcoming appointments found.</div>
          )}
        </div>
      </section>
      {/* Services Section */}
      <section className="services-section">
        <h2 className="services-title">Our Services</h2>
        <div className="services-cards">
          {services.map((s, i) => (
            <div
              className="service-card"
              key={i}
              onClick={i === 0 || i === 1 ? () => onNav('find') : i === 2 ? () => onNav('about') : undefined}
              style={i === 0 || i === 1 || i === 2 ? { cursor: 'pointer', boxShadow: '0 6px 24px rgba(35,134,200,0.10)' } : {}}
            >
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-quote">Ready to book your appointment? <span className="cta-highlight">Your health journey starts here!</span></div>
        <button className="cta-btn" onClick={() => onNav("find")}>Get Started</button>
      </section>
    </div>
  );
}