const express = require('express');
const router = express.Router();

const {
    GetAllTicket,
    GetOneTicket,
    CreateTicket,
    UpdateTicket,
    DeleteTicket
} = require('../Controllers/TicketController');

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllTicket', GetAllTicket);
    router.get('/GetOneTicket/:id', GetOneTicket);
    router.post('/CreateTicket', CreateTicket);
    router.put('/UpdateTicket/:id', UpdateTicket);
    router.delete('/DeleteTicket/:id', DeleteTicket);
}