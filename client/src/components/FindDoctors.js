import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import DoctorCard from "./DoctorCard";
import BookingModal from "./BookingModal";
import DoctorProfileModal from "./DoctorProfileModal";

export default function FindDoctors({ bookings, user, onBook }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      setError("");
      try {
        let url = "/doctors";
        if (specialty) url += `?specialty=${encodeURIComponent(specialty)}`;
        const data = await apiFetch(url);
        setDoctors(data);
      } catch (err) {
        setError(err.message || "Failed to load doctors");
      }
      setLoading(false);
    }
    fetchDoctors();
  }, [specialty]);

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const filtered = doctors.filter(d =>
    (!search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  function handleProfile(doctor) {
    setSelectedDoctor(doctor);
    setShowProfile(true);
  }

  function handleBookFromProfile() {
    setShowProfile(false);
    setShowBooking(true);
  }

  function handleBook(appt) {
    setShowBooking(false);
    if (onBook) onBook(appt);
  }

  // Use uploaded images for male and female doctors
  function getEnrichedDoctor(doc, idx) {
    // List of female and male first names used in the code
    const femaleNames = ['Priya', 'Sneha', 'Anjali', 'Neha', 'Sarah', 'Emily', 'Lisa', 'Angela'];
    const maleNames = ['Amit', 'Rahul', 'Vikram', 'Rohit'];
    // Try to extract first name from doc.name
    let firstName = '';
    if (doc.name) {
      const match = doc.name.match(/Dr\.\s+([A-Za-z]+)/);
      if (match) firstName = match[1];
    } else {
      firstName = ['Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Neha'][idx % 8];
    }
    let image = doc.image;
    if (!image) {
      if (femaleNames.includes(firstName)) {
        image = '/doctor_female.jpg';
      } else {
        image = '/doctor_male.jpg';
      }
    }
    // Assign years of experience and languages
    const yearsOfExperience = doc.yearsOfExperience || (5 + (idx % 26));
    const languagesList = [
      ['English', 'Hindi'],
      ['English', 'Hindi', 'Marathi'],
      ['English', 'Hindi', 'Tamil'],
      ['English', 'Hindi', 'Bengali'],
      ['English', 'Hindi', 'Gujarati'],
      ['English', 'Hindi', 'Kannada'],
      ['English', 'Hindi', 'Punjabi'],
      ['English', 'Hindi', 'Malayalam']
    ];
    const languages = doc.languages || languagesList[idx % languagesList.length];
    const locations = [
      'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Hyderabad, India',
      'Chennai, India', 'Kolkata, India', 'Pune, India', 'Ahmedabad, India'
    ];
    return {
      ...doc,
      image,
      rating: doc.rating && doc.rating >= 4.2 ? doc.rating : (4.2 + (idx % 8) * 0.1).toFixed(1),
      reviews: doc.reviews || (120 + (idx % 8) * 30),
      name: doc.name || `Dr. ${['Amit', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Neha'][idx % 8]} ${['Sharma', 'Patel', 'Singh', 'Reddy', 'Mehra', 'Kumar', 'Gupta', 'Joshi'][idx % 8]}`,
      hospital: doc.hospital || `City Hospital, India`,
      specialty: doc.specialty || ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'ENT', 'Neurologist', 'Dentist', 'General Physician'][idx % 8],
      yearsOfExperience,
      languages,
      location: doc.location || locations[idx % locations.length]
    };
  }

  // SVG background graphics
  const bgGraphics = (
    <>
      {/* Abstract SVG Blob */}
      <svg width="700" height="500" style={{ position: 'absolute', top: -100, right: -180, opacity: 0.12, zIndex: 0 }} viewBox="0 0 700 500" fill="none">
        <path d="M 400 60 Q 600 100 650 250 Q 700 400 500 450 Q 300 500 200 400 Q 100 300 180 180 Q 260 60 400 60 Z" fill="#2a7fba" />
      </svg>
      {/* Diagonal Grid Pattern */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.05, zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="20" height="2" fill="#4caf50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
    </>
  );

  return (
    <div className="find-doctors-page" style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      {bgGraphics}
      <div className="find-doctors-title">Find a Doctor</div>
      <div className="find-doctors-searchbar-row">
        <input
          className="find-doctors-searchbar"
          placeholder="Search doctors by name or specialty..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="find-doctors-chips-row">
        <button
          className={`find-doctors-chip${!specialty ? " active" : ""}`}
          onClick={() => setSpecialty("")}
        >
          All Specialties
        </button>
        {specialties.map(s => (
          <button
            key={s}
            className={`find-doctors-chip${specialty === s ? " active" : ""}`}
            onClick={() => setSpecialty(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading doctors...</div>
      ) : error ? (
        <div style={{ color: "var(--error-color)", margin: 24 }}>{error}</div>
      ) : (
        <div className="find-doctors-cards-grid">
          {filtered.length === 0 ? (
            <div className="find-doctors-empty">No doctors found.</div>
          ) : (
            filtered.map((doc, idx) => {
              const enriched = getEnrichedDoctor(doc, idx);
              return (
                <DoctorCard
                  key={enriched._id || idx}
                  doctor={enriched}
                  booked={bookings.some(b => b.doctorId === doc._id && b.status !== "cancelled")}
                  onProfile={() => handleProfile(enriched)}
                  onBook={() => {
                    setSelectedDoctor(enriched);
                    setShowBooking(true);
                  }}
                />
              );
            })
          )}
        </div>
      )}
      {showProfile && selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onBook={handleBookFromProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
      {showBooking && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          user={user}
          onBook={handleBook}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
