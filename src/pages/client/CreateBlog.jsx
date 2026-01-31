import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api'; // To get token
import { blogService } from '../../services/blogService';

const CreateBlog = () => {
    const navigate = useNavigate();
    const brandGreen = '#324d3e';

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: 1, // Default to first category
        thumbnailUrl: ''
    });

    // Hardcoded categories for now (should match Backend)
    const categories = [
        { id: 1, name: 'Sức khỏe tâm lý' },
        { id: 2, name: 'Thiền định' },
        { id: 3, name: 'Lối sống' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            toast.error('Vui lòng nhập tiêu đề và nội dung!');
            return;
        }

        setLoading(true);
        try {
            const token = api.getToken();
            if (!token) {
                toast.error('Bạn cần đăng nhập để đăng bài!');
                navigate('/login');
                return;
            }

            await blogService.createBlog({
                ...formData,
                categoryId: Number(formData.categoryId)
            }, token);

            toast.success('Đăng bài thành công!');
            navigate('/blog');
        } catch (error) {
            console.error(error);
            toast.error('Có lỗi xảy ra khi đăng bài.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="container py-5"
            style={{ marginTop: '80px', minHeight: '80vh' }}
        >
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <button
                        onClick={() => navigate('/blog')}
                        className="btn btn-link text-decoration-none mb-4 d-flex align-items-center gap-2"
                        style={{ color: '#6c757d' }}
                    >
                        <ArrowLeft size={20} /> Quay lại Blog
                    </button>

                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-white p-4 border-bottom-0">
                            <h2 className="fw-bold mb-0" style={{ color: brandGreen }}>Viết bài mới</h2>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Tiêu đề bài viết</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control form-control-lg"
                                        placeholder="Nhập tiêu đề..."
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Danh mục</label>
                                    <select
                                        name="categoryId"
                                        className="form-select"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Thumbnail URL */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Ảnh bìa</label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    try {
                                                        const url = await blogService.uploadImage(file);
                                                        setFormData(prev => ({ ...prev, thumbnailUrl: url }));
                                                        toast.success('Upload ảnh thành công!');
                                                    } catch (error) {
                                                        console.error("Upload failed", error);
                                                        toast.error('Upload ảnh thất bại.');
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    {formData.thumbnailUrl && (
                                        <div className="mt-3">
                                            <img
                                                src={formData.thumbnailUrl}
                                                alt="Preview"
                                                className="img-fluid rounded shadow-sm"
                                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    {/* HIDDEN URL INPUT (to keep compatibility if needed, or just rely on state) */}
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Nội dung</label>
                                    <textarea
                                        name="content"
                                        className="form-control"
                                        rows="10"
                                        placeholder="Viết nội dung của bạn ở đây (hỗ trợ HTML cơ bản)..."
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-lg rounded-pill px-5 d-flex align-items-center gap-2"
                                        style={{
                                            backgroundColor: brandGreen,
                                            color: '#fff',
                                            border: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Đang đăng...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} /> Đăng bài
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CreateBlog;
