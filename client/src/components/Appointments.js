import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

function isPast(dateStr, timeStr) {
  // For demo: always return false unless you store real dates
  // Replace with real date logic if you store appointment dates
  return false;
}

export default function Appointments({ user, onNav }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [newDate, setNewDate] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateAppt, setUpdateAppt] = useState(null);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/appointments/my");
      setAppointments(data);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    }
    setLoading(false);
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await apiFetch(`/appointments/${id}`, { method: "DELETE" });
      setAppointments(appts => appts.map(a => a._id === id ? { ...a, status: "cancelled" } : a));
    } catch (err) {
      alert(err.message || "Cancel failed");
    }
  }

  async function handleUpdate(id, appt) {
    if (!newDate || !newTime) return alert("Select new date and time");
    try {
      const datetime = new Date(`${newDate}T${newTime}`);
      const updated = await apiFetch(`/appointments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ datetime })
      });
      setAppointments(appts => appts.map(a => a._id === id ? updated : a));
      setUpdatingId(null);
      setNewDate("");
      setNewTime("");
      setShowUpdateModal(false);
      setUpdateAppt(null);
    } catch (err) {
      alert(err.message || "Update failed");
      setUpdatingId(null);
      setShowUpdateModal(false);
      setUpdateAppt(null);
    }
  }

  const now = new Date();

  return (
    <div className="appointments-page">
      <div className="appointments-title">My Appointments</div>
      {loading ? (
        <div>Loading appointments...</div>
      ) : error ? (
        <div style={{ color: "var(--error-color)", margin: 24 }}>{error}</div>
      ) : appointments.length === 0 ? (
        <div className="appointments-empty">
          <div className="appointments-empty-quote">No appointments found.</div>
          <button className="appointments-book-btn" onClick={() => onNav("find")}>Book Now</button>
        </div>
      ) : (
        <div className="appointments-table-wrap">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => {
                const isPast = new Date(appt.datetime) < now;
                const currentDate = new Date(appt.datetime).toISOString().slice(0, 10);
                const currentTime = new Date(appt.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                return (
                  <tr key={appt._id} className={appt.status === "cancelled" ? "appointments-row-cancelled" : ""}>
                    <td>{appt.doctor?.name || appt.doctorName || "-"}</td>
                    <td>{appt.doctor?.specialty || "-"}</td>
                    <td>
                      {updatingId === appt._id ? (
                        <>
                          {newDate || newTime
                            ? `${newDate || '---- -- --'} ${newTime || '----'}`
                            : new Date(appt.datetime).toLocaleString()}
                        </>
                      ) : (
                        new Date(appt.datetime).toLocaleString()
                      )}
                    </td>
                    <td>
                      <span className={`appointments-status ${appt.status}`}>{isPast ? "Completed" : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</span>
                    </td>
                    <td>
                      {appt.status !== "cancelled" && !isPast && (
                        <>
                          <button
                            className="appointments-cancel-btn appointments-orange-btn"
                            onClick={() => handleCancel(appt._id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="appointments-cancel-btn appointments-orange-btn"
                            style={{ marginLeft: 8 }}
                            onClick={() => {
                              setUpdatingId(appt._id);
                              setNewDate(currentDate);
                              setNewTime(currentTime);
                              setShowUpdateModal(true);
                              setUpdateAppt(appt);
                            }}
                          >
                            Update
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* Update Modal */}
      {showUpdateModal && updateAppt && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="card" style={{ maxWidth: 340, width: "100%", padding: 28, position: "relative" }}>
            <button onClick={() => { setShowUpdateModal(false); setUpdatingId(null); }} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>&times;</button>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Update Appointment</div>
            <div style={{ marginBottom: 14 }}>
              <input
                type="date"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                style={{ marginRight: 4, width: '100%', marginBottom: 10, padding: 8, borderRadius: 8, border: '1.5px solid #e2e8f0' }}
              />
              <select
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 8, border: '1.5px solid #e2e8f0' }}
              >
                <option value="">Select time slot</option>
                {TIME_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                className="appointments-cancel-btn appointments-orange-btn"
                style={{ minWidth: 90 }}
                disabled={!newDate || !newTime}
                onClick={() => handleUpdate(updateAppt._id, updateAppt)}
              >
                Save
              </button>
              <button
                className="appointments-cancel-btn appointments-orange-btn"
                style={{ minWidth: 90, background: '#eee', color: '#2a7fba' }}
                onClick={() => { setShowUpdateModal(false); setUpdatingId(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}