const express = require('express');
const router = express.Router();

const {
    GetAllUser,
    CreateUser,
    LoginUser,
    GetUserBtId,
    UpdateUser,
    DeleteUser
} = require('../Controllers/Auth/UserController');

const {
    authMiddleware,
} = require('../Middlewares/AuthMiddleware');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllUser', authMiddleware, GetAllUser);
    router.get('/GetUserById/:id', authMiddleware, GetUserBtId);
    router.post('/CreateUser', authMiddleware, CreateUser);
    router.post('/LoginUser', authMiddleware, LoginUser);
    router.put('/UpdateUser/:id', authMiddleware, UpdateUser);
    router.delete('/DeleteUser/:id', authMiddleware, DeleteUser);
}