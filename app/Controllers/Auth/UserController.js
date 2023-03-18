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

const GetAllUser = asyncHandler(async (req, res) => {

    try {
        const users = await prisma.User.findMany()
        res.status(201).json(users)

    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const GetUserBtId = asyncHandler(async (req, res) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json(user)

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const CreateUser = asyncHandler(async (req, res) => {

    const { first_name, last_name , birthday, photo, phone, email, password, roleId } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    //  check if all fields exists
    if (!first_name || !last_name || !birthday || !photo || !phone || !email || !password || !roleId) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // check if user exists by email
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userExists) {
        res.status(401)
        throw new Error("user already exists")
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

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(password, salt)

    // Create the new user
    try {
        const user = await prisma.user.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                birthday: birthday,
                photo: photo,
                phone: phone,
                email: email,
                password: HashPassword,
                roleId: roleId
            }
        });
        res.status(201).json({ status: "admin created successfully", id: user.id, email: user.email })

    } catch (error) {
        const errors = handleErrors(err)
        res.status(401).json({ status: "fail", message: errors })
    }
})

const LoginUser = asyncHandler(async (req, res) => {
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

    // check if user exists
    const user = await prisma.user.findUnique({
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

    // create token
    const token = JWt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.status(201).json({ status: "success", token: token})
})

const UpdateUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, birthday, photo, phone, email, password } = req.body

    // check is email   
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    //  check if all fields exists
    if (!first_name || !last_name || !birthday || !photo || !phone || !email || !password) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(password, salt)
    
    // update User
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                first_name,
                last_name,
                birthday,
                photo,
                phone,
                email,
                password: HashPassword
            }
        })
        res.status(201).json({ status: "admin update successfully", id: admin.id, email: admin.email })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ status: "fail", message: errors })
    }
})

const DeleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(201).json({ status: "user deleted successfully" })
    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

module.exports = {
    GetAllUser,
    GetUserBtId,
    CreateUser,
    LoginUser,
    UpdateUser,
    DeleteUser
}





