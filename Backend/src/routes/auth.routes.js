const express = require('express');
const authRouter = express.Router();

const authcontroller = require('../controllers/auth.controllers');


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


authRouter.get('/getme',authUserMiddleware.authUser);
module.exports = authRouter;