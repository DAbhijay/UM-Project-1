import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceApi } from '../api/serviceApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  formatDate, 
  formatTime, 
  getServiceIcon, 
  getStatusColor 
} from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
 
const MyBookings = () => {
  const navigate = useNavigate();
  const { isCustomer, isProvider } = useAuth();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    fetchBookings();
  }, []);
 
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await serviceApi.getMyRequests();
      setBookings(response.data || []);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleAcceptRequest = async (requestId) => {
    try {
      await serviceApi.acceptRequest(requestId);
      fetchBookings();
    } catch (err) {
      alert('Failed to accept request');
    }
  };
 
  if (loading) {
    return <LoadingSpinner message="Loading your bookings..." />;
  }
 
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="page-header">
        <h1 className="page-title">
          {isCustomer ? 'My Bookings' : 'Service Requests'}
        </h1>
        <p className="page-subtitle">
          {isCustomer 
            ? 'View and manage your service bookings' 
            : 'Manage incoming service requests'}
        </p>
      </div>
 
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
 
      {isCustomer && (
        <button 
          onClick={() => navigate('/book')}
          className="btn btn-primary"
          style={{ marginBottom: '24px' }}
        >
          + New Booking
        </button>
      )}
 
      {bookings.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>
            {isCustomer 
              ? 'No bookings yet' 
              : 'No service requests yet'}
          </p>
          <p style={styles.emptySubtext}>
            {isCustomer 
              ? 'Book a service to get started!' 
              : 'Requests will appear here when customers book'}
          </p>
        </div>
      ) : (
        <div style={styles.bookingsList}>
          {bookings.map((booking) => (
            <div key={booking.id} className="card" style={styles.bookingCard}>
              <div style={styles.cardHeader}>
                <div style={styles.headerLeft}>
                  <span style={styles.icon}>
                    {getServiceIcon(booking.service_type)}
                  </span>
                  <div>
                    <h3 style={styles.serviceType}>
                      {booking.service_type}
                    </h3>
                    {isCustomer && booking.provider && (
                      <p style={styles.providerName}>
                        Provider: {booking.provider.user?.full_name}
                      </p>
                    )}
                    {isProvider && booking.customer && (
                      <p style={styles.providerName}>
                        Customer: {booking.customer.full_name}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`badge ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
 
              <p style={styles.description}>
                {booking.description}
              </p>
 
              <div style={styles.details}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>📍 Address</span>
                  <span style={styles.detailValue}>
                    {booking.address}
                  </span>
                </div>
                
                <div style={styles.detailItem}>
                  <span>📅 Date</span>
                  <span>
                    {booking.scheduled_at 
                      ? new Date(booking.scheduled_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'Not scheduled'
                    }
                  </span>
                </div>

                <div>
                  <span>🕐 Time</span>
                  <span>
                    {booking.scheduledDateTime 
                      ? new Date(booking.scheduledDateTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Not scheduled'
                    }
                  </span>
                </div>
              </div>
 
              {isProvider && booking.status === 'PENDING' && (
                <div style={styles.actions}>
                  <button 
                    onClick={() => handleAcceptRequest(booking.id)}
                    className="btn btn-primary"
                  >
                    Accept Request
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
const styles = {
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  emptyText: {
    fontSize: '20px',
    color: '#374151',
    marginBottom: '8px',
  },
  emptySubtext: {
    fontSize: '16px',
    color: '#9ca3af',
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bookingCard: {
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  headerLeft: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  icon: {
    fontSize: '32px',
  },
  serviceType: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
    textTransform: 'capitalize',
  },
  providerName: {
    fontSize: '14px',
    color: '#6b7280',
  },
  description: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: '600',
  },
  actions: {
    marginTop: '16px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
};
 
export default MyBookings;