// lib/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8888/api', // آدرس پایه API شما
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
