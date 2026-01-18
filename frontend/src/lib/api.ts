import axios, { AxiosResponse } from 'axios';
import { Task } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and network errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      // Token might be expired, remove it
      localStorage.removeItem('access_token');
      // Don't redirect immediately; let the calling component handle the error
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      // Handle network errors (backend not running, etc.)
      console.warn('Network error occurred:', error.message);
      // Don't reject immediately; let the calling component handle this
    }
    return Promise.reject(error);
  }
);

// API functions
export const taskApi = {
  // Get all tasks
  getTasks: (completed?: boolean): Promise<AxiosResponse<{ items: Task[] }>> => {
    const params = completed !== undefined ? { completed } : {};
    return apiClient.get('/api/tasks', { params });
  },

  // Create a new task
  createTask: (taskData: { description: string }): Promise<AxiosResponse<Task>> => {
    return apiClient.post('/api/tasks', taskData);
  },

  // Get a specific task
  getTask: (taskId: string): Promise<AxiosResponse<Task>> => {
    return apiClient.get(`/api/tasks/${taskId}`);
  },

  // Update a task
  updateTask: (taskId: string, taskData: { description?: string }): Promise<AxiosResponse<Task>> => {
    return apiClient.put(`/api/tasks/${taskId}`, taskData);
  },

  // Delete a task
  deleteTask: (taskId: string): Promise<AxiosResponse<void>> => {
    return apiClient.delete(`/api/tasks/${taskId}`);
  },

  // Update task completion status
  updateTaskCompletion: (taskId: string, completed: boolean): Promise<AxiosResponse<Task>> => {
    return apiClient.patch(`/api/tasks/${taskId}/complete`, { completed });
  },
};

export default apiClient;