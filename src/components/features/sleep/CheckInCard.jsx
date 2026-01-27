import React from "react";
import { motion } from "framer-motion";

export default function CheckInCard({ onStart }) {
  const brandGreen = "#3a5a40";
  const lightGreen = "#8ec339";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={cardWrapper}
    >
      {/* Icon Section */}
      <div style={iconContainer}>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Đổi sang icon bi-brightness-high-fill cho sáng rõ hơn */}
          <i className="bi bi-brightness-high-fill" style={iconStyle}></i>
        </motion.div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={titleStyle}>Chào buổi sáng!</h3>
        <p style={subtitleStyle}>
          Dành 1 phút để "lắng nghe" giấc ngủ của bạn tối qua và nhận lời khuyên cải thiện.
        </p>
      </div>

      <div style={badgeContainer}>
        <div style={badgeItem}>
          <i className="bi bi-clock-history me-2"></i> 45 giây
        </div>
        <div style={badgeItem}>
          <i className="bi bi-stars me-2"></i> Khoa học
        </div>
      </div>

      <button
        style={customBtn}
        onClick={onStart}
        onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
      >
        Bắt đầu đánh giá
        <i className="bi bi-arrow-right-short ms-2" style={{ fontSize: "24px" }}></i>
      </button>

      <p style={footerText}>Chưa đăng nhập • Dữ liệu hôm nay sẽ được hiển thị</p>
    </motion.div>
  );
}

// --- STYLES ---
const cardWrapper = {
  // QUAN TRỌNG: Phải có font-family ở đây
  fontFamily: "'Be Vietnam Pro', sans-serif",
  background: "#ffffff",
  borderRadius: "32px",
  padding: "45px 30px",
  textAlign: "center",
  boxShadow: "0 20px 50px rgba(58, 90, 64, 0.08)",
  border: "1px solid rgba(240, 243, 240, 0.8)",
  position: "relative",
  overflow: "hidden"
};

const iconContainer = {
  width: "80px",
  height: "80px",
  background: "rgba(142, 195, 57, 0.12)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 25px",
};

const iconStyle = {
  fontSize: "40px", // Tăng kích thước icon
  color: "#8ec339",
  display: "inline-block", // Đổi thành inline-block để căn giữa tốt hơn
  lineHeight: "1"
};

const titleStyle = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  color: "#3a5a40",
  fontWeight: "800",
  fontSize: "26px",
  marginBottom: "12px",
  letterSpacing: "-0.5px"
};

const subtitleStyle = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  color: "#718096",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  fontWeight: "500"
};

const badgeContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "35px"
};

const badgeItem = {
  backgroundColor: "#f4f7f5",
  padding: "8px 16px",
  borderRadius: "100px",
  fontSize: "12px",
  fontWeight: "700",
  color: "#3a5a40",
  display: "flex",
  alignItems: "center"
};

const customBtn = {
  fontFamily: "'Be Vietnam Pro', sans-serif",
  width: "100%",
  backgroundColor: "#3a5a40",
  color: "#ffffff",
  border: "none",
  padding: "18px 20px",
  borderRadius: "20px",
  fontWeight: "700",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(58, 90, 64, 0.2)"
};

const footerText = {
  fontSize: "11px",
  color: "#a0aec0",
  marginTop: "20px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontWeight: "700"
};