import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useForm } from './hooks/useForm';
import { authAPI } from './services/authAPI';
import { VIEW_TYPES, MESSAGE_TYPES, FORM_VALIDATION } from './utils/constants';

// Components
import { ThemeToggle } from './components/common/ThemeToggle';
import { SocialLogin } from './components/common/SocialLogin';
import { LoginForm } from './components/forms/LoginForm';
import { SignupForm } from './components/forms/SignupForm';
import { ResetPasswordForm } from './components/forms/ResetPasswordForm';
import { Dashboard } from './components/layout/Dashboard';
import { UserIcon, KeyIcon } from './components/icons/Icons';

function App() {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const [currentView, setCurrentView] = useState(VIEW_TYPES.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
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

  const clearMessages = () => {
    setMessage('');
    setMessageType('');
  };

  const validateForm = (formData, formType) => {
    const errors = {};
    
    // Password matching validation
    if ((formType === VIEW_TYPES.SIGNUP || formType === VIEW_TYPES.RESET) && 
        formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Password length validation
    const passwordField = formType === VIEW_TYPES.RESET ? 'newPassword' : 'password';
    if (formData[passwordField] && formData[passwordField].length < FORM_VALIDATION.MIN_PASSWORD_LENGTH) {
      errors[passwordField] = `Password must be at least ${FORM_VALIDATION.MIN_PASSWORD_LENGTH} characters long`;
    }
    
    // Required fields validation
    const requiredFields = FORM_VALIDATION.REQUIRED_FIELDS[formType.toUpperCase()];
    requiredFields?.forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = 'This field is required';
      }
    });
    
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const errors = validateForm(loginForm.formData, VIEW_TYPES.LOGIN);
    if (Object.keys(errors).length > 0) {
      loginForm.setValidationErrors(errors);
      setMessage('Please fix the errors below.');
      setMessageType(MESSAGE_TYPES.ERROR);
      setIsLoading(false);
      return;
    }

    try {
      const data = await authAPI.login(loginForm.formData.email, loginForm.formData.password);
      
      if (data.success) {
        setMessage(`Welcome back, ${data.user.fullName}!`);
        setMessageType(MESSAGE_TYPES.SUCCESS);
        setUser(data.user);
        loginForm.resetForm();
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
        setMessageType(MESSAGE_TYPES.ERROR);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType(MESSAGE_TYPES.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const errors = validateForm(signupForm.formData, VIEW_TYPES.SIGNUP);
    if (Object.keys(errors).length > 0) {
      signupForm.setValidationErrors(errors);
      setMessage('Please fix the errors below.');
      setMessageType(MESSAGE_TYPES.ERROR);
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
        setMessageType(MESSAGE_TYPES.SUCCESS);
        setTimeout(() => {
          switchView(VIEW_TYPES.LOGIN);
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
        setMessageType(MESSAGE_TYPES.ERROR);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType(MESSAGE_TYPES.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const errors = validateForm(resetForm.formData, VIEW_TYPES.RESET);
    if (Object.keys(errors).length > 0) {
      resetForm.setValidationErrors(errors);
      setMessage('Please fix the errors below.');
      setMessageType(MESSAGE_TYPES.ERROR);
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
        setMessageType(MESSAGE_TYPES.SUCCESS);
        setTimeout(() => {
          switchView(VIEW_TYPES.LOGIN);
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
        setMessageType(MESSAGE_TYPES.ERROR);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType(MESSAGE_TYPES.ERROR);
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
    setCurrentView(VIEW_TYPES.LOGIN);
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
      case VIEW_TYPES.LOGIN:
        return {
          title: 'Welcome Back',
          subtitle: 'Sign in to continue your journey 🚀',
          icon: UserIcon,
          maxWidth: '28rem'
        };
      case VIEW_TYPES.SIGNUP:
        return {
          title: 'Create Account',
          subtitle: 'Join us and start your journey today ✨',
          icon: UserIcon,
          maxWidth: '32rem'
        };
      case VIEW_TYPES.RESET:
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
          {currentView === VIEW_TYPES.LOGIN && (
            <LoginForm
              formData={loginForm.formData}
              validationErrors={loginForm.validationErrors}
              onInputChange={loginForm.handleInputChange}
              onSubmit={handleLogin}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              theme={theme}
              onForgotPassword={() => switchView(VIEW_TYPES.RESET)}
            />
          )}

          {currentView === VIEW_TYPES.SIGNUP && (
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

          {currentView === VIEW_TYPES.RESET && (
            <ResetPasswordForm
              formData={resetForm.formData}
              validationErrors={resetForm.validationErrors}
              onInputChange={resetForm.handleInputChange}
              onSubmit={handleResetPassword}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              theme={theme}
              onBackToLogin={() => switchView(VIEW_TYPES.LOGIN)}
            />
          )}

          {/* Social Login (Login only) */}
          {currentView === VIEW_TYPES.LOGIN && (
            <SocialLogin theme={theme} />
          )}

          {/* Switch View Link */}
          {currentView !== VIEW_TYPES.RESET && (
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: theme.textSecondary,
              marginTop: '24px',
              marginBottom: '0'
            }}>
              {currentView === VIEW_TYPES.LOGIN ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchView(currentView === VIEW_TYPES.LOGIN ? VIEW_TYPES.SIGNUP : VIEW_TYPES.LOGIN)}
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
                {currentView === VIEW_TYPES.LOGIN ? 'Sign up here' : 'Sign in here'}
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