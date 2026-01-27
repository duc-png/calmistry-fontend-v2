import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoCalmWhite from '../assets/logoCalmWhite.png';

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';
  const sectionAboveColor = '#ffffff';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("pricing-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", {
        state: { scrollTo: "pricing-section" }
      });
    }
  };

  const greenFilter = 'invert(26%) sepia(13%) saturate(1005%) hue-rotate(101deg) brightness(33%) contrast(87%)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top px-4 py-2 ${isScrolled ? 'shadow-sm' : ''}`}
        style={{
          backgroundColor: isScrolled ? '#ffffff' : brandGreen,
          transition: 'all 0.4s ease',
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

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto align-items-center">
              {['Business', 'About', 'Advice', 'FAQ'].map((item) => (
                <a
                  key={item}
                  className="nav-link px-3 fw-medium nav-link-custom" // Thêm class custom
                  href="#"
                  style={{
                    color: isScrolled ? brandGreen : 'rgba(255,255,255,0.9)',
                    transition: 'all 0.3s'
                  }}
                >
                  {item}
                </a>
              ))}

              <button
                className={`btn rounded-pill px-4 me-2 btn-login-custom ${isScrolled ? 'scrolled' : ''}`} // Thêm class custom
                style={{
                  border: `1px solid ${isScrolled ? brandGreen : '#ffffff'}`,
                  color: isScrolled ? brandGreen : '#ffffff',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s',
                  fontWeight: '500'
                }}
                onClick={() => navigate('/login')}
              >
                Log in
              </button>

              <button
                onClick={handleGetStarted}
                className="btn rounded-pill px-4 btn-get-started"
                style={{
                  backgroundColor: isScrolled ? brandGreen : '#e8f5e9',
                  color: isScrolled ? '#ffffff' : brandGreen,
                  border: 'none',
                  transition: 'all 0.3s',
                  fontWeight: '600'
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
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

      {/* CSS HOVER EFFECTS */}
      <style>{`
        /* Hover cho các link Menu (Business, About...) */
        .nav-link-custom:hover {
          color: ${lightGreen} !important;
          transform: translateY(-2px);
        }

        /* Hover cho nút Login khi chưa cuộn (Nền xanh) */
        .btn-login-custom:hover {
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

        /* Link Footer Hover */
        .footer-links a:hover {
          color: ${lightGreen} !important;
          padding-left: 5px;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;