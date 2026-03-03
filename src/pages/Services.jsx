import { useState } from "react";
import { useNavigate } from "react-router-dom";

const allServices = [
  { name: "Home Cleaning", icon: "https://img.icons8.com/color/96/000000/broom.png", desc: "Professional cleaning for homes and offices." },
  { name: "Plumbing", icon: "https://img.icons8.com/color/96/000000/wrench.png", desc: "Expert plumbers for all your needs." },
  { name: "Electrical", icon: "https://img.icons8.com/color/96/000000/electrical.png", desc: "Certified electricians for safe and reliable service." },
  { name: "Carpentry", icon: "https://img.icons8.com/color/96/000000/hammer.png", desc: "Skilled carpenters for repairs and furniture." },
  { name: "Tutoring", icon: "https://img.icons8.com/color/96/000000/classroom.png", desc: "Find tutors for all subjects and levels." },
  { name: "IT Support", icon: "https://img.icons8.com/color/96/000000/computer-support.png", desc: "Tech help for your devices and networks." },
  { name: "Gardening", icon: "https://img.icons8.com/color/96/000000/gardening--v2.png", desc: "Garden care, landscaping, and more." },
  { name: "Delivery", icon: "https://img.icons8.com/color/96/000000/delivery.png", desc: "Fast and reliable delivery services." },
  { name: "Painting", icon: "https://img.icons8.com/color/96/000000/paint-brush.png", desc: "Professional painting for homes and offices." },
  { name: "Pet Care", icon: "https://img.icons8.com/color/96/000000/dog.png", desc: "Pet sitting, walking, and grooming." },
];

function Services() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = allServices.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const handleServiceClick = (serviceName) => {
    navigate("/browse", { state: { filterService: serviceName } });
  };
  return (
    <div className="page">
      <h1 className="services-title">Our Services</h1>
      <input
        className="services-search"
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="services-grid">
        {filtered.map((s, i) => (
          <div
            className={`service-card${i < 3 ? " featured" : ""}`}
            key={s.name}
            style={{ cursor: "pointer" }}
            onClick={() => handleServiceClick(s.name)}
            title={`Browse workers for ${s.name}`}
          >
            <img src={s.icon} alt={s.name} className="service-icon" />
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            {i < 3 && <span className="featured-badge">Featured</span>}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <a href="/add-job" className="btn">Post a Job</a>
      </div>
    </div>
  );
}

export default Services;
