import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
  const userEmail = userData.email;
  const userName = userData.fullName || 'Sarah';

  // Load existing profile data
  const existingProfile = JSON.parse(localStorage.getItem(`clientProfile_${userEmail}`) || '{}');

  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [profileSaved, setProfileSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    name: existingProfile.name || userData.fullName || '',
    email: existingProfile.email || userData.email || '',
    phone: existingProfile.phone || userData.phone || '',
    photo: existingProfile.photo || 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=600&fit=crop&q=80',
    bio: existingProfile.bio || '',
    gender: existingProfile.gender || userData.gender || '',
    dateOfBirth: existingProfile.dateOfBirth || '',
    address: existingProfile.address || '',
  });

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

  const [mySessions, setMySessions] = useState([]);

  // Load accepted bookings for this client
  useEffect(() => {
    const loadMySessions = () => {
      const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
      const acceptedBookings = bookings
        .filter(booking => booking.clientEmail === userEmail && booking.status === 'accepted')
        .map(booking => ({
          id: booking.id,
          type: booking.specialty || 'Training Session',
          date: `${new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${booking.time}`,
          status: 'Confirmed',
          trainerName: booking.trainerName,
          trainerPhoto: booking.trainerPhoto,
        }));
      setMySessions(acceptedBookings);
    };
    
    loadMySessions();
    const interval = setInterval(loadMySessions, 1000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const favoriteTrainers = [
    { name: 'Alex Rodriguez', specialty: 'Strength & Conditioning', rating: 4.9, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80' },
    { name: 'Jessica Chen', specialty: 'Yoga & Pilates', rating: 4.8, photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&q=80' },
    { name: 'David Kim', specialty: 'HIIT & Cardio', rating: 4.7, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&q=80' }
  ];

  const paymentHistory = [
    { description: 'Monthly Subscription', date: 'Dec 1, 2024', amount: '₹1,800' },
    { description: 'Personal Training Session', date: 'Nov 28, 2024', amount: '₹1,500' },
    { description: 'Monthly Subscription', date: 'Nov 1, 2024', amount: '₹1,800' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('tranlyUser');
    localStorage.removeItem('tranlyTrainer');
    navigate('/login');
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Save profile to localStorage keyed by email
    localStorage.setItem(`clientProfile_${userEmail}`, JSON.stringify(profileData));
    
    // Also update the client profiles object for easy lookup
    const clientProfiles = JSON.parse(localStorage.getItem('clientProfiles') || '{}');
    clientProfiles[userEmail] = profileData;
    localStorage.setItem('clientProfiles', JSON.stringify(clientProfiles));
    
    // Update userData in localStorage
    const updatedUserData = {
      ...userData,
      fullName: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      gender: profileData.gender,
    };
    localStorage.setItem('tranlyUser', JSON.stringify(updatedUserData));
    
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
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
          <Link to="/sessions" className={`sidebar-item ${activeSidebar === 'sessions' ? 'active' : ''}`} onClick={() => setActiveSidebar('sessions')}>
            <span className="sidebar-icon">📅</span>
            <span>Sessions</span>
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
          <button className={`sidebar-item ${activeSidebar === 'settings' ? 'active' : ''}`} onClick={() => setActiveSidebar('settings')}>
            <span className="sidebar-icon">⚙️</span>
            <span>Profile Settings</span>
          </button>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <span className="sidebar-icon">→</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-content">
          {activeSidebar === 'settings' ? (
            <div className="profile-settings-section">
              <h1>Edit Your Profile</h1>
              <p>Update your profile information</p>

              {profileSaved && (
                <div className="profile-save-success">
                  Profile saved successfully!
                </div>
              )}

              <div className="profile-edit-form">
                <div className="profile-form-group">
                  <label>Profile Photo</label>
                  <div className="photo-upload-section">
                    <img src={profileData.photo} alt="Profile" className="profile-preview-photo" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="photo-upload-input"
                    />
                    <button
                      type="button"
                      onClick={() => document.querySelector('.photo-upload-input').click()}
                      className="btn-upload-photo"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="profile-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="profile-input"
                    placeholder="Your full name"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="profile-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="profile-input"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Gender</label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => handleProfileChange('gender', e.target.value)}
                    className="profile-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="profile-form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                    className="profile-input"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Address</label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                    className="profile-textarea"
                    rows="3"
                    placeholder="Your address..."
                  />
                </div>

                <div className="profile-form-group">
                  <label>About Me</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    className="profile-textarea"
                    rows="5"
                    placeholder="Tell us about yourself, your fitness goals, and what you're looking for in a trainer..."
                  />
                </div>

                <button onClick={handleSaveProfile} className="btn-save-profile">
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="dashboard-welcome">
                <h1>Welcome back, {profileData.name || userName}</h1>
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
                <h2>My Sessions</h2>
                <Link to="/sessions" className="btn-primary" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Book More Sessions
                </Link>
              </div>
              <div className="sessions-list">
                {mySessions.length === 0 ? (
                  <p style={{ color: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>No sessions booked yet. Book a session to get started!</p>
                ) : (
                  mySessions.map((session) => (
                    <div key={session.id} className="session-row">
                      <div>
                        <h3>{session.type} {session.trainerName && `with ${session.trainerName}`}</h3>
                        <p>{session.date}</p>
                      </div>
                      <span className={`status-badge ${session.status.toLowerCase()}`}>{session.status}</span>
                    </div>
                  ))
                )}
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

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;

