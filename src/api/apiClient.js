// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 10000,
});

export default apiClient;
