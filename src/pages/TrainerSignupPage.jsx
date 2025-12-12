import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import islamImage from '../components/islam.avif';
import { authAPI } from '../utils/api.js';

function TrainerSignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [certifications, setCertifications] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [gymLocation, setGymLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToCertification, setAgreeToCertification] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSpecialtyChange = (specialty) => {
    setSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !yearsExperience || !hourlyRate || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToCertification) {
      setError('Please agree to the certification requirement');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authAPI.trainerSignup({
        fullName,
        email,
        phone,
        yearsExperience,
        hourlyRate,
        certifications,
        specialties,
        gymLocation,
        password,
      });

      // Redirect to login page after successful signup
      navigate('/login', { 
        state: { message: 'Trainer account created successfully! Please login.' } 
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trainer-signup-page">
      <div className="trainer-signup-left">
        <div className="trainer-signup-branding">
          <Link to="/" className="trainer-brand-header">
            <div className="trainer-brand-text-wrapper">
              <span className="trainer-brand-text">TRANIA</span>
              <div className="trainer-brand-line"></div>
            </div>
            <Logo size={60} />
          </Link>
          <h1 className="trainer-tagline-title">Elite Trainer Platform</h1>
          <p className="trainer-tagline-subtitle">
            Join the premier network of certified fitness professionals and elevate your training career.
          </p>
        </div>
        <div className="trainer-signup-image" style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${islamImage})` }}></div>
      </div>

      <div className="trainer-signup-right">
        <div className="trainer-signup-form-panel">
          <h2 className="trainer-form-title">Join as Trainer</h2>
          <p className="trainer-form-subtitle">Create your professional profile</p>

          <form onSubmit={handleSubmit} className="trainer-signup-form">
            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="trainer-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="trainer-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="trainer-input"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

            <div className="trainer-input-group">
              <select
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="trainer-input trainer-select"
                required
              >
                <option value="">Select years</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4-5">4-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              <span className="trainer-select-arrow">▼</span>
            </div>

            <div className="trainer-input-group trainer-rate-group">
              <span className="trainer-input-icon">$</span>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="trainer-input"
                placeholder="50"
                required
              />
              <span className="trainer-rate-label">Hourly Rate ($)</span>
            </div>

            <div className="trainer-input-group">
              <textarea
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                className="trainer-input trainer-textarea"
                placeholder="List your certifications (e.g., NASM, ACE, ACSM)"
                rows="3"
              ></textarea>
            </div>

            <div className="trainer-specialties-section">
              <label className="trainer-specialties-label">Specialties</label>
              <div className="trainer-specialties-grid">
                {['Strength Training', 'Cardio', 'CrossFit', 'Yoga', 'MMA', 'Pilates'].map((specialty) => (
                  <label key={specialty} className="trainer-specialty-checkbox">
                    <input
                      type="checkbox"
                      checked={specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                    />
                    <span>{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <input
                type="text"
                value={gymLocation}
                onChange={(e) => setGymLocation(e.target.value)}
                className="trainer-input"
                placeholder="City, State or Gym Name"
              />
            </div>

            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="trainer-input"
                placeholder="Password"
                required
              />
            </div>

            <div className="trainer-input-group">
              <span className="trainer-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="trainer-input"
                placeholder="Confirm Password"
                required
              />
            </div>

            <label className="trainer-agreement-checkbox">
              <input
                type="checkbox"
                checked={agreeToCertification}
                onChange={(e) => setAgreeToCertification(e.target.checked)}
                required
              />
              <span>I am a certified fitness trainer and agree to provide proof of certification upon request.</span>
            </label>

            {error && <div className="trainer-error">{error}</div>}

            <button type="submit" className="trainer-register-btn" disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {loading ? 'Registering...' : 'Register as Trainer'}
            </button>

            <p className="trainer-login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrainerSignupPage;

