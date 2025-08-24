import React from 'react';
import { InputField } from '../common/InputField';
import { LoadingButton } from '../common/LoadingButton';
import { MessageDisplay } from '../common/MessageDisplay';
import { MailIcon, LockIcon, UserIcon } from '../icons/Icons';

export const SignupForm = ({ 
  formData, 
  validationErrors, 
  onInputChange, 
  onSubmit, 
  isLoading, 
  message, 
  messageType, 
  theme 
}) => (
  <form onSubmit={onSubmit}>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: window.innerWidth <= 640 ? '1fr' : '1fr 1fr', 
      gap: '16px', 
      marginBottom: '0' 
    }}>
      <InputField
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={onInputChange}
        error={validationErrors.firstName}
        icon={UserIcon}
        theme={theme}
      />
      <InputField
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={onInputChange}
        error={validationErrors.lastName}
        icon={UserIcon}
        theme={theme}
      />
    </div>

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

    <InputField
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={onInputChange}
      error={validationErrors.confirmPassword}
      icon={LockIcon}
      theme={theme}
    />

    <MessageDisplay message={message} type={messageType} theme={theme} />

    <LoadingButton isLoading={isLoading} type="submit">
      {isLoading ? 'Creating account...' : 'Create Account'}
    </LoadingButton>
  </form>
);