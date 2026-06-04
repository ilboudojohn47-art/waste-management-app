import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: (userId) => api.get(`/users/${userId}`),
};

// Bins API
export const binsAPI = {
  getAll: () => api.get('/bins/'),
  getNearby: (latitude, longitude, radius = 500) =>
    api.get(`/bins/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`),
  getById: (binId) => api.get(`/bins/${binId}`),
  create: (binData) => api.post('/bins/', binData),
  update: (binId, binData) => api.put(`/bins/${binId}`, binData),
};

// Collections API
export const collectionsAPI = {
  getAll: () => api.get('/collections/'),
  getById: (collectionId) => api.get(`/collections/${collectionId}`),
  create: (collectionData) => api.post('/collections/', collectionData),
};

// Districts API
export const districtsAPI = {
  getAll: () => api.get('/districts/'),
  getById: (districtId) => api.get(`/districts/${districtId}`),
  create: (districtData) => api.post('/districts/', districtData),
};

// Routes API
export const routesAPI = {
  getTodayRoute: (collectorId) =>
    api.get(`/routes/collector/${collectorId}/today`),
  getById: (routeId) => api.get(`/routes/${routeId}`),
  create: (routeData) => api.post('/routes/', routeData),
};

// Notifications API
export const notificationsAPI = {
  getByUser: (userId) => api.get(`/notifications/user/${userId}`),
  markAsRead: (notificationId) =>
    api.put(`/notifications/${notificationId}/read`),
  create: (notificationData) => api.post('/notifications/', notificationData),
};

export default api;