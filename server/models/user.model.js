const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        uniqued: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: String,
    active: Boolean,
    avatar: String,
})


module.exports = mongoose.model('User', UserSchema)