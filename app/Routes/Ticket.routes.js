const express = require('express');
const router = express.Router();

const {
    GetAllTicket,
    GetOneTicket,
    CreateTicket,
    UpdateTicket,
    DeleteTicket
} = require('../Controllers/TicketController');

const {
    authMiddleware,
} = require('../Middlewares/AuthMiddleware');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllTicket', authMiddleware, GetAllTicket);
    router.get('/GetOneTicket/:id', authMiddleware, GetOneTicket);
    router.post('/CreateTicket', authMiddleware, CreateTicket);
    router.put('/UpdateTicket/:id', authMiddleware, UpdateTicket);
    router.delete('/DeleteTicket/:id', authMiddleware, DeleteTicket);
}