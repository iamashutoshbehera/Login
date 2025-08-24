import React, { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [validationErrors, setValidationErrors] = useState({});
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    
    setIsLoading(true);
    setMessage('');
    setValidationErrors({});

    const requestData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(`Welcome back, ${data.user.fullName}!`);
        setMessageType('success');
        setUser(data.user);
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });
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
    console.log('Signup button clicked');
    
    setIsLoading(true);
    setMessage('');
    setValidationErrors({});

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    // Check if all required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setMessage('Please fill in all required fields.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(`Account created successfully for ${data.user.fullName}! Please login.`);
        setMessageType('success');
        setTimeout(() => {
          setCurrentView('login');
          setFormData({ 
            email: formData.email, 
            password: '', 
            confirmPassword: '', 
            firstName: '', 
            lastName: '' 
          });
          setMessage('');
        }, 2000);
      } else {
        if (data.errors) {
          // Handle field-specific validation errors
          setValidationErrors(data.errors);
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

  const handleLogout = () => {
    setUser(null);
    setMessage('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setCurrentView('login');
  };

  const switchView = (view) => {
    setCurrentView(view);
    setMessage('');
    setValidationErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  // Icon components as SVGs (replacing lucide-react)
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

  // Common styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f3e8ff, #fdf2f8, #fed7aa)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: currentView === 'signup' ? '32rem' : '28rem',
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #e5e7eb',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    overflow: 'hidden',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.3s ease'
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '8px 12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    marginBottom: '16px'
  };

  const inputStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(90deg, #ec4899, #f97316)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s ease, transform 0.2s ease',
    fontSize: '16px',
    fontFamily: 'inherit'
  };

  const socialButtonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    fontSize: '14px',
    fontFamily: 'inherit'
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div style={containerStyle}>
        <div 
          style={cardStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{
              margin: '0 auto 16px',
              width: '64px',
              height: '64px',
              backgroundColor: '#dcfce7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16a34a'
            }}>
              <CheckCircleIcon />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              Welcome, {user.fullName}!
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              You have successfully logged in.
            </p>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: '#374151', margin: '4px 0' }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ fontSize: '14px', color: '#374151', margin: '4px 0' }}>
                <strong>User ID:</strong> {user.id}
              </p>
            </div>
            <button
              onClick={handleLogout}
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
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
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
              backgroundColor: '#e0e7ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4f46e5'
            }}>
              <UserIcon />
            </div>
            <h2 style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '0' }}>
              {currentView === 'login' ? 'Sign in to continue your journey 🚀' : 'Join us and start your journey today ✨'}
            </p>
          </div>

          {/* Forms */}
          <form onSubmit={currentView === 'login' ? handleLogin : handleSignup}>
            {/* Signup specific fields */}
            {currentView === 'signup' && (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth <= 640 ? '1fr' : '1fr 1fr', 
                gap: '16px', 
                marginBottom: '16px' 
              }}>
                <div style={inputContainerStyle}>
                  <div style={{ color: '#6b7280', marginRight: '8px' }}>
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      ...inputStyle,
                      borderColor: validationErrors.firstName ? '#ef4444' : 'transparent'
                    }}
                    required
                  />
                </div>
                <div style={inputContainerStyle}>
                  <div style={{ color: '#6b7280', marginRight: '8px' }}>
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      ...inputStyle,
                      borderColor: validationErrors.lastName ? '#ef4444' : 'transparent'
                    }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div style={inputContainerStyle}>
              <div style={{ color: '#6b7280', marginRight: '8px' }}>
                <MailIcon />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.email ? '#ef4444' : 'transparent'
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div style={inputContainerStyle}>
              <div style={{ color: '#6b7280', marginRight: '8px' }}>
                <LockIcon />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.password ? '#ef4444' : 'transparent'
                }}
                required
              />
            </div>

            {/* Confirm Password for Signup */}
            {currentView === 'signup' && (
              <div style={inputContainerStyle}>
                <div style={{ color: '#6b7280', marginRight: '8px' }}>
                  <LockIcon />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: validationErrors.confirmPassword ? '#ef4444' : 'transparent'
                  }}
                  required
                />
              </div>
            )}

            {/* Remember me & Forgot password (Login only) */}
            {currentView === 'login' && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" style={{ borderRadius: '4px' }} />
                  <span>Remember me</span>
                </label>
                <a href="#" style={{
                  color: '#ec4899',
                  textDecoration: 'none'
                }}>
                  Forgot password?
                </a>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '16px',
                backgroundColor: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
                color: messageType === 'success' ? '#166534' : '#991b1b',
                border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
              }}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              style={{
                ...buttonStyle,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.target.style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.target.style.opacity = '1';
              }}
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
                  {currentView === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                currentView === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Social Login (Login only) */}
          {currentView === 'login' && (
            <>
              <div style={{
                margin: '24px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>or continue with</span>
                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  type="button"
                  style={socialButtonStyle}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  <GithubIcon /> Github
                </button>
                <button 
                  type="button"
                  style={socialButtonStyle}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  <LinkedinIcon /> LinkedIn
                </button>
              </div>
            </>
          )}

          {/* Switch View Link */}
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280',
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
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input:focus {
          outline: none !important;
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
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