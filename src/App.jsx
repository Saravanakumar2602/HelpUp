// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
import AddJob from "./pages/AddJob";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { initStorage, getAllJobs, getAllBookings } from "./services/storageService";

function AppContent() {
  const [jobs, setJobs] = useState([]);
  const [bookings, setBookings] = useState([]);

  const refreshData = useCallback(() => {
    setJobs(getAllJobs());
    setBookings(getAllBookings());
  }, []);

  useEffect(() => {
    // Seed initial data if necessary
    initStorage();
    refreshData();

    // Listen for storage events (e.g. cross-tab updates or manual dispatches)
    const handleStorageUpdate = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, [refreshData]);

  return (
    <Router>
      <Navbar />
      <main className="main-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/browse" element={<BrowseWorkers onBookingSuccess={refreshData} />} />
          <Route path="/book/:id" element={<BookWorker onAddBooking={refreshData} />} />

          {/* Customer Protected Routes */}
          <Route
            path="/customer-profile"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRole="customer">
                <MyBookings bookings={bookings} onRefreshData={refreshData} />
              </ProtectedRoute>
            }
          />

          {/* Worker Protected Routes */}
          <Route
            path="/worker-profile"
            element={
              <ProtectedRoute allowedRole="worker">
                <WorkerProfile jobs={jobs} bookings={bookings} onRefreshData={refreshData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute allowedRole="worker">
                <AddJob onAddJob={refreshData} />
              </ProtectedRoute>
            }
          />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
