const mongoose = require('mongoose');
const {Schema, model} = mongoose

const userSchema = Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String, required: true},
},{timestamps: true})

module.exports = model('user', userSchema)