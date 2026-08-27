import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resumechecker-backend-m0ww.onrender.com',
  withCredentials: true,
});

export const createResume = async (payload) => {
  const { data } = await api.post('/api/resumes', payload);
  return data;
};

export const downloadResumePdf = async (resumeId) => {
  const response = await api.get(`/api/resumes/${resumeId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

export const getMyResumes = async () => {
  const { data } = await api.get('/api/resumes');
  return data;
};