// src/pages/BookWorker.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUserById, createBooking, getAllReviews } from "../services/storageService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { LocationIcon, StarIcon, ShieldCheckIcon, PhoneIcon, CalendarIcon, ClockIcon } from "../components/Icons";
import "../styles/forms.css";

function BookWorker({ onAddBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();
  const { showToast } = useToast();

  const [worker, setWorker] = useState(null);
  const [workerReviews, setWorkerReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayStr = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [durationHours, setDurationHours] = useState(2);
  const [address, setAddress] = useState(user?.location || "");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const found = getUserById(id);
    if (found && found.role === "worker") {
      setWorker(found);
      const reviews = getAllReviews().filter(r => String(r.workerId) === String(id));
      setWorkerReviews(reviews);
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast("Please log in as a customer to book this worker.", "info");
      navigate("/login", { state: { returnTo: `/book/${id}` } });
      return;
    }

    if (role === "worker") {
      showToast("You are currently logged in as a Worker. Please switch to a Customer account to book services.", "warning");
      return;
    }

    if (!date || !time) {
      showToast("Please select a date and time for the appointment.", "warning");
      return;
    }

    setSubmitting(true);

    const rateNum = Number(worker.rate) || 300;
    const totalCost = rateNum * durationHours;

    try {
      const newBooking = createBooking({
        worker,
        customer: user,
        service: worker.service,
        date,
        time,
        hours: durationHours,
        totalCost,
        address,
        notes,
        rate: rateNum
      });

      if (onAddBooking) {
        onAddBooking(newBooking);
      }

      showToast(`🎉 Appointment confirmed with ${worker.name}!`, "success");
      navigate("/my-bookings");
    } catch {
      showToast("Error processing booking. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page" style={{ textAlign: "center", padding: "60px 20px" }}>
        <p>Loading worker profile...</p>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="page" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Service Professional Not Found</h2>
        <p>The worker you are looking for does not exist or has been removed.</p>
        <Link to="/browse" className="btn btn-primary" style={{ marginTop: 20 }}>
          Back to Browse Workers
        </Link>
      </div>
    );
  }

  const initials = worker.name ? worker.name.slice(0, 2).toUpperCase() : "WO";
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

  const rateNum = Number(worker.rate) || 300;
  const estimatedTotal = rateNum * durationHours;

  return (
    <div className="page book-worker-page">
      <div className="book-worker-container" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 36, alignItems: "flex-start" }}>
        {/* Worker Summary Column */}
        <div className="worker-details-card" style={{ background: "#ffffff", borderRadius: 28, padding: 32, border: "1.5px solid rgba(15, 23, 42, 0.08)", boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)" }}>
          <div className="worker-details-header" style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #e2e8f0" }}>
            <img
              src={worker.img || defaultAvatar}
              alt={worker.name}
              style={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover", border: "3px solid #ffffff", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
            />
            <div>
              <span className="badge-pill">{worker.service}</span>
              <h2 style={{ fontSize: "1.6rem", margin: "6px 0 2px 0", color: "#0f172a" }}>{worker.name}</h2>
              <div style={{ color: "#64748b", fontSize: "0.94rem", fontWeight: 600 }}>{worker.title}</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                {worker.rating && worker.rating > 0 ? (
                  <>
                    <StarIcon size={16} color="#f59e0b" />
                    <span style={{ color: "#0f172a", fontWeight: 800 }}>{Number(worker.rating).toFixed(1)}</span>
                    <span style={{ color: "#64748b", fontSize: "0.88rem" }}> ({worker.reviewCount || 1} verified {worker.reviewCount === 1 ? "review" : "reviews"})</span>
                  </>
                ) : (
                  <span className="badge-verified">
                    <ShieldCheckIcon size={14} color="#059669" />
                    Verified Trade Partner
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: "0.95rem" }}>
              <LocationIcon size={16} color="#e11d48" />
              <strong>Location:</strong> {worker.location || "Local Area"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: "0.95rem" }}>
              <strong>Experience:</strong> {worker.experience || "3+ years"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: "0.95rem" }}>
              <strong>Hourly Rate:</strong> <span style={{ color: "#e11d48", fontWeight: 900, fontSize: "1.1rem" }}>₹{rateNum}/hr</span>
            </div>
            {worker.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: "0.95rem" }}>
                <PhoneIcon size={16} color="#e11d48" />
                <strong>Direct Contact:</strong> {worker.phone}
              </div>
            )}

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>About {worker.name}</h4>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.6, fontSize: "0.94rem" }}>
                {worker.about || "Experienced service provider on HelpUp committed to top quality craftsmanship."}
              </p>
            </div>

            {/* Verified Customer Reviews */}
            {workerReviews.length > 0 && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 14px 0", color: "#0f172a" }}>
                  Verified Client Reviews ({workerReviews.length})
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {workerReviews.map(r => (
                    <div key={r.id} style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: 14, border: "1.5px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", marginBottom: 4 }}>
                        <strong style={{ color: "#0f172a" }}>{r.customerName}</strong>
                        <span style={{ color: "#f59e0b", fontWeight: 800 }}>★ {r.rating} / 5</span>
                      </div>
                      {r.comment && <p style={{ margin: 0, color: "#475569", fontSize: "0.92rem", fontStyle: "italic" }}>"{r.comment}"</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointment Scheduling Column */}
        <div style={{ background: "#ffffff", borderRadius: 28, padding: 36, border: "1.5px solid rgba(15, 23, 42, 0.08)", boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)" }}>
          <h2 style={{ fontSize: "2rem", margin: "0 0 8px 0", color: "#0f172a", fontWeight: 900 }}>Schedule Appointment</h2>
          <p style={{ color: "#64748b", margin: "0 0 24px 0", fontSize: "1.05rem" }}>
            Confirm your preferred date, time slot, and estimated service duration.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Interactive Duration Selector */}
            <div className="form-field">
              <label>Estimated Service Duration</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                {[1, 2, 3, 4, 8].map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`btn ${durationHours === h ? "btn-primary" : "btn-secondary"} btn-sm`}
                    style={{ borderRadius: 12, fontWeight: 700 }}
                    onClick={() => setDurationHours(h)}
                  >
                    {h === 8 ? "Full Day (8h)" : `${h} ${h === 1 ? "Hour" : "Hours"}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>
                  <CalendarIcon size={15} color="#e11d48" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  <ClockIcon size={15} color="#e11d48" />
                  Preferred Time *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>
                <LocationIcon size={15} color="#e11d48" />
                Service Address / Location *
              </label>
              <input
                type="text"
                placeholder="House / Apartment no., Street, City"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Task Instructions / Problem Details</label>
              <textarea
                placeholder="Describe what needs repair, cleaning, or tutoring in detail..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Live Pricing Breakdown Card */}
            <div style={{ background: "#f8fafc", borderRadius: 18, border: "1.5px dashed #cbd5e1", padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.95rem", color: "#475569" }}>
                <span>Rate ({durationHours} {durationHours === 1 ? "hr" : "hrs"} × ₹{rateNum}/hr):</span>
                <span>₹{estimatedTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.95rem", color: "#475569" }}>
                <span>Platform Booking Fee:</span>
                <span style={{ color: "#059669", fontWeight: 700 }}>₹0 (FREE)</span>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "10px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900, color: "#0f172a" }}>
                <span>Estimated Total:</span>
                <span style={{ color: "#e11d48" }}>₹{estimatedTotal}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "14px", fontSize: "1.05rem" }} disabled={submitting}>
              {submitting ? "Confirming Appointment..." : `Schedule with ${worker.name} • ₹${estimatedTotal}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookWorker;
