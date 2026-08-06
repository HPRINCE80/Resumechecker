const jwt = require("jsonwebtoken");
const usermodel = require('../models/user.model');

async function registerUser(req, res) {

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
        /*if user Already exists */
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new usermodel({
        username,
        email,
        password: hash
    })




    const generateToken = (userId) => {
        return jwt.sign(
            { id: userId },           // payload - jo data token ke andar store karna hai
            process.env.JWT_SECRET,   // secret key
            { expiresIn: process.env.JWT_EXPIRES_IN } // token kab expire hoga
        );
    };
   
    res.cookie('token', token)

    res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        token: generateToken(newUser._id)
    });
    
}


async function loginuser(req, res){
    const {email, password} = req.body;

    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )

    res.cookie('token', token)
    res.status(200).json({
        message:"Login successful",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
 
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeController(req, res) {
    const user =  await userModel.findOne(req.user.id )

    res.status(200).json({

        message : "User fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }

    })
}


module.exports = { registerUser, loginuser, logoutUserController, getMeController };