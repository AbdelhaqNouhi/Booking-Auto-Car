const JWt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const handleErrors = (err) => {
    let errors = { first_name: '', last_name: '', cin: '', phone: '', email: '', password: '' }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const GetAllAdmin = asyncHandler(async (req, res) => {
    
    try {
        const admins = await prisma.admin.findMany()
        res.status(201).json(admins)

    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const CreateAdmin = asyncHandler(async (req, res) => {
    
    const { first_name, last_name, email, password, roleId } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    // check if all fields are exist
    if (!first_name || !last_name || !email || !password || !roleId) {
        res.status(401).json({ status: "please fill all fields" })
    }

    // check if user exists by email
    const user = await prisma.admin.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        res.status(401).json({ status: "user already exists" })
    }

    // chick if role exists
    const roleExists = await prisma.role.findUnique({
        where: {
            id: parseInt(roleId)
        }
    })
    if (!roleExists) {
        res.status(401)
        throw new Error("role not found")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    try {
        const admin = await prisma.admin.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                roleId: parseInt(roleId)
            }
        })
        res.status(201).json(admin)

    } catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ status: "fail", message: errors })
    }
})

const LoginAdmin = asyncHandler(async (req, res) => {
        
    const { email, password } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    //  check if all fields exists
    if (!email || !password) {
        res.status(401).status('same thing is wrong with you..!!')
    }

    // check if user exists by email
    const user = await prisma.admin.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    //  create token
    const token = JWt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.status(201).json({ status: "success", token: token })
})

module.exports = {
    GetAllAdmin,
    CreateAdmin,
    LoginAdmin
}
