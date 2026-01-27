# Hooks Folder

Thư mục này chứa các custom React hooks có thể tái sử dụng.

## Mục đích

- **Tái sử dụng logic**: Chia sẻ logic giữa các components
- **Tách biệt concerns**: Logic tách khỏi UI
- **Dễ test**: Hooks có thể test độc lập
- **Code sạch hơn**: Components ngắn gọn, dễ đọc

## Các hooks có sẵn

### `useAuth`
Quản lý trạng thái authentication:
```javascript
import { useAuth } from '../hooks';

const { user, isAuthenticated, login, logout } = useAuth();
```

### `useLocalStorage`
Đồng bộ state với localStorage:
```javascript
import { useLocalStorage } from '../hooks';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### `useDebounce`
Trì hoãn cập nhật giá trị (dùng cho search):
```javascript
import { useDebounce } from '../hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

### `useApi`
Gọi API và quản lý loading/error:
```javascript
import { useApi } from '../hooks';

const { data, loading, error } = useApi('/blogs');
```

## Cách tạo hook mới

1. Tạo file mới trong `src/hooks/`
2. Export hook function
3. Thêm vào `src/hooks/index.js`

Ví dụ:
```javascript
// src/hooks/useCustomHook.js
const useCustomHook = () => {
  // Logic here
  return { /* values */ };
};

export default useCustomHook;
```

## Best Practices

- Hooks nên bắt đầu với `use`
- Một hook chỉ làm một việc
- Trả về object hoặc array để dễ destructure
- Xử lý cleanup trong useEffect nếu cần
