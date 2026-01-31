/**
 * API Service - Cấu hình fetch để call API
 * Hỗ trợ: interceptors, token management, error handling
 */

// Base URL - có thể cấu hình qua environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Lấy token từ localStorage
 */
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

/**
 * Lưu token vào storage
 */
const setToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

/**
 * Xóa token khỏi storage
 */
const removeToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

/**
 * Xử lý response từ API
 */
const handleResponse = async (response) => {
  // Nếu response không ok, throw error
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText || 'Có lỗi xảy ra'
    }));

    // Nếu token hết hạn hoặc không hợp lệ
    if (response.status === 401) {
      removeToken();
      // Có thể redirect đến trang login ở đây
      window.location.href = '/login';
    }

    throw {
      status: response.status,
      statusText: response.statusText,
      data: errorData,
      message: errorData.message || 'Có lỗi xảy ra'
    };
  }

  // Xử lý response rỗng
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return await response.text();
};

/**
 * Tạo headers cho request
 */
const createHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  };

  // Thêm token nếu có
  const token = getToken();
  console.log('🔑 [API] Token check:', {
    hasToken: !!token,
    tokenLength: token?.length,
    tokenPreview: token ? token.substring(0, 20) + '...' : 'null'
  });

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('✅ [API] Authorization header added');
  } else {
    console.warn('⚠️ [API] No token found - request will be sent without auth');
  }

  return headers;
};

/**
 * Fetch wrapper với error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  console.log('🌐 API Request:', { url, method: options.method || 'GET' });

  const config = {
    ...options,
    headers: createHeaders(options.headers)
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    // Xử lý network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw {
        status: 0,
        message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
        data: null
      };
    }
    throw error;
  }
};

/**
 * API Service Object
 */
const api = {
  /**
   * GET request
   */
  get: async (endpoint, params = {}) => {
    // Thêm query params vào URL
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return apiRequest(url, {
      method: 'GET'
    });
  },

  /**
   * POST request
   */
  post: async (endpoint, data = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * PUT request
   */
  put: async (endpoint, data = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  /**
   * PATCH request
   */
  patch: async (endpoint, data = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  /**
   * DELETE request
   */
  delete: async (endpoint) => {
    return apiRequest(endpoint, {
      method: 'DELETE'
    });
  },

  /**
   * Upload file
   */
  upload: async (endpoint, formData) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // Không set Content-Type cho FormData, browser sẽ tự động set với boundary

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
      });

      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw {
          status: 0,
          message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
          data: null
        };
      }
      throw error;
    }
  },

  /**
   * Token management
   */
  setToken,
  getToken,
  removeToken
};

export default api;
