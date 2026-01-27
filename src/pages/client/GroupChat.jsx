import React, { useState, useEffect, useRef } from "react";
import chatService from "../../services/chatService";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { Send, Users, MessageCircle } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
// Reusing some styles from ShareStories if applicable, or custom ones
import "../../styles/ShareStories.css";

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Fetch User Info first
        const fetchUser = async () => {
            try {
                const user = await userService.getMyInfo();
                setCurrentUser(user);
                connectToChat(user);
            } catch (error) {
                console.error("Error fetching user info:", error);
                toast.error("Could not load user profile.");
                setIsLoading(false);
            }
        };

        fetchUser();

        return () => {
            chatService.disconnect();
        };
    }, []);

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
                toast.success("Connected to Group Chat!");
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
        if (!newMessage.trim() || !currentUser) return;

        if (!isConnected) {
            toast.error("Not connected to server.");
            return;
        }

        const messagePayload = {
            sender: { id: currentUser.id, username: currentUser.username }, // minimal sender info
            messageText: newMessage,
            messageType: 'TEXT',
            room: { id: 1 } // Default Public Room ID 1 (Backend must handle creation/lookup)
        };

        chatService.sendMessage(messagePayload);
        setNewMessage("");
    };

    return (
        <div className="container-fluid min-vh-100 bg-light py-5">
            <div className="container">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ height: '80vh' }}>

                    {/* Header */}
                    <div className="card-header bg-white p-4 border-bottom">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                                    <Users className="text-success" size={24} />
                                </div>
                                <div>
                                    <h2 className="h4 fw-bold mb-1">Community Chat</h2>
                                    <p className="text-muted mb-0 small">
                                        {isConnected ?
                                            <span className="text-success">● Live</span> :
                                            <span className="text-danger">● Disconnected</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div className="card-body bg-light overflow-auto p-4" style={{ flex: 1 }}>
                        {isLoading ? (
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender?.id === currentUser?.id;
                                    return (
                                        <div key={index} className={`d-flex ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div style={{ maxWidth: '70%' }}>
                                                {!isMe && <small className="text-muted d-block mb-1 ms-1">{msg.sender?.username}</small>}
                                                <div
                                                    className={`p-3 rounded-4 shadow-sm ${isMe
                                                        ? 'bg-success text-white rounded-bottom-right-0'
                                                        : 'bg-white text-dark rounded-bottom-left-0'
                                                        }`}
                                                >
                                                    {msg.messageText}
                                                </div>
                                                <small className="text-muted d-block mt-1 text-end" style={{ fontSize: '0.7rem' }}>
                                                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </small>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Footer / Input */}
                    <div className="card-footer bg-white p-3 border-top">
                        <form onSubmit={handleSendMessage} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control form-control-lg border-0 bg-light"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={!isConnected}
                            />
                            <button
                                type="submit"
                                className="btn btn-success btn-lg px-4 rounded-3"
                                disabled={!isConnected || !newMessage.trim()}
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GroupChat;
