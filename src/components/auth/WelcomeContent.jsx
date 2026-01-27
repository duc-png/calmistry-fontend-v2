import React from 'react';
import { motion } from 'framer-motion';

const floatingVariant = (delay) => ({
  animate: {
    y: [0, -20, 0],
    x: [0, 15, 0],
    transition: {
      duration: 3,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
});

const WelcomeContent = ({ type, brandGreen, lightGreen }) => {
  return (
    <div style={{
      height: '100%',
      padding: '50px 40px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: `linear-gradient(155deg, #4a6d52 0%, ${brandGreen} 60%, #2d4533 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        variants={floatingVariant(0)}
        animate="animate"
        style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'rgba(142, 195, 57, 0.3)', filter: 'blur(8px)', zIndex: 1
        }}
      />
      <motion.div
        variants={floatingVariant(1)}
        animate="animate"
        style={{
          position: 'absolute', top: '45%', right: '20%',
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(142, 195, 57, 0.25)', filter: 'blur(5px)', zIndex: 1
        }}
      />
      <motion.div
        variants={floatingVariant(0.5)}
        animate="animate"
        style={{
          position: 'absolute', bottom: '20%', left: '25%',
          width: '70px', height: '70px', borderRadius: '50%',
          background: 'rgba(142, 195, 57, 0.2)', filter: 'blur(10px)', zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', padding: '5px 14px', backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '20px',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
          letterSpacing: '0.5px', textTransform: 'uppercase'
        }}>
          Xin chào!
        </div>

        <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '15px', lineHeight: '1.2', letterSpacing: '-1px' }}>
          {type === 'login' ? 'Chào mừng trở lại!' : 'Bắt đầu hành trình'}
        </h1>
        <p style={{ fontSize: '15px', opacity: '0.85', lineHeight: '1.6', marginBottom: '35px' }}>
          {type === 'login' ? 'Tiếp tục hành trình nuôi dưỡng tâm hồn cùng Calmistry.' : 'Đăng ký để khám phá không gian bình yên.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {[{ icon: 'bi-check2-circle', text: 'Bảo mật thông tin tuyệt đối' }, { icon: 'bi-bar-chart-line', text: 'Theo dõi chỉ số hạnh phúc' }, { icon: 'bi-stars', text: 'Giao diện cá nhân hóa' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className={`bi ${item.icon}`} style={{ fontSize: '18px', color: lightGreen }}></i>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
