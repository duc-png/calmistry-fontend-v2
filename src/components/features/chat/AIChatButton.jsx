import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import aiChatService from "../../../services/aiChatService";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimation();
  const location = useLocation();
  const chatBodyRef = useRef(null);

  // --- CẤU HÌNH KHOẢNG CÁCH ---
  const paddingX = 57;
  const paddingTop = 60;
  const paddingBottom = 42;
  const iconSize = 60;
  const journalFabSize = 65;
  const gapBetweenButtons = 15;
  const brandLightGreen = "#8ec339";

  // --- CHAT HISTORY STATE ---
  const [chatHistory, setChatHistory] = useState([]);

  // Load chat history when opening
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      loadChatHistory();
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const data = await aiChatService.getChatHistory(0, 50);

      // Convert to chat format
      const messages = [];
      data.messages.reverse().forEach(msg => {
        messages.push({ role: "user", text: msg.userMessage });
        messages.push({ role: "ai", text: msg.aiResponse });
      });

      // Add welcome message if no history
      if (messages.length === 0) {
        messages.push({ role: "ai", text: "Xin chào! Tôi là Calmistry AI. Tôi có thể giúp gì cho bạn hôm nay?" });
      }

      setChatHistory(messages);
    } catch (e) {
      console.error('Error loading chat history:', e);
      setChatHistory([{ role: "ai", text: "Xin chào! Tôi là Calmistry AI. Tôi có thể giúp gì cho bạn hôm nay?" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage = message;
    setMessage("");

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }]);

    // Show typing indicator
    setIsTyping(true);
    setError("");

    try {
      // Call AI API
      const response = await aiChatService.sendMessage(userMessage);

      // Add AI response to chat
      setChatHistory(prev => [...prev, { role: "ai", text: response.aiResponse }]);
    } catch (e) {
      console.error('Error sending message:', e);
      setError('Không thể gửi tin nhắn. Vui lòng thử lại.');
      setChatHistory(prev => [...prev, { role: "ai", text: "Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- LOGIC VỊ TRÍ ---
  const calculateY = (isRightSide, path) => {
    const isJournal = path.includes('/journal');
    if (isRightSide && isJournal) {
      return window.innerHeight - paddingBottom - journalFabSize - gapBetweenButtons - iconSize;
    }
    return window.innerHeight - iconSize - paddingBottom;
  };

  const [position, setPosition] = useState(() => {
    const initX = window.innerWidth - iconSize - paddingX;
    return { x: initX, y: calculateY(true, window.location.pathname) };
  });

  useEffect(() => {
    const isRightSide = position.x > window.innerWidth / 2;
    const isBottomSide = position.y > window.innerHeight / 2;

    if (isBottomSide) {
      const newY = calculateY(isRightSide, location.pathname);
      setPosition(prev => ({ ...prev, y: newY }));
      controls.start({
        y: newY,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
    }
  }, [location.pathname, controls]);

  const handleDragEnd = (event, info) => {
    const { x, y } = info.point;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    const isRightSide = x >= midX;
    const targetX = isRightSide ? window.innerWidth - iconSize - paddingX : paddingX;
    let targetY = y < midY ? paddingTop : calculateY(isRightSide, location.pathname);

    setPosition({ x: targetX, y: targetY });
    controls.start({
      x: targetX, y: targetY,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    });
  };

  return (
    <div style={fixedContainer}>
      {/* 1. CỬA SỔ CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              ...chatWindow,
              left: position.x > window.innerWidth / 2 ? position.x - 270 : position.x,
              top: position.y > window.innerHeight / 2 ? position.y - 470 : position.y + 75,
            }}
          >
            {/* Header */}
            <div style={{ ...chatHeader, backgroundColor: brandLightGreen }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={avatarCircle}><i className="bi bi-robot"></i></div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "14px" }}>Calmistry AI</div>
                  <div style={{ fontSize: "10px", opacity: 0.8 }}>Đang trực tuyến</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={closeBtn}><i className="bi bi-x-lg"></i></button>
            </div>

            {/* Body */}
            <div ref={chatBodyRef} style={chatBody}>
              {loading && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  Đang tải lịch sử...
                </div>
              )}

              {!loading && chatHistory.map((msg, index) => (
                <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", marginBottom: "15px" }}>
                  <div style={{
                    ...messageBubble,
                    backgroundColor: msg.role === "user" ? brandLightGreen : "#f0f4f0",
                    color: msg.role === "user" ? "#fff" : "#333",
                    borderRadius: msg.role === "user" ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ textAlign: "left", marginBottom: "15px" }}>
                  <div style={{
                    ...messageBubble,
                    backgroundColor: "#f0f4f0",
                    color: "#333",
                    borderRadius: "18px 18px 18px 2px",
                  }}>
                    <span className="typing-dots">●●●</span>
                  </div>
                </div>
              )}

              {error && (
                <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '8px', fontSize: '12px', color: '#856404', marginBottom: '10px' }}>
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={chatFooter}>
              <input
                style={chatInput}
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !message.trim()}
                style={{
                  ...sendBtn,
                  backgroundColor: (isTyping || !message.trim()) ? '#ccc' : brandLightGreen,
                  cursor: (isTyping || !message.trim()) ? 'not-allowed' : 'pointer'
                }}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NÚT FAB VÀ HIỆU ỨNG PULSE */}
      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: position.x, y: position.y }}
        style={fabWrapper}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      >
        {/* Vùng loang quanh (Pulse Effect) */}
        {!isOpen && (
          <motion.div
            style={{ ...pulse, backgroundColor: brandLightGreen }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            ...fabButton,
            backgroundColor: isOpen ? "#ffffff" : brandLightGreen,
            color: isOpen ? brandLightGreen : "#ffffff",
            border: isOpen ? `2px solid ${brandLightGreen}` : "none",
          }}
        >
          <i className={isOpen ? "bi bi-chevron-down" : "bi bi-chat-dots-fill"} style={{ fontSize: "24px" }}></i>
        </button>
      </motion.div>
    </div>
  );
}

// --- STYLES ĐẦY ĐỦ ---
const fixedContainer = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10000 };
const fabWrapper = { position: "absolute", width: "60px", height: "60px", pointerEvents: "auto" };
const fabButton = { width: "60px", height: "60px", borderRadius: "50%", boxShadow: "0 8px 25px rgba(142, 195, 57, 0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 };
const pulse = { position: "absolute", width: "60px", height: "60px", borderRadius: "50%", zIndex: 1, top: 0, left: 0 };
const chatWindow = { position: "absolute", width: "320px", height: "450px", backgroundColor: "#fff", borderRadius: "24px", boxShadow: "0 15px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", overflow: "hidden", pointerEvents: "auto", border: "1px solid #eef2ef" };
const chatHeader = { padding: "15px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" };
const avatarCircle = { width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" };
const closeBtn = { border: "none", background: "none", color: "#fff", cursor: "pointer", fontSize: "18px" };
const chatBody = { flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#f9fbf9" };
const messageBubble = { padding: "10px 15px", fontSize: "13px", lineHeight: "1.5", display: "inline-block", fontWeight: "500", maxWidth: "80%" };
const chatFooter = { padding: "15px", borderTop: "1px solid #f0f3f0", display: "flex", gap: "10px", backgroundColor: "#fff" };
const chatInput = { flex: 1, border: "1px solid #eef2ef", borderRadius: "12px", padding: "8px 15px", fontSize: "13px", outline: "none", backgroundColor: "#f4f7f5" };
const sendBtn = { width: "38px", height: "38px", borderRadius: "10px", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };