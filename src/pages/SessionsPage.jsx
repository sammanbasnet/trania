import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Mock available sessions data
const AVAILABLE_SESSIONS = [
  {
    id: '1',
    trainerId: '1',
    trainerName: 'John Smith',
    trainerPhoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
    specialty: 'Strength Training Specialist',
    time: '10:00 - 11:00 AM',
    location: 'Studio A',
    isOnline: false,
    price: 1500,
    date: '2024-12-15',
  },
  {
    id: '2',
    trainerId: '2',
    trainerName: 'Sarah Johnson',
    trainerPhoto: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&q=80',
    specialty: 'Yoga & Mindfulness',
    time: '11:30 AM - 12:30 PM',
    location: 'Online Session',
    isOnline: true,
    price: 1200,
    date: '2024-12-15',
  },
  {
    id: '3',
    trainerId: '3',
    trainerName: 'Mike Chen',
    trainerPhoto: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=600&h=600&fit=crop&q=80',
    specialty: 'CrossFit Coach',
    time: '2:00 - 3:00 PM',
    location: 'CrossFit Box',
    isOnline: false,
    price: 2000,
    date: '2024-12-15',
  },
  {
    id: '4',
    trainerId: '4',
    trainerName: 'Emma Rodriguez',
    trainerPhoto: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop&q=80',
    specialty: 'HIIT & Cardio',
    time: '4:30 - 5:30 PM',
    location: 'Studio B',
    isOnline: false,
    price: 1700,
    date: '2024-12-15',
  },
];

// Trainer data for mapping
const TRAINERS_DATA = {
  '1': { name: 'John Smith', photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80', specialty: 'Strength Training Specialist' },
  '2': { name: 'Sarah Johnson', photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&q=80', specialty: 'Yoga & Mindfulness' },
  '3': { name: 'Mike Chen', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=600&h=600&fit=crop&q=80', specialty: 'CrossFit Coach' },
  '4': { name: 'Emma Rodriguez', photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop&q=80', specialty: 'HIIT & Cardio' },
};

function SessionsPage() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
  const clientEmail = userData.email;
  
  const [availableSessions, setAvailableSessions] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    trainer: 'All Trainers',
    specialty: 'All Specialties',
    duration: 'Any Duration',
    priceRange: 'Any Price',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 4;

  // Load sessions from accepted bookings, using actual trainer profiles
  useEffect(() => {
    const loadSessions = () => {
      const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
      const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
      
      // Get accepted bookings for this client
      const acceptedBookings = bookings.filter(
        booking => booking.clientEmail === clientEmail && booking.status === 'accepted'
      );
      
      // Create sessions from accepted bookings using actual trainer data
      const sessionsFromBookings = acceptedBookings.map(booking => {
        // Try to get trainer profile data - prioritize email match
        let trainerProfile = null;
        if (booking.trainerEmail && trainerProfiles[booking.trainerEmail]) {
          trainerProfile = trainerProfiles[booking.trainerEmail];
        } else {
          // Find by any trainer profile (for demo - use first available trainer profile)
          const profileEntries = Object.entries(trainerProfiles);
          if (profileEntries.length > 0) {
            trainerProfile = profileEntries[0][1]; // Use first trainer profile
          }
        }
        
        // Always use profile data if available, completely ignore booking trainerName if it's mock data
        const mockNames = ['Sarah Johnson', 'John Smith', 'Mike Chen', 'Emma Rodriguez'];
        const isMockName = mockNames.includes(booking.trainerName);
        
        // Get trainer email from profile if we found one
        const finalTrainerEmail = booking.trainerEmail || (trainerProfile ? Object.keys(trainerProfiles).find(email => trainerProfiles[email] === trainerProfile) : null);
        
        // Use profile name if available, otherwise only use booking name if it's NOT a mock name
        const finalTrainerName = trainerProfile?.name || (!isMockName ? booking.trainerName : null) || 'Trainer';
        
        // If we have a trainer profile, use it but prioritize booking price
        if (trainerProfile) {
          return {
            id: booking.id,
            trainerId: booking.trainerId || booking.id,
            trainerName: trainerProfile.name,
            trainerEmail: finalTrainerEmail,
            trainerPhoto: trainerProfile.photo,
            specialty: trainerProfile.specialty,
            time: booking.time || '10:00 - 11:00 AM',
            location: trainerProfile.gymLocation || 'Studio',
            isOnline: false,
            price: booking.price || trainerProfile.rate || 1500, // Prioritize booking price
            sessionType: booking.sessionType || 'single', // Include session type
            date: booking.date || new Date().toISOString().split('T')[0],
          };
        }
        
        // Fallback to booking data only if not mock name
        if (isMockName) {
          return null; // Skip mock trainers
        }
        
        return {
          id: booking.id,
          trainerId: booking.trainerId || booking.id,
          trainerName: booking.trainerName,
          trainerEmail: booking.trainerEmail,
          trainerPhoto: booking.trainerPhoto,
          specialty: booking.specialty,
          time: booking.time || '10:00 - 11:00 AM',
          location: 'Studio',
          isOnline: false,
          price: booking.price || 1500, // Use booking price
          sessionType: booking.sessionType || 'single', // Include session type
          date: booking.date || new Date().toISOString().split('T')[0],
        };
      }).filter(session => session !== null && session.trainerName && session.trainerName !== 'Trainer'); // Filter out invalid sessions
      
      setAvailableSessions(sessionsFromBookings);
    };
    
    loadSessions();
    const interval = setInterval(loadSessions, 1000);
    return () => clearInterval(interval);
  }, [clientEmail]);

  // Filter sessions
  const filteredSessions = availableSessions.filter(session => {
    if (filters.date && session.date !== filters.date) return false;
    if (filters.trainer !== 'All Trainers' && session.trainerName !== filters.trainer) return false;
    if (filters.specialty !== 'All Specialties' && !session.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) return false;
    if (filters.priceRange !== 'Any Price') {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p.replace('₹', '').replace(',', '')));
      if (max) {
        if (session.price < min || session.price > max) return false;
      } else {
        // Handle "₹10000+" case
        const minPrice = parseInt(filters.priceRange.replace('₹', '').replace(',', '').replace('+', ''));
        if (session.price < minPrice) return false;
      }
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + sessionsPerPage);

  const handleBookNow = (session) => {
    // Navigate to booking page with trainer ID and email if available
    const emailParam = session.trainerEmail ? `?email=${encodeURIComponent(session.trainerEmail)}` : '';
    navigate(`/booking/${session.trainerId}${emailParam}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="sessions-page">
      <div className="sessions-container">
        {/* Main Content */}
        <div className="sessions-main">
          <div className="sessions-header">
            <h1>Available Sessions</h1>
            <p>Book your next training session with our expert trainers</p>
          </div>

          {/* Filters */}
          <div className="sessions-filters">
            <div className="filter-group">
              <label>Date</label>
              <div className="filter-input-wrapper">
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="filter-input"
                />
                <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>

            <div className="filter-group">
              <label>Trainer</label>
              <select
                value={filters.trainer}
                onChange={(e) => setFilters({ ...filters, trainer: e.target.value })}
                className="filter-select"
              >
                <option>All Trainers</option>
                {[...new Set(availableSessions.map(s => s.trainerName))].map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                className="filter-select"
              >
                <option>All Specialties</option>
                {[...new Set(availableSessions.map(s => s.specialty))].map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="filter-select"
              >
                <option>Any Duration</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>1.5 hours</option>
                <option>2 hours</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="filter-select"
              >
                <option>Any Price</option>
                <option>₹0-₹1000</option>
                <option>₹1000-₹1500</option>
                <option>₹1500-₹2000</option>
                <option>₹2000+</option>
              </select>
            </div>
          </div>

          {/* Session Cards */}
          <div className="sessions-grid">
            {paginatedSessions.map(session => (
              <div key={session.id} className="session-card">
                <div className="session-card-header">
                  <img src={session.trainerPhoto} alt={session.trainerName} className="session-trainer-photo" />
                  <div className="session-trainer-info">
                    <h3>{session.trainerName}</h3>
                    <p>{session.specialty}</p>
                  </div>
                </div>
                <div className="session-card-details">
                  <div className="session-detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{session.time}</span>
                  </div>
                  <div className="session-detail-item">
                    {session.isOnline ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2"></path>
                        <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2"></path>
                        <line x1="3" y1="17" x2="21" y2="17"></line>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    )}
                    <span>{session.location}</span>
                  </div>
                </div>
                <div className="session-card-footer">
                  <div className="session-price-info">
                    <span className="session-price">₹{session.price.toLocaleString('en-IN')}</span>
                    {session.sessionType && (
                      <span className="session-type-badge">
                        {session.sessionType === 'single' ? 'Single Session' : 
                         session.sessionType === 'package5' ? '5 Session Package' : 
                         session.sessionType === 'package10' ? '10 Session Package' : 'Session'}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleBookNow(session)} className="session-book-btn">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="sessions-pagination">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default SessionsPage;

