import { useParams, Link } from 'react-router-dom';

const TRAINERS_BY_ID = {
  1: {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Boxing & Combat Sports',
    subtitle: 'Certified Personal Trainer & Combat Sports Specialist',
    experience: '12',
    rating: 4.9,
    reviews: 326,
    rate: 85,
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop&q=80',
    bio: [
      'With over 12 years of experience in the fitness industry, I specialize in strength training, body transformation, and functional fitness. My approach combines scientific methodology with personalized attention to help you achieve sustainable results.',
      'Whether you\'re looking to build muscle, lose weight, or improve athletic performance, I\'ll create a customized program tailored to your specific goals and lifestyle.'
    ],
    certifications: [
      { name: 'NASM Certified Personal Trainer', org: 'National Academy of Sports Medicine' },
      { name: 'Precision Nutrition Level 1', org: 'Certified Nutrition Coach' },
      { name: 'Functional Movement Screen', org: 'FMS Certified Professional' },
      { name: 'CPR & First Aid Certified', org: 'American Red Cross' },
    ],
    specializations: [
      'Strength Training',
      'Weight Loss',
      'Muscle Building',
      'Functional Fitness',
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
    subtitle: 'Certified Personal Trainer & Nutrition Specialist',
    experience: '12',
    rating: 4.9,
    reviews: 127,
    rate: 85,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&q=80',
    bio: [
      'With over 12 years of experience in the fitness industry, I specialize in strength training, body transformation, and functional fitness. My approach combines scientific methodology with personalized attention to help you achieve sustainable results.',
      'Whether you\'re looking to build muscle, lose weight, or improve athletic performance, I\'ll create a customized program tailored to your specific goals and lifestyle.'
    ],
    certifications: [
      { name: 'NASM Certified Personal Trainer', org: 'National Academy of Sports Medicine' },
      { name: 'Precision Nutrition Level 1', org: 'Certified Nutrition Coach' },
      { name: 'Functional Movement Screen', org: 'FMS Certified Professional' },
      { name: 'CPR & First Aid Certified', org: 'American Red Cross' },
    ],
    specializations: [
      'Strength Training',
      'Weight Loss',
      'Muscle Building',
      'Functional Fitness',
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
        {/* Hero Section */}
        <div className="coach-profile-hero">
          <div className="coach-hero-content">
            <div className="coach-hero-info">
              <h1>{trainer.name.toUpperCase()}</h1>
              <p className="coach-profile-subtitle">{trainer.subtitle}</p>
              <div className="coach-hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-icon">★</span>
                  <span className="hero-stat-value">{trainer.rating}</span>
                  <span className="hero-stat-label">({trainer.reviews} reviews)</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-icon">👤</span>
                  <span className="hero-stat-value">{trainer.experience} Years</span>
                  <span className="hero-stat-label">Experience</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-icon">👥</span>
                  <span className="hero-stat-value">{trainer.stats.clients}</span>
                  <span className="hero-stat-label">Clients</span>
                </div>
              </div>
            </div>
            <Link to={`/booking/${trainer.id}`} className="coach-hero-book-btn">
              BOOK NOW
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="coach-profile-content">
          <div className="coach-profile-left">
            <div className="profile-section">
              <h2>ABOUT ME</h2>
              {trainer.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="profile-section">
              <h2>CERTIFICATIONS & EXPERTISE</h2>
              <div className="certifications-grid">
                {trainer.certifications.map((cert, idx) => (
                  <div key={idx} className="certification-card">
                    <div className="cert-icon-circle">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="cert-content">
                      <div className="cert-name">{cert.name}</div>
                      <div className="cert-org">{cert.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>SPECIALIZATIONS</h2>
              <div className="specializations-tags">
                {trainer.specializations.map((spec, idx) => (
                  <span key={idx} className="specialization-tag">{spec}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="coach-profile-right">
            <div className="coach-sidebar-sticky">
              <div className="session-rates-panel">
                <h3>SESSION RATES</h3>
                <div className="pricing-item">
                  <div className="pricing-header">SINGLE SESSION</div>
                  <span className="price">${trainer.rate}</span>
                  <span className="price-label">/hour</span>
                </div>
                <div className="pricing-divider"></div>
                <div className="pricing-item">
                  <div className="pricing-header">5 SESSION PACKAGE</div>
                  <span className="price">$400</span>
                  <span className="price-label">Save $25</span>
                </div>
                <div className="pricing-divider"></div>
                <div className="pricing-item">
                  <div className="pricing-header">10 SESSION PACKAGE</div>
                  <span className="price">$750</span>
                  <span className="price-label">Save $100</span>
                </div>
                <Link to={`/booking/${trainer.id}`} className="coach-profile-book-btn full-width">
                  BOOK SESSION
                </Link>
              </div>

              <div className="quick-stats-panel">
                <h3>QUICK STATS</h3>
                <div className="quick-stat-item">
                  <span className="quick-stat-value">{trainer.stats.clients}</span>
                  <span className="quick-stat-label">Clients Trained</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-value">{trainer.stats.years}</span>
                  <span className="quick-stat-label">Years Experience</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-value">{trainer.stats.rating}</span>
                  <span className="quick-stat-label">Average Rating</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-value">{trainer.stats.successRate}</span>
                  <span className="quick-stat-label">Client Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoachProfilePage;

