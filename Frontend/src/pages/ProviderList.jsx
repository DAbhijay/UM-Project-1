import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceApi } from '../api/serviceApi';
import ProviderCard from '../components/ProviderCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getServiceIcon } from '../utils/helpers';

const ProviderList = () => {
    const [searchParams] = useSearchParams();
    const serviceType = searchParams.get('type') || 'electrician';

    const [providers, setProviders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);
            try {
                const response = await serviceApi.getProviders(serviceType);
                setProviders(response.data || []);
            } catch (err) {
                setError('Failed to load providers');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProviders();
    }, [serviceType]);

    const fetchProviders = async () => {
        setLoading(true);

        try {
            const response = await serviceApi.getProviders(serviceType);
            setProviders(response.data || []);
        } catch (err) {
            setError('Failed to load provider details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading providers..." />;
    }

    return (
        <div className='container' style={{ paddingTop: '40px' }}>
            <div className='page-header'>
                <h1 className='page-title'>
                    {getServiceIcon(serviceType)} {serviceType} Professionals
                </h1>
                <p className='page-subtitle'>
                    Choose from the best {serviceType} professionals
                </p>
            </div>

            {error && (<div className='alert alert-error'> {error} </div>)}
            
            {providers.length === 0 ? (<div style={styles.emptyState}>
                <p style={styles.emptyText}> No providers found. </p>
                <p style={styles.emptySubtext}> Please check back later. </p>
            </div>) : (
                <div className='grid grid-3'>
                    {providers.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
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
};
 
export default ProviderList;