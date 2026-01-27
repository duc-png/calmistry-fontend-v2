import React, { useState } from 'react';
import '../../styles/AuthorDashboard.css';

const AuthorDashboard = () => {
  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';
  const bgSoft = '#fcfdfd';

  // Mock data danh sách bài viết
  const [blogs] = useState([
    { id: 1, title: "Làm sao để vượt qua Overthinking?", status: "Published", views: 1240, date: "10/01/2026" },
    { id: 2, title: "Sức mạnh của việc hít thở đúng cách", status: "Draft", views: 0, date: "08/01/2026" },
    { id: 3, title: "Thiền định cho người bận rộn", status: "Published", views: 856, date: "05/01/2026" },
  ]);

  const [authorProfile] = useState({
      name: "Minh Anh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      role: "Người truyền cảm hứng"
  });

  return (
    <div style={{ backgroundColor: bgSoft, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', color: brandGreen }}>
      <div className="container">

        {/* --- HEADER: AUTHOR INFO & QUICK ACTION --- */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center">

              {/* Khối Ảnh Đại Diện (Đảm bảo TRÒN TUYỆT ĐỐI) */}
              <div className="flex-shrink-0 me-3" style={{ width: '75px', height: '75px' }}>
                <div className="rounded-circle border border-4 border-white shadow-sm overflow-hidden"
                     style={{ width: '100%', height: '100%' }}>
                  <img
                    src={authorProfile.avatar}
                    alt="Author"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Thông tin chữ */}
              <div>
                <h2 className="fw-bold mb-1 d-flex align-items-center">
                  Let make some interesting Blog! Yahoo!
                  <span className="ms-2 badge bg-light text-success border fw-normal" style={{ fontSize: '0.4em' }}>
                    <i className="bi bi-patch-check-fill me-1"></i>Verified
                  </span>
                </h2>
                <p className="text-muted mb-0">
                  Chào <span className="fw-bold text-dark">{authorProfile.name}</span>, hôm nay bạn muốn chia sẻ điều gì?
                </p>
              </div>
            </div>
          </div>

          {/* Nút hành động nhanh */}
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              className="btn btn-dark rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center shadow-sm"
              style={{ backgroundColor: brandGreen, border: 'none' }}
            >
              <i className="bi bi-plus-lg me-2"></i> Viết bài mới
            </button>
          </div>
        </div>

        {/* --- STATS CARDS: HIỆU SUẤT --- */}
        <div className="row g-4 mb-5">
          {[
            { label: 'Tổng bài viết', value: '24', icon: 'bi-file-earmark-post', color: '#e3f2fd' },
            { label: 'Tổng lượt đọc', value: '15.4K', icon: 'bi-eye', color: '#e8f5e9' },
            { label: 'Bình luận mới', value: '12', icon: 'bi-chat-left-dots', color: '#fff3cd' },
            { label: 'Điểm uy tín', value: '4.9', icon: 'bi-star', color: '#f3e5f5' }
          ].map((stat, idx) => (
            <div key={idx} className="col-md-3">
              <div className="p-4 rounded-5 bg-white shadow-sm border-0 text-center">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '50px', height: '50px', backgroundColor: stat.color }}>
                  <i className={`bi ${stat.icon} fs-4`} style={{ color: brandGreen }}></i>
                </div>
                <h3 className="fw-bold mb-0">{stat.value}</h3>
                <p className="small text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* --- LEFT: UPLOAD/EDITOR QUICK VIEW --- */}
          <div className="col-lg-8">
            <div className="p-4 p-md-5 rounded-5 bg-white shadow-sm border-0">
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-cloud-arrow-up me-2 text-success"></i> Đăng bài nhanh
              </h5>

              <form>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">TIÊU ĐỀ BÀI VIẾT</label>
                  <input type="text" className="form-control form-control-lg rounded-4 border-light bg-light" placeholder="Nhập tiêu đề thu hút..." />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">CHUYÊN MỤC</label>
                    <select className="form-select rounded-4 border-light bg-light">
                      <option>Tâm lý học</option>
                      <option>Chữa lành</option>
                      <option>Thiền định</option>
                      <option>Lối sống</option>
                    </select>
                  </div>
                  <div className="col-md-6 text-center">
                    <label className="form-label small fw-bold text-muted d-block text-start">ẢNH BÌA</label>
                    <div className="border border-2 border-dashed rounded-4 p-3 d-flex flex-column align-items-center justify-content-center text-muted shadow-sm" style={{ cursor: 'pointer', minHeight: '100px' }}>
                       <i className="bi bi-image fs-3 mb-1"></i>
                       <span className="small">Tải ảnh lên (PNG, JPG)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">NỘI DUNG TÓM TẮT</label>
                  <textarea className="form-control rounded-4 border-light bg-light" rows="3" placeholder="Viết mô tả ngắn gọn cho bài viết..."></textarea>
                </div>

                <div className="d-flex gap-3 justify-content-end">
                   <button type="button" className="btn btn-outline-secondary rounded-pill px-4">Lưu nháp</button>
                   <button type="button" className="btn btn-success rounded-pill px-4 fw-bold" style={{ backgroundColor: lightGreen, border: 'none' }}>Xuất bản bài viết</button>
                </div>
              </form>
            </div>
          </div>

          {/* --- RIGHT: RECENT BLOGS LIST --- */}
          <div className="col-lg-4">
            <div className="p-4 rounded-5 bg-white shadow-sm border-0 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Bài viết gần đây</h5>
                <i className="bi bi-filter-right fs-4"></i>
              </div>

              <div className="d-flex flex-column gap-3">
                {blogs.map(blog => (
                  <div key={blog.id} className="p-3 rounded-4 border-light bg-light hover-list-item position-relative shadow-sm border">
                    <div className="d-flex justify-content-between mb-1">
                      <span className={`badge rounded-pill ${blog.status === 'Published' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`} style={{ fontSize: '10px' }}>
                        {blog.status}
                      </span>
                      <span className="small text-muted" style={{ fontSize: '11px' }}>{blog.date}</span>
                    </div>
                    <h6 className="fw-bold mb-2 text-truncate pe-4" style={{ fontSize: '14px' }}>{blog.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="small text-muted">
                        <i className="bi bi-eye me-1"></i> {blog.views}
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light rounded-circle p-1"><i className="bi bi-pencil-square text-primary"></i></button>
                        <button className="btn btn-sm btn-light rounded-circle p-1"><i className="bi bi-trash text-danger"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn btn-link w-100 mt-4 text-decoration-none fw-bold small" style={{ color: lightGreen }}>
                Xem tất cả bài viết <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AuthorDashboard;