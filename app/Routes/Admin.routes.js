const express = require('express');
const router = express.Router();

const {
    RegisterAdmin,
    LoginAdmin
} = require('../Controllers/Auth/AdminController');

module.exports = function (app, url) {
    app.use(url, router);

    router.post('/RegisterAdmin', RegisterAdmin);
    router.post('/LoginAdmin', LoginAdmin);
}