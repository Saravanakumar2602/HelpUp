// src/pages/AddJob.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { ALL_SERVICES } from "../data/servicesData";
import { createJob } from "../services/storageService";
import "../styles/forms.css";

function AddJob({ onAddJob }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    service: user?.service || "Plumbing",
    description: "",
    rate: user?.rate || 350,
    location: user?.location || "Chennai",
    date: new Date().toISOString().split("T")[0]
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job.title.trim() || !job.description.trim()) {
      showToast("Please provide a job title and description.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const newJob = createJob(job, user);
      if (onAddJob) {
        onAddJob(newJob);
      }
      showToast("🎉 Service offering posted successfully!", "success");
      navigate("/worker-profile");
    } catch {
      showToast("Failed to post job. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page add-job-page">
      <div className="form-card-container">
        <h1>Post a New Service Offering</h1>
        <p className="form-subtitle">
          List a specialized service, set your custom hourly rate, and connect with clients looking for your skills.
        </p>

        <form className="form" onSubmit={handleSubmit} style={{ margin: "24px auto 0 auto" }}>
          <div className="form-field">
            <label>Service / Job Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Master Bathroom Leak Troubleshooting & Repair"
              value={job.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Service Category *</label>
              <select name="service" value={job.service} onChange={handleChange}>
                {ALL_SERVICES.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Hourly Rate (₹) *</label>
              <input
                type="number"
                name="rate"
                min="50"
                placeholder="Hourly Rate in ₹"
                value={job.rate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Service Area / Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Salem, Chennai"
                value={job.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Available Starting Date *</label>
              <input
                type="date"
                name="date"
                value={job.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Service Details & Scope *</label>
            <textarea
              name="description"
              placeholder="Explain the work you do, what tools you bring, and your turnaround time..."
              value={job.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={() => navigate("/worker-profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Publish Service Offering"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
