import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApi } from '../api/serviceApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { getServiceIcon } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';

const ProviderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, isCustomer } = useAuth();

    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => { fetchProviderDetails() }, [id]);

    const fetchProviderDetails = async () => {
        setLoading(true);

        try {
            const response = await serviceApi.getProviderDetails(id);
            setProvider(response.data);
        } catch (err) {
            setError('Failed to load provider details');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate('/book', {
            state: {
                providerId: id,
                serviceType: service_type,
            }
        });
    };

    if (loading) {
        return <LoadingSpinner message="Loading provider details..." />;
    }

    if (error || !provider) {
        return (
            <div className='container' style={{ paddingTop: '40px' }}>
                <div className='alert alert-error'>
                    {error || 'Provider not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.avatar}>
                        {getServiceIcon(provider.service_type)}
                    </div>
                    <div>
                        <h1 style={styles.name}>
                        {provider.user?.full_name}
                        </h1>
                        <div style={styles.badge}>
                        {provider.service_type}
                        </div>
                        <div style={styles.rating}>
                        ⭐ {provider.rating || '0.0'} Rating
                        </div>
                    </div>
                </div>
                
                {isCustomer && (
                <button 
                    onClick={handleBookNow}
                    className="btn btn-primary"
                    style={styles.bookBtn}
                >
                    Book Now
                </button>
                )}
            </div>
            <div style={styles.grid}>
                <div style={styles.mainContent}>
                    <div className='card' style={{ marginBottom: '24px' }}>
                        <h2 style={styles.sectionTitle}> About </h2>
                        <p style={styles.bio}> {provider.bio} </p>
                    </div>

                    <div className="card">
                        <h2 style={styles.sectionTitle}>Reviews</h2>
                        {provider.reviews && provider.reviews.length > 0 ? (
                        provider.reviews.map((review) => (
                            <div key={review.id} style={styles.review}>
                                <div style={styles.reviewHeader}>
                                    <strong>{review.customer?.full_name}</strong>
                                    <span style={styles.reviewRating}>
                                    ⭐ {review.rating}
                                    </span>
                                </div>
                                <p style={styles.reviewComment}>
                                    {review.comment}
                                </p>
                            </div>
                        ))
                        ) : (
                        <p style={styles.noReviews}>
                            No reviews yet
                        </p>
                        )}
                    </div>
                </div>

                <div style={styles.sidebar}>
                    <div className="card">
                        <h3 style={styles.sidebarTitle}> Details </h3>
                        
                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}> Experience </span>
                            <span style={styles.detailValue}> {provider.experience_years} years </span>
                        </div>

                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}> Hourly Rate </span>
                            <span style={styles.detailValue}> ₹{provider.hourly_rate}/hr </span>
                        </div>

                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}> Status </span>
                            <span style={styles.detailValue} className={ provider.is_verified ? 'badge-completed' : 'badge-pending' }>
                                { provider.is_verified ? 'Verified' : 'Pending' }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
  header: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
  name: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
  rating: {
    fontSize: '16px',
    color: '#6b7280',
  },
  bookBtn: {
    padding: '12px 32px',
    fontSize: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
  },
  bio: {
    fontSize: '16px',
    color: '#374151',
    lineHeight: '1.6',
  },
  review: {
    padding: '16px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  reviewRating: {
    fontSize: '14px',
    color: '#92400e',
    backgroundColor: '#fef3c7',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  reviewComment: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  noReviews: {
    fontSize: '14px',
    color: '#9ca3af',
    textAlign: 'center',
    padding: '20px',
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '20px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
};
 
export default ProviderDetail;