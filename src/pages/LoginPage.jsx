import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import loginImage from '../components/login.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    // Simple fake auth for now: store user in localStorage
    localStorage.setItem(
      'tranlyUser',
      JSON.stringify({
        email,
      }),
    );

    setError('');
    navigate('/trainers');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <p className="login-page-label">Login Page</p>
        <h1 className="login-title">Sign-in</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email*
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </label>

          <label className="login-label">
            Password*
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
          
          <p className="login-signup-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>

      <div className="login-right" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${loginImage})` }}>
        <div className="login-logo">
          <Logo size={96} />
        </div>
        <div className="login-image-overlay"></div>
      </div>
    </div>
  );
}

export default LoginPage;


