const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[ true, "Username already exists"],
        required:[ true, "Please enter a username"]

    
    },

    email:{
        type:String,
        unique:[true, "Email already exists"],
        required:[true, "Please enter an email"]
    },
    password:{
        type:String,
        required:[true],
        unique:[true]
    }
})


const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel; 