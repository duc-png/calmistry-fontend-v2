# API Service Documentation

## Cấu hình

### 1. Thiết lập Base URL

Tạo file `.env` trong thư mục gốc của project:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Hoặc sửa trực tiếp trong `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-api-url.com/api';
```

## Sử dụng

### Import API Service

```javascript
import api from './services/api';
import authService from './services/authService';
```

### Authentication

#### Đăng nhập
```javascript
try {
  const response = await authService.login('email@example.com', 'password', true);
  // Token sẽ được lưu tự động
  console.log(response.user);
} catch (error) {
  console.error(error.message);
}
```

#### Đăng ký
```javascript
try {
  const response = await authService.register({
    name: 'Nguyễn Văn A',
    email: 'email@example.com',
    password: 'password123'
  });
} catch (error) {
  console.error(error.message);
}
```

#### Đăng xuất
```javascript
await authService.logout();
// Token sẽ được xóa tự động
```

#### Lấy thông tin user hiện tại
```javascript
const user = await authService.getCurrentUser();
```

### API Methods

#### GET Request
```javascript
// Lấy danh sách
const blogs = await api.get('/blogs');

// Với query parameters
const blogs = await api.get('/blogs', {
  page: 1,
  limit: 10,
  category: 'mental-health'
});

// Lấy một item
const blog = await api.get('/blogs/123');
```

#### POST Request
```javascript
const newBlog = await api.post('/blogs', {
  title: 'Tiêu đề',
  content: 'Nội dung',
  category: 'mental-health'
});
```

#### PUT Request (Update toàn bộ)
```javascript
const updated = await api.put('/blogs/123', {
  title: 'Tiêu đề mới',
  content: 'Nội dung mới'
});
```

#### PATCH Request (Update một phần)
```javascript
const updated = await api.patch('/blogs/123', {
  title: 'Chỉ cập nhật tiêu đề'
});
```

#### DELETE Request
```javascript
await api.delete('/blogs/123');
```

#### Upload File
```javascript
const formData = new FormData();
formData.append('image', file);
formData.append('description', 'Mô tả');

const response = await api.upload('/upload/image', formData);
```

### Sử dụng trong React Component

```javascript
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
```

## Error Handling

API service tự động xử lý:
- **401 Unauthorized**: Tự động xóa token và redirect đến `/login`
- **Network errors**: Hiển thị thông báo lỗi kết nối
- **Server errors**: Trả về error object với `status`, `message`, và `data`

```javascript
try {
  const data = await api.get('/blogs');
} catch (error) {
  console.error('Status:', error.status);
  console.error('Message:', error.message);
  console.error('Data:', error.data);
}
```

## Token Management

Token được tự động:
- Thêm vào header `Authorization: Bearer <token>` cho mọi request
- Lưu vào `localStorage` (nếu `remember = true`) hoặc `sessionStorage`
- Xóa khi logout hoặc khi nhận được 401 error

Quản lý token thủ công:
```javascript
// Lấy token
const token = api.getToken();

// Lưu token
api.setToken(token, true); // true = localStorage, false = sessionStorage

// Xóa token
api.removeToken();
```
