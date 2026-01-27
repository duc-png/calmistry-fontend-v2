/**
 * AI Chat Service
 * Handles API calls for AI chat assistant
 */

import api from './api';

const aiChatService = {
    /**
     * Send message to AI and get response
     * @param {string} message - User message
     * @returns {Promise<Object>} Chat response with AI reply
     */
    sendMessage: async (message) => {
        try {
            const response = await api.post('/ai-chat/send', { message });
            return response.result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get chat history
     * @param {number} page - Page number (default: 0)
     * @param {number} size - Page size (default: 50)
     * @returns {Promise<Object>} Chat history with messages array
     */
    getChatHistory: async (page = 0, size = 50) => {
        try {
            const response = await api.get('/ai-chat/history', {
                params: { page, size }
            });
            return response.result;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Clear all chat history
     * @returns {Promise<void>}
     */
    clearHistory: async () => {
        try {
            await api.delete('/ai-chat/history');
        } catch (error) {
            throw error;
        }
    }
};

export default aiChatService;
