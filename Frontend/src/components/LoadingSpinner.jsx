import React from "react";

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-container">
            <div style={{ textAlign: 'center' }}>
                <div style = {{
                        width: '50px',
                        height: '50px',
                        border: '5px solid #e5e7eb',
                        borderTop: '4px solid #6366f1',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px',
                    }}
                />
                <p style={{ color: '#6b7280', fontSize: '16px'}}>
                    {message}
                </p>
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform : rotate(0deg); }
                        100% { transform : rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default LoadingSpinner;