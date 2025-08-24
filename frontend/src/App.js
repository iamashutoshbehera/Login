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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call to backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful! Welcome back.');
        setMessageType('success');
        console.log('Login successful:', data);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Login failed. Please check your credentials.');
        setMessageType('error');
      }
    } catch (error) {
      // For demo purposes, simulate a successful login
      console.log('Attempting login with:', { email: formData.email, password: formData.password });
      if (formData.email && formData.password) {
        setMessage('Demo: Login successful! (Backend not connected)');
        setMessageType('success');
      } else {
        setMessage('Please fill in all fields.');
        setMessageType('error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
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

    try {
      // Simulate API call to backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.firstName,
        //   lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Account created successfully! Please login.');
        setMessageType('success');
        setTimeout(() => {
          setCurrentView('login');
          setFormData({ email: formData.email, password: '', confirmPassword: '', firstName: '', lastName: '' });
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Registration failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      // For demo purposes, simulate successful registration
      console.log('Attempting signup with:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      if (formData.email && formData.password && formData.firstName && formData.lastName) {
        setMessage('Demo: Account created successfully! Switching to login...');
        setMessageType('success');
        setTimeout(() => {
          setCurrentView('login');
          setFormData({ email: formData.email, password: '', confirmPassword: '', firstName: '', lastName: '' });
        }, 2000);
      } else {
        setMessage('Please fill in all fields.');
        setMessageType('error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchView = (view) => {
    setCurrentView(view);
    setMessage('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '2rem'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              margin: '0 auto 1rem',
              width: '4rem',
              height: '4rem',
              backgroundColor: '#e0e7ff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '2rem', height: '2rem', color: '#4f46e5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: '#4b5563' }}>
              {currentView === 'login' ? 'Please sign in to your account' : 'Please fill in your information to sign up'}
            </p>
          </div>

          {/* Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentView === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s'
                    }}
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s'
                    }}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            {currentView === 'signup' && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s'
                  }}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {currentView === 'login' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      color: '#4f46e5',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                  <label style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  style={{
                    fontSize: '0.875rem',
                    color: '#4f46e5',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                backgroundColor: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
                color: messageType === 'success' ? '#166534' : '#991b1b',
                border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
              }}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={currentView === 'login' ? handleLogin : handleSignup}
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: isLoading ? '#9ca3af' : '#4f46e5',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#4338ca';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#4f46e5';
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.75rem',
                    width: '1.25rem',
                    height: '1.25rem',
                    color: 'white'
                  }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentView === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                currentView === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          {/* Social Login (Login only) */}
          {currentView === 'login' && (
            <>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '100%',
                      borderTop: '1px solid #d1d5db'
                    }} />
                  </div>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{
                      padding: '0 0.5rem',
                      backgroundColor: 'white',
                      color: '#6b7280'
                    }}>Or continue with</span>
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem'
              }}>
                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span style={{ marginLeft: '0.5rem' }}>Google</span>
                </button>

                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span style={{ marginLeft: '0.5rem' }}>Facebook</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Switch View Link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            {currentView === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => switchView(currentView === 'login' ? 'signup' : 'login')}
              style={{
                fontWeight: '500',
                color: '#4f46e5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.color = '#6366f1'}
              onMouseOut={(e) => e.target.style.color = '#4f46e5'}
            >
              {currentView === 'login' ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;