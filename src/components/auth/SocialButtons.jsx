import React from 'react';

const SocialButtons = () => {
  const socialBtnStyle = {
    flex: 1,
    padding: '12px',
    border: '1.5px solid #edf2f7',
    borderRadius: '12px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color: '#4a5568'
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button style={socialBtnStyle}>
        <i className="bi bi-google"></i> Google
      </button>
      <button style={socialBtnStyle}>
        <i className="bi bi-facebook"></i> Facebook
      </button>
    </div>
  );
};

export default SocialButtons;
