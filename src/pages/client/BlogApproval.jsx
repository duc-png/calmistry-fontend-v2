import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Eye } from 'lucide-react';
import { blogService } from '../../services/blogService';
import { toast } from 'react-toastify';
import api from '../../services/api';

const BlogApproval = () => {
    const navigate = useNavigate();
    const brandGreen = '#324d3e';
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingBlogs();
    }, []);

    const fetchPendingBlogs = async () => {
        setLoading(true);
        try {
            const token = api.getToken();
            if (!token) {
                navigate('/login');
                return;
            }

            // We will use searchBlogs with status='PENDING'
            // Ideally, the backend searchBlogs endpoint should allow fetching PENDING blogs for authorized users.
            // If the current backend filters PENDING out for everyone, we might need to adjust backend.
            // But based on BlogService.java, searchBlogs logic:
            // if status is passed, it returns blogs with that status.
            // We need to ensure the Controller allows passing status.
            // Looking at previous context, BlogController has clean search parameters.

            const data = await blogService.searchBlogs({ status: 'PENDING' });
            setBlogs(data || []);
        } catch (error) {
            console.error("Failed to fetch pending blogs", error);
            toast.error("Không thể tải danh sách bài viết chờ duyệt.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const token = api.getToken();
            await blogService.approveBlog(id, 'PUBLISHED', token);
            toast.success("Đã duyệt bài viết!");
            fetchPendingBlogs(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi duyệt bài.");
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn từ chối bài viết này?")) return;
        try {
            const token = api.getToken();
            await blogService.approveBlog(id, 'DRAFT', token); // Or REJECTED if enum exists. defaulting to DRAFT or similar behavior.
            // Note: Backend might not support REJECTED, so we can set it back to DRAFT or delete.
            // Assuming DRAFT for now based on typical flows.
            toast.info("Đã từ chối bài viết (Chuyển về nháp).");
            fetchPendingBlogs();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi từ chối bài.");
        }
    };

    return (
        <div className="container py-5" style={{ marginTop: '80px', minHeight: '80vh' }}>
            <button
                onClick={() => navigate('/blog')}
                className="btn btn-link text-decoration-none mb-4 d-flex align-items-center gap-2"
                style={{ color: '#6c757d' }}
            >
                <ArrowLeft size={20} /> Quay lại Blog
            </button>

            <h2 className="fw-bold mb-4" style={{ color: brandGreen }}>Duyệt bài viết đang chờ</h2>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status"></div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center text-muted py-5 is-italic">
                    Không có bài viết nào đang chờ duyệt.
                </div>
            ) : (
                <div className="row">
                    {blogs.map(blog => (
                        <div key={blog.id} className="col-12 mb-3">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card shadow-sm border-0 rounded-3 overflow-hidden"
                            >
                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <div className="d-flex align-items-center gap-3" style={{ flex: 1, minWidth: '300px' }}>
                                        <img
                                            src={blog.thumbnailUrl || 'https://via.placeholder.com/150'}
                                            alt={blog.title}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }}
                                        />
                                        <div>
                                            <h5 className="fw-bold mb-1">{blog.title}</h5>
                                            <p className="text-muted mb-0 small">
                                                Tác giả: <strong>{blog.authorName || 'User'}</strong> • {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                            <span className="badge bg-light text-dark mt-2 border">
                                                {blog.categoryName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                                            onClick={() => navigate(`/blog/${blog.id}`)}
                                        >
                                            <Eye size={16} /> Xem
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm d-flex align-items-center gap-1 text-white"
                                            onClick={() => handleApprove(blog.id)}
                                        >
                                            <CheckCircle size={16} /> Duyệt
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                            onClick={() => handleReject(blog.id)}
                                        >
                                            <XCircle size={16} /> Từ chối
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogApproval;
