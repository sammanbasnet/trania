import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
  const userName = userData.fullName || 'Sarah';

  const upcomingSessions = [
    {
      id: 1,
      trainerName: 'Mike',
      trainerPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
      sessionType: 'HIIT Training',
      date: 'Today',
      time: '8:00 PM'
    },
    {
      id: 2,
      trainerName: 'Emma',
      trainerPhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80',
      sessionType: 'Yoga Flow',
      date: 'Tomorrow',
      time: '8:00 AM'
    }
  ];

  const mySessions = [
    { type: 'Strength Training', date: 'Dec 15, 2024 - 5:00 PM', status: 'Confirmed' },
    { type: 'Cardio Blast', date: 'Dec 12, 2024 - 7:00 AM', status: 'Completed' },
    { type: 'Personal Training', date: 'Dec 10, 2024 - 6:30 PM', status: 'Cancelled' }
  ];

  const favoriteTrainers = [
    { name: 'Alex Rodriguez', specialty: 'Strength & Conditioning', rating: 4.9, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80' },
    { name: 'Jessica Chen', specialty: 'Yoga & Pilates', rating: 4.8, photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80' },
    { name: 'David Kim', specialty: 'HIIT & Cardio', rating: 4.7, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80' }
  ];

  const paymentHistory = [
    { description: 'Monthly Subscription', date: 'Dec 1, 2024', amount: '$89.99' },
    { description: 'Personal Training Session', date: 'Nov 28, 2024', amount: '$75.00' },
    { description: 'Monthly Subscription', date: 'Nov 1, 2024', amount: '$89.99' }
  ];

  const [activeSidebar, setActiveSidebar] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('tranlyUser');
    localStorage.removeItem('tranlyTrainer');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span>TRANIA</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/client-dashboard" className={`sidebar-item ${activeSidebar === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSidebar('dashboard')}>
            <span className="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/client-sessions" className={`sidebar-item ${activeSidebar === 'sessions' ? 'active' : ''}`} onClick={() => setActiveSidebar('sessions')}>
            <span className="sidebar-icon">📅</span>
            <span>sessions</span>
          </Link>
          <Link to="/trainers" className={`sidebar-item ${activeSidebar === 'trainers' ? 'active' : ''}`} onClick={() => setActiveSidebar('trainers')}>
            <span className="sidebar-icon">👤</span>
            <span>Trainers</span>
          </Link>
          <Link to="/client-progress" className={`sidebar-item ${activeSidebar === 'progress' ? 'active' : ''}`} onClick={() => setActiveSidebar('progress')}>
            <span className="sidebar-icon">📈</span>
            <span>Progress</span>
          </Link>
          <Link to="/client-payments" className={`sidebar-item ${activeSidebar === 'payments' ? 'active' : ''}`} onClick={() => setActiveSidebar('payments')}>
            <span className="sidebar-icon">💳</span>
            <span>Payments</span>
          </Link>
          <Link to="/client-settings" className={`sidebar-item ${activeSidebar === 'settings' ? 'active' : ''}`} onClick={() => setActiveSidebar('settings')}>
            <span className="sidebar-icon">⚙️</span>
            <span>Settings</span>
          </Link>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <span className="sidebar-icon">→</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <h1>Welcome back, {userName}</h1>
            <p>Ready for your next workout session?</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-section upcoming-sessions">
              <h2>Upcoming Sessions</h2>
              <div className="sessions-list">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="session-item">
                    <img src={session.trainerPhoto} alt={session.trainerName} className="session-photo" />
                    <div className="session-info">
                      <h3>{session.sessionType} with {session.trainerName}</h3>
                      <p>{session.date} at {session.time}</p>
                    </div>
                    <div className="session-actions">
                      <button className="btn-view">View</button>
                      <button className="btn-reschedule">Reschedule</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section fitness-progress">
              <h2>Fitness Progress</h2>
              <div className="progress-streak">
                <span>Weekly Streak</span>
                <div className="streak-days">
                  <span>7 days</span>
                  <div className="streak-boxes">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="streak-box filled"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="progress-chart">
                <h3>Weekly Activity</h3>
                <div className="chart-container">
                  <div className="chart-bars">
                    {[20, 40, 30, 50, 60, 70, 80].map((height, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-section my-sessions">
              <div className="section-header">
                <h2>My sessions</h2>
                <button className="btn-primary">Book More Sessions</button>
              </div>
              <div className="sessions-list">
                {mySessions.map((session, i) => (
                  <div key={i} className="session-row">
                    <div>
                      <h3>{session.type}</h3>
                      <p>{session.date}</p>
                    </div>
                    <span className={`status-badge ${session.status.toLowerCase()}`}>{session.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section favorite-trainers">
              <h2>Favorite Trainers</h2>
              <div className="trainers-list">
                {favoriteTrainers.map((trainer, i) => (
                  <div key={i} className="trainer-item">
                    <img src={trainer.photo} alt={trainer.name} className="trainer-photo" />
                    <div className="trainer-info">
                      <h3>{trainer.name}</h3>
                      <p>{trainer.specialty}</p>
                      <div className="trainer-rating">
                        {'★'.repeat(5)} <span>{trainer.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section payment-history">
              <h2>Payment History</h2>
              <div className="payments-list">
                {paymentHistory.map((payment, i) => (
                  <div key={i} className="payment-item">
                    <span className="payment-icon">💳</span>
                    <div className="payment-info">
                      <h3>{payment.description}</h3>
                      <p>{payment.date}</p>
                    </div>
                    <span className="payment-amount">{payment.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section profile-settings">
              <h2>Profile Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={userData.fullName || "Sarah Wilson"} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue={userData.email || "sarah.wilson@email.com"} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue={userData.phone || "+1 (555) 123-4567"} />
                </div>
                <div className="form-actions">
                  <button className="btn-primary">Update Profile</button>
                  <button className="btn-secondary">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;

