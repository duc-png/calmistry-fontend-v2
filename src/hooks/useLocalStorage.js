import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Đồng bộ state với localStorage
 * 
 * @param {string} key - Key trong localStorage
 * @param {any} initialValue - Giá trị mặc định
 * @returns {[value, setValue]} - Tuple giống useState
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
const useLocalStorage = (key, initialValue) => {
  // Lấy giá trị từ localStorage hoặc dùng initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Hàm setter để cập nhật cả state và localStorage
  const setValue = (value) => {
    try {
      // Cho phép value là function giống useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
