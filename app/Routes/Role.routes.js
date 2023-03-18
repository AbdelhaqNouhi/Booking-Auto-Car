const express = require('express');
const router = express.Router();

const {
    CreateRole,
} = require('../Controllers/RoleController');

const {
    authMiddleware,
} = require('../Middlewares/AuthMiddleware');

module.exports = function (app, url) {
    app.use(url, router);

    router.post('/createRole', authMiddleware, CreateRole);
}