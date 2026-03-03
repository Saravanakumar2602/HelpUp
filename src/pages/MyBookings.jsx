
import BookingCard from "../components/BookingCard";
import "../styles/mybookings.css";

function MyBookings({ bookings = [] }) {
  return (
    <div className="mybookings-page">
      <h1>My Bookings</h1>
      <div className="mybookings-list">
        {bookings.length > 0 ? (
          bookings.map((b, i) => (
            <BookingCard key={i} booking={b} />
          ))
        ) : (
          <p style={{ color: '#888', margin: '8px 0' }}>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
