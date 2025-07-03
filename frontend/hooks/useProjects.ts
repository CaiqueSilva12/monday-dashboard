import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/projectService';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}; 