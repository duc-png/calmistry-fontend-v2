import React, { useState, useEffect } from 'react';
import { Calendar, Search, Smile, Meh, Frown, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import journalService from '../../services/journalService';
import '../../styles/Journal.css';

const Journal = () => {
  const brandGreen = '#324d3e';
  const lightGreen = '#8ec339';

  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentEntry, setCurrentEntry] = useState({
    id: null, title: '', content: '', mood: 'neutral', createdAt: new Date().toISOString()
  });

  // --- LOGIC DỮ LIỆU ---
  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await journalService.getJournals();
      setEntries(data);
    } catch (e) {
      console.error('Error fetching journals:', e);
      // If 401 unauthorized, redirect to login
      if (e?.status === 401) {
        setError('Vui lòng đăng nhập để xem nhật ký của bạn.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError('Không thể tải nhật ký. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) return;

    try {
      setError('');
      if (currentEntry.id) {
        // Update existing entry
        const updated = await journalService.updateJournal(currentEntry.id, {
          title: currentEntry.title,
          content: currentEntry.content,
          mood: currentEntry.mood
        });
        setEntries(entries.map(e => e.id === updated.id ? updated : e));
      } else {
        // Create new entry
        const created = await journalService.createJournal({
          title: currentEntry.title,
          content: currentEntry.content,
          mood: currentEntry.mood
        });
        setEntries([created, ...entries]);
      }
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error saving journal:', e);
      setError(e?.data?.message || 'Không thể lưu nhật ký. Vui lòng thử lại.');
    }
  };

  // Filter entries locally (can also be done via API)
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = moodFilter === 'all' || entry.mood === moodFilter;
    return matchesSearch && matchesMood;
  });

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Xóa nhật ký này?')) return;

    try {
      await journalService.deleteJournal(id);
      setEntries(entries.filter(e => e.id !== id));
    } catch (e) {
      console.error('Error deleting journal:', e);
      setError('Không thể xóa nhật ký. Vui lòng thử lại.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* paddingTop: '30px' để sát Header hơn theo ý bạn */}
      <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', paddingTop: '70px', paddingBottom: '100px' }}>

        {/* --- HEADER --- */}
        <div style={headerSection}>
          <div style={containerMaxWidth}>
            <div style={{ marginBottom: '15px' }}>
              <h1 style={pageTitle}>Nhật ký của tôi</h1>
            </div>

            <div style={searchFilterRow}>
              <div style={searchContainer}>
                <Search size={18} style={searchIcon} />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhật ký..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={searchInput}
                />
              </div>

              <div style={moodButtonGroup}>
                {['all', 'happy', 'neutral', 'sad'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMoodFilter(m)}
                    className="mood-filter-btn"
                    style={{
                      ...filterBtn,
                      backgroundColor: moodFilter === m ? lightGreen : '#fff',
                      color: moodFilter === m ? '#fff' : '#666',
                      borderColor: moodFilter === m ? lightGreen : '#e0e0e0'
                    }}
                  >
                    {m === 'all' ? 'Tất cả' : m === 'happy' ? <Smile size={18} /> : m === 'neutral' ? <Meh size={18} /> : <Frown size={18} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- LOADING & ERROR STATES --- */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '14px', color: '#718096' }}>Đang tải nhật ký...</div>
          </div>
        )}

        {error && !loading && (
          <div style={{
            padding: '20px',
            margin: '20px auto',
            maxWidth: '600px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '12px',
            color: '#856404',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* --- LIST CONTENT --- */}
        {!loading && (
          <div style={{ padding: '30px 24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={entryGrid}>
              <AnimatePresence>
                {filteredEntries.map(entry => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    style={entryCard}
                  >
                    <div style={cardHeader}>
                      <div style={cardMood}>
                        {entry.mood === 'happy' ? <Smile color={lightGreen} /> : entry.mood === 'sad' ? <Frown color="#3b82f6" /> : <Meh color="#6b7280" />}
                        <span style={cardDate}>{new Date(entry.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div style={cardActions}>
                        <button onClick={() => { setCurrentEntry(entry); setIsModalOpen(true); }} style={iconBtn}><Edit2 size={14} /></button>
                        <button onClick={() => handleDeleteEntry(entry.id)} style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <h3 style={cardTitle}>{entry.title}</h3>
                    <p style={cardExcerpt}>{entry.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- NÚT THÊM NHẬT KÝ (FAB) VỚI HIỆU ỨNG XOAY --- */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }} // HIỆU ỨNG XOAY 90 ĐỘ
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setCurrentEntry({ id: null, title: '', content: '', mood: 'neutral', createdAt: new Date().toISOString() });
            setIsModalOpen(true);
          }}
          style={fabButton}
        >
          <Plus size={32} />
        </motion.button>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={modalOverlay}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              style={modalContent}
            >
              <div style={modalHeader}>
                <h3 style={{ margin: 0, color: brandGreen }}>{currentEntry.id ? 'Cập nhật tâm tư' : 'Viết bài mới'}</h3>
                <X onClick={() => setIsModalOpen(false)} style={{ cursor: 'pointer', color: '#999' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <input
                  style={modalInput}
                  placeholder="Tiêu đề hôm nay..."
                  value={currentEntry.title}
                  onChange={e => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                  {['happy', 'neutral', 'sad'].map(m => (
                    <button
                      key={m}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: m })}
                      style={{
                        ...moodSelectBtn,
                        backgroundColor: currentEntry.mood === m ? lightGreen : '#fff',
                        color: currentEntry.mood === m ? '#fff' : '#666',
                        borderColor: currentEntry.mood === m ? lightGreen : '#eee',
                      }}
                    >
                      {m === 'happy' ? 'Vui vẻ' : m === 'neutral' ? 'Ổn' : 'Buồn'}
                    </button>
                  ))}
                </div>
                <textarea
                  style={modalTextarea}
                  placeholder="Hãy chia sẻ cảm xúc của bạn..."
                  value={currentEntry.content}
                  onChange={e => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                />
                <button onClick={handleSaveEntry} style={{ ...saveBtn, backgroundColor: brandGreen }}>
                  <Save size={18} style={{ marginRight: '8px' }} /> Lưu vào nhật ký
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

// --- STYLES TỐI ƯU ---
const headerSection = { backgroundColor: '#fff', borderBottom: '1px solid #f0f3f0', padding: '15px 24px' };
const containerMaxWidth = { maxWidth: '1200px', margin: '0 auto' };
const pageTitle = { fontSize: '24px', fontWeight: '800', color: '#324d3e', margin: 0 };
const searchFilterRow = { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' };
const searchContainer = { position: 'relative', flex: 1, minWidth: '250px' };
const searchInput = { width: '100%', padding: '12px 15px 12px 40px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', backgroundColor: '#f9faf9', color: '#324d3e' };
const searchIcon = { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#bbb' };
const moodButtonGroup = { display: 'flex', gap: '8px' };
const filterBtn = { padding: '10px 16px', borderRadius: '12px', border: '1px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '600' };

const entryGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' };
const entryCard = { backgroundColor: '#fff', borderRadius: '22px', padding: '24px', border: '1px solid #f0f4f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' };
const cardHeader = { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' };
const cardMood = { display: 'flex', alignItems: 'center', gap: '10px' };
const cardDate = { fontSize: '12px', color: '#aaa', fontWeight: '500' };
const cardTitle = { fontSize: '18px', fontWeight: '700', color: '#324d3e', marginBottom: '10px' };
const cardExcerpt = { fontSize: '14px', color: '#666', lineHeight: '1.6', height: '65px', overflow: 'hidden' };

const fabButton = {
  position: 'fixed', bottom: '40px', right: '40px',
  width: '65px', height: '65px', borderRadius: '50%',
  backgroundColor: '#8ec339', color: '#fff', border: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', boxShadow: '0 10px 25px rgba(142, 195, 57, 0.4)',
  zIndex: 999
};

const modalOverlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 20000, padding: '20px'
};

const modalContent = { backgroundColor: '#fff', width: '100%', maxWidth: '550px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' };
const modalHeader = { padding: '20px 24px', backgroundColor: '#fbfcfb', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const modalInput = { width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '16px', backgroundColor: '#f9f9f9', color: '#324d3e' };
const moodSelectBtn = { flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid', cursor: 'pointer', fontSize: '14px', fontWeight: '700' };
const modalTextarea = { width: '100%', height: '220px', padding: '16px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', resize: 'none', fontSize: '15px', backgroundColor: '#f9f9f9', color: '#324d3e', lineHeight: '1.6' };
const saveBtn = { width: '100%', padding: '16px', color: '#fff', border: 'none', borderRadius: '16px', marginTop: '15px', fontWeight: '800', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const iconBtn = { background: 'none', border: 'none', padding: '6px', cursor: 'pointer' };
const cardActions = { display: 'flex', gap: '4px' };

export default Journal;
