import React from 'react';

export const InputField = ({ type, name, placeholder, value, onChange, error, icon: Icon, theme }) => {
  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.inputBg,
    borderRadius: '12px',
    padding: '8px 12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: `1px solid ${error ? '#ef4444' : theme.inputBorder}`,
    marginBottom: '16px'
  };

  const inputStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: theme.textPrimary
  };

  return (
    <div>
      <div style={inputContainerStyle}>
        <div style={{ color: theme.textSecondary, marginRight: '8px' }}>
          <Icon />
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          required
        />
      </div>
      {error && (
        <p style={{ 
          color: theme.errorText, 
          fontSize: '12px', 
          marginTop: '-12px', 
          marginBottom: '8px',
          marginLeft: '12px'
        }}>
          {error}
        </p>
      )}
    </div>
  );
};
