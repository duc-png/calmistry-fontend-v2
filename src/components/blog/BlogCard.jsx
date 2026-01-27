import React from 'react';
import { Calendar, Clock, User, Heart, MessageCircle, ChevronRight } from 'lucide-react';

const BlogCard = ({ post, onClick, brandGreen, featured = false }) => {
  return (
    <div
      className={`card border-0 shadow-sm h-100 ${featured ? 'col-lg-6' : 'col-lg-4 col-md-6'}`}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = featured ? 'translateY(-8px)' : 'translateY(-5px)';
        e.currentTarget.style.boxShadow = featured ? '0 12px 24px rgba(0,0,0,0.15)' : '0 8px 16px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ height: featured ? '280px' : '200px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {featured && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#74c655',
            color: '#ffffff',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            Nổi bật
          </div>
        )}
      </div>
      <div className="card-body p-4">
        <div className={`d-flex align-items-center gap-${featured ? '3' : '2'} mb-${featured ? '3' : '2'} text-muted small`}>
          {featured && (
            <div className="d-flex align-items-center gap-1">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          )}
          <div className="d-flex align-items-center gap-1">
            <Calendar size={featured ? 16 : 14} />
            <span>{post.date}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <Clock size={featured ? 16 : 14} />
            <span>{post.readTime}</span>
          </div>
        </div>
        <h3 className={featured ? "h5 fw-bold mb-3" : "h6 fw-bold mb-2"} style={{ color: brandGreen }}>
          {post.title}
        </h3>
        <p className={`text-muted ${featured ? 'mb-4' : 'small mb-3'}`} style={!featured ? {
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        } : {}}>
          {post.excerpt}
        </p>
        {!featured && (
          <span className="small text-muted d-flex align-items-center gap-1">
            <User size={14} />
            {post.author}
          </span>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <div className={`d-flex gap-${featured ? '3' : '2'} text-muted small`}>
            <span className="d-flex align-items-center gap-1">
              <Heart size={featured ? 16 : 14} />
              {post.likes}
            </span>
            <span className="d-flex align-items-center gap-1">
              <MessageCircle size={featured ? 16 : 14} />
              {post.comments}
            </span>
          </div>
          {featured && (
            <button
              className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1"
              style={{ color: brandGreen, fontWeight: '600' }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              Đọc thêm
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
