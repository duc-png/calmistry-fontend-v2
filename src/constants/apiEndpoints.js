/**
 * API Endpoints Constants
 * Tập trung tất cả các API endpoints tại đây
 */

const API_BASE = '/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE}/auth/refresh`,
    ME: `${API_BASE}/auth/me`,
    CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  },
  
  // Blog
  BLOG: {
    LIST: `${API_BASE}/blogs`,
    DETAIL: (id) => `${API_BASE}/blogs/${id}`,
    CREATE: `${API_BASE}/blogs`,
    UPDATE: (id) => `${API_BASE}/blogs/${id}`,
    DELETE: (id) => `${API_BASE}/blogs/${id}`,
    LIKE: (id) => `${API_BASE}/blogs/${id}/like`,
    COMMENT: (id) => `${API_BASE}/blogs/${id}/comments`,
  },
  
  // Journal
  JOURNAL: {
    LIST: `${API_BASE}/journals`,
    DETAIL: (id) => `${API_BASE}/journals/${id}`,
    CREATE: `${API_BASE}/journals`,
    UPDATE: (id) => `${API_BASE}/journals/${id}`,
    DELETE: (id) => `${API_BASE}/journals/${id}`,
  },
  
  // Stories
  STORIES: {
    LIST: `${API_BASE}/stories`,
    CREATE: `${API_BASE}/stories`,
    LIKE: (id) => `${API_BASE}/stories/${id}/like`,
    COMMENT: (id) => `${API_BASE}/stories/${id}/comments`,
  },
  
  // User
  USER: {
    PROFILE: `${API_BASE}/users/profile`,
    UPDATE_PROFILE: `${API_BASE}/users/profile`,
    DASHBOARD: `${API_BASE}/users/dashboard`,
  },
  
  // Sleep Management
  SLEEP: {
    TRACK: `${API_BASE}/sleep/track`,
    HISTORY: `${API_BASE}/sleep/history`,
    QUIZ: `${API_BASE}/sleep/quiz`,
  },
  
  // Upload
  UPLOAD: {
    IMAGE: `${API_BASE}/upload/image`,
    AVATAR: `${API_BASE}/upload/avatar`,
  },
};

export default API_ENDPOINTS;
