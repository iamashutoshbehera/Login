import { useState, useEffect } from 'react';
import { getThemeColors } from '../styles/theme';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Use React state instead of localStorage for Claude.ai compatibility
    return false; // Default to light mode
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return { 
    isDarkMode, 
    toggleDarkMode, 
    theme: getThemeColors(isDarkMode) 
  };
};