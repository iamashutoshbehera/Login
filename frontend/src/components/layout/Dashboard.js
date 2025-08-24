import React from 'react';
import { CheckCircleIcon } from '../icons/Icons';

export const Dashboard = ({ user, onLogout, theme, isDarkMode }) => (
  <div style={{
    padding: '32px',
    textAlign: 'center'
  }}>
    <div style={{
      margin: '0 auto 16px',
      width: '64px',
      height: '64px',
      backgroundColor: isDarkMode ? '#065f46' : '#dcfce7',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDarkMode ? '#6ee7b7' : '#16a34a'
    }}>
      <CheckCircleIcon />
    </div>
    <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.textPrimary, marginBottom: '8px' }}>
      Welcome, {user.fullName}!
    </h1>
    <p style={{ color: theme.textSecondary, marginBottom: '24px' }}>
      You have successfully logged in.
    </p>
    <div style={{ 
      backgroundColor: theme.inputBg, 
      borderRadius: '8px', 
      padding: '16px', 
      marginBottom: '24px', 
      textAlign: 'left',
      border: `1px solid ${theme.inputBorder}`
    }}>
      <p style={{ fontSize: '14px', color: theme.textPrimary, margin: '4px 0' }}>
        <strong>Email:</strong> {user.email}
      </p>
      <p style={{ fontSize: '14px', color: theme.textPrimary, margin: '4px 0' }}>
        <strong>User ID:</strong> {user.id}
      </p>
    </div>
    <button
      onClick={onLogout}
      style={{
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        fontFamily: 'inherit'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
    >
      Logout
    </button>
  </div>
);