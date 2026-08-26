const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const usermodel = require("../models/user.model");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ========================================
// Generate JWT Token
// ========================================
function generateToken(userId) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );
}

// ========================================
// Set Authentication Cookie
// ========================================
function setAuthCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
}

// ========================================
// Register User
// ========================================
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        const isUserExist = await usermodel.findOne({
            $or: [{ username }, { email }],
        });

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new usermodel({
            username,
            email,
            password: hash,
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        setAuthCookie(res, token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Register error:", err);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

// ========================================
// Login User
// ========================================
async function loginuser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (!user.password) {
            return res.status(400).json({
                message: "Please login using Google",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        // Set cookie
        setAuthCookie(res, token);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

// ========================================
// Logout
// ========================================
async function logoutUserController(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        return res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (err) {
        console.error("Logout error:", err);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

// ========================================
// Get Current User
// ========================================
async function getMeController(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const user = await usermodel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("GetMe error:", err);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

// ========================================
// Google Authentication
// ========================================
async function googleAuthController(req, res) {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                message: "Google ID token is required",
            });
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            sub: googleId,
        } = payload;

        if (!email) {
            return res.status(400).json({
                message: "Google email not found",
            });
        }

        let user = await usermodel.findOne({ email });

        if (!user) {
            user = new usermodel({
                username: name || email.split("@")[0],
                email,
                googleId,
            });

            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        // Generate JWT
        const token = generateToken(user._id);

        // IMPORTANT:
        // Same cookie configuration as normal login
        setAuthCookie(res, token);

        return res.status(200).json({
            message: "Google login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Google authentication error:", err);

        return res.status(500).json({
            message: "Google authentication failed",
        });
    }
}

// ========================================
// Export
// ========================================
module.exports = {
    registerUser,
    loginuser,
    logoutUserController,
    getMeController,
    googleAuthController,
};

