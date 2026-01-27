import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/BlogDetail.css';

import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  Eye,
  Tag
} from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Dữ liệu bài viết
  const article = {
    id: 1,
    title: '7 Cách Giảm Căng Thẳng Hiệu Quả Trong Cuộc Sống Hàng Ngày',
    subtitle: 'Khám phá những phương pháp đơn giản nhưng mạnh mẽ giúp bạn quản lý căng thẳng và tìm lại sự bình yên trong tâm hồn',
    category: 'Sức khỏe tâm lý',
    author: {
      name: 'Dr. Minh Anh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      bio: 'Bác sĩ tâm lý lâm sàng với hơn 10 năm kinh nghiệm'
    },
    date: '15 Tháng 12, 2024',
    readTime: '8 phút đọc',
    views: 2341,
    likes: 234,
    comments: 45,
    tags: ['Căng thẳng', 'Sức khỏe tâm lý', 'Tự chăm sóc', 'Mindfulness'],
    featuredImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=600&fit=crop'
  };

  // Bài viết liên quan
  const relatedPosts = [
    {
      id: 2,
      title: 'Thiền Định: Hành Trình Tìm Về Chính Mình',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop',
      date: '10 Tháng 12, 2024',
      readTime: '6 phút đọc'
    },
    {
      id: 3,
      title: 'Xây Dựng Thói Quen Tốt: Bí Quyết Thành Công',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop',
      date: '8 Tháng 12, 2024',
      readTime: '10 phút đọc'
    },
    {
      id: 4,
      title: 'Giao Tiếp Hiệu Quả: Chìa Khóa Cho Mối Quan Hệ',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop',
      date: '5 Tháng 12, 2024',
      readTime: '7 phút đọc'
    }
  ];

  // Comments mẫu
  const comments = [
    {
      id: 1,
      author: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: '16 Tháng 12, 2024',
      content: 'Bài viết rất hữu ích! Tôi đã áp dụng kỹ thuật hít thở sâu và thấy hiệu quả ngay. Cảm ơn tác giả đã chia sẻ.',
      likes: 12
    },
    {
      id: 2,
      author: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      date: '16 Tháng 12, 2024',
      content: 'Mình đang trong giai đoạn stress cao do công việc. Những phương pháp này thực sự giúp mình nhiều!',
      likes: 8
    }
  ];

  const handleShare = (platform) => {
    console.log(`Sharing on ${platform}`);
    setShowShareMenu(false);
  };

  return (
       <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

      {/* Breadcrumb - Fixed navbar overlap */}
      <section
        className="py-3"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e9ecef',
          marginTop: '70px' // Đẩy xuống dưới navbar (70px là chiều cao navbar)
        }}
      >
        <div className="container">
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a
                  href="/"
                  style={{
                    color: '#2d4a3e',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#74c655'}
                  onMouseLeave={(e) => e.target.style.color = '#2d4a3e'}
                >
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                  style={{
                    color: '#2d4a3e',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#74c655'}
                  onMouseLeave={(e) => e.target.style.color = '#2d4a3e'}
                >
                  Blog
                </a>
              </li>
              <li className="breadcrumb-item active text-muted">Bài viết</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* Category Badge */}
              <div className="mb-3">
                <span className="badge rounded-pill px-3 py-2" style={{
                  backgroundColor: `${lightGreen}20`,
                  color: brandGreen,
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="display-5 fw-bold mb-3" style={{ color: brandGreen }}>
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="lead text-muted mb-4">
                {article.subtitle}
              </p>

              {/* Meta Info */}
              <div className="d-flex flex-wrap align-items-center gap-4 mb-4 pb-4 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <div className="fw-semibold" style={{ color: brandGreen }}>
                      {article.author.name}
                    </div>
                    <div className="small text-muted">{article.author.bio}</div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 text-muted small ms-auto">
                  <span className="d-flex align-items-center gap-1">
                    <Calendar size={16} />
                    {article.date}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Clock size={16} />
                    {article.readTime}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Eye size={16} />
                    {article.views.toLocaleString()} lượt xem
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2 mb-4">
                <button
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => setIsLiked(!isLiked)}
                  style={{
                    backgroundColor: isLiked ? `${lightGreen}20` : '#f8f9fa',
                    color: isLiked ? lightGreen : '#6c757d',
                    border: 'none',
                    fontWeight: '500',
                    transition: 'all 0.3s'
                  }}
                >
                  <Heart size={18} fill={isLiked ? lightGreen : 'none'} />
                  {article.likes + (isLiked ? 1 : 0)}
                </button>

                <button
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    border: 'none',
                    fontWeight: '500'
                  }}
                >
                  <MessageCircle size={18} />
                  {article.comments}
                </button>

                <button
                  className="btn d-flex align-items-center gap-2"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  style={{
                    backgroundColor: isBookmarked ? `${brandGreen}20` : '#f8f9fa',
                    color: isBookmarked ? brandGreen : '#6c757d',
                    border: 'none',
                    fontWeight: '500',
                    transition: 'all 0.3s'
                  }}
                >
                  <BookmarkPlus size={18} fill={isBookmarked ? brandGreen : 'none'} />
                  Lưu
                </button>

                <div className="position-relative">
                  <button
                    className="btn d-flex align-items-center gap-2"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    style={{
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      border: 'none',
                      fontWeight: '500'
                    }}
                  >
                    <Share2 size={18} />
                    Chia sẻ
                  </button>

                  {showShareMenu && (
                    <div
                      className="position-absolute bg-white shadow-lg rounded p-3"
                      style={{
                        top: '110%',
                        right: 0,
                        zIndex: 1000,
                        minWidth: '200px',
                        border: '1px solid #e9ecef'
                      }}
                    >
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm text-start d-flex align-items-center gap-2"
                          onClick={() => handleShare('facebook')}
                          style={{ color: '#1877F2' }}
                        >
                          <Facebook size={18} />
                          Facebook
                        </button>
                        <button
                          className="btn btn-sm text-start d-flex align-items-center gap-2"
                          onClick={() => handleShare('twitter')}
                          style={{ color: '#1DA1F2' }}
                        >
                          <Twitter size={18} />
                          Twitter
                        </button>
                        <button
                          className="btn btn-sm text-start d-flex align-items-center gap-2"
                          onClick={() => handleShare('linkedin')}
                          style={{ color: '#0A66C2' }}
                        >
                          <Linkedin size={18} />
                          LinkedIn
                        </button>
                        <hr className="my-1" />
                        <button
                          className="btn btn-sm text-start d-flex align-items-center gap-2 text-muted"
                          onClick={() => handleShare('copy')}
                        >
                          <Link2 size={18} />
                          Sao chép link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-100 rounded-3 shadow-sm"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* Content Sections */}
              <article className="article-content" style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#212529'
              }}>

                <p className="lead mb-4">
                  Trong cuộc sống hiện đại đầy áp lực, căng thẳng đã trở thành người bạn đồng hành không mong muốn của nhiều người. Việc quản lý căng thẳng hiệu quả không chỉ giúp cải thiện sức khỏe tinh thần mà còn nâng cao chất lượng cuộc sống tổng thể.
                </p>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  1. Thực hành hít thở sâu
                </h2>
                <p>
                  Hít thở sâu là một trong những cách đơn giản nhất nhưng hiệu quả nhất để giảm căng thẳng tức thì. Khi bạn hít thở sâu, hệ thần kinh phó giao cảm được kích hoạt, giúp cơ thể chuyển từ trạng thái "chiến đấu hoặc chạy trốn" sang trạng thái thư giãn.
                </p>
                <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: `${lightGreen}10`, borderLeft: `4px solid ${lightGreen}` }}>
                  <p className="mb-0 fst-italic">
                    <strong>Tip:</strong> Thử kỹ thuật 4-7-8: Hít vào trong 4 giây, giữ hơi 7 giây, thở ra trong 8 giây. Lặp lại 4 lần.
                  </p>
                </div>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  2. Vận động thể chất đều đặn
                </h2>
                <p>
                  Tập thể dục không chỉ tốt cho sức khỏe thể chất mà còn là một "thuốc giảm căng thẳng" tự nhiên. Khi vận động, cơ thể tiết ra endorphin - hormone hạnh phúc - giúp cải thiện tâm trạng và giảm lo âu.
                </p>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  3. Thiền định và chánh niệm
                </h2>
                <p>
                  Thiền định giúp tâm trí tập trung vào hiện tại, giảm suy nghĩ tiêu cực về quá khứ hoặc lo lắng về tương lai. Chỉ cần 10-15 phút thiền mỗi ngày có thể tạo ra sự thay đổi đáng kể trong việc quản lý căng thẳng.
                </p>

                <div className="my-5">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop"
                    alt="Meditation"
                    className="w-100 rounded-3"
                  />
                  <p className="text-muted small mt-2 text-center">Thiền định giúp tâm trí tìm về sự bình yên</p>
                </div>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  4. Duy trì lối sống lành mạnh
                </h2>
                <p>
                  Chế độ ăn uống cân bằng, ngủ đủ giấc và hạn chế caffeine, rượu bia đều góp phần quan trọng trong việc quản lý căng thẳng. Cơ thể khỏe mạnh là nền tảng cho tinh thần ổn định.
                </p>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  5. Kết nối với người thân
                </h2>
                <p>
                  Chia sẻ cảm xúc với người thân, bạn bè không chỉ giúp bạn giải tỏa được gánh nặng tâm lý mà còn tạo cảm giác được hỗ trợ và thấu hiểu. Đừng ngại tìm kiếm sự giúp đỡ chuyên nghiệp khi cần.
                </p>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  6. Quản lý thời gian hiệu quả
                </h2>
                <p>
                  Lập kế hoạch, ưu tiên công việc và biết nói "không" với những yêu cầu không cần thiết giúp giảm áp lực và tạo cảm giác kiểm soát cuộc sống tốt hơn.
                </p>

                <h2 className="h3 fw-bold mt-5 mb-3" style={{ color: brandGreen }}>
                  7. Tìm kiếm niềm vui trong những điều nhỏ
                </h2>
                <p>
                  Dành thời gian cho sở thích, đọc sách, nghe nhạc, hoặc đơn giản là ngắm hoàng hôn. Những khoảnh khắc nhỏ này giúp bạn nạp lại năng lượng và tìm thấy ý nghĩa trong cuộc sống.
                </p>

                <div className="p-4 rounded-3 mt-5" style={{ backgroundColor: `${brandGreen}10`, border: `2px solid ${brandGreen}` }}>
                  <h3 className="h5 fw-bold mb-3" style={{ color: brandGreen }}>Kết luận</h3>
                  <p className="mb-0">
                    Giảm căng thẳng là một hành trình, không phải đích đến. Hãy kiên nhẫn với bản thân và thử nghiệm các phương pháp khác nhau để tìm ra những gì phù hợp nhất với bạn. Nếu căng thẳng ảnh hưởng nghiêm trọng đến cuộc sống, đừng ngại tìm đến sự hỗ trợ từ chuyên gia tâm lý.
                  </p>
                </div>

              </article>

              {/* Tags */}
              <div className="mt-5 pt-4 border-top">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <Tag size={18} color={brandGreen} />
                  {article.tags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="badge rounded-pill px-3 py-2 text-decoration-none"
                      style={{
                        backgroundColor: '#f8f9fa',
                        color: brandGreen,
                        border: `1px solid ${brandGreen}30`,
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${lightGreen}20`;
                        e.currentTarget.style.borderColor = lightGreen;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = `${brandGreen}30`;
                      }}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Author Card */}
              <div className="mt-5 p-4 rounded-3" style={{ backgroundColor: `${brandGreen}05`, border: `1px solid ${brandGreen}20` }}>
                <div className="d-flex gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="rounded-circle"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h4 className="h5 fw-bold mb-2" style={{ color: brandGreen }}>
                      {article.author.name}
                    </h4>
                    <p className="text-muted mb-3">{article.author.bio}</p>
                    <button
                      className="btn btn-sm rounded-pill px-4"
                      style={{
                        backgroundColor: brandGreen,
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Theo dõi
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              <h3 className="h4 fw-bold mb-4" style={{ color: brandGreen }}>
                Bình luận ({comments.length})
              </h3>

              {/* Comment Form */}
              <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                <div className="card-body p-4">
                  <textarea
                    className="form-control border-0 mb-3"
                    rows="3"
                    placeholder="Viết bình luận của bạn..."
                    style={{ backgroundColor: '#f8f9fa', color: '#324d3e', resize: 'none' }}
                  ></textarea>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn rounded-pill px-4"
                      style={{
                        backgroundColor: brandGreen,
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="d-flex flex-column gap-3">
                {comments.map(comment => (
                  <div
                    key={comment.id}
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h5 className="h6 fw-bold mb-1" style={{ color: brandGreen }}>
                                {comment.author}
                              </h5>
                              <p className="text-muted small mb-0">{comment.date}</p>
                            </div>
                          </div>
                          <p className="mb-3">{comment.content}</p>
                          <div className="d-flex gap-3">
                            <button className="btn btn-sm btn-link p-0 text-decoration-none d-flex align-items-center gap-1" style={{ color: '#6c757d' }}>
                              <Heart size={16} />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="btn btn-sm btn-link p-0 text-decoration-none" style={{ color: '#6c757d' }}>
                              Trả lời
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">

              <h3 className="h4 fw-bold mb-4" style={{ color: brandGreen }}>
                Bài viết liên quan
              </h3>

              <div className="row g-4">
                {relatedPosts.map(post => (
                  <div key={post.id} className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                      }}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                      />
                      <div className="card-body p-3">
                        <h5 className="h6 fw-bold mb-2" style={{ color: brandGreen }}>
                          {post.title}
                        </h5>
                        <div className="d-flex gap-2 text-muted small">
                          <span className="d-flex align-items-center gap-1">
                            <Calendar size={14} />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="d-flex align-items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="d-flex justify-content-between">
                <a
                  href="#"
                  className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2"
                  style={{ border: `1px solid ${brandGreen}30`, color: brandGreen }}
                >
                  <ChevronLeft size={18} />
                  Bài trước
                </a>
                <a
                  href="#"
                  className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2"
                  style={{ border: `1px solid ${brandGreen}30`, color: brandGreen }}
                >
                  Bài sau
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
        </motion.div>

  );
};

export default BlogDetail;
