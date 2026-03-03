import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/forms.css";

function BookWorker({ onAddBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddBooking) {
      onAddBooking({ workerName: `Worker #${id}`, date: `${date} ${time}` });
    }
    alert(`Worker #${id} booked successfully for ${date} at ${time}!`);
    navigate("/my-bookings");
  };

  return (
    <div className="page">
      <h1>Book Worker #{id}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookWorker;
