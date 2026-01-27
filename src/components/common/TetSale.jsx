import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/TetSale.css";
// Import lại các component cũ của bạn
import { FaGift, FaLongArrowAltRight } from "react-icons/fa";
import { GiLantern, GiSparkles } from "react-icons/gi";

const TetSale = () => {
  // --- STATE & REFS CHO TIMER (GIỮ NGUYÊN CODE CŨ) ---
  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
      // ... (Logic timer cũ của bạn ở đây) ...
      const targetDate = new Date("January 29, 2026 00:00:00").getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) { clearInterval(interval); } else {
          setTimeLeft({
            d: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            h: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
            m: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
            s: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
          });
        }
      }, 1000);
      return () => clearInterval(interval);
  }, []);
  // --------------------------------------------------


  // --- REFS CHO GSAP CURTAIN ---
  const mainContainerRef = useRef(null);
  const curtainOverlayRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const ropeRef = useRef(null);
  const contentRef = useRef(null); // Ref cho nội dung bên dưới

  // Hiệu ứng sợi dây đung đưa mời gọi
  useEffect(() => {
      if (!ropeRef.current) return;
      gsap.to(ropeRef.current.querySelector('.rope-handle'), {
          y: 10,
          rotation: 5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
      });
  }, []);


  // --- HÀM XỬ LÝ KÉO RÈM (GSAP MAGIC) ---
  const handlePullCurtain = () => {
    const tl = gsap.timeline({
        onComplete: () => {
            // Quan trọng: Ẩn lớp phủ đi để người dùng click được nội dung bên dưới
             gsap.set(curtainOverlayRef.current, { display: 'none' });
             // Trả lại chiều cao tự động cho container
             gsap.set(mainContainerRef.current, { height: 'auto', overflow: 'visible' });
        }
    });

    // 1. Giật dây lên trên
    tl.to(ropeRef.current, {
        y: -600,
        opacity: 0,
        duration: 0.8,
        ease: "back.in(1.7)", // Hiệu ứng giật mạnh
    });

    // 2. Mở rèm sang 2 bên (Chạy cùng lúc)
    tl.to(leftPanelRef.current, {
        xPercent: -100, // Kéo hết sang trái
        duration: 2,
        ease: "power4.inOut" // Chuyển động chậm dần rất sang
    }, "-=0.5"); // Bắt đầu sớm hơn một chút khi dây đang kéo lên

    tl.to(rightPanelRef.current, {
        xPercent: 100, // Kéo hết sang phải
        duration: 2,
        ease: "power4.inOut"
    }, "<"); // Dấu "<" nghĩa là bắt đầu cùng lúc với animation trước đó

    // 3. Zoom nhẹ nội dung bên dưới lên (Tùy chọn)
    tl.fromTo(contentRef.current,
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1.8"
    );
  };


  return (
    // Container chính, ban đầu cần fixed height để chứa rèm
    <div className="tet-curtain-wrapper" ref={mainContainerRef}>

      {/* --- LỚP RÈM CHE PHỦ (OVERLAY) --- */}
      <div className="curtain-overlay" ref={curtainOverlayRef}>
          {/* Rèm trái */}
          <div className="curtain-panel left" ref={leftPanelRef}>
              <div className="curtain-fold"></div>
          </div>
          {/* Rèm phải */}
          <div className="curtain-panel right" ref={rightPanelRef}>
              <div className="curtain-fold"></div>
          </div>

          {/* Sợi dây kéo */}
          <div className="rope-container" ref={ropeRef} onClick={handlePullCurtain}>
              <div className="rope-line"></div>
              <div className="rope-handle">
                  <GiSparkles /> KÉO KHAI LỘC
              </div>
          </div>
      </div>


      {/* --- NỘI DUNG CHÍNH (BỊ CHE) --- */}
      <div className="tet-content-revealed" ref={contentRef}>
          {/* COPY LẠI TOÀN BỘ NỘI DUNG GIAO DIỆN CŨ CỦA BẠN VÀO ĐÂY */}
          <div className="tet-container-premium">
            {/* ... (Dán code JSX cũ từ <div className="decor-lantern left">... đến hết) ... */}

            {/* VÍ DỤ (Tôi dán tóm tắt để bạn dễ hình dung vị trí): */}
            <main className="tet-main-layout" style={{padding: '50px', textAlign:'center', color: 'black'}}>
               <div className="tet-container-premium">
                     {/* BACKGROUND DECOR */}
                     <div className="decor-lantern left"><GiLantern /></div>
                     <div className="decor-lantern right"><GiLantern /></div>

                     <div className="tet-content-wrapper">
                       <header className="tet-header">
                         <span className="sub-title">SPECIAL LUNAR NEW YEAR 2026</span>
                         <h1 className="main-title">XUÂN BÍNH NGỌ • CHỮA LÀNH TÂM THỨC</h1>
                         <div className="gold-line"></div>
                       </header>

                       <main className="tet-main-layout">
                         {/* VOUCHER SECTION */}
                         <div className="premium-coupon">
                           <div className="coupon-info">
                             <div className="badge">GIFT VOUCHER</div>
                             <h2>GIẢM TRỰC TIẾP 50%</h2>
                             <p>Dành cho tất cả các gói tư vấn tâm lý và trị liệu chuyên sâu trong dịp Tết Nguyên Đán.</p>
                             <button className="btn-premium">
                               NHẬN LỘC XUÂN <FaLongArrowAltRight />
                             </button>
                           </div>
                           <div className="coupon-visual">
                             <div className="visual-inner">
                               <FaGift className="floating-icon" />
                               <span className="percent">50</span>
                               <span className="unit">%</span>
                             </div>
                           </div>
                         </div>

                         {/* TIMER SECTION */}
                         <div className="premium-timer">
                           <p className="timer-label">ƯU ĐÃI KẾT THÚC SAU:</p>
                           <div className="timer-grid">
                             <div className="timer-unit">
                               <div className="unit-box"><span>{timeLeft.d}</span></div>
                               <p>NGÀY</p>
                             </div>
                             <div className="timer-unit">
                               <div className="unit-box"><span>{timeLeft.h}</span></div>
                               <p>GIỜ</p>
                             </div>
                             <div className="timer-unit">
                               <div className="unit-box"><span>{timeLeft.m}</span></div>
                               <p>PHÚT</p>
                             </div>
                             <div className="timer-unit">
                               <div className="unit-box"><span>{timeLeft.s}</span></div>
                               <p>GIÂY</p>
                             </div>
                           </div>
                         </div>
                       </main>
                     </div>
                   </div>
            </main>


          </div>
      </div>

    </div>
  );
};

export default TetSale;
