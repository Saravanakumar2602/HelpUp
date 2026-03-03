// src/pages/WorkerProfile.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import BookingCard from "../components/BookingCard";
import "../styles/workerprofile.css";

function WorkerProfile({ jobs, bookings = [] }) {
  // Editable worker profile state
  const [editing, setEditing] = useState(false);
  const [worker, setWorker] = useState({
    name: "Ravi T.",
    age: 32,
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    title: "Plumber",
    location: "Salem",
    about: "Quick and reliable plumbing solutions. Available for urgent repairs and regular maintenance.",
  });
  const [temp, setTemp] = useState(worker);
  const handleEdit = () => { setTemp(worker); setEditing(true); };
  const handleCancel = () => setEditing(false);
  const handleChange = e => setTemp({ ...temp, [e.target.name]: e.target.value });
  const handleSave = e => {
    e.preventDefault();
    setWorker(temp);
    setEditing(false);
  };
  return (
    <div className="worker-profile-card">
      <div className="worker-profile-header">
        <img src={worker.avatar} alt={worker.name} className="worker-profile-avatar" />
        <div>
          {editing ? (
            <form onSubmit={handleSave} className="worker-profile-edit-form" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', justifyContent: 'center' }}>
              <div className="worker-profile-edit-avatar-upload" style={{ marginTop: 0 }}>
                <img src={temp.avatar} alt={temp.name} className="worker-profile-avatar" style={{ marginBottom: 10 }} />
                <input
                  type="file"
                  accept="image/*"
                  style={{ maxWidth: 140 }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setTemp(t => ({ ...t, avatar: ev.target.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <span style={{ fontSize: '0.95rem', color: '#888' }}>Choose a profile image</span>
              </div>
              <div className="worker-profile-edit-fields">
                <label className="worker-profile-edit-label">Name:
                  <input name="name" value={temp.name} onChange={handleChange} placeholder="Name" required className="worker-profile-edit-input" />
                </label>
                <label className="worker-profile-edit-label">Age:
                  <input name="age" value={temp.age} onChange={handleChange} placeholder="Age" type="number" min="18" max="99" required className="worker-profile-edit-input" />
                </label>
                <label className="worker-profile-edit-label">Skill/Title:
                  <input name="title" value={temp.title} onChange={handleChange} placeholder="Skill/Title" required className="worker-profile-edit-input" />
                </label>
                <label className="worker-profile-edit-label">Location:
                  <input name="location" value={temp.location} onChange={handleChange} placeholder="Location" required className="worker-profile-edit-input" />
                </label>
                <label className="worker-profile-edit-label">About:
                  <textarea name="about" value={temp.about} onChange={handleChange} placeholder="About" rows={2} required className="worker-profile-edit-textarea" />
                </label>
                <div className="worker-profile-edit-btns">
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn" style={{ background: '#eee', color: '#007bff' }} onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="worker-profile-name">{worker.name} <span style={{ fontWeight: 400, color: '#888', fontSize: '1rem' }}>({worker.age})</span></div>
              <div className="worker-profile-meta">{worker.title} &bull; {worker.location}</div>
              <div className="worker-profile-meta">{worker.about}</div>
              <button className="btn" style={{ marginTop: 6, padding: '4px 14px' }} onClick={handleEdit}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
      <Link to="/add-job" className="btn worker-profile-btn">+ Post a Job</Link>
      <h3 style={{ marginTop: 8, marginBottom: 6, color: '#007bff' }}>My Jobs</h3>
      {jobs && jobs.length > 0 ? (
        <ul className="worker-jobs-list">
          {jobs.map((j, i) => (
            <li className="worker-job-item" key={i}>
              <div className="worker-job-title">{j.title}</div>
              <div className="worker-job-meta">{j.description}</div>
              <div className="worker-job-meta">₹{j.rate}/hr &bull; {j.location} &bull; {j.date}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#888', margin: '8px 0' }}>No jobs posted yet.</p>
      )}

      <h3 style={{ marginTop: 24, marginBottom: 6, color: '#007bff' }}>My Bookings</h3>
      <div className="mybookings-list">
        {bookings.length > 0 ? (
          bookings.map((b, i) => (
            <BookingCard key={i} booking={b} />
          ))
        ) : (
          <p style={{ color: '#888', margin: '8px 0' }}>No bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default WorkerProfile;
