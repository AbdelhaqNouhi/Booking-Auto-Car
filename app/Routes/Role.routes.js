const express = require('express');
const router = express.Router();

const {
    CreateRole,
} = require('../Controllers/RoleController');

module.exports = function (app, url) {
    app.use(url, router);

    router.post('/createRole', CreateRole);
}