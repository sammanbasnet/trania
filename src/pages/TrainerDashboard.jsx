import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TrainerDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
  const trainerData = JSON.parse(localStorage.getItem('tranlyTrainer') || '{}');
  const trainerEmail = userData.email || trainerData.email;
  const trainerName = trainerData.fullName || userData.fullName || 'Trainer';

  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  
  // Load existing profile data
  const existingProfile = JSON.parse(localStorage.getItem(`trainerProfile_${trainerEmail}`) || '{}');
  
  const [profileData, setProfileData] = useState({
    name: existingProfile.name || trainerData.fullName || '',
    photo: existingProfile.photo || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
    specialty: existingProfile.specialty || trainerData.specialties?.[0] || '',
    subtitle: existingProfile.subtitle || '',
    bio: existingProfile.bio || ['', ''],
    certifications: existingProfile.certifications || [],
    specializations: existingProfile.specializations || trainerData.specialties || [],
    rate: existingProfile.rate || trainerData.hourlyRate || '',
    experience: existingProfile.experience || trainerData.yearsExperience || '',
    gymLocation: existingProfile.gymLocation || trainerData.gymLocation || '',
    stats: existingProfile.stats || {
      clients: '0',
      years: trainerData.yearsExperience || '0',
      rating: '0',
      successRate: '0%',
    },
  });

  const [profileSaved, setProfileSaved] = useState(false);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  // Load bookings for this trainer
  useEffect(() => {
    // Don't return early - we can still match by name even without email
    
    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
      const currentUserData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
      const currentTrainerData = JSON.parse(localStorage.getItem('tranlyTrainer') || '{}');
      const currentTrainerProfile = JSON.parse(localStorage.getItem(`trainerProfile_${trainerEmail}`) || '{}');
      const currentTrainerName = currentTrainerProfile.name || currentTrainerData.fullName || currentUserData.fullName || 'Trainer';
      
      // Filter bookings for this trainer
      // Since this is a demo system, we'll match by email first, then show all pending bookings
      // if no email match (to handle cases where trainer email wasn't captured)
      const myBookings = allBookings.filter(booking => {
        // Match by trainer email (most reliable)
        if (booking.trainerEmail && trainerEmail) {
          if (booking.trainerEmail.toLowerCase() === trainerEmail.toLowerCase()) {
            return true;
          }
        }
        
        // Match by trainer name (case-insensitive)
        if (booking.trainerName && currentTrainerName && currentTrainerName !== 'Trainer') {
          const bookingName = booking.trainerName.toLowerCase().trim();
          const myName = currentTrainerName.toLowerCase().trim();
          if (bookingName === myName) return true;
        }
        
        // Match by trainer ID
        if (booking.trainerId) {
          if (booking.trainerId === currentTrainerData._id || 
              booking.trainerId === String(currentTrainerData.id)) {
            return true;
          }
        }
        
        // If booking has no trainer email and we're a logged-in trainer, 
        // show it (for demo purposes - assumes single trainer)
        if (!booking.trainerEmail && trainerEmail && booking.status === 'pending') {
          return true;
        }
        
        return false;
      });
      
      // Debug logging to troubleshoot matching issues (only log when there are bookings)
      if (allBookings.length > 0 || myBookings.length > 0) {
        console.log('🔍 Booking Matching Debug:', {
          totalBookings: allBookings.length,
          matchedBookings: myBookings.length,
          trainerEmail: trainerEmail || 'NOT SET',
          trainerName: currentTrainerName,
          trainerProfileName: currentTrainerProfile.name,
          trainerData: {
            _id: currentTrainerData._id,
            id: currentTrainerData.id,
            fullName: currentTrainerData.fullName
          },
          allBookings: allBookings.map(b => ({
            id: b.id,
            trainerName: b.trainerName,
            trainerEmail: b.trainerEmail || 'NO EMAIL',
            trainerId: b.trainerId,
            clientName: b.clientName,
            status: b.status
          }))
        });
      }
      
      // Treat bookings without status as pending
      const pending = myBookings.filter(b => !b.status || b.status === 'pending');
      const accepted = myBookings.filter(b => b.status === 'accepted');
      
      // Only update state if values have changed to prevent infinite loops
      setPendingBookings(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(pending)) {
          return pending;
        }
        return prev;
      });
      
      setAcceptedBookings(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(accepted)) {
          return accepted;
        }
        return prev;
      });
    };
    
    loadBookings();
    const interval = setInterval(loadBookings, 2000); // Increased interval to reduce updates
    return () => clearInterval(interval);
  }, [trainerEmail]); // Only depend on trainerEmail which is stable

  const handleAcceptBooking = (bookingId) => {
    const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'accepted' } : booking
    );
    localStorage.setItem('tranlyBookings', JSON.stringify(updatedBookings));
    setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
    setAcceptedBookings(prev => {
      const accepted = bookings.find(b => b.id === bookingId);
      return accepted ? [...prev, { ...accepted, status: 'accepted' }] : prev;
    });
  };

  const handleRejectBooking = (bookingId) => {
    const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    );
    localStorage.setItem('tranlyBookings', JSON.stringify(updatedBookings));
    setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const stats = [
    { label: 'Total Clients', value: '48', icon: '👥' },
    { label: 'Completed Sessions', value: '326', icon: '✓' },
    { label: 'Average Rating', value: '4.9', icon: '⭐' },
    { label: 'This Month', value: '₹85,600', icon: '₹', sublabel: 'Earnings' }
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
    { month: 'Jan', amount: 64000 },
    { month: 'Feb', amount: 70000 },
    { month: 'Mar', amount: 76000 },
    { month: 'Apr', amount: 80000 },
    { month: 'May', amount: 82000 },
    { month: 'Jun', amount: 85600 }
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

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBioChange = (index, value) => {
    const newBio = [...profileData.bio];
    newBio[index] = value;
    setProfileData(prev => ({
      ...prev,
      bio: newBio
    }));
  };

  const handleCertificationAdd = () => {
    const certName = prompt('Enter certification name:');
    const certOrg = prompt('Enter organization:');
    if (certName && certOrg) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { name: certName, org: certOrg }]
      }));
    }
  };

  const handleCertificationRemove = (index) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSpecializationToggle = (spec) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
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
    // Ensure bio is an array
    const bioArray = Array.isArray(profileData.bio) 
      ? profileData.bio.filter(p => p.trim() !== '')
      : [profileData.bio || ''].filter(p => p.trim() !== '');
    
    // Ensure certifications is an array
    const certsArray = Array.isArray(profileData.certifications) 
      ? profileData.certifications 
      : [];
    
    // Ensure specializations is an array
    const specsArray = Array.isArray(profileData.specializations) 
      ? profileData.specializations 
      : [];

    const profileToSave = {
      ...profileData,
      bio: bioArray.length > 0 ? bioArray : ['', ''],
      certifications: certsArray,
      specializations: specsArray,
    };

    // Save profile to localStorage keyed by email
    localStorage.setItem(`trainerProfile_${trainerEmail}`, JSON.stringify(profileToSave));
    
    // Also update the trainer profiles object for easy lookup
    const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    trainerProfiles[trainerEmail] = profileToSave;
    localStorage.setItem('trainerProfiles', JSON.stringify(trainerProfiles));
    
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const availableSpecializations = [
    'Strength Training',
    'Weight Loss',
    'Muscle Building',
    'Functional Fitness',
    'Nutrition Coaching',
    'Athletic Performance',
    'Injury Prevention',
    'Yoga',
    'Pilates',
    'Cardio',
    'HIIT',
    'CrossFit',
    'Boxing',
    'Swimming',
  ];

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
              <p>Update your profile information that will be visible to clients</p>

              {profileSaved && (
                <div className="profile-save-success">
                  Profile saved successfully! Your changes will be visible to clients.
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
                  <label>Specialty</label>
                  <input
                    type="text"
                    value={profileData.specialty}
                    onChange={(e) => handleProfileChange('specialty', e.target.value)}
                    className="profile-input"
                    placeholder="e.g., Strength Training, Yoga, etc."
                  />
                </div>

                <div className="profile-form-group">
                  <label>Subtitle/Tagline</label>
                  <input
                    type="text"
                    value={profileData.subtitle}
                    onChange={(e) => handleProfileChange('subtitle', e.target.value)}
                    className="profile-input"
                    placeholder="e.g., Certified Personal Trainer & Nutrition Specialist"
                  />
                </div>

                <div className="profile-form-group">
                  <label>About Me (Paragraph 1)</label>
                  <textarea
                    value={profileData.bio[0] || ''}
                    onChange={(e) => handleBioChange(0, e.target.value)}
                    className="profile-textarea"
                    rows="4"
                    placeholder="First paragraph of your bio..."
                  />
                </div>

                <div className="profile-form-group">
                  <label>About Me (Paragraph 2)</label>
                  <textarea
                    value={profileData.bio[1] || ''}
                    onChange={(e) => handleBioChange(1, e.target.value)}
                    className="profile-textarea"
                    rows="4"
                    placeholder="Second paragraph of your bio..."
                  />
                </div>

                <div className="profile-form-group">
                  <label>Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={profileData.rate}
                    onChange={(e) => handleProfileChange('rate', e.target.value)}
                    className="profile-input"
                    placeholder="1500"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => handleProfileChange('experience', e.target.value)}
                    className="profile-input"
                    placeholder="12"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Gym Location</label>
                  <input
                    type="text"
                    value={profileData.gymLocation}
                    onChange={(e) => handleProfileChange('gymLocation', e.target.value)}
                    className="profile-input"
                    placeholder="City, State or Gym Name"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Certifications</label>
                  <div className="certifications-list-edit">
                    {profileData.certifications.map((cert, idx) => (
                      <div key={idx} className="cert-item-edit">
                        <div>
                          <strong>{cert.name}</strong>
                          <p>{cert.org}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCertificationRemove(idx)}
                          className="btn-remove-cert"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleCertificationAdd}
                      className="btn-add-cert"
                    >
                      + Add Certification
                    </button>
                  </div>
                </div>

                <div className="profile-form-group">
                  <label>Specializations</label>
                  <div className="specializations-checkboxes">
                    {availableSpecializations.map(spec => (
                      <label key={spec} className="specialization-checkbox">
                        <input
                          type="checkbox"
                          checked={profileData.specializations.includes(spec)}
                          onChange={() => handleSpecializationToggle(spec)}
                        />
                        <span>{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="profile-form-group">
                  <label>Quick Stats</label>
                  <div className="stats-inputs">
                    <div>
                      <label>Clients Trained</label>
                      <input
                        type="text"
                        value={profileData.stats.clients}
                        onChange={(e) => handleProfileChange('stats', {
                          ...profileData.stats,
                          clients: e.target.value
                        })}
                        className="profile-input-small"
                        placeholder="500+"
                      />
                    </div>
                    <div>
                      <label>Years Experience</label>
                      <input
                        type="text"
                        value={profileData.stats.years}
                        onChange={(e) => handleProfileChange('stats', {
                          ...profileData.stats,
                          years: e.target.value
                        })}
                        className="profile-input-small"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <label>Average Rating</label>
                      <input
                        type="text"
                        value={profileData.stats.rating}
                        onChange={(e) => handleProfileChange('stats', {
                          ...profileData.stats,
                          rating: e.target.value
                        })}
                        className="profile-input-small"
                        placeholder="4.9"
                      />
                    </div>
                    <div>
                      <label>Success Rate</label>
                      <input
                        type="text"
                        value={profileData.stats.successRate}
                        onChange={(e) => handleProfileChange('stats', {
                          ...profileData.stats,
                          successRate: e.target.value
                        })}
                        className="profile-input-small"
                        placeholder="95%"
                      />
                    </div>
                  </div>
                </div>

                <button onClick={handleSaveProfile} className="btn-save-profile">
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            <>
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
            <div className="dashboard-section pending-bookings">
              <h2>Pending Bookings</h2>
              {pendingBookings.length === 0 ? (
                <p style={{ color: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>No pending booking requests</p>
              ) : (
                <div className="sessions-list">
                  {pendingBookings.map(booking => (
                    <div key={booking.id} className="session-item">
                      <div className="session-photo-placeholder">
                        <span>👤</span>
                      </div>
                      <div className="session-info">
                        <h3>{booking.clientName}</h3>
                        <p>{booking.specialty}</p>
                        <p>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {booking.time}</p>
                        {booking.notes && <p className="booking-notes">Notes: {booking.notes}</p>}
                      </div>
                      <div className="booking-actions">
                        <button 
                          onClick={() => handleAcceptBooking(booking.id)} 
                          className="btn-accept"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleRejectBooking(booking.id)} 
                          className="btn-reject"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-section upcoming-sessions">
              <h2>Accepted Sessions</h2>
              {acceptedBookings.length === 0 ? (
                <p style={{ color: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>No accepted sessions yet</p>
              ) : (
                <div className="sessions-list">
                  {acceptedBookings.map(booking => (
                    <div key={booking.id} className="session-item">
                      <div className="session-photo-placeholder">
                        <span>👤</span>
                      </div>
                      <div className="session-info">
                        <h3>{booking.clientName}</h3>
                        <p>{booking.specialty}</p>
                        <p>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {booking.time}</p>
                      </div>
                      <button className="btn-view">View Details</button>
                    </div>
                  ))}
                </div>
              )}
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
                        style={{ height: `${(earning.amount / 85600) * 100}%` }}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;

