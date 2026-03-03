
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WorkerCard from "../components/WorkerCard";

const allServices = [
  "All", "Home Cleaning", "Plumbing", "Electrical", "Tutoring", "Gardening", "IT Support"
];

function BrowseWorkers() {
  const location = useLocation();
  const initialService = location.state && location.state.filterService ? location.state.filterService : "All";
  const [search, setSearch] = useState("");
  const [service, setService] = useState(initialService);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("helpup_users") || "[]");
    setWorkers(existingUsers.filter(u => u.role === "worker"));
  }, []);

  const filtered = workers.filter(w =>
    (service === "All" || w.service === service) &&
    (w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.location?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page">
      <h1 className="browse-title">Browse Workers</h1>
      <div className="browse-controls">
        <input
          className="browse-search"
          type="text"
          placeholder="Search by name, title, or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="browse-filter" value={service} onChange={e => setService(e.target.value)}>
          {allServices.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="browse-grid">
        {filtered.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No workers found in your area. Check back later or create a Worker account!</p>
        ) : (
          filtered.map(worker => <WorkerCard key={worker.id} worker={worker} />)
        )}
      </div>
    </div>
  );
}

export default BrowseWorkers;
