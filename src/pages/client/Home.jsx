import React, { useState } from 'react';
import moodTracker from "../../assets/moodTracker.jpg";
import moodTracker1 from "../../assets/moodTracker1.jpg";

import blogImg from "../../assets/blogImg.jpg";
import blogImg1 from "../../assets/blogImg1.jpg";

import aiChatBot from "../../assets/aiChatBot.jpg";
import aiChatBot1 from "../../assets/aiChatBot1.jpg";

import { motion } from 'framer-motion';

import {
  Book, PencilSquare, EmojiExpressionless,
  People, ChatDots, Stars,
  Robot, HeartPulse, Telephone, Check2Circle // Thêm icon này để đánh dấu tính năng trong gói

} from 'react-bootstrap-icons';

import TetSale from "../../components/common/TetSale";

import { useNavigate } from "react-router-dom";

import CountingNumber from "../../components/ui/CountingNumber";
import FadeInUp from "../../components/ui/FadeInUp";
import TherapyCard from "../../components/common/TherapyCard";
import WaveDivider from "../../components/common/WaveDivider";
import StatsSection from "../../components/common/StatsSection";
import "../../styles/Home.css";

const Home = () => {
  const brandGreen = '#324d3e';
  const statsBg = '#fcf7f0';
  const navigate = useNavigate();

  // State quản lý thẻ đang mở
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const therapyTypes = [
    {
      title: "Healing Activities",
      desc: "Let's do something",
      bgColor: "#325343",
      textColor: "#e0f2f1",
      img: moodTracker,
      activeImg: moodTracker1, // Link ảnh khi hover/active
      subOptions: [
        { title: "Read Articles", icon: <Book />, action: () => navigate("/blog") },
        { title: "Write Journal", icon: <PencilSquare />, action: () => navigate("/journal") },
        { title: "Sleep Quality", icon: <EmojiExpressionless />, action: () => navigate("/sleepManagement") }
      ]
    },
    {
      title: "Healing Community",
      desc: "Join and looking for partner",
      bgColor: "#83a6ad",
      textColor: "#1a2e35",
      img: blogImg,
      activeImg: blogImg1, // Link ảnh khi hover/active
      subOptions: [
        { title: "Find a partner", icon: <People /> },
        { title: "Group chat", icon: <ChatDots />, action: () => navigate("/group-chat") },
        { title: "Share stories", icon: <Stars />, action: () => navigate("/shareStories") }
      ]
    },
    {
      title: <>Mind Connect</>,
      desc: "Someone waiting for you",
      bgColor: "#bb722b",
      textColor: "#ffffff",
      img: aiChatBot,
      activeImg: aiChatBot1, // Link ảnh khi hover/active
      subOptions: [
        { title: "AI Assistant", icon: <Robot /> },
        { title: "Book a Workshop offline", icon: <HeartPulse /> },
        { title: "Quick call", icon: <Telephone /> }
      ]
    }
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div style={{ backgroundColor: brandGreen, overflowX: 'hidden' }}>
        {/* 1. SECTION CARDS */}
        <section className="container py-5 text-white" style={{ position: 'relative', zIndex: 1 }}>
          <header className="text-center mb-5 pt-4">
            <h1 className="display-3 fw-normal mb-3" style={{ letterSpacing: '-1px' }}>You deserve to be happy.</h1>
            <p className="fs-4 opacity-75">What type of therapy are you looking for?</p>
          </header>

          <div className="row g-4 justify-content-center mt-2">
            {therapyTypes.map((item, index) => (
              <TherapyCard
                key={index}
                item={item}
                index={index}
                expandedIndex={expandedIndex}
                hoveredIndex={hoveredIndex}
                onToggle={handleToggle}
                onMouseEnter={setHoveredIndex}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </section>

        <WaveDivider fillColor="#74c655" statsBg={statsBg} />

        <StatsSection
          stats={[
            { val: 458415597, label: "Messages, chat, audio, video sessions" },
            { val: 32188, label: "Qualified therapists ready to help" },
            { val: 6150865, label: "People got help" }
          ]}
          statsBg={statsBg}
          brandGreen={brandGreen}
        />

        <div style={{ backgroundColor: '#fcf7f0', lineHeight: 0, width: '100%' }}>
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '80px', display: 'block' }}
          >
            {/* Vẽ một đường cong nhẹ với màu của Section bên dưới (#fefaf6) */}
            <path
              d="M0,0 Q720,100 1440,0 L1440,100 L0,100 Z"
              fill="#fefaf6"
            />
          </svg>
        </div>
        {/* 4. SECTION: THERAPIST GRID (Giao diện ảnh bác sĩ) */}
        <section style={{ backgroundColor: '#fefaf6', padding: '80px 0' }}>
          <div className="container">
            <div className="row align-items-center">

              {/* CỘT TRÁI: NỘI DUNG TEXT */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <FadeInUp>
                  <div className="pe-lg-5">
                    <h2 className="display-4 fw-normal mb-4" style={{ color: '#324d3e', lineHeight: '1.1' }}>
                      Professional and qualified therapists who you can trust
                    </h2>
                    <p className="fs-5 mb-5" style={{ color: '#4a5e54', lineHeight: '1.6' }}>
                      Tap into the world's largest network of qualified and experienced therapists
                      who can help you with a range of issues including depression, anxiety, relationships,
                      trauma, grief, and more. With our therapists, you get the same professionalism and
                      quality you would expect from an in-office therapist, but with the ability to
                      communicate when and how you want.
                    </p>
                    <button className="btn-get-matched">
                      Get matched to a therapist
                    </button>
                  </div>
                </FadeInUp>
              </div>

              {/* CỘT PHẢI: CỤM ẢNH BÁC SĨ (ORGANIC SHAPES) */}
              <div className="col-lg-6">
                <div className="therapist-image-grid">
                  {/* Ảnh chính giữa */}
                  <div className="img-wrapper main-img shadow-sm">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Therapist" />
                    {/* Icon tia sáng vẽ tay */}
                    <div className="accent-sparkle"></div>
                  </div>

                  {/* Các ảnh nhỏ xung quanh */}
                  <div className="img-wrapper sub-img top-left shadow-sm">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200" alt="Therapist" />
                  </div>
                  <div className="img-wrapper sub-img top-right shadow-sm">
                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" alt="Therapist" />
                  </div>
                  <div className="img-wrapper sub-img bottom-left shadow-sm">
                    <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200" alt="Therapist" />
                  </div>
                  <div className="img-wrapper sub-img bottom-center shadow-sm">
                    <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200" alt="Therapist" />
                  </div>
                  <div className="img-wrapper sub-img bottom-right shadow-sm">
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" alt="Therapist" />
                    {/* Icon lò xo vẽ tay */}
                    <div className="accent-swirl"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 5. SECTION: HOW IT WORKS (UNIFIED FLOW) */}
        <section style={{ backgroundColor: '#ffffff', padding: '100px 0', position: 'relative' }}>
          {/* Đường kẻ trang trí góc trên */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '8px', backgroundColor: '#74c655', borderRadius: '0 0 0 10px' }}></div>

          <div className="container">
            {/* Tiêu đề chính của khối */}
            <div className="text-center mb-5">
              <FadeInUp>
                <h2 className="display-6 fw-normal" style={{ color: '#2d4337' }}>How it works</h2>
              </FadeInUp>
            </div>

            {/* BƯỚC 1: GET MATCHED */}
            <div className="row align-items-center how-it-works-step">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="step-collage collage-1">
                  <div className="shape-semi-orange-top"></div>
                  <div className="img-box woman-box shadow-sm"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300" alt="User" /></div>
                  <div className="img-box doctor-box shadow-sm"><img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?w=300" alt="Doctor" /></div>
                  <div className="illustration-puzzle-box shadow-sm">🧩</div>
                  <div className="shape-dot-green"></div>
                </div>
              </div>
              <div className="col-lg-6 ps-lg-5">
                <FadeInUp>
                  <h3 className="h3 mb-3" style={{ color: '#324d3e' }}>Get matched to the best therapist for you</h3>
                  <p className="text-muted fs-5">Answer a few questions to find a qualified therapist who fits your needs and preferences. Tap into the largest online network.</p>
                </FadeInUp>
              </div>
            </div>

            {/* MŨI TÊN KẾT NỐI 1-2 */}
            <div className="step-connector">
              <div className="bouncing-arrow">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 13l5 5 5-5M12 18V6" />
                </svg>
              </div>
            </div>

            {/* BƯỚC 2: COMMUNICATE */}
            <div className="row align-items-center how-it-works-step">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="step-collage collage-2">
                  <div className="shape-half-yellow"></div>
                  <div className="img-box man-tablet-box shadow-sm"><img src="https://images.unsplash.com/photo-1552581234-26160f608093?w=400" alt="Session" /></div>
                  <div className="laptop-overlay shadow-sm">💻</div>
                  <div className="img-box portrait-box shadow-sm"><img src="https://images.unsplash.com/photo-1548142813-c348350df52b?w=200" alt="Therapist" /></div>
                  <div className="shape-square-teal"></div>
                </div>
              </div>
              <div className="col-lg-6 ps-lg-5">
                <FadeInUp>
                  <h3 className="h3 mb-3" style={{ color: '#324d3e' }}>Communicate your way</h3>
                  <p className="text-muted fs-5">Talk to your therapist however you feel comfortable — text, chat, audio, or video. Professionalism as an in-office therapist.</p>
                </FadeInUp>
              </div>
            </div>

            {/* MŨI TÊN KẾT NỐI 2-3 */}

            <div className="step-connector">
              <div className="bouncing-arrow">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 13l5 5 5-5M12 18V6" />
                </svg>
              </div>
            </div>

            {/* BƯỚC 3: WHEN YOU NEED IT */}
            <div className="row align-items-center how-it-works-step">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="step-collage collage-3">
                  <div className="shape-circle-green-bg"></div>
                  <div className="phone-frame phone-1 shadow-lg">
                    <div className="chat-demo"><span>Hi!</span><span className="alt">I'm here.</span></div>
                  </div>
                  <div className="phone-frame phone-2 shadow-lg">
                    <img src="https://images.unsplash.com/photo-1580281658626-ee379f3cce94?w=200" alt="Video" />
                  </div>
                  <div className="shape-rect-orange"></div>
                </div>
              </div>
              <div className="col-lg-6 ps-lg-5">
                <FadeInUp>
                  <h3 className="h3 mb-3" style={{ color: '#324d3e' }}>Therapy when you need it</h3>
                  <p className="text-muted fs-5">Message your therapist anytime. Schedule live sessions when it's convenient for you from any mobile device or computer.</p>
                </FadeInUp>
              </div>
            </div>
          </div>
        </section>

        {/* CHÈN ĐƯỜNG WAVE VÀO ĐÂY */}
        <div style={{ backgroundColor: '#ffffff', lineHeight: 0, width: '100%' }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
            <path d="M0,0 C480,80 960,80 1440,0 L1440,100 L0,100 Z" fill="#fcf7f0" />
          </svg>
        </div>

        {/* 6. SECTION: PRICING / MEMBERSHIP PLANS */}
        <section id="pricing-section" style={{ backgroundColor: '#fcf7f0', padding: '100px 0' }}>
          <div className="container">
            <div className="text-center mb-5">
              <FadeInUp>
                <h2 className="display-5 fw-normal mb-3" style={{ color: '#324d3e' }}>Choose your healing journey</h2>
                <p className="text-muted fs-5">Transparent pricing for your mental well-being</p>
              </FadeInUp>
            </div>

            <div className="row g-4">
              {/* GÓI BẠC */}
              <div className="col-lg-4">
                <FadeInUp delay={0.1}>
                  <div className="pricing-card silver-plan h-100 p-5 rounded-5 bg-white shadow-sm border-0 position-relative overflow-hidden">
                    <div className="plan-badge">Most Popular for Beginners</div>
                    <h3 className="h2 fw-bold mb-2">Gói Bạc</h3>
                    <div className="price-tag mb-4">
                      <span className="display-4 fw-bold">FREE</span>
                      <span className="text-muted"> / 7 days trial</span>
                    </div>
                    <ul className="list-unstyled mb-5">
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-success me-2" /> Daily Mood Tracking</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-success me-2" /> Basic AI Assistant access</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-success me-2" /> Read all Healing Articles</li>
                      <li className="text-muted opacity-50 d-flex align-items-center"><Check2Circle className="me-2" /> 1-on-1 Private Session</li>
                    </ul>
                    <button className="btn btn-outline-dark w-100 rounded-pill py-3 fw-bold">Start Free Trial</button>
                  </div>
                </FadeInUp>
              </div>

              {/* GÓI VÀNG */}
              <div className="col-lg-4">
                <FadeInUp delay={0.2}>
                  <div className="pricing-card gold-plan h-100 p-5 rounded-5 text-white shadow-lg border-0 position-relative" style={{ backgroundColor: brandGreen }}>
                    <div className="popular-ribbon">Recommended</div>
                    <h3 className="h2 fw-bold mb-2">Gói Vàng</h3>
                    <div className="price-tag mb-4">
                      <span className="display-4 fw-bold">$49</span>
                      <span className="opacity-75"> / month</span>
                    </div>
                    <ul className="list-unstyled mb-5">
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-warning me-2" /> Everything in Silver</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-warning me-2" /> 2 Private Sessions / month</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-warning me-2" /> Group Healing Workshops</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-warning me-2" /> Priority Chat Support</li>
                    </ul>
                    <button className="btn btn-light w-100 rounded-pill py-3 fw-bold" style={{ color: brandGreen }}>Get Started</button>
                  </div>
                </FadeInUp>
              </div>

              {/* GÓI KIM CƯƠNG */}
              <div className="col-lg-4">
                <FadeInUp delay={0.3}>
                  <div className="pricing-card diamond-plan h-100 p-5 rounded-5 bg-white shadow-sm border-0 position-relative">
                    <h3 className="h2 fw-bold mb-2">Gói Kim Cương</h3>
                    <div className="price-tag mb-4">
                      <span className="display-4 fw-bold">$99</span>
                      <span className="text-muted"> / month</span>
                    </div>
                    <ul className="list-unstyled mb-5">
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-primary me-2" /> Unlimited Private Sessions</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-primary me-2" /> Personal Care Manager</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-primary me-2" /> 24/7 Crisis Support</li>
                      <li className="mb-3 d-flex align-items-center"><Check2Circle className="text-primary me-2" /> Family Account (Up to 3)</li>
                    </ul>
                    <button className="btn btn-outline-dark w-100 rounded-pill py-3 fw-bold">Upgrade to Diamond</button>
                  </div>
                </FadeInUp>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CHÈN SECTION TẾT VÀO ĐÂY */}
        <TetSale />
      </div>
    </motion.div>

  );
};

export default Home;

