import React, { useState } from 'react';
import '../../styles/ExpertDashboard.css';

const ExpertDashboardPro = () => {
  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';
  const bgSoft = '#fcfdfd';

  // State quản lý Tab hiện tại
  const [activeTab, setActiveTab] = useState('patients'); // 'patients' hoặc 'content'

  const [expertProfile] = useState({
      name: "Dr. Minh Anh",
      role: "Chuyên gia Tâm lý",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?w=150&h=150&fit=crop",
    });
  return (
    <div style={{ backgroundColor: bgSoft, minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px', color: brandGreen }}>
      <div className="container">

        {/* --- HEADER CHUYÊN GIA --- */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-7">
            <div className="d-flex align-items-center">
              {/* Ảnh đại diện Chuyên gia */}
              {/* --- KHỐI ẢNH ĐẠI DIỆN: KHẮC PHỤC OVAL --- */}
              <div
                className="position-relative me-3 flex-shrink-0"
                style={{ width: '65px', height: '65px' }} // Khóa cứng kích thước khung ngoài
              >
                <div className="rounded-circle border border-3 border-white shadow-sm overflow-hidden"
                     style={{ width: '100%', height: '100%' }}>
                  <img
                    src={expertProfile.avatar}
                    alt="Expert"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Đảm bảo ảnh lấp đầy không méo
                      display: 'block'
                    }}
                  />
                </div>

                {/* Chấm xanh trạng thái */}
                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                      style={{ width: '15px', height: '15px', border: '2px solid white', zIndex: 2 }}></span>
              </div>

              {/* Tên và Tiêu đề */}
              <div>
                <h4 className="fw-bold mb-0">Chào {expertProfile.name}</h4>
                <p className="text-muted small mb-0">
                  <span className="badge bg-light text-dark border fw-normal me-2">{expertProfile.role}</span>
                  Quản lý lộ trình và đóng góp chuyên môn
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 text-md-end mt-3 mt-md-0">
            <div className="bg-white d-inline-flex p-1 rounded-pill shadow-sm border">
              <button
                onClick={() => setActiveTab('patients')}
                className={`btn rounded-pill px-4 btn-sm fw-bold transition-all ${activeTab === 'patients' ? 'text-white' : 'btn-light text-muted'}`}
                style={activeTab === 'patients' ? { backgroundColor: brandGreen } : {}}
              >
                <i className="bi bi-person-heart me-2"></i>Hỗ trợ
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`btn rounded-pill px-4 btn-sm fw-bold transition-all ${activeTab === 'content' ? 'text-white' : 'btn-light text-muted'}`}
                style={activeTab === 'content' ? { backgroundColor: brandGreen } : {}}
              >
                <i className="bi bi-journal-text me-2"></i>Nội dung
              </button>
            </div>
          </div>
        </div>
        {activeTab === 'patients' ? (
          /* ================= TAB 1: QUẢN LÝ BỆNH NHÂN ================= */
          <div className="row g-4 animate-fade-in">
            <div className="col-lg-8">
              <div className="p-4 rounded-5 bg-white shadow-sm border-0">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                  <i className="bi bi-list-stars me-2 text-success"></i> Danh sách bệnh nhân đang support
                </h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr className="small text-muted text-uppercase">
                        <th>Bệnh nhân</th>
                        <th>Trạng thái</th>
                        <th>Lịch hẹn tiếp theo</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map(i => (
                        <tr key={i}>
                          <td>
                            <div className="fw-bold">Nguyễn Văn {i}</div>
                            <div className="small text-muted text-truncate" style={{maxWidth: '150px'}}>Rối loạn lo âu xã hội</div>
                          </td>
                          <td><span className="badge bg-success-subtle text-success rounded-pill px-3">Đang điều trị</span></td>
                          <td className="small fw-bold">14:00 - 15/01</td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-light rounded-circle me-1"><i className="bi bi-camera-video"></i></button>
                            <button className="btn btn-sm btn-light rounded-circle"><i className="bi bi-chat-left-dots"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
               <div className="p-4 rounded-5 bg-white shadow-sm border-0 mb-4">
                  <h6 className="fw-bold mb-3">Thông báo mới</h6>
                  <div className="d-flex gap-3 mb-3 p-2 rounded-4 hover-bg-light">
                     <i className="bi bi-bell-fill text-warning"></i>
                     <p className="small mb-0">Bệnh nhân <strong>An Nhiên</strong> vừa gửi một nhật ký mới.</p>
                  </div>
                  <div className="d-flex gap-3 p-2 rounded-4 hover-bg-light">
                     <i className="bi bi-exclamation-circle-fill text-danger"></i>
                     <p className="small mb-0">Bạn có 1 lịch hẹn sẽ bắt đầu trong 15 phút tới.</p>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          /* ================= TAB 2: QUẢN LÝ NỘI DUNG ================= */
          <div className="row g-4 animate-fade-in">
            {/* Form Đăng bài (Dành cho Chuyên gia) */}
            <div className="col-lg-7">
              <div className="p-4 p-md-5 rounded-5 bg-white shadow-sm border-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0 text-success">
                    <i className="bi bi-pencil-square me-2"></i> Viết bài chuyên môn
                  </h5>
                  <span className="small text-muted"><i className="bi bi-info-circle me-1"></i> Tự động xuất bản</span>
                </div>

                <form>
                  <input type="text" className="form-control form-control-lg rounded-4 border-light bg-light mb-3" placeholder="Tiêu đề bài viết..." />

                  <div className="d-flex gap-2 mb-3">
                    <button type="button" className="btn btn-light btn-sm rounded-pill border small"><i className="bi bi-image me-1"></i> Thêm ảnh</button>
                    <button type="button" className="btn btn-light btn-sm rounded-pill border small"><i className="bi bi-type-bold me-1"></i></button>
                    <button type="button" className="btn btn-light btn-sm rounded-pill border small"><i className="bi bi-link-45deg me-1"></i></button>
                  </div>

                  <textarea className="form-control rounded-4 border-light bg-light mb-4" rows="8" placeholder="Chia sẻ kiến thức của bạn tại đây..."></textarea>

                  <div className="d-flex gap-3">
                    <button className="btn btn-dark rounded-pill px-5 fw-bold" style={{backgroundColor: brandGreen}}>Đăng bài ngay</button>
                    <button className="btn btn-outline-secondary rounded-pill px-4">Lưu bản nháp</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Danh sách Duyệt bài từ Author */}
            <div className="col-lg-5">
              <div className="p-4 rounded-5 bg-white shadow-sm border-0 mb-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center justify-content-between">
                  <span><i className="bi bi-shield-check me-2 text-warning"></i> Duyệt bài từ Author</span>
                  <span className="badge bg-danger rounded-pill fw-normal" style={{fontSize: '10px'}}>2 bài mới</span>
                </h5>

                <div className="d-flex flex-column gap-3">
                  {[1, 2].map(i => (
                    <div key={i} className="p-3 rounded-4 border bg-light-subtle">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold mb-0 pe-3" style={{fontSize: '14px'}}>Làm sao để giải tỏa áp lực đồng lứa (Peer Pressure)?</h6>
                        <i className="bi bi-eye cursor-pointer text-muted"></i>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small text-muted">Tác giả: <strong>Author_Kien</strong></span>
                        <div className="d-flex gap-2">
                          <button className="btn btn-success btn-sm rounded-pill px-3"><i className="bi bi-check-lg"></i></button>
                          <button className="btn btn-outline-danger btn-sm rounded-pill px-3"><i className="bi bi-x-lg"></i></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danh sách bài viết cá nhân */}
              <div className="p-4 rounded-5 bg-white shadow-sm border-0">
                <h6 className="fw-bold mb-3"><i className="bi bi-journal-bookmark-fill me-2 text-primary"></i> Bài viết của tôi</h6>
                <div className="list-group list-group-flush">
                   <div className="list-group-item px-0 py-2 border-0 small d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-dot text-success fs-4"></i> Cách đối phó với trầm cảm...</span>
                      <span className="text-muted" style={{fontSize: '10px'}}>12/01/2026</span>
                   </div>
                   <div className="list-group-item px-0 py-2 border-0 small d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-dot text-success fs-4"></i> Hiểu về tâm lý học hành vi...</span>
                      <span className="text-muted" style={{fontSize: '10px'}}>05/01/2026</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default ExpertDashboardPro;