import React from 'react';
import { InputField } from '../common/InputField';
import { LoadingButton } from '../common/LoadingButton';
import { MessageDisplay } from '../common/MessageDisplay';
import { MailIcon, LockIcon } from '../icons/Icons';

export const LoginForm = ({ 
  formData, 
  validationErrors, 
  onInputChange, 
  onSubmit, 
  isLoading, 
  message, 
  messageType, 
  theme,
  onForgotPassword 
}) => (
  <form onSubmit={onSubmit}>
    <InputField
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={onInputChange}
      error={validationErrors.email}
      icon={MailIcon}
      theme={theme}
    />

    <InputField
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={onInputChange}
      error={validationErrors.password}
      icon={LockIcon}
      theme={theme}
    />

    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      fontSize: '14px'
    }}>
      <label style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        color: theme.textPrimary
      }}>
        <input type="checkbox" style={{ borderRadius: '4px' }} />
        <span>Remember me</span>
      </label>
      <button
        type="button"
        onClick={onForgotPassword}
        style={{
          color: '#ec4899',
          textDecoration: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'inherit'
        }}
      >
        Forgot password?
      </button>
    </div>

    <MessageDisplay message={message} type={messageType} theme={theme} />

    <LoadingButton isLoading={isLoading} type="submit">
      {isLoading ? 'Signing in...' : 'Sign In'}
    </LoadingButton>
  </form>
);