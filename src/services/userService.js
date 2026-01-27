import api from './api';

const userService = {
    getMyInfo: async () => {
        try {
            const response = await api.get('/users/my-info');
            return response.result;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
