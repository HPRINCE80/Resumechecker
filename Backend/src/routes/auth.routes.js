const express = require('express');
const authRouter = express.Router();

const authcontroller = require('../controllers/auth.controller');
// const authcontroller = require('../controllers/auth.controller');

//middleware
const authUserMiddleware = require('../middleware/auth.middleware');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authcontroller.registerUser);
authRouter.post('/login', authcontroller.loginuser);
authRouter.get('/logout', authcontroller.logoutUserController);
authRouter.post('/google', authcontroller.googleAuthController);

// ✅ path fix: 'get-me' (hyphen ke saath) + controller add kiya
authRouter.get('/get-me', authUserMiddleware.authUser, authcontroller.getMeController);

module.exports = authRouter;