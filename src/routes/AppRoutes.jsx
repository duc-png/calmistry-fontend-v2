import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { AnimatePresence } from "framer-motion";

// Client pages
import Home from "../pages/client/Home";
import Blog from "../pages/client/Blog";
import BlogDetail from "../pages/client/BlogDetail";
import Journal from "../pages/client/Journal";
import SleepManagement from "../pages/client/SleepManagement";
import UserDashboard from "../pages/client/UserDashboard";
import ShareStories from "../pages/client/ShareStories";
import GroupChat from "../pages/client/GroupChat";
import Checkout from "../pages/client/Checkout";

// Author pages
import AuthorDashboard from "../pages/author/AuthorDashboard";

// Expert pages
import ExpertDashboardPro from "../pages/expert/ExpertDashboardPro";

// Auth pages
import Login from "../pages/auth/Login";

// Common pages
import NotFound from "../pages/common/NotFound";

import AIChatButton from "../components/features/chat/AIChatButton";

function AppRoutes() {
  return (
    <div style={{ position: "relative" }}>
      {/* Luon noi len tren moi pages */}
      <AIChatButton />

      <AnimatePresence mode="wait">
        <Routes>
          {/* MAIN LAYOUT */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sleepManagement" element={<SleepManagement />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/authorDashboard" element={<AuthorDashboard />} />
            <Route path="/expertDashboard" element={<ExpertDashboardPro />} />

            <Route path="/shareStories" element={<ShareStories />} />
            <Route path="/group-chat" element={<GroupChat />} />
            <Route path="/checkout" element={<Checkout />} />

          </Route>

          {/* AUTH */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AppRoutes;

