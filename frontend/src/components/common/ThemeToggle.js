import React from 'react';
import { SunIcon, MoonIcon } from '../icons/Icons';

export const ThemeToggle = ({ isDarkMode, toggleDarkMode, theme }) => {
  const themeToggleStyle = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: theme.cardBg,
    border: `1px solid ${theme.cardBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(12px)',
    color: theme.textPrimary,
    boxShadow: isDarkMode 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={themeToggleStyle}
      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};