const JWt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const AdminModule = require('../../Models/AdminModel');


const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { full_name: '', email: '', password: '' }

    if (err.message.includes("Admin validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const RegisterAdmin = asyncHandler(async (req, res) => {
    
        const { full_name, email, password } = req.body
    
        // check length of password
        if (password.length < 8) {
            res.status(401).json({ status: "password must be at least 8 characters" })
        }
    
        //  check if all fields exists
        if (!full_name || !email || !password) {
            res.status(401)
            throw new Error("please add all fields")
        }
    
        // check if admin exists
        const AdminExists = await AdminModule.findOne({ email })

        if (AdminExists) {
            res.status(401).json({ status: "Admin already exists" })
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const HashPassword = await bcrypt.hash(password, salt)

        // create admin
        try {
            const admin = await AdminModule.create({ full_name, email, password: HashPassword })
            res.status(201).json(admin)
        }
        catch (err) {
            const errors = handleErrors(err)
            res.status(400).json({ errors })
        }
    })

const LoginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "invalid password" })
    }

    // check if all fields exists
    if (!email || !password) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // check if admin exists
    const admin = await AdminModule.findOne({ email })

    if (!admin) {
        res.status(401).json({ status: "Admin does not exists" })
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        res.status(401).json({ status: "Invalid password" })
    }

    // create token
    const token = JWt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    })

    res.status(201).json({
        token,
        admin: {
            id: admin._id,
            full_name: admin.full_name,
            email: admin.email
        }
    })
})

module.exports = {
    RegisterAdmin,
    LoginAdmin
}