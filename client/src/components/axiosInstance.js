// src/axiosInstance.js
import axios from 'axios';

// Base Axios instance setup
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL

  headers: {
    'Content-Type': 'application/json', // Default header
  },
});

export default axiosInstance;
