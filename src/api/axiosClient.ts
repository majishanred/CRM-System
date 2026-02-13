import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});

export default axiosClient;
