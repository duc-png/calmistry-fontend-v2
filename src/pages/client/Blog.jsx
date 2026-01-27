import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, User, Tag, TrendingUp, Heart, MessageCircle, Share2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '../../components/blog/BlogCard';
import SearchBar from '../../components/blog/SearchBar';
import CategoryFilter from '../../components/blog/CategoryFilter';
import '../../styles/Blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Danh sách categories
  const categories = [
    { id: 'all', name: 'Tất cả', icon: TrendingUp },
    { id: 'mental-health', name: 'Sức khỏe tâm lý', icon: Heart },
    { id: 'self-care', name: 'Tự chăm sóc', icon: User },
    { id: 'relationships', name: 'Mối quan hệ', icon: MessageCircle },
    { id: 'mindfulness', name: 'Chánh niệm', icon: Tag }
  ];

  // Dữ liệu blog posts mẫu
  const blogPosts = [
    {
      id: 1,
      title: '7 Cách Giảm Căng Thẳng Hiệu Quả Trong Cuộc Sống Hàng Ngày',
      excerpt: 'Khám phá những phương pháp đơn giản nhưng mạnh mẽ giúp bạn quản lý căng thẳng và tìm lại sự bình yên trong tâm hồn.',
      category: 'mental-health',
      author: 'Dr. Minh Anh',
      date: '15 Tháng 12, 2024',
      readTime: '8 phút đọc',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop',
      featured: true,
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: 'Thiền Định: Hành Trình Tìm Về Chính Mình',
      excerpt: 'Tìm hiểu về lợi ích của thiền định và cách bắt đầu thực hành một cách dễ dàng cho người mới.',
      category: 'mindfulness',
      author: 'Nguyễn Thanh',
      date: '10 Tháng 12, 2024',
      readTime: '6 phút đọc',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
      featured: false,
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      title: 'Xây Dựng Thói Quen Tốt: Bí Quyết Thành Công',
      excerpt: 'Những nguyên tắc khoa học giúp bạn hình thành và duy trì các thói quen tích cực lâu dài.',
      category: 'self-care',
      author: 'Phạm Hương',
      date: '8 Tháng 12, 2024',
      readTime: '10 phút đọc',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
      featured: true,
      likes: 312,
      comments: 67
    },
    {
      id: 4,
      title: 'Giao Tiếp Hiệu Quả: Chìa Khóa Cho Mối Quan Hệ Bền Vững',
      excerpt: 'Học cách lắng nghe và truyền đạt cảm xúc một cách chân thành để cải thiện mọi mối quan hệ.',
      category: 'relationships',
      author: 'Lê Tuấn',
      date: '5 Tháng 12, 2024',
      readTime: '7 phút đọc',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop',
      featured: false,
      likes: 156,
      comments: 28
    },
    {
      id: 5,
      title: 'Hiểu Về Trầm Cảm: Dấu Hiệu và Cách Đối Phó',
      excerpt: 'Nhận biết các triệu chứng của trầm cảm và tìm hiểu những bước đi đầu tiên để tìm kiếm sự giúp đỡ.',
      category: 'mental-health',
      author: 'Dr. Kim Chi',
      date: '1 Tháng 12, 2024',
      readTime: '12 phút đọc',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
      featured: false,
      likes: 278,
      comments: 54
    },
    {
      id: 6,
      title: 'Tự Yêu Thương Bản Thân: Hành Trình Quan Trọng Nhất',
      excerpt: 'Khám phá tầm quan trọng của việc tự chăm sóc và yêu thương bản thân trong thế giới hiện đại.',
      category: 'self-care',
      author: 'Trần Mai',
      date: '28 Tháng 11, 2024',
      readTime: '9 phút đọc',
      image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&h=500&fit=crop',
      featured: false,
      likes: 201,
      comments: 41
    }
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Hàm xử lý click vào bài viết
  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
       <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${brandGreen} 0%, #2d4435 100%)`,
        color: '#ffffff',
        padding: '80px 0 60px'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">Blog Calmistry</h1>
              <p className="lead mb-5" style={{ opacity: 0.9 }}>
                Khám phá những bài viết chất lượng về sức khỏe tâm lý, phát triển bản thân và cuộc sống hạnh phúc
              </p>

              {/* Search Bar */}
              <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c757d'
                  }}
                />
                <input
                  type="text"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    paddingLeft: '50px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="btn rounded-pill d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: isActive ? brandGreen : '#f8f9fa',
                    color: isActive ? '#ffffff' : brandGreen,
                    border: `1px solid ${isActive ? brandGreen : '#dee2e6'}`,
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.3s',
                    padding: '8px 20px'
                  }}
                >
                  <Icon size={18} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <TrendingUp size={24} color={brandGreen} className="me-2" />
                <h2 className="mb-0" style={{ color: brandGreen, fontWeight: '700' }}>Bài viết nổi bật</h2>
              </div>

              <div className="row g-4">
                {featuredPosts.map(post => (
                  <div key={post.id} className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePostClick(post.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{
                        height: '280px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          backgroundColor: lightGreen,
                          color: '#ffffff',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}>
                          Nổi bật
                        </div>
                      </div>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-3 mb-3 text-muted small">
                          <div className="d-flex align-items-center gap-1">
                            <User size={16} />
                            <span>{post.author}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Clock size={16} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="h5 fw-bold mb-3" style={{ color: brandGreen }}>
                          {post.title}
                        </h3>
                        <p className="text-muted mb-4">{post.excerpt}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-3 text-muted small">
                            <span className="d-flex align-items-center gap-1">
                              <Heart size={16} />
                              {post.likes}
                            </span>
                            <span className="d-flex align-items-center gap-1">
                              <MessageCircle size={16} />
                              {post.comments}
                            </span>
                          </div>
                          <button
                            className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1"
                            style={{ color: brandGreen, fontWeight: '600' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostClick(post.id);
                            }}
                          >
                            Đọc thêm
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="mb-4" style={{ color: brandGreen, fontWeight: '700' }}>
              {selectedCategory === 'all' ? 'Tất cả bài viết' : `Bài viết về ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Không tìm thấy bài viết nào phù hợp.</p>
              </div>
            ) : (
              <div className="row g-4">
                {regularPosts.map(post => (
                  <div key={post.id} className="col-lg-4 col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePostClick(post.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="h6 fw-bold mb-2" style={{ color: brandGreen }}>
                          {post.title}
                        </h4>
                        <p className="text-muted small mb-3" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {post.excerpt}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small text-muted d-flex align-items-center gap-1">
                            <User size={14} />
                            {post.author}
                          </span>
                          <div className="d-flex gap-2 small text-muted">
                            <span className="d-flex align-items-center gap-1">
                              <Heart size={14} />
                              {post.likes}
                            </span>
                            <span className="d-flex align-items-center gap-1">
                              <MessageCircle size={14} />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-5">
              <button
                className="btn rounded-pill px-5 py-3"
                style={{
                  backgroundColor: brandGreen,
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d4435';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = brandGreen;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Xem thêm bài viết
              </button>
            </div>
          )}
        </div>
      </section>



    </div>
        </motion.div>

  );
};

export default Blog;
