import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !retypePassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== retypePassword) {
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
        username,
        email,
      }),
    );

    setError('');
    navigate('/trainers');
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-logo-container">
          <Logo size={100} />
        </div>
        <h1 className="register-title">Sign-up</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">
            Username*
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />
          </label>

          <label className="register-label">
            Email*
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
          </label>

          <label className="register-label">
            Create Password*
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
          </label>

          <label className="register-label">
            Re-type Password*
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="register-input"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="register-btn">
            Register
          </button>

          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>Accept all the Terms and Conditions</span>
          </label>
          
          <p className="register-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>

      <div className="register-right">
        <div className="register-image-top"></div>
        <div className="register-image-bottom"></div>
      </div>
    </div>
  );
}

export default RegisterPage;

