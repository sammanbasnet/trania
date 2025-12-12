import Logo from '../components/Logo.jsx';
import homeImage from '../components/home.jpg';

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-background" style={{ backgroundImage: `url(${homeImage})` }}></div>
      </section>

      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About TRANIA</h2>
          <p>
            TRANIA is more than just a gym—it's a community dedicated to transforming lives through fitness, discipline, and expert guidance. Our state-of-the-art facility combines cutting-edge equipment with personalized coaching to help you achieve your fitness goals.
          </p>
          <p>
            Whether you're a beginner or an advanced athlete, we provide the tools, support, and motivation you need to succeed. Join thousands who have already transformed their lives with TRANIA.
          </p>
        </div>
      </section>

      <section id="why" className="offer-section">
        <div className="offer-content">
          <h2>What We Offer</h2>
          <p className="offer-subtitle">Everything you need to reach your fitness goals</p>
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>24/7 Coaches</h3>
              <p>Access expert coaching anytime, day or night. Our dedicated trainers are always available to support your journey.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>1-on-1 Coaching</h3>
              <p>Personalized attention with private coaching sessions tailored specifically to your fitness level and goals.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                </svg>
              </div>
              <h3>Nutrition Guide</h3>
              <p>Comprehensive nutrition plans designed by experts to complement your training and maximize results.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="8" width="4" height="8" rx="1"></rect>
                  <rect x="18" y="8" width="4" height="8" rx="1"></rect>
                  <line x1="6" y1="12" x2="18" y2="12"></line>
                  <line x1="6" y1="12" x2="18" y2="8"></line>
                  <line x1="6" y1="12" x2="18" y2="16"></line>
                </svg>
              </div>
              <h3>Personal Workout Plan</h3>
              <p>Custom workout programs designed specifically for your body type, goals, and fitness level.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <Logo size={60} />
            <p className="footer-tagline">Transform your body, transform your life. Join the fitness revolution.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#why">Why Join</a>
            <a href="#membership">Membership</a>
            <a href="/trainers">Our Coaches</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#contact">Contact</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;


