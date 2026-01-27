/**
 * Route Constants
 * Định nghĩa tất cả các routes của ứng dụng
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  BLOG: '/blog',
  BLOG_DETAIL: (id) => `/blog/${id}`,
  
  // Client Routes
  JOURNAL: '/journal',
  SLEEP_MANAGEMENT: '/sleepManagement',
  USER_DASHBOARD: '/userDashboard',
  SHARE_STORIES: '/shareStories',
  
  // Author Routes
  AUTHOR_DASHBOARD: '/authorDashboard',
  
  // Expert Routes
  EXPERT_DASHBOARD: '/expertDashboard',
  
  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Common Routes
  NOT_FOUND: '*',
};

export default ROUTES;
