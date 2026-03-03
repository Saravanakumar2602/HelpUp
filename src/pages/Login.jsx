

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/forms.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("helpup_users") || "[]");
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("userRole", foundUser.role);
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // Trigger storage event manually to update Navbar
    window.dispatchEvent(new Event("storage"));

    if (foundUser.role === 'worker') {
      navigate("/worker-profile");
    } else {
      navigate("/browse");
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
