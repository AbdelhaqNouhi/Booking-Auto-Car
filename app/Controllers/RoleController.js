const { PrismaClient } = require('@prisma/client')
const asyncHandler = require('express-async-handler')

const prisma = new PrismaClient()

const CreateRole = asyncHandler(async (req, res) => {

    const { role } = req.body;
    //  check if role already exists
    const addRole = await prisma.role.findUnique({
        where: {
            role: role,
            
        }
    })
    if (addRole) {
        res.status(401).json({ status: "fail", message: "role already exists" })
    }

    try {
        const newRole = await prisma.role.create({
            data: {
                role: role
            }
        });
        res.status(201).json(newRole)
    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const GetAllRole = asyncHandler(async (req, res) => {
    try {
        const roles = await prisma.role.findMany();
        res.status(201).json(roles)
    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})


const deleteRole = asyncHandler(async (req, res) => {
    try {
        const role = await prisma.role.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(201).json(role)
    } catch (err) {
        res.status(401).json({ status: "fail", message: err.message })
    }
})

module.exports = {
    CreateRole,
    GetAllRole,
    deleteRole
}