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
      }),
    );

    setError('');
    navigate('/trainers');
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
              <span className="input-icon">👤</span>
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
              <span className="input-icon">✉️</span>
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
              <span className="input-icon">📞</span>
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
              <span className="input-icon">🔒</span>
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
              <span className="input-icon">🔒</span>
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
              <span className="input-icon">⚧️</span>
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

