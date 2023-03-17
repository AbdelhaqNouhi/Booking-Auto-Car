const mongoose = require('mongoose')
const { isEmail } = require('validator')

const User = mongoose.model(
    "User",
    new mongoose.Schema({

        first_name: {
            type: String,
            required: [true, 'Please add a first name'],
        },

        last_name: {
            type: String,
            required: [true, 'Please add a last name'],
        },

        email: {
            type: String,
            required: [true, 'Please add a email'],
            trim: true,
            lowercase: true,
            unique: true,
            validate: [isEmail, 'Please add a valid email']
        },

        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [8, 'Minimum password length is 8 characters']
        },
    })
);

module.exports = User;
