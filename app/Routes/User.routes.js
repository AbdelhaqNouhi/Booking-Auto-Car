const express = require('express');
const router = express.Router();

const {
    GetAllUser,
    RegisterUser,
    LoginUser,
    GetUserBtId
} = require('../Controllers/Auth/UserController');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllUser', GetAllUser);
    router.get('/GetUserById/:id', GetUserBtId);
    router.post('/RegisterUser', RegisterUser);
    router.post('/LoginUser', LoginUser);
}