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
      <section className="card">
        <p>Trainer not found.</p>
        <Link to="/trainers" className="secondary-btn">
          Back to trainers
        </Link>
      </section>
    );
  }

  return (
    <section className="card">
      <h1>Book a session with {trainer.name}</h1>
      <p className="muted">{trainer.specialty}</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          Time
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>

        <label>
          Notes (optional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Goals, preferences, injuries..."
          />
        </label>

        {confirmation && <div className="info">{confirmation}</div>}

        <div className="form-actions">
          <Link to="/trainers" className="secondary-btn">
            Cancel
          </Link>
          <button type="submit" className="primary-btn">
            Confirm Booking
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookingPage;


