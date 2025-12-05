import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Config, { logConfig } from './env.config';

// Base API configuration
const apiConfig: AxiosInstance = axios.create({
  baseURL: Config.api.url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Add CORS headers if needed
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

if (__DEV__) {
  console.log('API Base URL:', Config.api.url);
  logConfig();
}

// Request interceptor to add bearer token
apiConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add bearer token if available (you can get it from storage or state)
    const token = 'your-bearer-token-here'; // Replace with actual token retrieval logic
    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiConfig.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiConfig;
