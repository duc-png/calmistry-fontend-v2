import React, { useState, useEffect, useRef } from "react";
import chatService from "../../services/chatService";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { Send, Users, MessageCircle, Hash, Plus, Search } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/ShareStories.css";

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const messagesEndRef = useRef(null);

    // Mock chat rooms - in future, fetch from API
    const chatRooms = [
        { id: 1, name: "General", description: "Community chat", icon: "💬", memberCount: 156 },
        { id: 2, name: "Support", description: "Get help and support", icon: "🤝", memberCount: 89 },
        { id: 3, name: "Wellness", description: "Health & wellness tips", icon: "🌿", memberCount: 124 },
        { id: 4, name: "Recovery", description: "Share recovery journeys", icon: "🌟", memberCount: 67 },
        { id: 5, name: "Social", description: "Make friends", icon: "✨", memberCount: 201 }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userService.getMyInfo();
                setCurrentUser(user);
                // Auto-select first room
                setSelectedRoom(chatRooms[0]);
                connectToChat(user);
            } catch (error) {
                console.error("Error fetching user info:", error);
                toast.error("Could not load user profile.");
                setIsLoading(false);
            }
        };

        fetchUser();

        return () => {
            // Cleanup WebSocket connection when component unmounts
            chatService.disconnect();
            setMessages([]); // Clear messages
        };
    }, []); // Empty dependency array - only run once on mount

    const connectToChat = (user) => {
        chatService.connect(
            (payload) => {
                const message = JSON.parse(payload.body);
                setMessages(prev => [...prev, message]);
                scrollToBottom();
            },
            () => {
                setIsConnected(true);
                setIsLoading(false);
                toast.success("Connected to chat!");
            },
            (error) => {
                setIsConnected(false);
                setIsLoading(false);
            }
        );
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser || !selectedRoom) return;

        if (!isConnected) {
            toast.error("Not connected to server.");
            return;
        }

        const messagePayload = {
            sender: { id: currentUser.id, username: currentUser.username },
            messageText: newMessage,
            messageType: 'TEXT',
            room: { id: selectedRoom.id }
        };

        chatService.sendMessage(messagePayload);
        setNewMessage("");
    };

    const filteredRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container-fluid px-4">
                <div className="row g-3" style={{ height: 'calc(100vh - 140px)' }}>

                    {/* Sidebar - Chat Rooms List */}
                    <div className="col-lg-3">
                        <div className="card shadow-sm border-0 rounded-4 h-100">
                            {/* Sidebar Header */}
                            <div className="card-header bg-white border-0 p-4">
                                <h5 className="fw-bold mb-3">Chat Rooms</h5>

                                {/* Search Bar */}
                                <div className="position-relative mb-3">
                                    <Search
                                        size={18}
                                        className="position-absolute text-muted"
                                        style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control ps-5 border-0 bg-light"
                                        placeholder="Search rooms..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Create Room Button */}
                                <button className="btn btn-success w-100 rounded-3 d-flex align-items-center justify-content-center gap-2">
                                    <Plus size={18} />
                                    <span>Create Room</span>
                                </button>
                            </div>

                            {/* Rooms List */}
                            <div className="card-body p-0 overflow-auto">
                                {filteredRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        onClick={() => setSelectedRoom(room)}
                                        className={`p-3 cursor-pointer border-bottom ${selectedRoom?.id === room.id ? 'bg-success bg-opacity-10' : ''}`}
                                        style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                        onMouseEnter={(e) => !selectedRoom || selectedRoom.id !== room.id ? e.currentTarget.style.backgroundColor = '#f8f9fa' : null}
                                        onMouseLeave={(e) => selectedRoom?.id !== room.id ? e.currentTarget.style.backgroundColor = 'white' : null}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="fs-3">{room.icon}</div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0 fw-bold">{room.name}</h6>
                                                    {selectedRoom?.id === room.id && (
                                                        <div className="badge bg-success rounded-pill">Active</div>
                                                    )}
                                                </div>
                                                <small className="text-muted d-block">{room.description}</small>
                                                <small className="text-muted">
                                                    <Users size={12} className="me-1" />
                                                    {room.memberCount} members
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="col-lg-9">
                        <div className="card shadow-lg border-0 rounded-4 h-100 d-flex flex-column">

                            {/* Chat Header */}
                            <div className="card-header bg-white p-4 border-bottom">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center gap-3">
                                        {selectedRoom && (
                                            <>
                                                <div className="fs-2">{selectedRoom.icon}</div>
                                                <div>
                                                    <h4 className="fw-bold mb-0">#{selectedRoom.name}</h4>
                                                    <p className="text-muted mb-0 small">
                                                        {selectedRoom.description} • {selectedRoom.memberCount} members
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
                                            {isConnected ? '● Live' : '● Offline'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="card-body bg-light overflow-auto p-4 flex-grow-1">
                                {isLoading ? (
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column gap-3">
                                        {messages.length === 0 ? (
                                            <div className="text-center text-muted py-5">
                                                <MessageCircle size={48} className="mb-3 opacity-50" />
                                                <p>No messages yet. Start the conversation!</p>
                                            </div>
                                        ) : (
                                            messages.map((msg, index) => {
                                                const isMe = msg.sender?.id === currentUser?.id;
                                                return (
                                                    <div key={index} className={`d-flex ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                                                        <div style={{ maxWidth: '70%' }}>
                                                            {!isMe && (
                                                                <div className="d-flex align-items-center gap-2 mb-1 ms-1">
                                                                    <div
                                                                        className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                                                                        style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
                                                                    >
                                                                        {msg.sender?.username?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <small className="text-muted fw-semibold">{msg.sender?.username}</small>
                                                                </div>
                                                            )}
                                                            <div
                                                                className={`p-3 rounded-4 shadow-sm ${isMe
                                                                    ? 'bg-success text-white'
                                                                    : 'bg-white text-dark'
                                                                    }`}
                                                                style={{
                                                                    borderBottomRightRadius: isMe ? '4px' : '16px',
                                                                    borderBottomLeftRadius: isMe ? '16px' : '4px'
                                                                }}
                                                            >
                                                                <p className="mb-0">{msg.messageText}</p>
                                                            </div>
                                                            <small className={`text-muted d-block mt-1 ${isMe ? 'text-end' : 'text-start'}`} style={{ fontSize: '0.7rem' }}>
                                                                {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </small>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Message Input */}
                            <div className="card-footer bg-white p-4 border-top">
                                <form onSubmit={handleSendMessage} className="d-flex gap-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 bg-light rounded-pill px-4"
                                        placeholder={`Message #${selectedRoom?.name || 'room'}...`}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        disabled={!isConnected || !selectedRoom}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg rounded-circle d-flex align-items-center justify-content-center"
                                        disabled={!isConnected || !newMessage.trim() || !selectedRoom}
                                        style={{ width: '56px', height: '56px' }}
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GroupChat;
