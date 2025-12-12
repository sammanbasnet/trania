import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const TRAINERS_BY_ID = {
  1: {
    id: '1',
    name: 'Alex Johnson',
    specialty: 'Strength & Conditioning',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&q=80',
  },
  2: {
    id: '2',
    name: 'Maria Gomez',
    specialty: 'Weight Loss & Nutrition',
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop&q=80',
  },
  3: {
    id: '3',
    name: 'James Lee',
    specialty: 'Functional Fitness & Mobility',
    photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=800&h=800&fit=crop&q=80',
  },
};

function BookingPage() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const trainer = TRAINERS_BY_ID[trainerId];
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) {
      setConfirmation('Please select date and time.');
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('tranlyBookings') || '[]');
    bookings.push({
      id: Date.now().toString(),
      trainerId,
      date,
      time,
      notes,
    });
    localStorage.setItem('tranlyBookings', JSON.stringify(bookings));

    setConfirmation('Session booked successfully!');
    setTimeout(() => {
      navigate('/trainers');
    }, 1200);
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
        <h1 className="booking-title">Book a session with {trainer.name}</h1>
        <p className="booking-specialty">{trainer.specialty}</p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="booking-input-group">
            <label className="booking-label">Date</label>
            <div className="booking-input-wrapper">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="mm/dd/yyyy"
                className="booking-input"
              />
              <svg className="booking-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>

          <div className="booking-input-group">
            <label className="booking-label">Time</label>
            <div className="booking-input-wrapper">
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="--:--"
                className="booking-input"
              />
              <svg className="booking-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>

          <div className="booking-input-group booking-notes-group">
            <label className="booking-label">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Goals, preferences, injuries..."
              className="booking-textarea"
            />
          </div>

          {confirmation && <div className="booking-confirmation">{confirmation}</div>}

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
  );
}

export default BookingPage;


