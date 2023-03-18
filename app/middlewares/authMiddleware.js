const jwt = require ('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const { PrismaClient } = require ('@prisma/client')

const prisma = new PrismaClient()

const authMiddleware = asyncHandler (async (req, res, next) => {
    let token

    if ( req.headers.authorization && req.headers.authorization.startsWith ('Bearer')) {
        try {
            token = req.headers.authorization.split (' ')[1]

            const decoded = jwt.verify (token, process.env.JWT_SECRET)

            req.user = await prisma.role.findUnique ({
                where: {
                    id: decoded.id,
                },
            })
            console.log(decoded.id);
            
            next ()
        } catch (error) {
            console.error (error)
            res.status (401)
            throw new Error ('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status (401)
        throw new Error ('Not authorized, no token')
    }
})


const userMiddleware = asyncHandler(async(req, res, next) => {
    console.log(prisma.user.roleId);
    if (prisma.user.roleId === 2) {
        next()
    } else {
        return res.status(403).json({ message: 'Access denied: User role required.' });
    }
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
    if (prisma.user.roleId === 1) {
        next()
    } else {
        return res.status(403).json({ message: 'Access denied: Admin role required.' });
    }
});

module.exports = {
    authMiddleware,
    userMiddleware,
    adminMiddleware
}