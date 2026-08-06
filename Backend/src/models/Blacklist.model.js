const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true, "Token is required"],
    }
},{
    timestamps:true
})

const tokenBlacklistModel = mongoose.model('TokenBlacklist',blacklistSchema);

module.exports = tokenBlacklistModel;