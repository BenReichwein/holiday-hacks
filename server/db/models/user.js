const mongoose = require('mongoose')

const User = new mongoose.Schema ({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', User)