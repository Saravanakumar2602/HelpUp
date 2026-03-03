

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("helpup_users") || "[]");
    if (existingUsers.find(u => u.email === email)) {
      alert("Email already in use!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      service: "Home Cleaning",  // default mock
      location: "Any",           // default mock
      rate: 100,                 // default mock
      rating: 0,
      img: "https://randomuser.me/api/portraits/men/60.jpg",
      title: "Worker"
    };

    localStorage.setItem("helpup_users", JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem("userRole", role);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    window.dispatchEvent(new Event("storage"));

    if (role === "worker") {
      navigate("/worker-profile");
    } else {
      navigate("/browse");
    }
  };

  return (
    <div className="page">
      <h1>Signup</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select>
        <button type="submit">Signup</button>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Already have an account? </span>
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
