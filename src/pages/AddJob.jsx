import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

function AddJob({ onAddJob }) {
  const [job, setJob] = useState({
    title: "",
    description: "",
    rate: "",
    location: "",
    date: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAddJob) {
      onAddJob(job);
    }

    alert("Job posted successfully!");
    navigate("/worker-profile"); // go back to profile
  };

  return (
    <div className="page">
      <h1>Post a New Job</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="rate"
          placeholder="Hourly Rate (₹)"
          value={job.rate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={job.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
