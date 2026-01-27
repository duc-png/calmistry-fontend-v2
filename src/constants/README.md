# Constants Folder

Thư mục này chứa tất cả các hằng số (constants) được sử dụng trong ứng dụng.

## Mục đích

- **Tập trung quản lý**: Tất cả constants ở một nơi, dễ tìm và sửa
- **Tránh hardcode**: Không cần nhớ hoặc copy-paste các giá trị
- **Dễ bảo trì**: Thay đổi một lần, áp dụng toàn bộ app
- **Type safety**: Giảm lỗi typo và giá trị sai

## Các file

### `colors.js`
Định nghĩa tất cả màu sắc của ứng dụng:
```javascript
import { COLORS } from '../constants';

const brandGreen = COLORS.brandGreen; // '#324d3e'
```

### `routes.js`
Định nghĩa tất cả routes:
```javascript
import { ROUTES } from '../constants';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate(ROUTES.BLOG_DETAIL(123));
```

### `apiEndpoints.js`
Định nghĩa tất cả API endpoints:
```javascript
import { API_ENDPOINTS } from '../constants';
import api from '../services/api';

const blogs = await api.get(API_ENDPOINTS.BLOG.LIST);
```

### `storageKeys.js`
Định nghĩa keys cho localStorage/sessionStorage:
```javascript
import { STORAGE_KEYS } from '../constants';

localStorage.setItem(STORAGE_KEYS.TOKEN, token);
```

## Cách sử dụng

```javascript
// Import tất cả
import { COLORS, ROUTES, API_ENDPOINTS, STORAGE_KEYS } from '../constants';

// Hoặc import từng file
import COLORS from '../constants/colors';
import ROUTES from '../constants/routes';
```
