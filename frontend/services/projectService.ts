import axios from 'axios';
import { Project } from '../types/project';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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