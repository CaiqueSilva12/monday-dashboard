import axios from 'axios';
import { Project } from '../types/project';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Axios interceptor to add JWT token to all requests
axios.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Axios response interceptor to handle 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      // Don't redirect if the request is for login
      !(error.config && error.config.url && error.config.url.includes('/auth/monday/redirect'))
    ) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get(`${API_URL}/projects`);
  return data;
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const { data } = await axios.get(`${API_URL}/projects/${id}`);
  return data;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  const { data } = await axios.post(`${API_URL}/projects`, project);
  return data;
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
  const { data } = await axios.put(`${API_URL}/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/projects/${id}`);
};

export const fetchDashboardStats = async (): Promise<{ total: number; monthly: { month: string; count: number }[] }> => {
  const { data } = await axios.get(`${API_URL}/dashboard`);
  return data;
}; 