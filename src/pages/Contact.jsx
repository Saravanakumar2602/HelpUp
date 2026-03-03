import { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <div className="contact-card">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-info">Email: <a href="mailto:support@helpup.com">support@helpup.com</a></div>
      <div className="contact-info">Phone: <a href="tel:+919876543210">+91 98765 43210</a></div>
      <div className="contact-socials">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" title="WhatsApp"><span role="img" aria-label="WhatsApp">💬</span></a>
        <a href="https://facebook.com/helpup" target="_blank" rel="noopener noreferrer" title="Facebook"><span role="img" aria-label="Facebook">📘</span></a>
        <a href="https://instagram.com/helpup" target="_blank" rel="noopener noreferrer" title="Instagram"><span role="img" aria-label="Instagram">📸</span></a>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
        {sent && <div style={{ color: '#007bff', textAlign: 'center', marginTop: 8 }}>Message sent! We'll get back to you soon.</div>}
      </form>
    </div>
  );
}

export default Contact;
