import "../styles/cards.css";

function BookingCard({ booking }) {
  return (
    <div className="card">
      <h3>{booking.workerName}</h3>
      <p>Date: {booking.date}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
}

export default BookingCard;
