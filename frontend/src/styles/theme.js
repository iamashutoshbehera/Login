// ==================== src/styles/theme.js (UPDATED) ====================
export const getThemeColors = (isDarkMode) => {
  if (isDarkMode) {
    return {
      background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1f2937)',
      cardBg: 'rgba(31, 41, 55, 0.95)', // Slightly more opaque
      cardBorder: '#4b5563', // Lighter border for better visibility
      textPrimary: '#f8fafc', // Brighter white for better readability
      textSecondary: '#cbd5e1', // Lighter secondary text
      inputBg: '#1f2937', // Darker input background for better contrast
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