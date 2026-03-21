import React from "react";
import { useNavigate } from "react-router-dom";
import { getServiceIcon } from "../utils/helpers";

const ProviderCard = ({provider}) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/providers/${provider.id}`);
    };

    return (
        <div className="card" style={styles.card}>
            <div style={styles.header}>
                <div style={styles.avatar}>
                    {getServiceIcon(provider.service_type)}
                </div>

                <div style={styles.rating}>
                    ★ {provider.rating || '0.0'}
                </div>
            </div>

            <h3 style={style.name}> {provider.user?.full_name} </h3>

            <div style={styles.badge}>
                {provider.service_type}
            </div>

            <p style={styles.bio}>
                {provider.bio?.substring(0,100)}
                {provider.bio?.length > 100 ? '...' : ''}
            </p>

            <div style={styles.info}>
                <div style={styles.infoItem}>
                    <span style={styles.label}> Experience </span>
                    <span style={styles.value}> {provider.experience_years} years </span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}> Rate </span>
                    <span style={styles.value}> ${provider.hourly_rate}/hr </span>
                </div>
            </div>

            <button onClick={handleViewProfile} className="btn btn-primary" style={styles.button}> View Profile </button>
        </div>
    );
};

const styles = {
  card: {
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  },
  rating: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
  },
  name: {
    fontSize: '20px',
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
    marginBottom: '12px',
    textTransform: 'capitalize',
  },
  bio: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  value: {
    fontSize: '16px',
    color: '#111827',
    fontWeight: '700',
  },
  button: {
    width: '100%',
  },
};

export default ProviderCard;