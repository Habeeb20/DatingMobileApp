import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = "http://192.168.67.127:5000";
console.log('api.js: API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error.message);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response || error.message);
    if (error.message.includes('Network Error')) {
      console.error('API Network Error Details:', {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        message: error.response?.data?.message,
      });
    }
    return Promise.reject(error);
  }
);

// Onboarding Step 1: Submit Email
export const submitEmail = (email) =>
  api.post('/email', { email });

// Onboarding Step 2: Verify Code
export const verifyCode = (email, code) =>
  api.post('/verify', { email, code });

// Onboarding Step 3: Submit Phone Number
export const submitPhone = (email, phoneNumber) =>
  api.post('/phone', { email, phoneNumber });

// Onboarding Step 4: Submit Profile
export const submitProfile = (email, firstName, lastName, profilePicture, dateOfBirth, gender, password) =>
  api.post('/profile', { email, firstName, lastName, profilePicture, dateOfBirth, dateOfBirth, gender, password });

// Onboarding Step 5: Submit Interests
export const submitInterests = (email, interests) =>
  api.post('/interests', { email, interests });

// Onboarding Step 6: Submit Contacts
export const submitContacts = (email, contactsFiltered) =>
  api.post('/contacts', { email, contactsFiltered });

// Onboarding Step 7: Toggle Notifications
export const toggleNotifications = (email, notificationsEnabled) =>
  api.post('/notifications', { email, notificationsEnabled });

// Login
export const login = (email, password) =>
  api.post('/login', { email, password });


export default api;