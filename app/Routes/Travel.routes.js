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

module.exports = function (app, url) {
    app.use(url, router);

    router.get('/GetAllTravel', GetAllTravel);
    router.get('/GetTravelById/:id', GetTravelById);
    router.post('/CreateTravel', CreateTravel);
    router.get('/SearchTravel/:from/:to/:date', SearchTravel);
    router.put('/UpdateTravel/:id', UpdateTravel);
    router.delete('/DeleteTravel/:id', DeleteTravel);
}