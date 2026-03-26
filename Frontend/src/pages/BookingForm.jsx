import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { serviceApi } from '../api/serviceApi';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { serviceType } = location.state || {};
    const [ success, setSuccess] = useState(false);

    const [ formData, setFormData ] = useState({
        service_type: serviceType || 'electrician',
        description: '',
        address: '',
        preferred_date: '',
        preferred_time: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await serviceApi.createRequest(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/my-bookings');
            },2000);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to create booking request'
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (<LoadingSpinner message="Creating booking request..." />);
    }

    if (success) {
        return (
            <div className='container' style={{ paddingTop: '40px' }}>
                <div className='alert alert-success'>
                    Booking successfully created! Redirecting to your booking...
                </div>
            </div>
        );
    }

    return (
        <div className='container' style={{ paddingTop: '40px' }}>
            <div style={styles.formContainer}>
                <div className='page-header'>
                    <h1 className='page-title'> Book a service </h1>
                    <p className='page-subtitle'> Fill in the details to request a service </p>
                </div>

                {error && (<div className='alert alert-error'>
                    {error}
                </div>)}

                <form onSubmit={handleSubmit} className="card">
                    <div className="form-group">
                        <label className="form-label">Service Type</label>
                        <select
                        name="service_type"
                        className="form-input"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                        >
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="carpenter">Carpenter</option>
                        <option value="tailor">Tailor</option>
                        <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
            
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                        name="description"
                        className="form-input"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Describe the work you need done..."
                        />
                    </div>
            
                    <div className="form-group">
                        <label className="form-label">Service Address</label>
                        <textarea
                        name="address"
                        className="form-input"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Enter your complete address..."
                        />
                    </div>
            
                    <div style={styles.dateTimeGrid}>
                        <div className="form-group">
                        <label className="form-label">Preferred Date</label>
                        <input
                            type="date"
                            name="preferred_date"
                            className="form-input"
                            value={formData.scheduled_at}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                        </div>
            
                        <div className="form-group">
                        <label className="form-label">Preferred Time</label>
                        <input
                            type="time"
                            name="preferred_time"
                            className="form-input"
                            value={formData.scheduleDateTime}
                            onChange={handleChange}
                            required
                        />
                        </div>
                    </div>
            
                    <div style={styles.buttonGroup}>
                        <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="btn btn-primary"
                        >
                        Submit Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
  formContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  dateTimeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
};
 
export default BookingForm;