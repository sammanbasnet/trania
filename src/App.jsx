import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TrainersPage from './pages/TrainersPage.jsx';
import CoachProfilePage from './pages/CoachProfilePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TrainerSignupPage from './pages/TrainerSignupPage.jsx';
import ClientDashboard from './pages/ClientDashboard.jsx';
import TrainerDashboard from './pages/TrainerDashboard.jsx';
import SessionsPage from './pages/SessionsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logo from './components/Logo.jsx';

function App() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/trainer-signup';
  const isAuthPageWithSplash = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/trainer-signup';
  const isDashboardPage = location.pathname.includes('dashboard');
  
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || 'null');
  const isLoggedIn = !!userData;

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

      {!isAuthPage && !isDashboardPage && (
        <header className="app-header">
          <Link to="/" className="logo">
            <Logo size={48} />
            <span>TRANIA</span>
          </Link>
          <nav>
            <Link to="/">HOME</Link>
            <Link to="/sessions">SESSIONS</Link>
            <Link to="/trainers">TRAINERS</Link>
            <a href="#about">ABOUT</a>
          </nav>
          <div className="header-actions">
            {isLoggedIn ? (
              <Link to={userData.userType === 'trainer' ? '/trainer-dashboard' : '/client-dashboard'} className="nav-signin">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="nav-signin">Sign In</Link>
                <Link to="/register" className="nav-get-started">Get Started</Link>
              </>
            )}
          </div>
        </header>
      )}

      {isDashboardPage && (
        <header className="dashboard-header">
          <Link to="/" className="logo">
            <Logo size={48} />
            <span>TRANIA</span>
          </Link>
          <nav className="dashboard-nav">
            <Link to="/">HOME</Link>
            <Link to="/sessions">SESSIONS</Link>
            <Link to="/trainers">TRAINERS</Link>
            <a href="#about">ABOUT</a>
          </nav>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="icon-btn profile-btn" aria-label="Profile">
              <div className="profile-avatar"></div>
            </button>
          </div>
        </header>
      )}

      <main className={`app-main ${isAuthPage ? 'login-main' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trainer-signup" element={<TrainerSignupPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/trainer/:id" element={<CoachProfilePage />} />
          <Route path="/booking/:trainerId" element={<BookingPage />} />
          <Route 
            path="/client-dashboard" 
            element={
              <ProtectedRoute userType="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trainer-dashboard" 
            element={
              <ProtectedRoute userType="trainer">
                <TrainerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;


