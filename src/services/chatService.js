import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { toast } from 'react-toastify';

const WS_URL = 'http://localhost:8080/calmistry/ws';

class ChatService {
    constructor() {
        this.stompClient = null;
    }

    connect(onMessageReceived, onConnectedCallback, onErrorCallback) {
        const socket = new SockJS(WS_URL);
        this.stompClient = Stomp.over(socket);

        // Disable debug logs for cleaner console
        this.stompClient.debug = () => { };

        this.stompClient.connect({},
            () => {
                // Subscribe to Public Topic
                this.stompClient.subscribe('/topic/public', onMessageReceived);

                // Add user to chat (optional, triggers "join" message)
                // this.stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: 'JOIN' }));

                if (onConnectedCallback) onConnectedCallback();
            },
            (error) => {
                console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
                if (onErrorCallback) onErrorCallback(error);
                toast.error("Lost connection to chat server.");
            }
        );
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    sendMessage(message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
        } else {
            toast.error("Not connected to chat.");
        }
    }
}

export default new ChatService();
