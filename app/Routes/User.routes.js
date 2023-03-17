const express = require('express');
const router = express.Router();

const {
    GetAllUser,
    CreateUser,
    LoginUser,
    GetUserBtId
} = require('../Controllers/Auth/UserController');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllUser', GetAllUser);
    router.get('/GetUserById/:id', GetUserBtId);
    router.post('/CreateUser', CreateUser);
    router.post('/LoginUser', LoginUser);
}