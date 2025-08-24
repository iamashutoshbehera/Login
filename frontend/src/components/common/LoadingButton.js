import React from 'react';

export const LoadingButton = ({ isLoading, onClick, children, style = {}, ...props }) => {
  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #ec4899, #f97316)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s ease, transform 0.2s ease',
    fontSize: '16px',
    fontFamily: 'inherit',
    opacity: isLoading ? 0.7 : 1,
    ...style
  };

  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      style={buttonStyle}
      onMouseOver={(e) => {
        if (!isLoading) e.target.style.opacity = '0.9';
      }}
      onMouseOut={(e) => {
        if (!isLoading) e.target.style.opacity = '1';
      }}
      {...props}
    >
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid transparent',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '12px'
          }}></div>
          {children}
        </div>
      ) : children}
    </button>
  );
};