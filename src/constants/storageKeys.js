/**
 * Storage Keys Constants
 * Định nghĩa tất cả các keys dùng cho localStorage/sessionStorage
 */

export const STORAGE_KEYS = {
  // Auth
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',
  
  // App State
  THEME: 'theme',
  LANGUAGE: 'language',
  
  // Journal (local storage)
  JOURNAL_ENTRIES: 'journal-entries',
  
  // Sleep Data
  SLEEP_DATA: 'sleep-data',
  
  // Other
  LAST_VISITED: 'lastVisited',
};

export default STORAGE_KEYS;
