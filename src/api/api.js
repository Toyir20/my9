// api.js
import axios from 'axios';

const API_URL = 'https://my9.uz/api';

// Axios instansiyasini yaratish va umumiy headerlarni sozlash
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
});

// Tokenni headerga qo'shish uchun so'rov yuborilishidan oldin interceptor qo'shish
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Tokenni localStorage'dan olish
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// POST so'rovi
export const postData = (endpoint, data,headers) => {
    return apiClient.post(`/${endpoint}`, data,headers);
};

// GET so'rovi
export const getData = (endpoint) => {
    return apiClient.get(`/${endpoint}`);
};

// PATCH so'rovi
export const patchData = (endpoint, data) => {
    return apiClient.patch(`/${endpoint}`, data);
};
export const deleteData = (endpoint, headers) => {
    return apiClient.delete(`/${endpoint}`, { headers });
};