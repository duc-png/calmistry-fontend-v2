import api from './api';

const storyService = {
    getStories: async (page = 0, size = 10) => {
        try {
            const response = await api.get('/stories', {
                params: { page, size }
            });
            return response.result;
        } catch (error) {
            throw error;
        }
    },

    createStory: async (content, isAnonymous) => {
        try {
            const response = await api.post('/stories', { content, isAnonymous });
            return response.result;
        } catch (error) {
            throw error;
        }
    },

    likeStory: async (storyId) => {
        try {
            await api.post(`/stories/${storyId}/like`);
        } catch (error) {
            throw error;
        }
    }
};

export default storyService;
