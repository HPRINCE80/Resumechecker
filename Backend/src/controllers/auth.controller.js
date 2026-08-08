const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usermodel = require('../models/user.model');

function generateToken(userId) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing in environment variables');
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
}

function setAuthCookie(res, token) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    });
}

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const isUserExist = await usermodel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new usermodel({
            username,
            email,
            password: hash
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        setAuthCookie(res, token);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function loginuser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = generateToken(user._id);
        setAuthCookie(res, token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function logoutUserController(req, res) {
    try {
        res.clearCookie('token', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });

        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function getMeController(req, res) {
    try {
        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('GetMe error:', err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { registerUser, loginuser, logoutUserController, getMeController };