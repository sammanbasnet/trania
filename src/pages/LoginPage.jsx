import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    // Check if user is trainer or client
    const trainerData = localStorage.getItem('tranlyTrainer');
    const userData = localStorage.getItem('tranlyUser');
    
    let userType = 'client';
    if (trainerData) {
      const trainer = JSON.parse(trainerData);
      if (trainer.email === email) {
        userType = 'trainer';
      }
    }

    // Simple fake auth for now: store user in localStorage
    localStorage.setItem(
      'tranlyUser',
      JSON.stringify({
        email,
        userType,
      }),
    );

    setError('');
    // Redirect based on user type
    if (userType === 'trainer') {
      navigate('/trainer-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-panel">
        <div className="login-logo-container">
          <Logo size={60} />
          <span className="login-logo-text">TRANIA</span>
        </div>
        
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

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-btn">
            Login
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


