import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Custom Hook: useApi
 * Gọi API và quản lý loading, error, data state
 * 
 * @param {string} endpoint - API endpoint
 * @param {object} options - Options: { method, body, immediate, dependencies }
 * @returns {object} { data, loading, error, refetch }
 * 
 * @example
 * // GET request tự động khi component mount
 * const { data, loading, error } = useApi('/blogs');
 * 
 * // POST request không tự động
 * const { data, loading, error, refetch } = useApi('/blogs', {
 *   method: 'POST',
 *   body: { title: 'New Blog' },
 *   immediate: false
 * });
 */
const useApi = (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    immediate = true,
    dependencies = [],
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await api.get(endpoint);
          break;
        case 'POST':
          response = await api.post(endpoint, body);
          break;
        case 'PUT':
          response = await api.put(endpoint, body);
          break;
        case 'PATCH':
          response = await api.patch(endpoint, body);
          break;
        case 'DELETE':
          response = await api.delete(endpoint);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, immediate, ...dependencies]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi;
