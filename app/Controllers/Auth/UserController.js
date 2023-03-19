const JWt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const handleErrors = (err) => {
    let errors = { prenom, nom, date_de_naissance, telephone, email, mot_de_passe, roleId }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const GetAllUser = asyncHandler(async (req, res) => {

    try {
        const users = await prisma.Utilisateur.findMany()
        res.status(201).json(users)

    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const GetUserBtId = asyncHandler(async (req, res) => {

    try {
        const user = await prisma.Utilisateur.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json(user)

    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

// const CreateUser = asyncHandler(async (req, res) => {

//     const { prenom, nom, date_de_naissance, telephone, email, mot_de_passe } = req.body

//     // check is email
//     if (!email.includes('@')) {
//         res.status(401).json({ status: "invalid email" })
//     }

//     // check length of password
//     if (mot_de_passe.length < 8) {
//         res.status(401).json({ status: "password must be at least 8 characters" })
//     }

//     //  check if all fields exists
//     if (!prenom || !nom || !date_de_naissance || !telephone || !email || !mot_de_passe) {
//         res.status(401)
//         throw new Error("please add all fields")
//     }

//     // check if user exists by email
//     const userExists = await prisma.Utilisateur.findUnique({
//         where: {
//             email: email
//         }
//     })
//     if (userExists) {
//         res.status(401)
//         throw new Error("user already exists")
//     }

//     // chick if role exists
//     // const roleExists = await prisma.role.findUnique({
//     //     where: {
//     //         id: parseInt(roleId)
//     //     }
//     // })
//     // if (!roleExists) {
//     //     res.status(401)
//     //     throw new Error("role not found")
//     // }
//     // Hash password
//     const salt = await bcrypt.genSalt(10)
//     const HashPassword = await bcrypt.hash(mot_de_passe, salt)

//     // Create the new user
//     try {
//         const user = await prisma.utilisateur.create({
//             data: {
//                 prenom,
//                 nom,
//                 date_de_naissance,
//                 telephone,
//                 email,
//                 mot_de_passe: HashPassword,
//                 // roleId: parseInt(roleId)
//             }
//         });
//         res.status(201).json({ status: "admin created successfully", id: user.id, email: user.email })

//     } catch (error) {
//         res.status(401).json({ status: "fail", message: error.message })
//     }
// })

const CreateUser = asyncHandler(async (req, res) => {

    const { prenom, nom, date_de_naissance, telephone, email, mot_de_passe } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (mot_de_passe.length < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    //  check if all fields exists

    if (!prenom || !nom || !date_de_naissance || !telephone || !email || !mot_de_passe) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // check if user exists by email
    const userExists = await prisma.utilisateur.findUnique({
        where: {
            email: email
        }
    })

    if (userExists) {
        res.status(401)
        throw new Error("user already exists")
    }

    // chick if role exists
    const { role: role } = req.body;

    // Check if role exists
    const roleExists = await prisma.role.findUnique({
        where: {
            role: role,
        },
    });

    if (!roleExists) {
        res.status(401);
        throw new Error("Role not found");
    }


    // Hash password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(mot_de_passe, salt)

    // Create the new user
    try {
        const user = await prisma.utilisateur.create({
            data: {
                prenom,
                nom,
                date_de_naissance,
                telephone,
                email,
                mot_de_passe: HashPassword,
                role: {
                    connect: {
                        role: role,
                    },
                },
            },
        });
        res.status(201).json({
            status: "admin created successfully",
            id: user.id,
            email: user.email,
        });
    } catch (error) {
        res.status(401).json({ status: "fail", message: error.message });
    }
})


const LoginUser = asyncHandler(async (req, res) => {
    const { email, mot_de_passe } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    // check length of password
    if (mot_de_passe < 8) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    //  check if all fields exists
    if (!email || !mot_de_passe) {
        res.status(401).status('same thing is wrong with you..!!')
    }

    // check if user exists
    const user = await prisma.Utilisateur.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe)
    if (!isMatch) {
        res.status(401).json({ status: "invalid email or password..!!" })
    }

    // create token
    const token = JWt.sign({ id: user.roleId }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.status(201).json({ status: "success", token: token, roleId: user.roleId})
})

const UpdateUser = asyncHandler(async (req, res) => {
    const { prenom, nom, date_de_naissance, telephone, email, mot_de_passe} = req.body

    // check is email   
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (mot_de_passe < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    //  check if all fields exists
    if (!prenom || !nom || !date_de_naissance || !telephone || !email || !mot_de_passe) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(mot_de_passe, salt)
    
    // update User
    try {
        const user = await prisma.Utilisateur.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                prenom,
                nom,
                date_de_naissance,
                telephone,
                email,
                mot_de_passe: HashPassword
            }
        })
        res.status(201).json({ status: "user updated successfully", user: user })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ status: "fail", message: errors })
    }
})

const DeleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await prisma.Utilisateur.delete({
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





