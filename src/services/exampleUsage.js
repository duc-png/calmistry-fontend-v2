/**
 * Ví dụ sử dụng API Service
 * File này chỉ để tham khảo, có thể xóa sau khi hiểu cách sử dụng
 */

import api from './api';
import authService from './authService';

// ========== VÍ DỤ SỬ DỤNG AUTH SERVICE ==========

// Đăng nhập
const handleLogin = async () => {
  try {
    const response = await authService.login('user@example.com', 'password123', true);
    console.log('Login success:', response);
    // response sẽ chứa user data và token đã được lưu tự động
  } catch (error) {
    console.error('Login error:', error.message);
    // error.message: "Email hoặc mật khẩu không đúng"
    // error.status: 401, 400, etc.
  }
};

// Đăng ký
const handleRegister = async () => {
  try {
    const response = await authService.register({
      name: 'Nguyễn Văn A',
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Register success:', response);
  } catch (error) {
    console.error('Register error:', error.message);
  }
};

// Đăng xuất
const handleLogout = async () => {
  try {
    await authService.logout();
    // Token đã được xóa tự động
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Lấy thông tin user hiện tại
const getCurrentUser = async () => {
  try {
    const user = await authService.getCurrentUser();
    console.log('Current user:', user);
  } catch (error) {
    console.error('Get user error:', error.message);
  }
};

// ========== VÍ DỤ SỬ DỤNG API SERVICE TRỰC TIẾP ==========

// GET request
const fetchBlogs = async () => {
  try {
    const blogs = await api.get('/blogs');
    console.log('Blogs:', blogs);
    
    // Với query params
    const filteredBlogs = await api.get('/blogs', {
      page: 1,
      limit: 10,
      category: 'mental-health'
    });
    console.log('Filtered blogs:', filteredBlogs);
  } catch (error) {
    console.error('Fetch blogs error:', error.message);
  }
};

// GET một item cụ thể
const fetchBlogDetail = async (blogId) => {
  try {
    const blog = await api.get(`/blogs/${blogId}`);
    console.log('Blog detail:', blog);
  } catch (error) {
    console.error('Fetch blog detail error:', error.message);
  }
};

// POST request
const createBlog = async () => {
  try {
    const newBlog = await api.post('/blogs', {
      title: 'Tiêu đề bài viết',
      content: 'Nội dung bài viết',
      category: 'mental-health'
    });
    console.log('Created blog:', newBlog);
  } catch (error) {
    console.error('Create blog error:', error.message);
  }
};

// PUT request (update toàn bộ)
const updateBlog = async (blogId) => {
  try {
    const updatedBlog = await api.put(`/blogs/${blogId}`, {
      title: 'Tiêu đề mới',
      content: 'Nội dung mới'
    });
    console.log('Updated blog:', updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error.message);
  }
};

// PATCH request (update một phần)
const partialUpdateBlog = async (blogId) => {
  try {
    const updatedBlog = await api.patch(`/blogs/${blogId}`, {
      title: 'Chỉ cập nhật tiêu đề'
    });
    console.log('Partially updated blog:', updatedBlog);
  } catch (error) {
    console.error('Partial update error:', error.message);
  }
};

// DELETE request
const deleteBlog = async (blogId) => {
  try {
    await api.delete(`/blogs/${blogId}`);
    console.log('Blog deleted successfully');
  } catch (error) {
    console.error('Delete blog error:', error.message);
  }
};

// Upload file
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', 'Mô tả ảnh');
    
    const response = await api.upload('/upload/image', formData);
    console.log('Upload success:', response);
  } catch (error) {
    console.error('Upload error:', error.message);
  }
};

// ========== VÍ DỤ SỬ DỤNG TRONG REACT COMPONENT ==========

/*
import { useState, useEffect } from 'react';
import api from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await api.get('/blogs');
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  );
};
*/

export {
  handleLogin,
  handleRegister,
  handleLogout,
  getCurrentUser,
  fetchBlogs,
  fetchBlogDetail,
  createBlog,
  updateBlog,
  partialUpdateBlog,
  deleteBlog,
  uploadImage
};
