const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const resumeController = require('../controllers/resume.controller');

const resumeRouter = express.Router();

/**
 * @route POST /api/resumes/
 * @description create a new resume based on user-filled details.
 * @access private
 */
resumeRouter.post('/', authMiddleware.authUser, resumeController.createResumeController);

/**
 * @route GET /api/resumes/
 * @description get all resumes created by logged in user.
 * @access private
 */
resumeRouter.get('/', authMiddleware.authUser, resumeController.getMyResumesController);

/**
 * @route GET /api/resumes/:resumeId/download
 * @description download generated resume as PDF.
 * @access private
 */
resumeRouter.get('/:resumeId/download', authMiddleware.authUser, resumeController.downloadResumePdfController);

module.exports = resumeRouter;