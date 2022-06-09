// const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    avatar: {
        type: String
    },
    avatarID: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

module.exports = mongoose.model("items", postSchema);