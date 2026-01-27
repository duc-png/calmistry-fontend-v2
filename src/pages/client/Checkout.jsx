import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../../styles/Checkout.css";
// Import icons từ react-icons
import {
  FaRegClock, FaShieldAlt, FaCheckCircle, FaTag,
  FaRegCreditCard, FaWallet, FaUniversity, FaMobileAlt,
  FaLock, FaBolt, FaHandHoldingHeart // Thêm 3 icon này
} from "react-icons/fa";

// Logo Momo sử dụng currentColor để đồng bộ màu với CSS
const MomoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* rect sẽ lấy màu từ class .method-icon (xám hoặc xanh emerald) */}
    <rect width="24" height="24" rx="5" fill="currentColor"/>
    {/* path (hình tròn ở giữa) để màu trắng hoặc hơi trong suốt cho đẹp */}
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white" fillOpacity="0.9"/>
  </svg>
);

const Checkout = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "card"
  });
  const [voucher, setVoucher] = useState("");
  const [discount] = useState(1000000);

  const originalPrice = 2000000;
  const finalPrice = originalPrice - discount;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-up", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout-page-wrapper" ref={containerRef}>
      {/* HEADER SECTION */}
      <header className="checkout-modern-header animate-up">
        {/* Dòng thông báo ưu đãi thanh mảnh */}
        <div className="promo-announcement">
          <FaRegClock className="clock-icon-mini" />
          <span>Ưu đãi đặc biệt sẽ kết thúc sau <strong>23:59</strong> hôm nay</span>
        </div>

        <div className="header-content">
          <h1 className="main-title-refined">Hoàn tất đặt lịch</h1>
          <div className="title-divider"></div>
          <p className="main-subtitle-refined">
            Hành trình chữa lành của bạn bắt đầu từ những quyết định nhỏ nhất
          </p>
        </div>
      </header>

      <div className="checkout-grid-container">
        {/* LEFT: FORMS */}
        <div className="main-form-flow">

          {/* STEP 1: PERSONAL INFO */}
          <div className="form-card animate-up">
            <div className="card-header">
              <span className="step-badge">1</span>
              <h2>Thông tin của bạn</h2>
            </div>
            <div className="input-rows">
              <div className="input-field full">
                <label>Họ và tên *</label>
                <input
                  type="text" name="fullName" placeholder="Nguyễn Văn A"
                  value={formData.fullName} onChange={handleInputChange}
                />
              </div>
              <div className="input-group-half">
                <div className="input-field">
                  <label>Email *</label>
                  <input
                    type="email" name="email" placeholder="email@example.com"
                    value={formData.email} onChange={handleInputChange}
                  />
                </div>
                <div className="input-field">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel" name="phone" placeholder="0901 234 567"
                    value={formData.phone} onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className="form-card animate-up" style={{ borderTopColor: '#74c655' }}>
            <div className="card-header">
              <span className="step-badge secondary">2</span>
              <h2>Chọn phương thức thanh toán</h2>
            </div>
            <div className="payment-selection-grid">
              {[
                { id: 'card', icon: <FaRegCreditCard />, label: 'Thẻ tín dụng', desc: 'Visa, Mastercard' },
                { id: 'momo', icon: <MomoIcon />, label: 'Ví MoMo', desc: 'Thanh toán nhanh' },
                { id: 'bank', icon: <FaUniversity />, label: 'Chuyển khoản', desc: 'Qua ngân hàng' },
                { id: 'wallet', icon: <FaWallet />, label: 'Ví điện tử khác', desc: 'ZaloPay, VNPay' }
              ].map((method) => (
                <div
                  key={method.id}
                  className={`payment-method-item ${formData.paymentMethod === method.id ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, paymentMethod: method.id})}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <span className="method-label">{method.label}</span>
                    <span className="method-desc">{method.desc}</span>
                  </div>
                  {formData.paymentMethod === method.id && <FaCheckCircle className="checked-icon" />}
                </div>
              ))}
            </div>
          </div>
        </div>

       <aside className="summary-sidebar animate-up">
         <div className="summary-sticky-card">
           <h3 className="summary-title">Tóm tắt đơn hàng</h3>

           {/* Thông tin dịch vụ gộp gọn */}
           <div className="service-minimal">
             <div className="service-name-row">
               <h4>Mind Connect Premium</h4>
               <span className="base-price">{originalPrice.toLocaleString()}đ</span>
             </div>
             <p className="service-sub">Tham vấn chuyên gia 1:1</p>
           </div>

           {/* Voucher thiết kế thanh mảnh hơn */}
           {/* Voucher thiết kế tối giản */}
           <div className="voucher-minimal">
             <input
               type="text"
               placeholder="Mã giảm giá"
               value={voucher}
               onChange={(e) => setVoucher(e.target.value.toUpperCase())}
             />
             <button className="apply-link">Áp dụng</button>
           </div>



           {/* Phần tính toán chỉ giữ lại những gì quan trọng nhất */}
           <div className="price-calc-minimal">
             {discount > 0 && (
               <div className="calc-row discount">
                 <span>Giảm giá</span>
                 <span>-{discount.toLocaleString()}đ</span>
               </div>
             )}

             <div className="total-row-minimal">
               <span className="total-label">Tổng cộng</span>
               <span className="total-price-large">{finalPrice.toLocaleString()} <small>VNĐ</small></span>
             </div>
           </div>

           <button className="pay-now-btn-premium">XÁC NHẬN THANH TOÁN</button>

           <div className="security-minimal">
             <FaShieldAlt /> <span>Thanh toán bảo mật SSL 256-bit</span>
           </div>
         </div>

         {/* Trust Badges - Thu nhỏ lại và dùng chung 1 dòng */}
         <div className="trust-row-minimal">
           <div className="trust-item"><FaLock /> <span>An toàn</span></div>
           <div className="trust-item"><FaBolt /> <span>Nhanh chóng</span></div>
           <div className="trust-item"><FaHandHoldingHeart /> <span>Tin cậy</span></div>
         </div>
       </aside>
      </div>
    </div>
  );
};

export default Checkout;