import React from "react";

export default function DoctorCard({ doctor, booked, onProfile, onBook }) {
  return (
    <div className="doctor-card-modern">
      <div className="doctor-card-img-wrap">
        <img src={doctor.image} alt={doctor.name} className="doctor-card-img" style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </div>
      <div className="doctor-card-content">
        <div className="doctor-card-name">{doctor.name}</div>
        <div className="doctor-card-specialty-chip">{doctor.specialty}</div>
        <div className="doctor-card-hospital">{doctor.hospital}</div>
        <div className="doctor-card-rating">
          <span className="doctor-card-star">★</span> {doctor.rating} <span className="doctor-card-reviews">({doctor.reviews} reviews)</span>
        </div>
        <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 10 }}>
          <button
            className="doctor-card-book-btn"
            onClick={onBook}
            disabled={booked}
          >
            {booked ? "Already Booked" : "Book Appointment"}
          </button>
          <button
            className="doctor-card-book-btn"
            style={{ background: '#fff', color: '#2a7fba', border: '2px solid #2a7fba' }}
            onClick={onProfile}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}