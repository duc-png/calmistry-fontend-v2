import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Tìm kiếm bài viết..." }) => {
  return (
    <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
      <Search
        size={20}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6c757d'
        }}
      />
      <input
        type="text"
        className="form-control form-control-lg shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          paddingLeft: '50px',
          borderRadius: '50px',
          border: 'none',
          fontSize: '16px',
          color: '#324d3e'
        }}
      />
    </div>
  );
};

export default SearchBar;
