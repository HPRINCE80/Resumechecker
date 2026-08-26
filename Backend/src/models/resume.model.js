const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  startDate: String,
  endDate: String,
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  location: String,
  summary: String,
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [String],
  projects: [projectSchema],
  certifications: [String],
  template: { type: String, enum: ['modern', 'minimal'], default: 'modern' },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);