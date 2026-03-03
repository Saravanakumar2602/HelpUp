import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import WorkerProfile from "./pages/WorkerProfile";
import BrowseWorkers from "./pages/BrowseWorkers";
import BookWorker from "./pages/BookWorker";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import AddJob from "./pages/AddJob";

function App() {
  // 🔥 global state for jobs persisted with localStorage
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("helpup_jobs");
    if (savedJobs) {
      try {
        return JSON.parse(savedJobs);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("helpup_bookings");
    if (savedBookings) {
      try {
        return JSON.parse(savedBookings);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("helpup_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("helpup_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleAddJob = (job) => {
    setJobs([...jobs, { id: jobs.length + 1, ...job }]);
  };

  const handleAddBooking = (booking) => {
    setBookings([{ status: "Pending", ...booking }, ...bookings]);
  };

  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />

          {/* Pass jobs to worker profile */}
          <Route
            path="/worker-profile"
            element={<WorkerProfile jobs={jobs} bookings={bookings} />}
          />

          {/* Add Job form */}
          <Route
            path="/add-job"
            element={<AddJob onAddJob={handleAddJob} />}
          />

          {/* Browse jobs */}
          <Route path="/browse" element={<BrowseWorkers jobs={jobs} />} />

          <Route path="/book/:id" element={<BookWorker onAddBooking={handleAddBooking} />} />
          <Route path="/my-bookings" element={<MyBookings bookings={bookings} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
