import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect, brandGreen }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {categories.map(cat => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="btn rounded-pill d-flex align-items-center gap-2"
            style={{
              backgroundColor: isActive ? brandGreen : '#f8f9fa',
              color: isActive ? '#ffffff' : brandGreen,
              border: `1px solid ${isActive ? brandGreen : '#dee2e6'}`,
              fontWeight: isActive ? '600' : '500',
              transition: 'all 0.3s',
              padding: '8px 20px'
            }}
          >
            <Icon size={18} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
