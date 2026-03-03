
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === role) {
      if (role === 'customer') navigate('/browse');
      else navigate('/worker-profile');
    } else {
      if (role === 'customer') navigate('/browse');
      else navigate('/signup');
    }
  };

  return (
    <div className="page home-page">

      {/* Hero Section with Role Selection */}
      <section className="hero fade-in">
        <h1>Welcome to HelpUp</h1>
        <p>Your trusted marketplace for local workers.</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', margin: '2rem 0' }}>
          <button className="btn" onClick={() => handleRoleSelect('customer')}>Hire a Worker</button>
          <button className="btn" onClick={() => handleRoleSelect('worker')}>Work as a Worker</button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview fade-in">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-card">
            <h3>Home Cleaning</h3>
            <p>Professional cleaning for your home or office.</p>
          </div>
          <div className="service-card">
            <h3>Plumbing</h3>
            <p>Expert plumbers for all your needs.</p>
          </div>
          <div className="service-card">
            <h3>Electrical</h3>
            <p>Certified electricians for safe and reliable service.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works fade-in">
        <h2>How It Works</h2>
        <ol>
          <li>Browse or post jobs for local services.</li>
          <li>Connect with skilled workers in your area.</li>
          <li>Book and get the job done with confidence!</li>
        </ol>
      </section>

      {/* Featured Workers */}
      <section className="featured-workers fade-in">
        <h2>Featured Workers</h2>
        <div className="workers-list">
          <div className="worker-card">
            <h4>Priya S.</h4>
            <p>Home Cleaner • 4.9★</p>
          </div>
          <div className="worker-card">
            <h4>Arun K.</h4>
            <p>Electrician • 4.8★</p>
          </div>
          <div className="worker-card">
            <h4>Meena R.</h4>
            <p>Tutor • 5.0★</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials fade-in">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <blockquote>“HelpUp made it so easy to find a reliable worker. Highly recommend!”<br /><span>- Suresh, Chennai</span></blockquote>
          <blockquote>“I got my first job as a tutor through HelpUp. Great platform!”<br /><span>- Kavitha, Coimbatore</span></blockquote>
        </div>
      </section>

      {/* Quick Signup (optional, can be removed if role selection is enough) */}
      {/* <section className="quick-signup fade-in">
        <h2>Join HelpUp Today</h2>
        <a href="/signup" className="btn">Sign Up Free</a>
      </section> */}

    </div>
  );
}

export default Home;
