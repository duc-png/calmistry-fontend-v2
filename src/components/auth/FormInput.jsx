import React from 'react';

const FormInput = ({ label, type = 'text', placeholder, value, onChange, style = {} }) => {
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#4a5568', marginLeft: '2px' };
  const inputStyle = { width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1.5px solid #f1f4f1', outline: 'none', fontSize: '14px', backgroundColor: '#f9faf9', color: '#324d3e', transition: '0.3s', fontFamily: "'Be Vietnam Pro', sans-serif", ...style };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
};

export default FormInput;
