import axios from 'axios';
const api= 'http://localhost:5000/'

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;