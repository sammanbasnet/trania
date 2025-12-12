import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import { authAPI } from '../utils/api.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from signup
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Use universal login endpoint that checks both user and trainer
      const response = await authAPI.login(email, password);

      // Store token and user data
      localStorage.setItem('tranlyToken', response.token);
      localStorage.setItem(
        'tranlyUser',
        JSON.stringify(response.user)
      );

      // Redirect based on user type
      if (response.user.userType === 'trainer') {
        navigate('/trainer-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-panel">
        <Link to="/" className="login-logo-container">
          <Logo size={60} />
          <span className="login-logo-text">TRANIA</span>
        </Link>
        
        <h1 className="login-welcome-title">Welcome Back</h1>
        <p className="login-subtitle">Login to continue your fitness journey</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="your@email.com"
            />
          </label>

          <label className="login-label">
            Password
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="********"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </label>

          <div className="forgot-password-link">
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {successMessage && (
            <div className="success-message" style={{
              padding: '12px',
              marginBottom: '16px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: '8px',
              color: '#4caf50',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {successMessage}
            </div>
          )}
          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="login-separator">
            <span>or</span>
          </div>

          <p className="login-signup-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

          <button type="button" className="trainer-signup-btn" onClick={() => navigate('/trainer-signup')}>
            Sign Up as a trainer?
          </button>

          <p className="login-copyright">
            © 2024 TRANIA. Premium Fitness Training Platform
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


