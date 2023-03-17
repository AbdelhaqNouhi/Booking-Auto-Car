const jwt = require ('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const UsersModule = require ('../Models/UserModel')

const Protected = asyncHandler (async (req, res, next) => {
    let token  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            //  Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token 
            req.user = await UsersModule.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({status: 'not authorized'})
        }
    }

    if(!token) {
        res.status(401).json({ status: 'not authorized, no token' })
    }
})

module.exports = {
    Protected 
}