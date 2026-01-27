import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sleepService from "../../../services/sleepService";

export default function SleepDashboard({ isLoggedIn = true }) {
  const [mode, setMode] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [historyData, setHistoryData] = useState(null);

  // Màu sắc thương hiệu
  const brandGreen = "#3a5a40";
  const lightGreen = "#8ec339";

  // Fetch sleep history on component mount
  useEffect(() => {
    fetchSleepHistory();
  }, []);

  const fetchSleepHistory = async () => {
    try {
      setLoading(true);
      const result = await sleepService.getSleepHistory(0, 30);
      setHistoryData(result);
    } catch (e) {
      console.error("Error fetching sleep history:", e);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Process data for display based on mode
  const getDisplayData = () => {
    if (!historyData || !historyData.sessions || historyData.sessions.length === 0) {
      return { data: [], labels: [] };
    }

    const sessions = historyData.sessions;

    if (mode === "day") {
      // Show only latest session
      return {
        data: sessions.length > 0 ? [sessions[0].finalScore100] : [],
        labels: ["Hôm nay"]
      };
    } else if (mode === "week") {
      // Show last 7 sessions
      const weekSessions = sessions.slice(0, 7).reverse();
      return {
        data: weekSessions.map(s => s.finalScore100),
        labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].slice(0, weekSessions.length)
      };
    } else {
      // Show last 30 sessions
      const monthSessions = sessions.slice(0, 30).reverse();
      return {
        data: monthSessions.map(s => s.finalScore100),
        labels: monthSessions.map((_, i) => i + 1)
      };
    }
  };

  const { data, labels } = getDisplayData();

  return (
    <div style={dashboardWrapper}>
      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '14px', color: '#718096' }}>Đang tải dữ liệu...</div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={{
          padding: '20px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '12px',
          color: '#856404',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && (!historyData || historyData.sessions.length === 0) && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#fff',
          borderRadius: '24px'
        }}>
          <i className="bi bi-moon-stars" style={{ fontSize: '48px', color: brandGreen, marginBottom: '16px' }}></i>
          <h5 style={{ color: brandGreen, marginBottom: '8px' }}>Chưa có dữ liệu</h5>
          <p style={{ color: '#718096', fontSize: '14px' }}>Hãy hoàn thành bài quiz đầu tiên để xem thống kê!</p>
        </div>
      )}

      {/* Main Dashboard Content */}
      {!loading && !error && historyData && historyData.sessions.length > 0 && (
        <>
          {/* 1. SEGMENTED CONTROL (Chuyển đổi Tab Ngày/Tuần/Tháng) */}
          <div style={segmentedControl}>
            {["day", "week", "month"].map((v) => (
              <button
                key={v}
                onClick={() => setMode(v)}
                style={{
                  ...tabBtn,
                  backgroundColor: mode === v ? "#ffffff" : "transparent",
                  color: mode === v ? brandGreen : "#718096",
                  boxShadow: mode === v ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {v === "day" ? "Ngày" : v === "week" ? "Tuần" : "Tháng"}
              </button>
            ))}
          </div>

          {/* 2. MAIN CHART CARD (Biểu đồ chính) */}
          <div style={chartCard}>
            <div style={cardHeader}>
              <h6 style={cardTitle}>
                <i className="bi bi-graph-up-arrow me-2"></i> Chỉ số giấc ngủ
              </h6>
              <span style={avgScore}>Trung bình: {Math.round(historyData.averageScore || 0)}</span>
            </div>

            <div style={chartContainer}>
              <div style={chartContent}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={barWrapper}
                  >
                    {data.map((v, i) => (
                      <div key={i} style={barColumn}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${v}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          style={{
                            ...barFill,
                            backgroundColor: v >= 80 ? lightGreen : v >= 60 ? "#f59e0b" : "#ef4444",
                          }}
                        />
                        {mode === "week" && labels[i] && <span style={barLabel}>{labels[i]}</span>}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* OVERLAY KHI CHƯA ĐĂNG NHẬP (Chỉ hiển thị khi xem Tuần/Tháng mà chưa login) */}
              {!isLoggedIn && (mode === "week" || mode === "month") && (
                <div style={lockedOverlay}>
                  <div style={lockCircle}>
                    <i className="bi bi-lock-fill"></i>
                  </div>
                  <p style={lockText}>Đăng nhập để xem xu hướng dài hạn</p>
                  <button style={loginMiniBtn}>Đăng nhập</button>
                </div>
              )}
            </div>
          </div>

          {/* 3. INSIGHT CARD (Thông tin phân tích nhanh) */}
          <div style={insightCard}>
            <div style={iconBox}><i className="bi bi-lightbulb"></i></div>
            <div style={{ flex: 1 }}>
              <h6 style={insightTitle}>Phát hiện xu hướng</h6>
              <p style={insightDesc}>
                Bạn thường ngủ tốt hơn <b>15%</b> vào những ngày có tập thể dục trên 30 phút.
              </p>
            </div>
          </div>

          {/* 4. RECOMMENDATION LIST (Gợi ý hành động) */}
          <h6 style={sectionTitle}>Lời khuyên cho bạn</h6>
          <div style={recommendationRow}>
            <div style={recItem}>
              <i className="bi bi-cup-hot mb-2" style={{ color: '#f59e0b' }}></i>
              <span>Bớt Caffeine</span>
            </div>
            <div style={recItem}>
              <i className="bi bi-phone-vibrate mb-2" style={{ color: brandGreen }}></i>
              <span>Tắt máy sớm</span>
            </div>
            <div style={recItem}>
              <i className="bi bi-wind mb-2" style={{ color: '#4a90e2' }}></i>
              <span>Thở đều</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- HỆ THỐNG STYLES (Đảm bảo copy đầy đủ phần này) ---
const dashboardWrapper = { display: "flex", flexDirection: "column", gap: "20px" };

const segmentedControl = {
  display: "flex", backgroundColor: "#e2e8f0", padding: "4px",
  borderRadius: "14px", marginBottom: "10px"
};

const tabBtn = {
  flex: 1, border: "none", padding: "8px", borderRadius: "10px",
  fontSize: "13px", fontWeight: "700", transition: "all 0.3s ease", cursor: "pointer"
};

const chartCard = {
  backgroundColor: "#fff", borderRadius: "28px", padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.03)", position: "relative", overflow: "hidden"
};

const cardHeader = { display: "flex", justifyContent: "space-between", marginBottom: "25px" };
const cardTitle = { fontSize: "15px", fontWeight: "700", color: "#3a5a40", margin: 0 };
const avgScore = { fontSize: "12px", color: "#8ec339", fontWeight: "800", backgroundColor: "#f0f7f2", padding: "4px 10px", borderRadius: "20px" };

const chartContainer = { position: "relative", height: "180px", marginTop: "10px" };
const chartContent = { height: "100%", display: "flex", alignItems: "flex-end" };
const barWrapper = { display: "flex", alignItems: "flex-end", gap: "8px", width: "100%", height: "100%" };
const barColumn = { flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: "8px" };
const barFill = { width: "100%", borderRadius: "6px 6px 4px 4px", minHeight: "5px" };
const barLabel = { fontSize: "10px", color: "#a0aec0", fontWeight: "600" };

const lockedOverlay = {
  position: "absolute", top: -10, left: -10, right: -10, bottom: -10,
  backdropFilter: "blur(6px)", backgroundColor: "rgba(255,255,255,0.4)",
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5
};

const lockCircle = { width: "40px", height: "40px", backgroundColor: "#3a5a40", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" };
const lockText = { fontSize: "12px", fontWeight: "700", color: "#3a5a40", marginBottom: "12px", textAlign: "center", padding: "0 20px" };
const loginMiniBtn = { padding: "6px 16px", backgroundColor: "#fff", border: "1.5px solid #3a5a40", borderRadius: "10px", fontSize: "12px", fontWeight: "700", color: "#3a5a40", cursor: "pointer" };

const insightCard = { display: "flex", gap: "15px", backgroundColor: "#3a5a40", padding: "20px", borderRadius: "24px", color: "#fff", alignItems: "center" };
const iconBox = { width: "45px", height: "45px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" };
const insightTitle = { fontSize: "14px", fontWeight: "700", marginBottom: "4px", margin: 0 };
const insightDesc = { fontSize: "12px", opacity: 0.9, margin: 0, lineHeight: "1.5" };

const sectionTitle = { fontSize: "16px", fontWeight: "800", color: "#3a5a40", marginTop: "10px", marginBottom: "5px" };
const recommendationRow = { display: "flex", gap: "12px" };
const recItem = { flex: 1, backgroundColor: "#fff", padding: "15px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", fontSize: "11px", fontWeight: "700", color: "#4a5568", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" };
