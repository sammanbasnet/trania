import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TrainersPage from './pages/TrainersPage.jsx';
import CoachProfilePage from './pages/CoachProfilePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TrainerSignupPage from './pages/TrainerSignupPage.jsx';
import Logo from './components/Logo.jsx';

function App() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/trainer-signup';
  const isAuthPageWithSplash = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/trainer-signup';

  useEffect(() => {
    if (isAuthPageWithSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname, isAuthPageWithSplash]);

  return (
    <div className="app">
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-logo-container">
            <Logo size={200} spin={true} />
          </div>
        </div>
      )}

      {!isAuthPage && (
        <header className="app-header">
          <Link to="/" className="logo">
            <Logo size={48} />
            <span>Trania</span>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/trainers">Training</Link>
            <a href="#about">About</a>
            <Link to="/register" className="nav-register">
              Sign Up / Login
            </Link>
          </nav>
        </header>
      )}

      <main className={`app-main ${isAuthPage ? 'login-main' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trainer-signup" element={<TrainerSignupPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/trainer/:id" element={<CoachProfilePage />} />
          <Route path="/booking/:trainerId" element={<BookingPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


