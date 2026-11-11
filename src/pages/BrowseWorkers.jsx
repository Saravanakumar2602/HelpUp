// src/pages/BrowseWorkers.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import WorkerCard from "../components/WorkerCard";
import { getAllWorkers } from "../services/storageService";
import {
  SearchIcon,
  SparklesIcon,
  BoltIcon,
  WrenchIcon,
  BroomIcon,
  BookOpenIcon,
  PaintBrushIcon,
  HammerIcon,
  TreeIcon,
  StarIcon,
  ShieldCheckIcon,
  ZapIcon,
  LocationIcon,
  AwardIcon,
  PhoneIcon
} from "../components/Icons";
import "../styles/browse.css";

const CATEGORIES = [
  { name: "All", label: "All Specialists", icon: SparklesIcon },
  { name: "Electrical", label: "Electrician", icon: BoltIcon },
  { name: "Plumbing", label: "Plumber", icon: WrenchIcon },
  { name: "Home Cleaning", label: "Cleaning", icon: BroomIcon },
  { name: "Carpentry", label: "Carpentry", icon: HammerIcon },
  { name: "Painting", label: "Painting", icon: PaintBrushIcon },
  { name: "Private Tutoring", label: "Tutoring", icon: BookOpenIcon },
  { name: "Gardening", label: "Gardening", icon: TreeIcon },
];

const CITIES = ["All Cities", "Chennai", "Bangalore", "Salem", "Coimbatore"];

function BrowseWorkers({ onBookingSuccess }) {
  const location = useLocation();
  const initialService = location.state?.filterService || "All";
  const initialQuery = location.state?.searchQuery || "";
  const initialCity = location.state?.filterCity || "All Cities";

  const [search, setSearch] = useState(initialQuery);
  const [service, setService] = useState(initialService);
  const [city, setCity] = useState(initialCity);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [workers, setWorkers] = useState([]);

  // Quick Filter Chips
  const [filterTodayOnly, setFilterTodayOnly] = useState(false);
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);

  const loadWorkers = () => {
    const list = getAllWorkers();
    setWorkers(list);
  };

  useEffect(() => {
    loadWorkers();

    // Listen to storage events so when a worker registers in another tab or modal, list updates live
    const handleStorage = () => loadWorkers();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (location.state) {
      if (location.state.filterService) setService(location.state.filterService);
      if (location.state.searchQuery) setSearch(location.state.searchQuery);
      if (location.state.filterCity) setCity(location.state.filterCity);
    }
  }, [location.state]);

  const filtered = workers.filter(w => {
    // Category match
    const matchesService =
      service === "All" ||
      w.service?.toLowerCase() === service.toLowerCase() ||
      (service.toLowerCase() === "private tutoring" && w.service?.toLowerCase().includes("tutor"));

    // City match
    const matchesCity =
      city === "All Cities" ||
      !city ||
      w.location?.toLowerCase().includes(city.toLowerCase());

    // Search query match (name, title, service, location, about)
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      w.name?.toLowerCase().includes(query) ||
      w.title?.toLowerCase().includes(query) ||
      w.service?.toLowerCase().includes(query) ||
      w.location?.toLowerCase().includes(query) ||
      w.about?.toLowerCase().includes(query);

    // Price range filter
    const rateNum = Number(w.rate) || 300;
    let matchesPrice = true;
    if (priceRange === "under-350") matchesPrice = rateNum < 350;
    else if (priceRange === "350-420") matchesPrice = rateNum >= 350 && rateNum <= 420;
    else if (priceRange === "above-420") matchesPrice = rateNum > 420;

    // Quick filter chips
    const matchesToday = !filterTodayOnly || w.availableToday !== false;
    const matchesTopRated = !filterTopRated || (w.rating && Number(w.rating) >= 4.5);
    const matchesVerified = !filterVerifiedOnly || w.verified !== false;

    return (
      matchesService &&
      matchesCity &&
      matchesSearch &&
      matchesPrice &&
      matchesToday &&
      matchesTopRated &&
      matchesVerified
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === "rate-asc") {
      return (a.rate || 0) - (b.rate || 0);
    }
    if (sortBy === "rate-desc") {
      return (b.rate || 0) - (a.rate || 0);
    }
    if (sortBy === "reviews") {
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
    return 0;
  });

  const hasActiveFilters =
    service !== "All" ||
    city !== "All Cities" ||
    search.trim() !== "" ||
    priceRange !== "all" ||
    filterTodayOnly ||
    filterTopRated ||
    filterVerifiedOnly;

  const resetAllFilters = () => {
    setSearch("");
    setService("All");
    setCity("All Cities");
    setPriceRange("all");
    setFilterTodayOnly(false);
    setFilterTopRated(false);
    setFilterVerifiedOnly(false);
  };

  return (
    <div className="page browse-page">
      {/* Editorial Browse Header */}
      <div className="browse-hero">
        <span className="browse-pill-tag">
          <SparklesIcon size={14} color="#ff385c" />
          Verified Local Trade Directory
        </span>
        <h1 className="browse-title">Connect Directly with Certified Specialists</h1>
        <p className="browse-subtitle">
          Transparent hourly rates, direct phone access, and background-vetted tradespeople across your neighborhood with zero agency commissions.
        </p>
      </div>

      {/* --- Horizontal Category Ribbon --- */}
      <div className="category-ribbon-wrapper">
        <div className="category-ribbon">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = service.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.name}
                type="button"
                className={`ribbon-item ${isActive ? "active" : ""}`}
                onClick={() => setService(cat.name)}
              >
                <Icon size={18} color={isActive ? "#ffffff" : "#ff385c"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Unified Search & Multi-Facet Control Bar --- */}
      <div className="browse-command-panel">
        {/* Search input */}
        <div className="browse-search-wrapper">
          <span className="search-icon">
            <SearchIcon size={18} color="#e11d48" />
          </span>
          <input
            className="browse-search"
            type="text"
            placeholder="Search by specialist name, skill, or trade (e.g. Wireman, Leakage)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="clear-search-btn"
              onClick={() => setSearch("")}
              title="Clear search query"
            >
              ×
            </button>
          )}
        </div>

        {/* City Filter */}
        <div className="control-select-group">
          <LocationIcon size={15} color="#e11d48" />
          <select
            className="control-select"
            value={city}
            onChange={e => setCity(e.target.value)}
            title="Filter by City"
          >
            {CITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="control-select-group">
          <ZapIcon size={15} color="#f59e0b" />
          <select
            className="control-select"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            title="Filter by Hourly Budget"
          >
            <option value="all">Any Hourly Rate</option>
            <option value="under-350">Under ₹350 / hr</option>
            <option value="350-420">₹350 – ₹420 / hr</option>
            <option value="above-420">Above ₹420 / hr</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="control-select-group">
          <StarIcon size={15} color="#f59e0b" />
          <select
            className="control-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            title="Sort Results"
          >
            <option value="rating">Top Rated (★)</option>
            <option value="rate-asc">Rate: Low to High</option>
            <option value="rate-desc">Rate: High to Low</option>
            <option value="reviews">Most Client Reviews</option>
          </select>
        </div>
      </div>

      {/* --- Quick Filter Chips & Reset Row --- */}
      <div className="quick-filters-row">
        <button
          type="button"
          className={`quick-filter-chip ${filterTodayOnly ? "active" : ""}`}
          onClick={() => setFilterTodayOnly(!filterTodayOnly)}
        >
          <span className="beacon-dot-sm" />
          <span>Available Today</span>
        </button>

        <button
          type="button"
          className={`quick-filter-chip ${filterTopRated ? "active" : ""}`}
          onClick={() => setFilterTopRated(!filterTopRated)}
        >
          <StarIcon size={14} color={filterTopRated ? "#ff385c" : "#f59e0b"} />
          <span>4.5★ & Above</span>
        </button>

        <button
          type="button"
          className={`quick-filter-chip ${filterVerifiedOnly ? "active" : ""}`}
          onClick={() => setFilterVerifiedOnly(!filterVerifiedOnly)}
        >
          <ShieldCheckIcon size={14} color={filterVerifiedOnly ? "#ff385c" : "#10b981"} />
          <span>Verified Pro Only</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            className="quick-filter-chip chip-reset"
            onClick={resetAllFilters}
          >
            Reset All Filters ×
          </button>
        )}
      </div>

      {/* --- Live Results Summary & Active Pills --- */}
      <div className="browse-results-bar">
        <div className="results-count-text">
          Showing <strong>{sorted.length}</strong> verified {sorted.length === 1 ? "specialist" : "specialists"}
          {city !== "All Cities" && <span> in <strong>{city}</strong></span>}
          {service !== "All" && <span> for <strong>{service}</strong></span>}
        </div>

        {/* Dismissible Active Filter Tags */}
        <div className="active-tags-list">
          {service !== "All" && (
            <span className="active-tag-chip">
              Category: {service}
              <button onClick={() => setService("All")} title="Clear category filter">×</button>
            </span>
          )}
          {city !== "All Cities" && (
            <span className="active-tag-chip">
              City: {city}
              <button onClick={() => setCity("All Cities")} title="Clear city filter">×</button>
            </span>
          )}
          {priceRange !== "all" && (
            <span className="active-tag-chip">
              Budget: {priceRange === "under-350" ? "< ₹350" : priceRange === "350-420" ? "₹350-₹420" : "> ₹420"}
              <button onClick={() => setPriceRange("all")} title="Clear budget filter">×</button>
            </span>
          )}
        </div>
      </div>

      {/* --- Directory Presentation Grid --- */}
      <div className="browse-grid">
        {workers.length === 0 ? (
          /* Empty / Initial Launch State when no workers have registered on this instance yet */
          <div className="directory-launch-container">
            <div className="launch-icon-wrap">
              <ShieldCheckIcon size={48} color="#e11d48" />
            </div>

            <span className="launch-badge">Direct Trade Network Launch</span>
            <h2>Be the First Verified Specialist in Your Area</h2>
            <p className="launch-subtext">
              HelpUp connects independent electricians, plumbers, cleaners, painters, and tutors directly with local households with 0% platform deductions. Register your trade profile today to receive direct client appointments.
            </p>

            <div className="launch-actions">
              <Link to="/signup" className="btn btn-primary" style={{ padding: "14px 32px" }}>
                Register as a Pro Partner
              </Link>
              <Link to="/services" className="btn btn-secondary" style={{ padding: "14px 28px" }}>
                Explore Service Categories
              </Link>
            </div>

            {/* Three Foundation Pillars */}
            <div className="launch-pillars-row">
              <div className="launch-pillar">
                <div className="launch-pillar-icon">
                  <AwardIcon size={22} color="#e11d48" />
                </div>
                <h4>0% Commission</h4>
                <p>Keep 100% of your earnings. Set your own transparent hourly rates directly.</p>
              </div>

              <div className="launch-pillar">
                <div className="launch-pillar-icon">
                  <PhoneIcon size={22} color="#e11d48" />
                </div>
                <h4>Direct Client Contact</h4>
                <p>Connect directly via phone and WhatsApp with zero agency masking.</p>
              </div>

              <div className="launch-pillar">
                <div className="launch-pillar-icon">
                  <StarIcon size={22} color="#f59e0b" />
                </div>
                <h4>Verified Reputation</h4>
                <p>Collect genuine client ratings from real completed household appointments.</p>
              </div>
            </div>
          </div>
        ) : sorted.length === 0 ? (
          /* When registered workers exist, but current active filters yielded 0 matches */
          <div className="no-workers-found">
            <div className="empty-state-icon">
              <SparklesIcon size={52} color="#ff385c" />
            </div>
            <h3>No Specialists Match Your Exact Criteria</h3>
            <p>
              We couldn't find any certified providers matching your active combination of filters. Try clearing some filters to view available trade professionals in neighboring areas.
            </p>
            <div className="empty-state-actions">
              <button className="btn btn-primary" onClick={resetAllFilters}>
                Clear All Filters
              </button>
              <Link to="/services" className="btn btn-secondary">
                Explore All Service Categories
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-column grid of genuine registered workers */
          sorted.map(worker => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onBookingSuccess={onBookingSuccess}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseWorkers;
