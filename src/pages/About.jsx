function About() {
  return (
    <div className="page">
      <div className="about-cards fade-in">
        {/* Mission Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/goal--v1.png" alt="Mission" className="about-img" />
          <h2>Our Mission</h2>
          <p>To empower communities by connecting people with trusted, skilled local workers and making everyday services accessible to everyone.</p>
        </div>

        {/* Story Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/storytelling.png" alt="Story" className="about-img" />
          <h2>Our Story</h2>
          <p>HelpUp was founded with a simple idea: make it easy for anyone to find reliable help for their daily needs. We saw how hard it was to connect with trustworthy workers, so we built a platform to bridge that gap and support local talent.</p>
        </div>

        {/* How It Works Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/process.png" alt="How It Works" className="about-img" />
          <h2>How HelpUp Works</h2>
          <ul className="about-list">
            <li>Post a job or browse available workers.</li>
            <li>Connect and chat with skilled professionals.</li>
            <li>Book, pay, and review—all in one place.</li>
          </ul>
        </div>

        {/* Why Choose Us Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/like--v3.png" alt="Why Choose Us" className="about-img" />
          <h2>Why Choose HelpUp?</h2>
          <ul className="about-list">
            <li>Verified and trusted workers</li>
            <li>Easy and secure booking</li>
            <li>Wide range of services</li>
            <li>Support for local communities</li>
          </ul>
        </div>

        {/* Contact Info Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/secured-letter.png" alt="Contact" className="about-img" />
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:support@helpup.com">support@helpup.com</a></p>
          <p>Phone: <a href="tel:+911234567890">+91 12345 67890</a></p>
        </div>

        {/* Social Media Card */}
        <div className="about-card">
          <img src="https://img.icons8.com/color/96/000000/share--v1.png" alt="Social" className="about-img" />
          <h2>Connect with Us</h2>
          <div className="about-socials">
            <a href="#" aria-label="Facebook" className="about-social-icon">🌐</a>
            <a href="#" aria-label="Twitter" className="about-social-icon">🐦</a>
            <a href="#" aria-label="Instagram" className="about-social-icon">📸</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
