import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TRAINERS_BY_ID = {
  1: {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Boxing & Combat Sports',
    subtitle: 'Certified Personal Trainer & Combat Sports Specialist',
    experience: '12',
    rating: 4.9,
    reviews: 326,
    rate: 1500,
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
    rate: 1500,
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
  const [searchParams] = useSearchParams();
  const profileEmail = searchParams.get('email');
  const [trainer, setTrainer] = useState(TRAINERS_BY_ID[id] || TRAINERS_BY_ID[2]);

  // Load trainer profile from localStorage if available
  useEffect(() => {
    const mockTrainer = TRAINERS_BY_ID[id] || TRAINERS_BY_ID[2];
    const trainerProfiles = JSON.parse(localStorage.getItem('trainerProfiles') || '{}');
    
    // First try to find by email if provided
    let profileTrainer = null;
    if (profileEmail && trainerProfiles[profileEmail]) {
      profileTrainer = trainerProfiles[profileEmail];
    } else {
      // Otherwise try to find by name matching
      const allProfiles = Object.values(trainerProfiles);
      profileTrainer = allProfiles.find(profile => {
        if (!profile.name || !mockTrainer.name) return false;
        const profileName = profile.name.toLowerCase().trim();
        const mockName = mockTrainer.name.toLowerCase().trim();
        return profileName === mockName || 
               profileName.includes(mockName) || 
               mockName.includes(profileName);
      });
    }

    if (profileTrainer) {
      // Use profile data, fallback to mock data only if profile data is missing
      const finalBio = profileTrainer.bio && profileTrainer.bio.length > 0 && 
                       profileTrainer.bio.some(p => p && p.trim() !== '')
        ? profileTrainer.bio.filter(p => p && p.trim() !== '')
        : (mockTrainer.bio || []);
      
      // Process certifications - ensure they have name and org
      let finalCerts = [];
      if (profileTrainer.certifications && profileTrainer.certifications.length > 0) {
        finalCerts = profileTrainer.certifications.map(cert => ({
          name: cert.name || 'Certification',
          org: cert.org || 'Organization'
        }));
      } else if (mockTrainer.certifications && mockTrainer.certifications.length > 0) {
        finalCerts = mockTrainer.certifications;
      }
      
      const finalSpecs = profileTrainer.specializations && profileTrainer.specializations.length > 0
        ? profileTrainer.specializations
        : (mockTrainer.specializations || []);

      setTrainer({
        ...mockTrainer,
        name: profileTrainer.name || mockTrainer.name,
        specialty: profileTrainer.specialty || mockTrainer.specialty,
        subtitle: profileTrainer.subtitle || mockTrainer.subtitle || (profileTrainer.specialty ? `${profileTrainer.specialty} Specialist` : ''),
        photo: profileTrainer.photo || mockTrainer.photo,
        bio: finalBio.length > 0 ? finalBio : ['No bio available yet.'],
        certifications: finalCerts,
        specializations: finalSpecs,
        rate: parseInt(profileTrainer.rate) || mockTrainer.rate || 0,
        experience: profileTrainer.experience || profileTrainer.stats?.years || mockTrainer.experience || '0',
        rating: parseFloat(profileTrainer.stats?.rating) || mockTrainer.rating || 0,
        reviews: mockTrainer.reviews || 0,
        stats: {
          clients: profileTrainer.stats?.clients || mockTrainer.stats?.clients || '0',
          years: profileTrainer.stats?.years || profileTrainer.experience || mockTrainer.stats?.years || '0',
          rating: profileTrainer.stats?.rating || String(mockTrainer.rating || '0'),
          successRate: profileTrainer.stats?.successRate || mockTrainer.stats?.successRate || '0%',
        },
      });
    } else {
      // If no profile found, use mock trainer but ensure all fields exist
      setTrainer({
        ...mockTrainer,
        bio: mockTrainer.bio && mockTrainer.bio.length > 0 ? mockTrainer.bio : ['No bio available yet.'],
        certifications: mockTrainer.certifications || [],
        specializations: mockTrainer.specializations || [],
      });
    }
  }, [id, profileEmail]);

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
            <Link 
              to={`/booking/${trainer.id}${profileEmail ? `?email=${encodeURIComponent(profileEmail)}` : ''}`} 
              className="coach-hero-book-btn"
            >
              BOOK NOW
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="coach-profile-content">
          <div className="coach-profile-left">
            <div className="profile-section">
              <h2>ABOUT ME</h2>
              {trainer.bio && trainer.bio.length > 0 ? (
                trainer.bio.map((paragraph, idx) => (
                  paragraph && paragraph.trim() !== '' ? (
                    <p key={idx}>{paragraph}</p>
                  ) : null
                ))
              ) : (
                <p>No bio available yet.</p>
              )}
            </div>

            <div className="profile-section">
              <h2>CERTIFICATIONS & EXPERTISE</h2>
              {trainer.certifications && trainer.certifications.length > 0 ? (
                <div className="certifications-grid">
                  {trainer.certifications.map((cert, idx) => (
                    <div key={idx} className="certification-card">
                      <div className="cert-icon-circle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="cert-content">
                        <div className="cert-name">{cert.name || 'Certification'}</div>
                        <div className="cert-org">{cert.org || 'Organization'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'rgba(0, 0, 0, 0.6)', fontStyle: 'italic' }}>
                  No certifications listed yet.
                </p>
              )}
            </div>

            <div className="profile-section">
              <h2>SPECIALIZATIONS</h2>
              {trainer.specializations && trainer.specializations.length > 0 ? (
                <div className="specializations-tags">
                  {trainer.specializations.map((spec, idx) => (
                    <span key={idx} className="specialization-tag">{spec}</span>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'rgba(0, 0, 0, 0.6)', fontStyle: 'italic' }}>
                  No specializations listed yet.
                </p>
              )}
            </div>
          </div>

          <div className="coach-profile-right">
            <div className="coach-sidebar-sticky">
              <div className="session-rates-panel">
                <h3>SESSION RATES</h3>
                <div className="pricing-item">
                  <div className="pricing-header">SINGLE SESSION</div>
                  <span className="price">₹{trainer.rate.toLocaleString('en-IN')}</span>
                  <span className="price-label">/hour</span>
              </div>
              <div className="pricing-divider"></div>
              <div className="pricing-item">
                <div className="pricing-header">5 SESSION PACKAGE</div>
                <span className="price">₹7,000</span>
                <span className="price-label">Save ₹500</span>
              </div>
              <div className="pricing-divider"></div>
              <div className="pricing-item">
                <div className="pricing-header">10 SESSION PACKAGE</div>
                <span className="price">₹13,000</span>
                <span className="price-label">Save ₹2,000</span>
                </div>
                <Link 
                  to={`/booking/${trainer.id}${profileEmail ? `?email=${encodeURIComponent(profileEmail)}` : ''}`} 
                  className="coach-profile-book-btn full-width"
                >
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

