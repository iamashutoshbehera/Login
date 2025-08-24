export const authAPI = {
  async login(email, password) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  async resetPassword(email, newPassword, confirmPassword) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword })
      });
      return await response.json();
    } catch (error) {
      console.error('Reset password API error:', error);
      throw error;
    }
  }
};