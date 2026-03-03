
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";


function Navbar() {
  const [role, setRole] = useState(() => localStorage.getItem('userRole'));
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setRole(localStorage.getItem('userRole'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
    setRole(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">HelpUp</h2>
      <ul>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink></li>
        <li><NavLink to="/services" className={({ isActive }) => isActive ? "active" : undefined}>Services</NavLink></li>
        {role === 'customer' && (
          <>
            <li><NavLink to="/browse" className={({ isActive }) => isActive ? "active" : undefined}>Browse</NavLink></li>
            <li><NavLink to="/my-bookings" className={({ isActive }) => isActive ? "active" : undefined}>My Bookings</NavLink></li>
          </>
        )}
        {role === 'worker' && (
          <li><NavLink to="/add-job" className={({ isActive }) => isActive ? "active" : undefined}>Add Job</NavLink></li>
        )}
        {!role ? (
          <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : undefined}>Login</NavLink></li>
        ) : (
          <li><button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', marginLeft: '1rem', marginRight: '1rem', fontFamily: 'inherit', padding: 0 }}>Logout</button></li>
        )}
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined}>About</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : undefined}>Contact</NavLink></li>
        {role && (
          <li className="navbar-avatar-li">
            <NavLink to={role === 'worker' ? "/worker-profile" : "/customer-profile"} className={({ isActive }) => isActive ? "active avatar-active" : "avatar-link"} title={role === 'worker' ? "Worker Profile" : "Customer Profile"}>
              <img src="https://randomuser.me/api/portraits/men/60.jpg" alt="Profile" className="navbar-avatar" />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;