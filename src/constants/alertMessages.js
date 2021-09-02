const messages = {
  "loginValidation": {
    message: 'Invalid Credentials',
    description: 'Please provide valid credentials',
  },
  "auth/wrong-password": {
    message: 'Invalid Credentials', // incorrect password
    description: ' Your Email or Password is incorrect',
  },
  "auth/user-not-found": {
    type: 'error',
    message: 'User does not exist',
    description: 'Users with this email does not exist.'
  },
  "passwordReset": {
    type: 'success',
    message: 'Check your email for a reset link to complete this process.'
  },
  "loginSuccess": {
    type: 'success',
    message: 'Successful Login',
  },
  "signupSuccess": {
    type: 'success',
    message: 'Successful Signup',
  },
  'auth/networkError': {
    type: 'error',
    message: 'Network error, Please check your network connection.'
  },
  "defaultMessage": {
    type: 'Info',
    message: ''
  }
};

export const getMessage = (code) => messages[code] || messages['defaultMessage'];
