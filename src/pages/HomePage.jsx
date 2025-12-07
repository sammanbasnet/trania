import Logo from '../components/Logo.jsx';

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-tag">Personal Training Platform</p>
            <h1>
              Start a better
              <br />
              shape of you!
              <br />
              Come Join Us!
            </h1>
            <p className="hero-text">
              Trania helps you connect with professional coaches for 1 on 1 online or
              in‑person sessions, tailored to your goals.
            </p>
            <button type="button" className="primary-btn hero-btn">
              Learn More
            </button>
          </div>
          <div className="hero-right">
            <div className="hero-badge">
              <Logo size={280} />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About TRANIA</h2>
          <p>
            Welcome to <strong>TRANIA</strong>, a community dedicated to transforming lives through fitness, discipline, and expert guidance. Our state-of-the-art facility and world-class trainers are here to support you on your journey, whether you're just starting out or looking to take your fitness to the next level. We believe that everyone deserves access to personalized training that fits their unique goals and lifestyle.
          </p>
        </div>
      </section>

      <section id="why" className="offer-section">
        <div className="offer-content">
          <h2>What we offer</h2>
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">🕐</div>
              <h3>24/7 Coaches</h3>
              <p>Access to certified trainers around the clock</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">👥</div>
              <h3>1-on-1 Coaching</h3>
              <p>Personalized training sessions tailored to you</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">🍎</div>
              <h3>Nutrition Guide</h3>
              <p>Expert nutrition plans to fuel your goals</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">💪</div>
              <h3>Personal Workout Plan</h3>
              <p>Customized workout routines for your fitness level</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <Logo size={60} />
            <p className="footer-text">TRANIA</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#membership">Membership</a>
            <a href="/trainers">Our Coaches</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;


