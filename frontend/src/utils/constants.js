export const VIEW_TYPES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  RESET: 'reset'
};

export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const FORM_VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  REQUIRED_FIELDS: {
    LOGIN: ['email', 'password'],
    SIGNUP: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
    RESET: ['email', 'newPassword', 'confirmPassword']
  }
};