const express = require('express');
const router = express.Router();

const {
    GetAllAdmin,
    CreateAdmin,
    LoginAdmin
} = require('../Controllers/Auth/AdminController');

const {
    authMiddleware,
} = require('../Middlewares/AuthMiddleware');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllAdmin', authMiddleware, GetAllAdmin);
    router.post('/CreateAdmin', authMiddleware, CreateAdmin);
    router.post('/LoginAdmin', authMiddleware, LoginAdmin);
}