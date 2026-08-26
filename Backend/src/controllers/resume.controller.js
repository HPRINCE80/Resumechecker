const resumeModel = require('../models/resume.model');
const { generateResumePdfBuffer } = require('../services/resumePdf.service');

async function createResumeController(req, res) {
  try {
    const { fullName, email, phone, location, summary, experience, education, skills, projects, certifications, template } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ message: 'Full name is required.' });
    }

    const resume = await resumeModel.create({
      user: req.user.id,
      fullName, email, phone, location, summary,
      experience: experience || [],
      education: education || [],
      skills: skills || [],
      projects: projects || [],
      certifications: certifications || [],
      template: template || 'modern',
    });

    res.status(201).json({ message: 'Resume created successfully.', resume });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: error.message || 'Failed to create resume.' });
  }
}

async function downloadResumePdfController(req, res) {
  try {
    const { resumeId } = req.params;
    const resume = await resumeModel.findOne({ _id: resumeId, user: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    const pdfBuffer = await generateResumePdfBuffer(resume.toObject(), resume.template);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=resume_${resume.fullName.replace(/\s+/g, '_')}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Download resume PDF error:', error);
    res.status(500).json({ message: error.message || 'Failed to generate PDF.' });
  }
}

async function getMyResumesController(req, res) {
  try {
    const resumes = await resumeModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('fullName template createdAt');
    res.status(200).json({ message: 'Resumes fetched successfully.', resumes });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch resumes.' });
  }
}

module.exports = { createResumeController, downloadResumePdfController, getMyResumesController };