// src/pages/CustomerProfile.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getAllBookings } from "../services/storageService";
import "../styles/workerprofile.css";

function CustomerProfile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    about: user?.about || "",
    img: user?.img || ""
  });

  const allBookings = getAllBookings();
  const customerBookings = allBookings.filter(b => b.customerId === user?.id || b.customerEmail === user?.email);

  const pendingCount = customerBookings.filter(b => b.status === "Pending").length;
  const completedCount = customerBookings.filter(b => b.status === "Completed").length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
    showToast("Profile updated successfully!", "success");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, img: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "CU";
  const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e11d48" rx="60"/><text x="50%" y="54%" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;

  return (
    <div className="page customer-profile-page">
      <div className="worker-profile-card" style={{ maxWidth: 740 }}>
        <div className="worker-profile-header">
          <img
            src={formData.img || user?.img || defaultAvatar}
            alt={user?.name || "Customer"}
            className="worker-profile-avatar"
          />
          <div style={{ flex: 1 }}>
            <div className="worker-profile-name">{user?.name}</div>
            <div className="worker-profile-meta">📧 {user?.email}</div>
            <div className="worker-profile-meta">
              📍 {user?.location || "Location not set"} {user?.phone && `• 📞 ${user.phone}`}
            </div>
            {user?.about && (
              <div className="worker-profile-meta" style={{ marginTop: 6, fontStyle: "italic", color: "#64748b" }}>
                "{user.about}"
              </div>
            )}

            {!editing && (
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: 14 }}
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile Info
              </button>
            )}
          </div>
        </div>

        {editing && (
          <form onSubmit={handleSave} className="worker-profile-edit-form" style={{ marginTop: 24 }}>
            <div className="worker-profile-edit-avatar-upload">
              <label className="worker-profile-edit-label">Upload Profile Photo:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="worker-profile-edit-fields">
              <label className="worker-profile-edit-label">
                Full Name:
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="worker-profile-edit-input"
                  required
                />
              </label>

              <label className="worker-profile-edit-label">
                Phone Number:
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="worker-profile-edit-input"
                />
              </label>

              <label className="worker-profile-edit-label">
                Default Location / City:
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chennai, Salem, Bangalore"
                  className="worker-profile-edit-input"
                />
              </label>

              <label className="worker-profile-edit-label">
                Bio / Special Instructions:
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={2}
                  className="worker-profile-edit-textarea"
                />
              </label>
            </div>

            <div className="worker-profile-edit-btns">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Customer Stats Strip */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-number">{customerBookings.length}</div>
            <div className="profile-stat-label">Total Appointments</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-number" style={{ color: "#d97706" }}>{pendingCount}</div>
            <div className="profile-stat-label">Pending Confirmation</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-number" style={{ color: "#059669" }}>{completedCount}</div>
            <div className="profile-stat-label">Completed Services</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <Link to="/my-bookings" className="btn btn-primary">
            View My Bookings ({customerBookings.length})
          </Link>
          <Link to="/browse" className="btn btn-secondary">
            Browse Service Professionals
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
