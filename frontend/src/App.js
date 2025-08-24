import React, { useState, useEffect } from 'react';

// Custom hooks for better organization
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference or default to false
    const savedTheme = window.localStorage?.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1f2937)',
        cardBg: 'rgba(31, 41, 55, 0.9)',
        cardBorder: '#374151',
        textPrimary: '#f9fafb',
        textSecondary: '#d1d5db',
        inputBg: '#374151',
        inputBorder: '#4b5563',
        inputFocus: '#6366f1',
        successBg: '#064e3b',
        successText: '#6ee7b7',
        successBorder: '#047857',
        errorBg: '#7f1d1d',
        errorText: '#fca5a5',
        errorBorder: '#dc2626',
        socialBg: '#374151',
        socialBorder: '#4b5563',
        socialHover: '#4b5563'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #f3e8ff, #fdf2f8, #fed7aa)',
        cardBg: 'rgba(255, 255, 255, 0.9)',
        cardBorder: '#e5e7eb',
        textPrimary: '#111827',
        textSecondary: '#6b7280',
        inputBg: '#f9fafb',
        inputBorder: '#e5e7eb',
        inputFocus: '#4f46e5',
        successBg: '#f0fdf4',
        successText: '#166534',
        successBorder: '#bbf7d0',
        errorBg: '#fef2f2',
        errorText: '#991b1b',
        errorBorder: '#fecaca',
        socialBg: 'white',
        socialBorder: '#d1d5db',
        socialHover: '#f9fafb'
      };
    }
  };

  return { isDarkMode, toggleDarkMode, theme: getThemeColors() };
};

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const resetForm = (newData = initialState) => {
    setFormData(newData);
    setValidationErrors({});
  };

  return {
    formData,
    validationErrors,
    setValidationErrors,
    handleInputChange,
    resetForm
  };
};

// Icon Components
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M12 1v6"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

// API Service
const authAPI = {
  async login(email, password) {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  async register(userData) {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  async resetPassword(email, newPassword, confirmPassword) {
    const response = await fetch('http://localhost:8080/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword, confirmPassword })
    });
    return response.json();
  }
};

// Reusable Components
const ThemeToggle = ({ isDarkMode, toggleDarkMode, theme }) => {
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

const InputField = ({ type, name, placeholder, value, onChange, error, icon: Icon, theme }) => {
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

const LoadingButton = ({ isLoading, onClick, children, style = {}, ...props }) => {
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

const MessageDisplay = ({ message, type, theme }) => {
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

// Form Components
const LoginForm = ({ 
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

const SignupForm = ({ 
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

const ResetPasswordForm = ({ 
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

const SocialLogin = ({ theme }) => (
  <>
    <div style={{
      margin: '24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: theme.inputBorder }}></div>
      <span style={{ color: theme.textSecondary, fontSize: '14px' }}>or continue with</span>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: theme.inputBorder }}></div>
    </div>

    <div style={{ display: 'flex', gap: '16px' }}>
      <button 
        type="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          border: `1px solid ${theme.socialBorder}`,
          borderRadius: '8px',
          backgroundColor: theme.socialBg,
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: theme.textPrimary
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.backgroundColor = theme.socialHover;
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = theme.socialBg;
        }}
      >
        <GithubIcon /> Github
      </button>
      <button 
        type="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          border: `1px solid ${theme.socialBorder}`,
          borderRadius: '8px',
          backgroundColor: theme.socialBg,
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: theme.textPrimary
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.backgroundColor = theme.socialHover;
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = theme.socialBg;
        }}
      >
        <LinkedinIcon /> LinkedIn
      </button>
    </div>
  </>
);

const Dashboard = ({ user, onLogout, theme, isDarkMode }) => (
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

// Main App Component
function App() {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'reset'
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const loginForm = useForm({
    email: '',
    password: ''
  });

  const signupForm = useForm({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const resetForm = useForm({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const getCurrentForm = () => {
    switch(currentView) {
      case 'signup': return signupForm;
      case 'reset': return resetForm;
      default: return loginForm;
    }
  };

  const clearMessages = () => {
    setMessage('');
    setMessageType('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    try {
      const data = await authAPI.login(loginForm.formData.email, loginForm.formData.password);
      
      if (data.success) {
        setMessage(`Welcome back, ${data.user.fullName}!`);
        setMessageType('success');
        setUser(data.user);
        loginForm.resetForm();
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();
    signupForm.setValidationErrors({});

    // Client-side validation
    if (signupForm.formData.password !== signupForm.formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (signupForm.formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (!signupForm.formData.firstName || !signupForm.formData.lastName || !signupForm.formData.email || !signupForm.formData.password) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const data = await authAPI.register({
        firstName: signupForm.formData.firstName,
        lastName: signupForm.formData.lastName,
        email: signupForm.formData.email,
        password: signupForm.formData.password,
        confirmPassword: signupForm.formData.confirmPassword
      });

      if (data.success) {
        setMessage(`Account created successfully for ${data.user.fullName}! Please login.`);
        setMessageType('success');
        setTimeout(() => {
          switchView('login');
          loginForm.resetForm({ 
            email: signupForm.formData.email, 
            password: ''
          });
          clearMessages();
        }, 2000);
      } else {
        if (data.errors) {
          signupForm.setValidationErrors(data.errors);
          setMessage('Please fix the errors below.');
        } else {
          setMessage(data.message || 'Registration failed. Please try again.');
        }
        setMessageType('error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();
    resetForm.setValidationErrors({});

    // Client-side validation
    if (resetForm.formData.newPassword !== resetForm.formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (resetForm.formData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (!resetForm.formData.email || !resetForm.formData.newPassword) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const data = await authAPI.resetPassword(
        resetForm.formData.email,
        resetForm.formData.newPassword,
        resetForm.formData.confirmPassword
      );

      if (data.success) {
        setMessage('Password reset successfully! You can now login with your new password.');
        setMessageType('success');
        setTimeout(() => {
          switchView('login');
          loginForm.resetForm({ 
            email: resetForm.formData.email, 
            password: ''
          });
          clearMessages();
        }, 2000);
      } else {
        if (data.errors) {
          resetForm.setValidationErrors(data.errors);
          setMessage('Please fix the errors below.');
        } else {
          setMessage(data.message || 'Password reset failed. Please try again.');
        }
        setMessageType('error');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    clearMessages();
    loginForm.resetForm();
    signupForm.resetForm();
    resetForm.resetForm();
    setCurrentView('login');
  };

  const switchView = (view) => {
    setCurrentView(view);
    clearMessages();
    loginForm.resetForm();
    signupForm.resetForm();
    resetForm.resetForm();
  };

  const getViewConfig = () => {
    switch(currentView) {
      case 'login':
        return {
          title: 'Welcome Back',
          subtitle: 'Sign in to continue your journey 🚀',
          icon: UserIcon,
          maxWidth: '28rem'
        };
      case 'signup':
        return {
          title: 'Create Account',
          subtitle: 'Join us and start your journey today ✨',
          icon: UserIcon,
          maxWidth: '32rem'
        };
      case 'reset':
        return {
          title: 'Reset Password',
          subtitle: 'Enter your email and new password 🔐',
          icon: KeyIcon,
          maxWidth: '28rem'
        };
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Sign in to continue your journey 🚀',
          icon: UserIcon,
          maxWidth: '28rem'
        };
    }
  };

  const viewConfig = getViewConfig();

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.background,
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: viewConfig.maxWidth,
    backdropFilter: 'blur(12px)',
    backgroundColor: theme.cardBg,
    border: `1px solid ${theme.cardBorder}`,
    boxShadow: isDarkMode 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    overflow: 'hidden',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.3s ease'
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div style={containerStyle}>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} theme={theme} />
        <div 
          style={cardStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Dashboard 
            user={user} 
            onLogout={handleLogout} 
            theme={theme} 
            isDarkMode={isDarkMode} 
          />
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} theme={theme} />
      
      <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ padding: '32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              margin: '0 auto 16px',
              width: '64px',
              height: '64px',
              backgroundColor: isDarkMode ? '#312e81' : '#e0e7ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDarkMode ? '#a5b4fc' : '#4f46e5'
            }}>
              <viewConfig.icon />
            </div>
            <h2 style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: theme.textPrimary,
              marginBottom: '8px'
            }}>
              {viewConfig.title}
            </h2>
            <p style={{ color: theme.textSecondary, marginBottom: '0' }}>
              {viewConfig.subtitle}
            </p>
          </div>

          {/* Forms */}
          {currentView === 'login' && (
            <LoginForm
              formData={loginForm.formData}
              validationErrors={loginForm.validationErrors}
              onInputChange={loginForm.handleInputChange}
              onSubmit={handleLogin}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              theme={theme}
              onForgotPassword={() => switchView('reset')}
            />
          )}

          {currentView === 'signup' && (
            <SignupForm
              formData={signupForm.formData}
              validationErrors={signupForm.validationErrors}
              onInputChange={signupForm.handleInputChange}
              onSubmit={handleSignup}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              theme={theme}
            />
          )}

          {currentView === 'reset' && (
            <ResetPasswordForm
              formData={resetForm.formData}
              validationErrors={resetForm.validationErrors}
              onInputChange={resetForm.handleInputChange}
              onSubmit={handleResetPassword}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              theme={theme}
              onBackToLogin={() => switchView('login')}
            />
          )}

          {/* Social Login (Login only) */}
          {currentView === 'login' && (
            <SocialLogin theme={theme} />
          )}

          {/* Switch View Link */}
          {currentView !== 'reset' && (
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: theme.textSecondary,
              marginTop: '24px',
              marginBottom: '0'
            }}>
              {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchView(currentView === 'login' ? 'signup' : 'login')}
                style={{
                  color: '#ec4899',
                  fontWeight: '600',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              >
                {currentView === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input:focus {
          outline: none !important;
          border-color: ${theme.inputFocus} !important;
          box-shadow: 0 0 0 3px ${isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.1)'} !important;
        }
        
        input::placeholder {
          color: ${theme.textSecondary};
        }
        
        @media (max-width: 640px) {
          [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;