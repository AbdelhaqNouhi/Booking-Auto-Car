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
    router.get('/GetOneTicket', GetOneTicket);
    router.post('/CreateTicket', CreateTicket);
    router.put('/UpdateTicket', UpdateTicket);
    router.delete('/DeleteTicket', DeleteTicket);
}