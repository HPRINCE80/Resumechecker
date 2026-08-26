import axios from 'axios'; // ⚠️ agar aapka koi custom axios instance hai (jaisa interview.api.js mein tha), uska path yahan use karein

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const createResume = async (payload) => {
  const { data } = await axios.post(`${API_BASE}/resumes`, payload, { withCredentials: true });
  return data;
};

export const downloadResumePdf = async (resumeId) => {
  const response = await axios.get(`${API_BASE}/resumes/${resumeId}/download`, {
    responseType: 'blob',
    withCredentials: true,
  });
  return response.data;
};

export const getMyResumes = async () => {
  const { data } = await axios.get(`${API_BASE}/resumes`, { withCredentials: true });
  return data;
};