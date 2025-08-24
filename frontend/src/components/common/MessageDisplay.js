import React from 'react';

export const MessageDisplay = ({ message, type, theme }) => {
  if (!message) return null;

  return (
    <div style={{
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '16px',
      backgroundColor: type === 'success' ? theme.successBg : theme.errorBg,
      color: type === 'success' ? theme.successText : theme.errorText,
      border: `1px solid ${type === 'success' ? theme.successBorder : theme.errorBorder}`
    }}>
      {message}
    </div>
  );
};