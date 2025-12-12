import { useParams, Link } from 'react-router-dom';

const TRAINERS_BY_ID = {
  1: {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Boxing & Combat Sports',
    experience: '12+ years',
    rating: 4.9,
    reviews: 326,
    rate: 85,
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop&q=80',
    bio: 'With over 12 years of experience, I specialize in helping clients achieve their fitness goals through personalized training programs. My methodology focuses on building strength, improving technique, and maintaining long-term health and wellness.',
    certifications: [
      'NASM Certified Personal Trainer',
      'Precision Nutrition Level 1',
      'Functional Movement Screen',
      'CPR & First Aid Certified',
    ],
    specializations: [
      'Strength Training',
      'Weight Loss',
      'Cardio',
      'HIIT',
      'Nutrition Coaching',
      'Athletic Performance',
      'Injury Prevention',
    ],
    stats: {
      clients: '500+',
      years: '12',
      rating: '4.9',
      successRate: '95%',
    },
  },
  2: {
    id: '2',
    name: 'Marcus Steel',
    specialty: 'Strength Training',
    experience: '12+ years',
    rating: 4.9,
    reviews: 326,
    rate: 95,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&q=80',
    bio: 'Certified Personal Trainer & Nutrition Specialist with 12+ years of experience. My methodology focuses on building strength, improving technique, and maintaining long-term health and wellness.',
    certifications: [
      'NASM Certified Personal Trainer',
      'Precision Nutrition Level 1',
      'Functional Movement Screen',
      'CPR & First Aid Certified',
    ],
    specializations: [
      'Strength Training',
      'Weight Loss',
      'Cardio',
      'HIIT',
      'Nutrition Coaching',
      'Athletic Performance',
      'Injury Prevention',
    ],
    stats: {
      clients: '500+',
      years: '12',
      rating: '4.9',
      successRate: '95%',
    },
  },
};

function CoachProfilePage() {
  const { id } = useParams();
  const trainer = TRAINERS_BY_ID[id] || TRAINERS_BY_ID[2];

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
    <section className="coach-profile">
      <div className="coach-profile-container">
        <div className="coach-profile-main">
          <div className="coach-profile-photo">
            <img src={trainer.photo} alt={trainer.name} />
          </div>
          <div className="coach-profile-info">
            <h1>{trainer.name.toUpperCase()}</h1>
            <p className="coach-profile-title">{trainer.specialty}</p>
            <div className="coach-profile-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-number">{trainer.rating}</span>
              <span className="reviews-count">({trainer.reviews} Reviews)</span>
            </div>
            <Link to={`/booking/${trainer.id}`} className="coach-profile-book-btn">
              BOOK SESSION
            </Link>
          </div>
        </div>

        <div className="coach-profile-content">
          <div className="coach-profile-left">
            <div className="profile-section">
              <h2>About Me</h2>
              <p>{trainer.bio}</p>
            </div>

            <div className="profile-section">
              <h2>Certifications & Expertise</h2>
              <div className="certifications-list">
                {trainer.certifications.map((cert, idx) => (
                  <div key={idx} className="certification-item">
                    <span className="cert-icon">✓</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="coach-profile-right">
            <div className="session-rates-panel">
              <h3>Session Rates</h3>
              <div className="pricing-item">
                <span className="price">${trainer.rate}</span>
                <span className="price-label">per session</span>
              </div>
              <div className="pricing-item">
                <span className="price">$400</span>
                <span className="price-label">5 sessions</span>
              </div>
              <div className="pricing-item">
                <span className="price">$750</span>
                <span className="price-label">10 sessions</span>
              </div>
              <Link to={`/booking/${trainer.id}`} className="coach-profile-book-btn full-width">
                BOOK SESSION
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoachProfilePage;

