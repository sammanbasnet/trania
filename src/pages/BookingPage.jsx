import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const TRAINERS_BY_ID = {
  1: {
    id: '1',
    name: 'John Smith',
    specialty: 'Strength Training Specialist',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&q=80',
  },
  2: {
    id: '2',
    name: 'Sarah Johnson',
    specialty: 'Yoga & Mindfulness',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop&q=80',
  },
  3: {
    id: '3',
    name: 'Mike Chen',
    specialty: 'CrossFit Coach',
    photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=800&h=800&fit=crop&q=80',
  },
  4: {
    id: '4',
    name: 'Emma Rodriguez',
    specialty: 'HIIT & Cardio',
    photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop&q=80',
  },
};

function BookingPage() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [sessionType, setSessionType] = useState('single'); // single, package5, package10
  const [notes, setNotes] = useState('');
  const [confirmation, setConfirmation] = useState('');

  // Session rates
  const sessionRates = {
    single: { price: 1000, label: 'Single Session', sessions: 1 },
    package5: { price: 7000, label: '5 Session Package', sessions: 5, savings: 500 },
    package10: { price: 13000, label: '10 Session Package', sessions: 10, savings: 2000 },
  };

  // Available time slots
  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
  ];
  
  // Get trainer data from profiles first, then fall back to mock data
  const getTrainerData = () => {
    const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    
    // If email is in URL, use that profile
    if (emailFromUrl && trainerProfiles[emailFromUrl]) {
      const profile = trainerProfiles[emailFromUrl];
      return {
        id: trainerId,
        name: profile.name,
        specialty: profile.specialty,
        photo: profile.photo,
        email: emailFromUrl,
      };
    }
    
    // Try to find by trainerId in profiles (if trainerId matches an email)
    if (trainerProfiles[trainerId]) {
      const profile = trainerProfiles[trainerId];
      return {
        id: trainerId,
        name: profile.name,
        specialty: profile.specialty,
        photo: profile.photo,
        email: trainerId,
      };
    }
    
    // Try to find any trainer profile (for demo - assumes single trainer)
    const profileEntries = Object.entries(trainerProfiles);
    if (profileEntries.length > 0) {
      const [email, profile] = profileEntries[0];
      return {
        id: trainerId,
        name: profile.name,
        specialty: profile.specialty,
        photo: profile.photo,
        email: email,
      };
    }
    
    // Fall back to mock data
    return TRAINERS_BY_ID[trainerId] || TRAINERS_BY_ID[2];
  };
  
  const trainer = getTrainerData();

  // Get trainer email from the trainer data
  const getTrainerEmail = () => {
    // If trainer has email property (from profile), use it
    if (trainer.email) {
      return trainer.email;
    }
    
    // Otherwise try to find by name
    const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    const profileEntry = Object.entries(trainerProfiles).find(([email, profile]) => 
      profile.name && profile.name.toLowerCase() === trainer.name.toLowerCase()
    );
    
    return profileEntry ? profileEntry[0] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !selectedTimeSlot) {
      setConfirmation('Please select date and time slot.');
      return;
    }

    if (!sessionType) {
      setConfirmation('Please select a session package.');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('tranlyUser') || '{}');
    const clientEmail = userData.email;
    const clientName = userData.fullName || 'Client';

    const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
    const trainerEmail = getTrainerEmail();
    const selectedRate = sessionRates[sessionType];
    
    const newBooking = {
      id: Date.now().toString(),
      trainerId: trainerId,
      trainerName: trainer.name,
      trainerEmail: trainerEmail || trainer.email || null,
      trainerPhoto: trainer.photo,
      specialty: trainer.specialty,
      clientEmail,
      clientName,
      date,
      time: selectedTimeSlot,
      sessionType: sessionType, // Store session type
      price: selectedRate.price, // Store the actual price
      notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem('tranlyBookings', JSON.stringify(bookings));

    setConfirmation('Booking request sent! The trainer will review and accept your booking.');
    setTimeout(() => {
      navigate('/sessions');
    }, 2000);
  };

  if (!trainer) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <p>Trainer not found.</p>
          <Link to="/trainers" className="booking-btn-cancel">
            Back to trainers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1 className="booking-title">Book a session with {trainer.name}</h1>
          <p className="booking-specialty">{trainer.specialty}</p>
        </div>

        <div className="booking-content-wrapper">
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Session Rates Selection */}
            <div className="booking-section">
              <label className="booking-section-label">Session Rates</label>
              <div className="session-rates-grid">
                <div 
                  className={`session-rate-card ${sessionType === 'single' ? 'selected' : ''}`}
                  onClick={() => setSessionType('single')}
                >
                  <div className="rate-header">
                    <h3>SINGLE SESSION</h3>
                  </div>
                  <div className="rate-price">₹{sessionRates.single.price.toLocaleString('en-IN')} /hour</div>
                </div>
                
                <div 
                  className={`session-rate-card ${sessionType === 'package5' ? 'selected' : ''}`}
                  onClick={() => setSessionType('package5')}
                >
                  <div className="rate-header">
                    <h3>5 SESSION PACKAGE</h3>
                  </div>
                  <div className="rate-price">₹{sessionRates.package5.price.toLocaleString('en-IN')}</div>
                  <div className="rate-savings">Save ₹{sessionRates.package5.savings.toLocaleString('en-IN')}</div>
                </div>
                
                <div 
                  className={`session-rate-card ${sessionType === 'package10' ? 'selected' : ''}`}
                  onClick={() => setSessionType('package10')}
                >
                  <div className="rate-header">
                    <h3>10 SESSION PACKAGE</h3>
                  </div>
                  <div className="rate-price">₹{sessionRates.package10.price.toLocaleString('en-IN')}</div>
                  <div className="rate-savings">Save ₹{sessionRates.package10.savings.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="booking-input-group">
              <label className="booking-label">DATE</label>
              <div className="booking-input-wrapper">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="booking-input"
                  min={new Date().toISOString().split('T')[0]}
                />
                <svg className="booking-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="booking-input-group">
              <label className="booking-label">TIME</label>
              <div className="time-slots-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot-btn ${selectedTimeSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="booking-input-group booking-notes-group">
              <label className="booking-label">NOTES (OPTIONAL)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Goals, preferences, injuries..."
                className="booking-textarea"
                rows="4"
              />
            </div>

            {confirmation && (
              <div className={`booking-confirmation ${confirmation.includes('Please') ? 'error' : 'success'}`}>
                {confirmation}
              </div>
            )}

            <div className="booking-actions">
              <Link to="/trainers" className="booking-btn-cancel">
                Cancel
              </Link>
              <button type="submit" className="booking-btn-confirm">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;


