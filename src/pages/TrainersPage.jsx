import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo.jsx';

const MOCK_TRAINERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Strength & Conditioning',
    rating: 5,
    reviews: 48,
    rate: 1500,
    photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Marcus Steel',
    specialty: 'CrossFit & HIIT',
    rating: 4,
    reviews: 32,
    rate: 1400,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Emma Chen',
    specialty: 'Yoga & Mindfulness',
    rating: 5,
    reviews: 67,
    rate: 1200,
    photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'David Thompson',
    specialty: 'Nutrition & Weight Loss',
    rating: 4,
    reviews: 29,
    rate: 1800,
    photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3bdf?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    specialty: 'Pilates & Core Training',
    rating: 5,
    reviews: 54,
    rate: 1300,
    photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Alex Kumar',
    specialty: 'Boxing & Combat Sports',
    rating: 4,
    reviews: 41,
    rate: 1600,
    photo: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '7',
    name: 'Rachel Williams',
    specialty: 'Swimming & Aqua Fitness',
    rating: 5,
    reviews: 36,
    rate: 1400,
    photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&q=80',
  },
  {
    id: '8',
    name: 'Michael Davis',
    specialty: 'Senior Fitness & Mobility',
    rating: 4,
    reviews: 22,
    rate: 1200,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
  },
];

function TrainersPage() {
  const [filter, setFilter] = useState('All Specialties');
  const [trainers, setTrainers] = useState(MOCK_TRAINERS);

  // Load trainer profiles from localStorage and merge with mock data
  useEffect(() => {
    const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    
    // Get all trainer profiles
    const allProfiles = Object.values(trainerProfiles);
    
    // Create trainer objects from profiles
    const trainerProfilesObj = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    const profileTrainers = Object.keys(trainerProfilesObj).map((email, index) => {
      const profile = trainerProfilesObj[email];
      return {
        id: `profile_${index + 100}`,
        name: profile.name || 'Trainer',
        specialty: profile.specialty || 'Fitness Training',
        rating: parseFloat(profile.stats?.rating) || 4.5,
        reviews: Math.floor(Math.random() * 100) + 10,
        rate: parseInt(profile.rate) || 1500,
        photo: profile.photo || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&q=80',
        profileEmail: email, // Store email for profile lookup
      };
    });

    // Merge with mock trainers (profile trainers take priority if same name)
    const mergedTrainers = [...MOCK_TRAINERS];
    profileTrainers.forEach(profileTrainer => {
      const existingIndex = mergedTrainers.findIndex(t => 
        t.name.toLowerCase() === profileTrainer.name.toLowerCase()
      );
      if (existingIndex >= 0) {
        // Update existing trainer with profile data
        mergedTrainers[existingIndex] = { 
          ...mergedTrainers[existingIndex], 
          ...profileTrainer,
          id: mergedTrainers[existingIndex].id // Keep original ID
        };
      } else {
        // Add new trainer from profile
        mergedTrainers.push(profileTrainer);
      }
    });

    setTrainers(mergedTrainers);
  }, []);

  const filters = ['All Specialties', 'Weight Training', 'Cardio', 'Yoga', 'Nutrition'];

  const filteredTrainers = filter === 'All Specialties' 
    ? trainers 
    : trainers.filter(t => {
        const specialtyLower = t.specialty.toLowerCase();
        if (filter === 'Weight Training') {
          return specialtyLower.includes('strength') || specialtyLower.includes('weight');
        }
        if (filter === 'Cardio') {
          return specialtyLower.includes('cardio') || specialtyLower.includes('hiit') || specialtyLower.includes('crossfit');
        }
        if (filter === 'Yoga') {
          return specialtyLower.includes('yoga') || specialtyLower.includes('pilates') || specialtyLower.includes('mindfulness');
        }
        if (filter === 'Nutrition') {
          return specialtyLower.includes('nutrition') || specialtyLower.includes('weight loss');
        }
        return false;
      });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <section className="trainers-page">
        <div className="trainers-container">
          <div className="trainers-header">
            <h1>Find Your Perfect Coach</h1>
            <p className="trainers-subtitle">Connect with certified trainers and coaches who will help you achieve your fitness goals</p>
          </div>

          <div className="trainers-filters">
            <span className="filter-label">Filter by:</span>
            <div className="filter-buttons">
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
          </div>

          <div className="trainers-grid">
            {filteredTrainers.map((trainer) => (
              <article key={trainer.id} className="trainer-card">
                <div className="trainer-photo">
                  <img src={trainer.photo} alt={trainer.name} />
                </div>
                <div className="trainer-info">
                  <h3>{trainer.name}</h3>
                  <p className="trainer-specialty">{trainer.specialty}</p>
                  <div className="trainer-rating">
                    <span className="stars">{renderStars(trainer.rating)}</span>
                    <span className="reviews">({trainer.reviews} reviews)</span>
                  </div>
                  <p className="trainer-rate">₹{trainer.rate.toLocaleString('en-IN')}/hr</p>
                  <Link 
                    to={`/trainer/${trainer.id}${trainer.profileEmail ? `?email=${encodeURIComponent(trainer.profileEmail)}` : ''}`} 
                    className="trainer-view-btn"
                  >
                    View Profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <Logo size={60} />
            <p className="footer-tagline">Transform your body, transform your life. Join the fitness revolution.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#why">Why Join</a>
            <a href="#membership">Membership</a>
            <a href="/trainers">Our Coaches</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#contact">Contact</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default TrainersPage;


