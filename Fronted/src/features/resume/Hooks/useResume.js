
import { useState, useCallback } from 'react';
import { createResume, downloadResumePdf, getMyResumes } from '../Services/resume.api.js';

export const useResume = () => {
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');

  const generateResume = useCallback(async (formData) => {
    setLoading(true);
    setError('');
    try {

      const { resume } = await createResume(formData);

      if (!resume || !resume._id) {
        throw new Error('Resume create nahi ho paaya. Kripya dobara login karke try karein.');
      }

      const pdfBlob = await downloadResumePdf(resume._id);

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${formData.fullName.replace(/\s+/g, '_')}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      return resume;
    } catch (err) {
      setError(err?.response?.data?.message || 'Resume generate karne mein error aaya.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyResumes = useCallback(async () => {
    try {
      const { resumes } = await getMyResumes();
      setResumes(resumes);
    } catch (err) {
      console.error('Fetch resumes error:', err);
    }
  }, []);

  return { loading, error, resumes, generateResume, fetchMyResumes };
};