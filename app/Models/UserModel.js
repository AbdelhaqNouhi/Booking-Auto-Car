const mongoose = require('mongoose')
const { isEmail } = require('validator')

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        first_name: {
            type: String,
            required: [true, "Please enter a first name"],
        },

        last_name: {
            type: String,
            required: [true, "Please enter a last name"],
        },

        birthday: {
            type: String,
            required: [true, "Please enter a birthday"],
        },

        photo: {
            type: String,
            required: [true, "Please enter a photo"],
        },

        phone: {
            type: Number,
            required: [true, "Please enter a phone"],
        },

        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },

        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Minimum password length is 6 characters"],
        },
    })
);

module.exports = User;
