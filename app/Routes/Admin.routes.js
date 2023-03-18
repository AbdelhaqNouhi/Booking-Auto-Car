const express = require('express');
const router = express.Router();

const {
    GetAllAdmin,
    CreateAdmin,
    LoginAdmin
} = require('../Controllers/Auth/AdminController');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllAdmin', GetAllAdmin);
    router.post('/CreateAdmin', CreateAdmin);
    router.post('/LoginAdmin', LoginAdmin);
}