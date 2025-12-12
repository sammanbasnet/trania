import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TrainerDashboard() {
  const navigate = useNavigate();
  const trainerData = JSON.parse(localStorage.getItem('tranlyTrainer') || '{}');
  const trainerName = trainerData.fullName || 'Trainer';

  const [activeSidebar, setActiveSidebar] = useState('dashboard');

  const stats = [
    { label: 'Total Clients', value: '48', icon: '👥' },
    { label: 'Completed Sessions', value: '326', icon: '✓' },
    { label: 'Average Rating', value: '4.9', icon: '⭐' },
    { label: 'This Month', value: '$4,280', icon: '$', sublabel: 'Earnings' }
  ];

  const upcomingSessions = [
    {
      id: 1,
      clientName: 'Sarah Mitchell',
      clientPhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80',
      sessionType: 'HIIT Training',
      date: 'Today, 2:00 PM',
      duration: '60 minutes'
    },
    {
      id: 2,
      clientName: 'Marcus Chen',
      clientPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
      sessionType: 'Strength Training',
      date: 'Today, 4:30 PM',
      duration: '45 minutes'
    },
    {
      id: 3,
      clientName: 'Emily Rodriguez',
      clientPhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80',
      sessionType: 'Yoga & Flexibility',
      date: 'Tomorrow, 9:00 AM',
      duration: '60 minutes'
    },
    {
      id: 4,
      clientName: 'David Thompson',
      clientPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
      sessionType: 'Cardio & Endurance',
      date: 'Tomorrow, 3:00 PM',
      duration: '45 minutes'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      senderName: 'Sarah Mitchell',
      senderPhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80',
      timeAgo: '12 minutes ago',
      message: "Can we reschedule tomorrow's session to 10 AM?"
    },
    {
      id: 2,
      senderName: 'Marcus Chen',
      senderPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
      timeAgo: '1 hour ago',
      message: "Thanks for the great session today!"
    },
    {
      id: 3,
      senderName: 'Jessica Park',
      senderPhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80',
      timeAgo: '2 hours ago',
      message: "What should I focus on for next week?"
    },
    {
      id: 4,
      senderName: 'Alex Johnson',
      senderPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80',
      timeAgo: '3 hours ago',
      message: "Looking forward to our session!"
    }
  ];

  const monthlyEarnings = [
    { month: 'Jan', amount: 3200 },
    { month: 'Feb', amount: 3500 },
    { month: 'Mar', amount: 3800 },
    { month: 'Apr', amount: 4000 },
    { month: 'May', amount: 4100 },
    { month: 'Jun', amount: 4280 }
  ];

  const weeklySchedule = {
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    times: ['9 AM', '12 PM', '3 PM', '6 PM'],
    slots: [
      [true, true, true, false], // Mon
      [false, false, true, true], // Tue
      [true, false, true, false], // Wed
      [false, true, false, true], // Thu
      [true, true, false, true], // Fri
      [false, false, false, false], // Sat
      [true, false, false, false] // Sun
    ]
  };

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
          <Link to="/trainer-dashboard" className={`sidebar-item ${activeSidebar === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSidebar('dashboard')}>
            <span className="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/trainer-sessions" className={`sidebar-item ${activeSidebar === 'sessions' ? 'active' : ''}`} onClick={() => setActiveSidebar('sessions')}>
            <span className="sidebar-icon">📅</span>
            <span>My Sessions</span>
          </Link>
          <Link to="/trainer-availability" className={`sidebar-item ${activeSidebar === 'availability' ? 'active' : ''}`} onClick={() => setActiveSidebar('availability')}>
            <span className="sidebar-icon">📅</span>
            <span>Availability</span>
          </Link>
          <Link to="/trainer-earnings" className={`sidebar-item ${activeSidebar === 'earnings' ? 'active' : ''}`} onClick={() => setActiveSidebar('earnings')}>
            <span className="sidebar-icon">$</span>
            <span>Earnings</span>
          </Link>
          <Link to="/trainer-messages" className={`sidebar-item ${activeSidebar === 'messages' ? 'active' : ''}`} onClick={() => setActiveSidebar('messages')}>
            <span className="sidebar-icon">💬</span>
            <span>Messages</span>
          </Link>
          <Link to="/trainer-settings" className={`sidebar-item ${activeSidebar === 'settings' ? 'active' : ''}`} onClick={() => setActiveSidebar('settings')}>
            <span className="sidebar-icon">⚙️</span>
            <span>Profile Settings</span>
          </Link>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <span className="sidebar-icon">→</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-section upcoming-sessions">
              <h2>Upcoming Sessions</h2>
              <div className="sessions-list">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="session-item">
                    <img src={session.clientPhoto} alt={session.clientName} className="session-photo" />
                    <div className="session-info">
                      <h3>{session.clientName}</h3>
                      <p>{session.sessionType}</p>
                      <p>{session.date} • {session.duration}</p>
                    </div>
                    <button className="btn-view">View Details</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section recent-messages">
              <h2>Recent Messages</h2>
              <div className="messages-list">
                {recentMessages.map(message => (
                  <div key={message.id} className="message-item">
                    <img src={message.senderPhoto} alt={message.senderName} className="message-photo" />
                    <div className="message-content">
                      <div className="message-header">
                        <h3>{message.senderName}</h3>
                        <span>{message.timeAgo}</span>
                      </div>
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-view-all">View All Messages</button>
            </div>

            <div className="dashboard-section monthly-earnings">
              <h2>Monthly Earnings</h2>
              <div className="earnings-chart">
                <div className="chart-y-axis">
                  <span>4000</span>
                  <span>3000</span>
                  <span>2000</span>
                  <span>1000</span>
                  <span>0</span>
                </div>
                <div className="chart-bars-container">
                  {monthlyEarnings.map((earning, i) => (
                    <div key={i} className="chart-bar-wrapper">
                      <div 
                        className={`chart-bar ${i === monthlyEarnings.length - 1 ? 'current' : ''}`}
                        style={{ height: `${(earning.amount / 4280) * 100}%` }}
                      ></div>
                      <span className="chart-label">{earning.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-section weekly-schedule">
              <h2>Weekly Schedule</h2>
              <div className="schedule-grid">
                <div className="schedule-header">
                  <div className="schedule-time-header"></div>
                  {weeklySchedule.days.map(day => (
                    <div key={day} className="schedule-day-header">{day}</div>
                  ))}
                </div>
                {weeklySchedule.times.map((time, timeIndex) => (
                  <div key={time} className="schedule-row">
                    <div className="schedule-time">{time}</div>
                    {weeklySchedule.slots.map((daySlots, dayIndex) => (
                      <div 
                        key={`${dayIndex}-${timeIndex}`} 
                        className={`schedule-slot ${daySlots[timeIndex] ? 'booked' : 'available'}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="schedule-legend">
                <div className="legend-item">
                  <div className="legend-box booked"></div>
                  <span>Booked</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box available"></div>
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;

