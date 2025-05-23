import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7102/api',
    timeout: 10000
});

export default api;
