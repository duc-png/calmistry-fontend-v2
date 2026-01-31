import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import fuiedsService from '../../services/fuiedsService';
import butterfly from "../../assets/butterflyhug.jpg";

import { toast } from 'react-toastify';
import { Heart, Brain, Users, Zap, Target, Shield, ArrowRight, ArrowLeft, X, Star, Moon, CheckCircle2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Timer Component (Giữ nguyên để chống nháy)
const BreathTimer = memo(({ initialSeconds, onComplete, brandGreen }) => {
    const [count, setCount] = useState(initialSeconds);
    const timerRef = useRef(null);

    useEffect(() => {
        setCount(initialSeconds);
        timerRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    if (onComplete) onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [initialSeconds, onComplete]);

    return (
        <div className="timer-display-wrapper">
            <span className="timer-number">{count}</span>
            <span className="timer-unit">s</span>
        </div>
    );
});

const FuiedsQuiz = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Màu sắc
    const brandGreen = '#324d3e';
    const lightGreen = '#74c655';
    const softBg = '#fcf7f0';

    // State Mood & Sleep Suggestion
    const [showMoodFlow, setShowMoodFlow] = useState(false);
    const [moodType, setMoodType] = useState(null);
    const [subStep, setSubStep] = useState(0);
    const [showSleepSuggestion, setShowSleepSuggestion] = useState(false); // State mới cho giấc ngủ

    const [answers, setAnswers] = useState({
        feelingsAnswer: null,
        understandingAnswer: null,
        interactionAnswer: null,
        energyAnswer: null,
        driveAnswer: null,
        stabilityAnswer: null
    });

    const questions = [
        { key: 'feelingsAnswer', title: 'Feelings', question: 'Hôm nay bạn cảm thấy thế nào?', icon: Heart, color: '#e74c3c', options: [{ value: 0, label: 'Rất tệ', emoji: '😢' }, { value: 1, label: 'Tệ', emoji: '😔' }, { value: 2, label: 'Bình thường', emoji: '😐' }, { value: 3, label: 'Tốt', emoji: '🙂' }, { value: 4, label: 'Rất tốt', emoji: '😊' }] },
        { key: 'understandingAnswer', title: 'Understanding', question: 'Bạn có hiểu và kiểm soát cảm xúc không?', icon: Brain, color: '#9b59b6', options: [{ value: 0, label: 'Hoàn toàn không', emoji: '🤯' }, { value: 1, label: 'Ít', emoji: '😕' }, { value: 2, label: 'Trung bình', emoji: '🤔' }, { value: 3, label: 'Khá', emoji: '😌' }, { value: 4, label: 'Rất rõ', emoji: '🧘' }] },
        { key: 'interactionAnswer', title: 'Interaction', question: 'Bạn tương tác với mọi người thế nào?', icon: Users, color: '#3498db', options: [{ value: 0, label: 'Cô lập', emoji: '😶' }, { value: 1, label: 'Rất ít', emoji: '🙁' }, { value: 2, label: 'Bình thường', emoji: '😊' }, { value: 3, label: 'Tích cực', emoji: '😄' }, { value: 4, label: 'Rất tuyệt vời', emoji: '🤗' }] },
        { key: 'energyAnswer', title: 'Energy', question: 'Mức năng lượng tinh thần hiện tại?', icon: Zap, color: '#f39c12', options: [{ value: 0, label: 'Kiệt sức', emoji: '😴' }, { value: 1, label: 'Thấp', emoji: '😪' }, { value: 2, label: 'Trung bình', emoji: '😐' }, { value: 3, label: 'Tốt', emoji: '⚡' }, { value: 4, label: 'Tràn đầy', emoji: '🔥' }] },
        { key: 'driveAnswer', title: 'Drive', question: 'Động lực làm việc/học tập của bạn?', icon: Target, color: '#27ae60', options: [{ value: 0, label: 'Không có', emoji: '😞' }, { value: 1, label: 'Rất ít', emoji: '😕' }, { value: 2, label: 'Bình thường', emoji: '😐' }, { value: 3, label: 'Khá tốt', emoji: '💪' }, { value: 4, label: 'Rất cao', emoji: '🚀' }] },
        { key: 'stabilityAnswer', title: 'Stability', question: 'Cảm xúc của bạn có ổn định không?', icon: Shield, color: '#16a085', options: [{ value: 0, label: 'Rất thất thường', emoji: '🌪️' }, { value: 1, label: 'Thất thường', emoji: '😰' }, { value: 2, label: 'Trung bình', emoji: '😌' }, { value: 3, label: 'Khá ổn', emoji: '😊' }, { value: 4, label: 'Rất ổn định', emoji: '🧘‍♀️' }] }
    ];

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentQuestion.key]: value });
        if (currentQuestion.key === 'feelingsAnswer') {
            setMoodType(value <= 1 ? 'sad' : (value >= 3 ? 'happy' : null));
            if (value !== 2) {
                setSubStep(0);
                setTimeout(() => setShowMoodFlow(true), 600);
            }
        }
    };

    const handleNext = () => {
        if (answers[currentQuestion.key] === null) {
            toast.warning('Vui lòng chọn một câu trả lời');
            return;
        }
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Khi nhấn nút cuối cùng (Stability), hiện gợi ý giấc ngủ thay vì submit ngay
            setShowSleepSuggestion(true);
        }
    };

    const handleSubmitQuiz = async () => {
        setIsSubmitting(true);
        try {
            const response = await fuiedsService.submitResponse(answers);
            if (response.code === 1000) {
                toast.success(`✨ Điểm FUIEDS: ${Math.round(response.result.smoothedScore)}`);
                setTimeout(() => navigate('/userDashboard'), 1500);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra!');
        } finally {
            setIsSubmitting(false);
            setShowSleepSuggestion(false);
        }
    };

    // --- Mood Flow Component ---
    const MoodFlow = () => {
        if (!showMoodFlow) return null;
        const nextSubStep = () => setSubStep(subStep + 1);

        const renderSadContent = () => {
                    switch(subStep) {
                        case 0: return (
                            <div className="text-center">
                                <p className="fs-5 mb-4 italic">“Có vẻ hôm nay mọi thứ hơi quá tải nhỉ?”</p>
                                <button className="btn btn-dark rounded-pill px-4" onClick={nextSubStep}>Tiếp tục</button>
                            </div>
                        );
                        case 1: return (
                            <div className="text-center">
                                <p className="fw-bold mb-3">Cảm xúc này đang mạnh cỡ nào? (1-5)</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    {[1,2,3,4,5].map(v => <button key={v} className="btn btn-outline-secondary rounded-circle" style={{width:45, height:45}} onClick={nextSubStep}>{v}</button>)}
                                </div>
                                <p className="fw-bold mb-3">Nó đến từ đâu nhỉ?</p>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    {['Học tập', 'Công việc', 'Gia đình', 'Tình cảm', 'Sức khoẻ'].map(tag => <button key={tag} className="btn btn-sm btn-light border rounded-pill" onClick={nextSubStep}>{tag}</button>)}
                                </div>
                            </div>
                        );
                        case 2: return (
                            <div className="text-center">
                              <h4 className="mb-2">Hơi thở (Step 0)</h4>
                              <p>“Hít thở sâu trong 1 phút nhé.” Theo nhịp 4-6-4</p>
                              <div className="breathe-container my-4">
                                <div className="breathe-background"></div>
                                <div className="breathe-circle"></div>
                                <BreathTimer initialSeconds={60} brandGreen={brandGreen} />
                              </div>
                              <div className="d-flex gap-2 justify-content-center mt-3">
                                <button className="btn btn-light rounded-pill" onClick={() => setShowMoodFlow(false)}>Để sau</button>
                                <button className="btn btn-success rounded-pill px-4" onClick={nextSubStep}>Hoàn thành</button>
                              </div>
                            </div>
                          );
                        case 3: return (
                            <div className="text-center">
                                <p>“Cảm ơn bạn. Mình tiếp tục được không?”</p>
                                <button className="btn btn-dark rounded-pill px-4" onClick={nextSubStep}>Tiếp tục</button>
                            </div>
                        );
                        case 4: return (
                            <div className="text-center">
                                <h5 className="text-uppercase text-muted small">Step 1 - Nhìn</h5>
                                <p className="fs-5 my-3">“Giúp mình nhìn quanh và nói thầm trong đầu 5 thứ bạn thấy. Mỗi thứ 1–2 giây.”</p>
                                <button className="btn btn-success rounded-pill" onClick={nextSubStep}>Xong</button>
                            </div>
                        );
                        case 5: return (
                            <div className="text-center">
                                <h5 className="text-uppercase text-muted small">Step 2 - Trấn an</h5>
                                <p className="fs-5 italic">“Nói thầm 1 câu: ‘Mình đang cảm thấy…, và mình đang an toàn ở đây.’”</p>
                                <p className="text-muted">“Lặp lại 2 lần, chậm thôi nhé.”</p>
                                <button className="btn btn-success rounded-pill" onClick={nextSubStep}>Tiếp theo</button>
                            </div>
                        );
                        case 6: return (
                            <div className="text-center">
                                <h5 className="text-uppercase text-muted small">Step 3 - Ôm kiểu bướm</h5>
                                <div className="my-3">
                                  <img
                                    src={butterfly}
                                    alt="butterfly hug"
                                    className="img-fluid"
                                    style={{ width: 400, height: 300 }}
                                  />
                                </div>
                                <p>“Gõ nhẹ luân phiên trái–phải 4 lần.”</p>
                                <button className="btn btn-success rounded-pill" onClick={nextSubStep}>Xong </button>
                            </div>
                        );
                        case 7: return (
                            <div className="text-center">
                              <h5>Step 4 - Nghe</h5>
                              <p>“Dừng lại 10 giây. Lắng tai nghe 3 âm thanh quanh bạn nhé.”</p>
                              <div className="my-3 d-flex justify-content-center">
                                 <BreathTimer initialSeconds={10} brandGreen={brandGreen} />
                              </div>
                              <button className="btn btn-success rounded-pill mt-2" onClick={nextSubStep}>Xong</button>
                            </div>
                          );
                        case 8: return (
                            <div className="text-center">
                                <h5 className="text-uppercase text-muted small">Step 5 - Ngửi & Nếm</h5>
                                <p>“Cảm nhận mùi hương và nhấp một ngụm nước nếu có thể.”</p>
                                <button className="btn btn-success rounded-pill" onClick={nextSubStep}>Xong</button>
                            </div>
                        );
                        case 9: return (
                            <div className="text-center py-2 overflow-auto" style={{maxHeight: '70vh'}}>
                                <p className="small mb-3">Bạn vừa hoàn thành hành trình quay lại thực tại...</p>
                                <p className="small mb-4 italic">"Hôm nay đường khó đi thật. Mình cứ chậm lại một chút, rồi sẽ đến nơi thôi."</p>
                                <button className="btn btn-dark rounded-pill w-100 mb-2" onClick={nextSubStep}>Kết thúc</button>
                            </div>
                        );
                        case 10: return (
                            <div className="text-center">
                                <div className="display-4 mb-2">⭐ ⭐</div>
                                <p className="fw-bold">Bạn giỏi lắm, mình có 2 sao thưởng bạn.</p>
                                <button className="btn btn-success rounded-pill w-100" onClick={() => {setShowMoodFlow(false); setSubStep(0); handleNext();}}>Tiếp tục trả lời</button>
                            </div>
                        );
                        default: return null;
                    }
                };


        const renderHappyContent = () => {
            switch(subStep) {
                case 0: return (
                    <div className="text-center">
                        <p className="fs-5 mb-4">“Chia sẻ niềm vui cho mình với?”</p>
                        <div className="d-flex gap-3 justify-content-center">
                            <button className="btn btn-light rounded-pill px-4" onClick={() => setShowMoodFlow(false)}>Bỏ qua</button>
                            <button className="btn btn-dark rounded-pill px-4" onClick={nextSubStep}>Tiếp tục</button>
                        </div>
                    </div>
                );
                case 1: return (
                    <div className="text-center">
                        <p className="fw-bold mb-4">Niềm vui này đang mạnh cỡ nào?</p>
                        <div className="d-flex justify-content-center gap-2">
                            {[1, 2, 3, 4, 5].map(v => <button key={v} className="btn btn-outline-success rounded-circle" style={{ width: 50, height: 50 }} onClick={nextSubStep}>{v}</button>)}
                        </div>
                    </div>
                );
                case 2: return (
                    <div className="text-center">
                        <p className="fw-bold mb-3">Điều gì làm bạn vui vậy?</p>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {['Thành tựu nhỏ', 'Người mình thương', 'Công việc - học tập', 'Tin vui', 'Tự hào về bản thân', 'Nghỉ ngơi – thư giãn', 'Không rõ'].map(tag => <button key={tag} className="btn btn-sm btn-light border rounded-pill px-3 py-2" onClick={nextSubStep}>{tag}</button>)}
                        </div>
                    </div>
                );
                case 3: return (
                    <div className="text-center">
                        <h5 className="text-success text-uppercase small fw-bold">Thẻ 1 - Giữ lại khoảnh khắc</h5>
                        <p className="my-3">“Dừng 10 giây nhé.”</p>
                        <div className="d-flex justify-content-center my-3"><BreathTimer initialSeconds={10} brandGreen={brandGreen} /></div>
                        <p className="small italic text-muted">“Nhìn quanh 3 thứ khiến bạn thấy dễ chịu...”</p>
                        <button className="btn btn-success rounded-pill w-100 mt-3" onClick={nextSubStep}>Hoàn thành</button>
                    </div>
                );
                case 4: return (
                    <div className="text-center">
                        <h5 className="text-success text-uppercase small fw-bold">Thẻ 2 - Biết ơn</h5>
                        <p className="my-3">Ghi lại 1 câu: <strong>“Hôm nay mình biết ơn…”</strong></p>
                        <div className="d-flex justify-content-center my-3"><BreathTimer initialSeconds={10} brandGreen={brandGreen} /></div>
                        <button className="btn btn-success rounded-pill w-100" onClick={nextSubStep}>Xong</button>
                    </div>
                );
                case 5: return (
                    <div className="text-center">
                        <h5 className="text-success text-uppercase small fw-bold">Thẻ 3 - Gửi điều tốt</h5>
                        <p className="my-3">“Nhắn cho người bạn nghĩ đến 1 câu: ‘Hôm nay mình vui vì…’”</p>
                        <div className="d-flex justify-content-center my-3"><BreathTimer initialSeconds={15} brandGreen={brandGreen} /></div>
                        <button className="btn btn-success rounded-pill w-100" onClick={nextSubStep}>Tiếp theo</button>
                    </div>
                );
                case 6: return (
                    <div className="text-center">
                        <p className="small mb-4 italic" style={{lineHeight: '1.6'}}>"Vũ trụ sẽ luôn gửi đến bạn những điều đáng yêu..."</p>
                        <button className="btn btn-dark rounded-pill w-100" onClick={nextSubStep}>Kết thúc</button>
                    </div>
                );
                case 7: return (
                    <div className="text-center py-3">
                        <div className="display-4 mb-2">⭐ ⭐</div>
                        <p className="fw-bold text-success">Chia vui nhé, mình có 2 sao thưởng bạn!</p>
                        <button className="btn btn-success rounded-pill w-100 mt-3" onClick={() => {setShowMoodFlow(false); handleNext();}}>Tiếp tục trả lời</button>
                    </div>
                );
                default: return null;
            }
        };

        return (
            <div className="mood-overlay shadow">
                <div className="mood-card shadow-lg p-4">
                    {moodType === 'sad' ? renderSadContent() : renderHappyContent()}
                </div>
            </div>
        );
    };

    // --- Sleep Suggestion Modal ---
    const SleepSuggestionModal = () => {
        if (!showSleepSuggestion) return null;
        return (
            <div className="mood-overlay">
                <div className="mood-card p-4 text-center">
                    <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex p-3 mb-3">
                        <Moon size={32} className="text-primary" />
                    </div>
                    <h5 className="fw-bold mb-3">Chúc mừng đoạn đã hoàn thành!</h5>
                    <p className="text-muted mb-4">Bạn muốn mình check nhanh giấc ngủ đêm qua không? <br/>(Chỉ mất 30 giây)</p>
                    <p className="text-muted mb-4">Điều này sẽ giúp kết quả chính xác hơn</p>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary rounded-pill py-2 fw-bold" onClick={() => {
                                                                                        toast.info("Chuyển đến phần Sleep Check...");
                                                                                        handleSubmitQuiz();
                                                                                        navigate('/sleepManagement');
                                                                                      }}
                                                                >Kiểm tra ngay</button>
                        <button className="btn btn-light rounded-pill py-2" onClick={handleSubmitQuiz}>Để sau, nhận điểm ngay!</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: softBg, paddingTop: '100px', paddingBottom: '80px' }}>
            <MoodFlow />
            <SleepSuggestionModal />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        {/* Header & Progress Bar */}
                        <div className="text-center mb-5">
                            <span className="badge rounded-pill mb-2 px-3 py-2" style={{ backgroundColor: lightGreen + '20', color: brandGreen }}>FUIEDS ASSESSMENT</span>
                            <h2 className="fw-bold mb-2" style={{ color: brandGreen }}>Hành trình thấu hiểu bản thân</h2>
                        </div>

                        <div className="px-2 mb-4">
                            <div className="d-flex justify-content-between align-items-end mb-2">
                                <span className="fw-bold" style={{ color: brandGreen }}>Bước {currentStep + 1} / {questions.length}</span>
                                <span className="small fw-bold" style={{ color: lightGreen }}>{Math.round(progress)}% hoàn thành</span>
                            </div>
                            <div className="progress rounded-pill" style={{ height: '10px' }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%`, backgroundColor: brandGreen }} />
                            </div>
                        </div>

                        {/* Quiz Card */}
                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden mb-4">
                            <div className="card-body p-4 p-md-5">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: currentQuestion.color + '15', color: currentQuestion.color }}><currentQuestion.icon size={24} /></div>
                                    <h5 className="mb-0 fw-bold">{currentQuestion.title}</h5>
                                </div>
                                <h3 className="mb-5 text-center px-lg-4 fw-bold">{currentQuestion.question}</h3>
                                <div className="quiz-options d-grid gap-3">
                                    {currentQuestion.options.map((option) => (
                                        <div key={option.value} onClick={() => handleAnswer(option.value)} className={`option-item p-3 rounded-4 d-flex align-items-center justify-content-between cursor-pointer transition-all ${answers[currentQuestion.key] === option.value ? 'selected' : ''}`} style={{ border: `2px solid ${answers[currentQuestion.key] === option.value ? brandGreen : '#f1f3f2'}` }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <span style={{ fontSize: '1.8rem' }}>{option.emoji}</span>
                                                <span className="fw-medium">{option.label}</span>
                                            </div>
                                            <div className={`check-dot rounded-circle ${answers[currentQuestion.key] === option.value ? 'active' : ''}`} style={{ width: '20px', height: '20px', border: '2px solid #ddd', backgroundColor: answers[currentQuestion.key] === option.value ? brandGreen : 'transparent' }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0} className="btn rounded-pill px-4 btn-light border"><ArrowLeft size={18} /> Quay lại</button>
                            <button onClick={handleNext} disabled={isSubmitting} className="btn rounded-pill px-5 fw-bold text-white shadow-sm" style={{ backgroundColor: brandGreen }}>
                                {currentStep === questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .option-item:hover { transform: translateY(-2px); border-color: ${lightGreen} !important; background-color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .option-item.selected { background-color: #fff; box-shadow: 0 4px 15px rgba(50, 77, 62, 0.1); }
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.25s ease; }
                .mood-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(50, 77, 62, 0.4); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; }
                .mood-card { background: white; width: 90%; max-width: 450px; border-radius: 30px; position: relative; animation: slideUp 0.4s ease-out; }
                .timer-display-wrapper { font-family: 'Courier New', monospace; color: ${brandGreen}; }
                .timer-number { font-size: 2.5rem; font-weight: 800; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default FuiedsQuiz;