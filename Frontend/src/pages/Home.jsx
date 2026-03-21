import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      type: 'electrician',
      title: 'Electrician',
      description: 'Electrical repairs, installations, and wiring',
    },
    {
      type: 'plumber',
      title: 'Plumber',
      description: 'Plumbing repairs, installations, and maintenance',
    },
    {
      type: 'carpenter',
      title: 'Carpenter',
      description: 'Furniture repair, custom woodwork, and installations',
    },
    {
      type: 'tailor',
      title: 'Tailor',
      description: 'Clothing alterations, stitching, and repairs',
    },
    {
      type: 'maintenance',
      title: 'Home Maintenance',
      description: 'General repairs and home maintenance services',
    },
  ];

  return (
    <div>
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.heroTitle}>
            Professional Home Services
            <br />
            At Your Doorstep
          </h1>
          <p style={styles.heroSubtitle}>
            Book trusted professionals for all your home service needs
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="btn btn-primary"
            style={styles.heroButton}
          >
            Get Started
          </button>
        </div>
      </section>

      <section style={styles.services}>
        <div className="container">
          <div className="page-header" style={{ textAlign: 'center' }}>
            <h2 className="page-title">Our Services</h2>
            <p className="page-subtitle">
              Choose from a wide range of professional services
            </p>
          </div>

          <div className="grid grid-3">
            {services.map((service) => (
              <ServiceCard
                key={service.type}
                serviceType={service.type}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={styles.howItWorks}>
        <div className="container">
          <div className="page-header" style={{ textAlign: 'center' }}>
            <h2 className="page-title">How It Works</h2>
            <p className="page-subtitle">
              Get service in three simple steps
            </p>
          </div>

          <div style={styles.stepsContainer}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Choose Service</h3>
              <p style={styles.stepDescription}>
                Select the service you need and browse professionals
              </p>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Book Appointment</h3>
              <p style={styles.stepDescription}>
                Pick a date and time that works for you
              </p>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Get It Done</h3>
              <p style={styles.stepDescription}>
                Professional arrives and completes the work
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '120px 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '32px',
    opacity: 0.9,
  },
  heroButton: {
    fontSize: '18px',
    padding: '16px 48px',
    backgroundColor: 'white',
    color: '#667eea',
  },
  services: {
    padding: '80px 0',
  },
  howItWorks: {
    padding: '80px 0 40px 0',
    backgroundColor: '#f9fafb',
  },
  stepsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  step: {
    textAlign: 'center',
    padding: '32px',
    flex: '0 0 280px',
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    color: 'white',
    fontSize: '32px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#111827',
  },
  stepDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
};

export default Home;