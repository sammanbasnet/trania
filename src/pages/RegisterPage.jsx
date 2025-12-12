import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the Terms and Conditions');
      return;
    }

    // Simple fake auth for now: store user in localStorage
    localStorage.setItem(
      'tranlyUser',
      JSON.stringify({
        fullName,
        email,
        phone,
        userType: 'client',
      }),
    );

    setError('');
    navigate('/client-dashboard');
  };

  return (
    <div className="register-page">
      <div className="register-background"></div>
      <div className="register-content-wrapper">
        <div className="register-main-content">
          <div className="register-logo-top">
            <Logo size={60} />
            <div className="register-logo-text-wrapper">
              <span className="register-logo-text">TRANIA</span>
              <div className="register-logo-divider"></div>
            </div>
          </div>
          
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join the fitness revolution today</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="register-input"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="register-input"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
                placeholder="Password"
                required
              />
            </div>

            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="register-input"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="register-input-group">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="register-input register-select"
              >
                <option value="">Gender (Optional)</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span>I agree to the <strong>Terms & Conditions</strong></span>
            </label>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="register-btn">
              CREATE ACCOUNT
            </button>

            <p className="register-login-link">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>

        <div className="register-right-content">
          <h2 className="register-motivational-title">
            Transform<br />Your Body
          </h2>
          <p className="register-motivational-subtitle">Start your journey today</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

