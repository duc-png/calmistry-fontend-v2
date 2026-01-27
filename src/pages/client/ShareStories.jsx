import React, { useState, useEffect } from 'react';
import '../../styles/ShareStories.css';
import userService from '../../services/userService';
import storyService from '../../services/storyService';
import { toast } from 'react-toastify';

const ShareStories = () => {
  const brandGreen = '#324d3e';
  const lightGreen = '#74c655';
  const softBg = '#fcfdfd';

  const [currentUser, setCurrentUser] = useState({
    name: "...",
    fuedScore: 0,
    requiredFUED: 100
  });

  const [stories, setStories] = useState([]);
  const [isAnonPost, setIsAnonPost] = useState(false);
  const [newStoryContent, setNewStoryContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userInfo, storiesData] = await Promise.all([
        userService.getMyInfo(),
        storyService.getStories(0, 50)
      ]);

      setCurrentUser({
        name: userInfo.fullName || userInfo.username,
        fuedScore: userInfo.fuedScore || 0,
        requiredFUED: 100
      });

      setStories(storiesData);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostStory = async () => {
    if (!newStoryContent.trim()) return;

    try {
      const newStory = await storyService.createStory(newStoryContent, isAnonPost);
      setStories([newStory, ...stories]);
      setNewStoryContent("");
      // Update score locally or refetch
      setCurrentUser(prev => ({
        ...prev,
        fuedScore: prev.fuedScore + 10
      }));
      toast.success("Đã đăng câu chuyện thành công (+10 FUED)");
    } catch (error) {
      console.error("Failed to post story", error);
      toast.error("Không thể đăng bài. Vui lòng thử lại.");
    }
  };

  const handleLikeStory = async (storyId) => {
    try {
      // Optimistic update
      setStories(stories.map(story => {
        if (story.id === storyId) {
          const newIsLiked = !story.isLiked;
          return {
            ...story,
            isLiked: newIsLiked,
            hearts: newIsLiked ? story.hearts + 1 : story.hearts - 1
          };
        }
        return story;
      }));

      await storyService.likeStory(storyId);
    } catch (error) {
      console.error("Failed to like story", error);
      // Revert if failed
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '100px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: softBg, minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="row justify-content-center">

          {/* --- CỘT TRÁI: FEED CÂU CHUYỆN --- */}
          <div className="col-lg-7">

            {/* Box Đăng bài */}
            <div className="p-4 rounded-5 bg-white shadow-sm border-0 mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className={`bi ${isAnonPost ? 'bi-incognito' : 'bi-person-circle'} fs-3 me-2 text-muted`}></i>
                <span className="fw-bold">{isAnonPost ? 'Đăng bài ẩn danh' : currentUser.name}</span>
              </div>
              <textarea
                className="form-control border-0 bg-light rounded-4 p-3 mb-3"
                rows="3"
                placeholder="Chia sẻ câu chuyện hoặc cảm xúc của bạn..."
                style={{ resize: 'none', color: '#324d3e' }}
                value={newStoryContent}
                onChange={(e) => setNewStoryContent(e.target.value)}
              ></textarea>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="anonSwitch"
                    checked={isAnonPost}
                    onChange={() => setIsAnonPost(!isAnonPost)}
                  />
                  <label className="form-check-label small text-muted" htmlFor="anonSwitch">Chế độ ẩn danh</label>
                </div>
                <button
                  className="btn btn-dark rounded-pill px-4 fw-bold"
                  style={{ backgroundColor: brandGreen }}
                  onClick={handlePostStory}
                  disabled={!newStoryContent.trim()}
                >
                  Chia sẻ <i className="bi bi-send-fill ms-1"></i>
                </button>
              </div>
            </div>

            {/* Danh sách Story */}
            <h5 className="fw-bold mb-4 d-flex align-items-center">
              <i className="bi bi-chat-heart-fill me-2 text-danger"></i> Câu chuyện từ cộng đồng
            </h5>

            {stories.map(story => (
              <div key={story.id} className="p-4 rounded-5 bg-white shadow-sm border-0 mb-4 card-story">
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="p-2 rounded-circle bg-light me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <i className={`bi ${story.avatar} fs-5`}></i>
                    </div>
                    <div>
                      <div className="fw-bold small">{story.author}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{story.time}</div>
                    </div>
                  </div>
                  {/* <i className="bi bi-three-dots"></i> */}
                </div>

                <p className="mb-4" style={{ lineHeight: '1.6', color: '#444', whiteSpace: 'pre-wrap' }}>{story.content}</p>

                <div className="d-flex align-items-center gap-4 border-top pt-3">
                  {/* Nút Thả tim */}
                  <div
                    className="d-flex align-items-center cursor-pointer interaction-item"
                    onClick={() => handleLikeStory(story.id)}
                  >
                    <i className={`bi ${story.isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5 me-2`}></i>
                    <span className="small fw-bold">{story.hearts}</span>
                  </div>

                  {/* Nút Bình luận (Kiểm tra FUED) */}
                  <div className={`d-flex align-items-center ${currentUser.fuedScore < currentUser.requiredFUED ? 'opacity-50' : 'cursor-pointer interaction-item'}`}>
                    <i className={`bi ${currentUser.fuedScore < currentUser.requiredFUED ? 'bi-lock-fill' : 'bi-chat-left-text'} fs-5 me-2`}></i>
                    <span className="small fw-bold">Bình luận</span>
                  </div>
                </div>

                {/* Cảnh báo FUED nếu thấp */}
                {currentUser.fuedScore < currentUser.requiredFUED && (
                  <div className="mt-3 p-2 rounded-4 bg-light text-center" style={{ fontSize: '11px', border: '1px dashed #ddd' }}>
                    <i className="bi bi-exclamation-triangle-fill me-1 text-warning"></i>
                    Bạn cần đạt <strong>{currentUser.requiredFUED} FUED</strong> để tham gia thảo luận.
                    (Hiện có: {currentUser.fuedScore})
                  </div>
                )}
              </div>
            ))}

            {stories.length === 0 && (
              <div className="text-center text-muted py-5">
                Chưa có câu chuyện nào. Hãy là người đầu tiên chia sẻ!
              </div>
            )}
          </div>

          {/* --- CỘT PHẢI: THÔNG TIN CÁ NHÂN & QUY TẮC --- */}
          <div className="col-lg-3 mt-5 mt-lg-0">
            <div className="p-4 rounded-5 bg-white shadow-sm border-0 sticky-top" style={{ top: '120px' }}>
              <div className="text-center mb-4">
                <div className="p-3 d-inline-block rounded-circle mb-3" style={{ backgroundColor: 'rgba(116, 198, 85, 0.1)' }}>
                  <i className="bi bi-lightning-charge-fill fs-2" style={{ color: lightGreen }}></i>
                </div>
                <h6 className="fw-bold mb-1">Chỉ số FUED của bạn</h6>
                <div className="display-6 fw-bold" style={{ color: brandGreen }}>{currentUser.fuedScore}</div>
                <div className="progress mt-3" style={{ height: '6px', backgroundColor: '#eee' }}>
                  <div className="progress-bar" style={{ width: `${Math.min((currentUser.fuedScore / currentUser.requiredFUED) * 100, 100)}%`, backgroundColor: lightGreen }}></div>
                </div>
                <p className="small text-muted mt-2">Cần thêm {Math.max(0, currentUser.requiredFUED - currentUser.fuedScore)} điểm để mở khóa bình luận.</p>
              </div>

              <hr className="opacity-25" />

              <div className="mb-4">
                <h6 className="fw-bold small mb-3">Làm sao để tăng FUED?</h6>
                <ul className="list-unstyled mb-0" style={{ fontSize: '12px' }}>
                  <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Chia sẻ câu chuyện thật <span className="fw-bold text-success">(+10)</span></li>
                  <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Nhận được sự ủng hộ (tym) <span className="fw-bold text-success">(+2)</span></li>
                  {/* <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>Hoàn thành bài tập tâm lý</li> */}
                </ul>
              </div>

              <div className="p-3 rounded-4" style={{ backgroundColor: '#fff8f8' }}>
                <h6 className="fw-bold small text-danger"><i className="bi bi-shield-lock me-2"></i>Không Gian An Toàn</h6>
                <p className="mb-0" style={{ fontSize: '11px', color: '#888' }}>
                  Chúng tôi không sử dụng nút Dislike để tránh gây tổn thương. Mọi hành vi tiêu cực sẽ bị trừ điểm FUED.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ShareStories;

