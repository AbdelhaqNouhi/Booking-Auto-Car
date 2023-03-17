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

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllUser', GetAllUser);
    router.get('/GetUserById/:id', GetUserBtId);
    router.post('/CreateUser', CreateUser);
    router.post('/LoginUser', LoginUser);
    router.put('/UpdateUser/:id', UpdateUser);
    router.delete('/DeleteUser/:id', DeleteUser);
}