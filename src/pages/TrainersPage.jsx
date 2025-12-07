import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import { useState } from 'react';

const MOCK_TRAINERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Boxing & Combat Sports',
    experience: '6 years',
    rating: 4.9,
    rate: 85,
    photo: 'https://images.unsplash.com/photo-1594736797933-d0cbc0c0e0b8?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Marcus Steel',
    specialty: 'Strength Training',
    experience: '12 years',
    rating: 4.9,
    rate: 95,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Emma Chen',
    specialty: 'Yoga & Flexibility',
    experience: '5 years',
    rating: 4.8,
    rate: 75,
    photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'David Thompson',
    specialty: 'Cardio & HIIT',
    experience: '8 years',
    rating: 4.7,
    rate: 80,
    photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    specialty: 'Weight Loss',
    experience: '7 years',
    rating: 4.9,
    rate: 90,
    photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Alex Kumar',
    specialty: 'Nutrition Coaching',
    experience: '10 years',
    rating: 4.8,
    rate: 100,
    photo: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=600&fit=crop&q=80',
  },
];

function TrainersPage() {
  const [filter, setFilter] = useState('All Trainers');
  const navigate = useNavigate();

  const filters = ['All Trainers', 'Weight Training', 'Cardio', 'Yoga', 'Nutrition'];

  const filteredTrainers = filter === 'All Trainers' 
    ? MOCK_TRAINERS 
    : MOCK_TRAINERS.filter(t => 
        t.specialty.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <>
      <section className="coaches-hero">
        <div className="coaches-hero-content">
          <h1 className="coaches-title">COACHES</h1>
          <div className="coaches-hero-logo">
            <Logo size={220} />
          </div>
        </div>
      </section>

      <section className="coaches-section">
        <div className="coaches-container">
          <div className="coaches-header">
            <h2>Find Your Perfect Coach</h2>
            <p className="coaches-subtitle">Connect with certified trainers and coaches who will help you achieve your fitness goals.</p>
          </div>

          <div className="coaches-filters">
            <span className="filter-label">Filter by:</span>
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="coaches-grid">
            {filteredTrainers.map((trainer) => (
              <article key={trainer.id} className="coach-card">
                <div className="coach-photo-circle">
                  <img src={trainer.photo} alt={trainer.name} />
                </div>
                <div className="coach-info">
                  <h3>{trainer.name}</h3>
                  <p className="coach-specialty">{trainer.specialty}</p>
                  <div className="coach-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{trainer.rating}</span>
                  </div>
                  <p className="coach-rate">${trainer.rate}/hr</p>
                  <Link to={`/trainer/${trainer.id}`} className="primary-btn full-width">
                    View Profile
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            <button className="pagination-btn">←</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">→</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrainersPage;


