const express = require('express');
const router = express.Router();

const {
    GetAllTravel,
    GetTravelById,
    CreateTravel,
    SearchTravel,
    UpdateTravel,
    DeleteTravel
} = require('../Controllers/TravelController');

const {
    authMiddleware,
} = require('../Middlewares/AuthMiddleware');


module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllTravel', authMiddleware, GetAllTravel);
    router.get('/GetTravelById/:id', authMiddleware, GetTravelById);
    router.post('/CreateTravel', authMiddleware, CreateTravel);
    router.get('/SearchTravel/:from/:to/:date', authMiddleware, SearchTravel);
    router.put('/UpdateTravel/:id', authMiddleware, UpdateTravel);
    router.delete('/DeleteTravel/:id', authMiddleware, DeleteTravel);
}