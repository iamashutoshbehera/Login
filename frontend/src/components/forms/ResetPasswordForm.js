import React from 'react';
import { InputField } from '../common/InputField';
import { LoadingButton } from '../common/LoadingButton';
import { MessageDisplay } from '../common/MessageDisplay';
import { MailIcon, LockIcon, ArrowLeftIcon } from '../icons/Icons';

export const ResetPasswordForm = ({ 
  formData, 
  validationErrors, 
  onInputChange, 
  onSubmit, 
  isLoading, 
  message, 
  messageType, 
  theme,
  onBackToLogin 
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
      name="newPassword"
      placeholder="New Password"
      value={formData.newPassword}
      onChange={onInputChange}
      error={validationErrors.newPassword}
      icon={LockIcon}
      theme={theme}
    />

    <InputField
      type="password"
      name="confirmPassword"
      placeholder="Confirm New Password"
      value={formData.confirmPassword}
      onChange={onInputChange}
      error={validationErrors.confirmPassword}
      icon={LockIcon}
      theme={theme}
    />

    <MessageDisplay message={message} type={messageType} theme={theme} />

    <LoadingButton isLoading={isLoading} type="submit">
      {isLoading ? 'Resetting password...' : 'Reset Password'}
    </LoadingButton>

    <button
      type="button"
      onClick={onBackToLogin}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px',
        padding: '12px 24px',
        backgroundColor: 'transparent',
        color: theme.textSecondary,
        border: `1px solid ${theme.inputBorder}`,
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = theme.inputBg;
        e.target.style.color = theme.textPrimary;
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = theme.textSecondary;
      }}
    >
      <ArrowLeftIcon />
      Back to Login
    </button>
  </form>
);