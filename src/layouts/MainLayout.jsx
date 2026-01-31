import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Đảm bảo bạn đã cài icon này

import { useQuery, useQueryClient } from '@tanstack/react-query';

import logoCalmWhite from '../assets/logoCalmWhite.png';
import authService from '../services/authService';
import userService from '../services/userService';

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const sectionAboveColor = '#f8f9fa'; // hoặc màu bạn muốn

  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 React Query: load user with cache
  const {
    data: currentUser,
    isLoading,
  } = useQuery({
    queryKey: ['me'],
    queryFn: userService.getMyInfo,
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const handleGetStarted = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("pricing-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "pricing-section" } });
    }
  };

  const greenFilter =
    'invert(26%) sepia(13%) saturate(1005%) hue-rotate(101deg) brightness(33%) contrast(87%)';

  // Style cho các item trong dropdown để tái sử dụng
  const dropdownItemStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top px-4 py-2 ${isScrolled ? 'shadow-sm' : ''}`}
        style={{
          backgroundColor: isScrolled ? '#ffffff' : brandGreen,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1100
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand fw-bold fs-3 d-flex align-items-center"
            href="/"
            style={{
              color: isScrolled ? brandGreen : '#ffffff',
              transition: 'color 0.4s'
            }}
          >
            <img
              src={logoCalmWhite}
              alt="Calmistry Logo"
              style={{
                height: '40px',
                marginRight: '10px',
                filter: isScrolled ? greenFilter : 'none',
                transition: 'filter 0.4s'
              }}
            />
            Calmistry
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ border: 'none', filter: isScrolled ? 'none' : 'invert(1)' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto align-items-center">
              {isLoading ? null : !currentUser ? (
                <>
                  <button
                    className="btn rounded-pill px-4 me-2 fw-medium login-target" // Thêm class này
                    style={{
                      border: `1px solid ${isScrolled ? brandGreen : '#ffffff'}`,
                      color: isScrolled ? brandGreen : '#ffffff',
                      backgroundColor: 'transparent',
                      transition: 'all 0.3s',
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Log in
                  </button>

                  <button
                    onClick={handleGetStarted}
                    className="btn rounded-pill px-4 fw-bold"
                    style={{
                      backgroundColor: isScrolled ? brandGreen : '#e8f5e9',
                      color: isScrolled ? '#ffffff' : brandGreen,
                      border: 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    Get started
                  </button>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn d-flex align-items-center dropdown-toggle border-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: isScrolled ? 'rgba(50, 77, 62, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                      color: isScrolled ? brandGreen : '#ffffff',
                      fontWeight: 500,
                      borderRadius: '50px',
                      padding: '6px 16px'
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '30px', height: '30px',
                        backgroundColor: isScrolled ? brandGreen : '#ffffff',
                        color: isScrolled ? '#ffffff' : brandGreen,
                        fontSize: '0.9rem'
                      }}
                    >
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <span className="me-1">
                      {currentUser.fullName || currentUser.name || 'Account'}
                    </span>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style={{ minWidth: '260px', borderRadius: '15px' }}>
                    {/* User Header */}
                    <li className="px-3 py-3 mb-2 border-bottom bg-light rounded-top-4">
                      <div className="fw-bold text-dark text-truncate" style={{ fontSize: '1rem' }}>
                        Xin chào, {currentUser.fullName || currentUser.name}!
                      </div>
                      <div className="text-muted small text-truncate">
                        {currentUser.email}
                      </div>
                    </li>

                    {/* Menu Items */}
                    <li>
                      <button className="dropdown-item" style={dropdownItemStyle} onClick={() => navigate('/userDashboard')}>
                        <i className="bi bi-grid-1x2 text-primary"></i>
                        Dashboard
                      </button>
                    </li>

                    {/* Admin Only */}
                    {currentUser.roles && currentUser.roles.includes('ADMIN') && (
                      <li>
                        <button className="dropdown-item" style={dropdownItemStyle} onClick={() => navigate('/admin/accounts')}>
                          <i className="bi bi-shield-lock text-danger"></i>
                          Manager Account
                        </button>
                      </li>
                    )}



                    <li><hr className="dropdown-divider mx-2" /></li>

                    <li>
                      <button
                        className="dropdown-item text-danger fw-medium"
                        style={dropdownItemStyle}
                        onClick={async () => {
                          await authService.logout();
                          queryClient.removeQueries(['me']);
                          navigate('/', { replace: true });
                        }}
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: isScrolled ? '70px' : '0' }}>
        <Outlet />
      </main>

      {/* Footer (Giữ nguyên logic của bạn) */}
      <footer style={{ position: 'relative', backgroundColor: brandGreen, marginTop: 'auto' }}>
        <div style={{ lineHeight: 0, width: '100%', backgroundColor: sectionAboveColor, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100px', display: 'block', transform: 'scale(1.02)' }}>
            <path d="M0,80 C320,130 720,30 1120,90 C1280,115 1440,100 1440,100 L1440,120 L0,120 Z" fill={lightGreen} />
            <path d="M0,100 C360,150 720,50 1080,110 C1260,130 1440,120 1440,120 L1440,120 L0,120 Z" fill={brandGreen} />
          </svg>
        </div>

        <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px', color: '#ffffff' }}>
          {/* Nội dung Footer của bạn giữ nguyên ở đây... */}
          <div className="row g-5">
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center mb-4">
                <img src={logoCalmWhite} alt="Logo" style={{ height: '40px', marginRight: '12px' }} />
                <span className="fs-3 fw-bold">Calmistry</span>
              </div>
              <p className="opacity-75">Trải nghiệm trị liệu tâm lý trực tuyến 100%.</p>
            </div>
            {/* ... Các cột khác ... */}
          </div>
        </div>
      </footer>

      {/* CSS Hovers - Bạn có thể đưa vào file .css riêng */}
      <style>{`
       /* Hover cho nút Login khi chưa cuộn (Nền xanh) */
       .login-target:hover {
         background-color: #ffffff !important;
         color: ${brandGreen} !important;
       }

       /* Hover cho nút Login khi đã cuộn (Nền trắng) */
       .btn-login-custom.scrolled:hover {
         background-color: ${brandGreen} !important;
         color: #ffffff !important;
       }

       /* Hiệu ứng hover cho nút Get Started */
       .btn-get-started:hover {
         transform: scale(1.05);
         box-shadow: 0 4px 15px rgba(0,0,0,0.1);
       }

       .dropdown-item:hover {
         background-color: #f1f3f2 !important;
         transform: translateX(4px);
         color: ${brandGreen} !important;
       }

       .dropdown-item.text-danger:hover {
         background-color: #fff5f5 !important;
         color: #dc3545 !important;
       }

       .dropdown-toggle::after {
         display: none;
       }
     `}</style>

    </div>
  );
};

export default MainLayout;


