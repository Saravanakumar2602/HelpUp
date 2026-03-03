
import { useState } from "react";
import Modal from "./Modal";
import "../styles/cards.css";

function WorkerCard({ worker }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="worker-card-ui">
      <img src={worker.img} alt={worker.name} className="worker-img" />
      <h3>{worker.name}</h3>
      <div className="worker-title">{worker.title}</div>
      <div className="worker-rating">{worker.rating}★</div>
      <p className="worker-desc">{worker.description}</p>
      <div className="worker-meta">
        <span>{worker.location}</span> | <span>₹{worker.rate}/hr</span>
      </div>
      <button className="btn" onClick={() => setOpen(true)}>Book Now</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Book {worker.name}</h2>
        <form className="form" onSubmit={e => {e.preventDefault(); setOpen(false); alert('Booking confirmed!')}}>
          <input type="date" required />
          <input type="time" required />
          <button type="submit">Confirm Booking</button>
        </form>
      </Modal>
    </div>
  );
}

export default WorkerCard;
