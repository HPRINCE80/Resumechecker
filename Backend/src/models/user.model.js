const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Please enter a username"]
    },

    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter an email"]
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId;   // ✅ sirf tab required jab googleId na ho
        }
    },

    googleId: {
        type: String,
        required: false,
        default: null
    }
}, { timestamps: true })

const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel;