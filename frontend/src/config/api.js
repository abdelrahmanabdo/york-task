import axios from 'axios';

const _DEV = 'http://localhost:3000/';

const axiosApiInstance = axios.create({
  baseURL: _DEV,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    config.headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance;