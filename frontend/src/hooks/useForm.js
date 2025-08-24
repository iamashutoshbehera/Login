import { useState } from 'react';

export const useForm = (initialState) => {
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