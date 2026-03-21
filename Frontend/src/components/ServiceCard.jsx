import React from "react";
import { useNavigate } from "react-router-dom";
import { getServiceIcon } from "../utils/helpers";

const ServiceCard = ({ serviceType, title, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/provider?type=${serviceType}`);
    };

    return (
        <div className="card" onClick={handleClick} style={styles.card}>
            <div style={styles.icon}> 
                {getServiceIcon(serviceType)}
            </div>

            <h3 style={styles.title}> {title} </h3>
            <p style={styles.description}> {description} </p>
            <button className="btn btn-outline" style={styles.button}> Book Now 🡪 </button>
        </div>
    );
};

const styles = {
  card: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  button: {
    width: '100%',
  },
};

export default ServiceCard;