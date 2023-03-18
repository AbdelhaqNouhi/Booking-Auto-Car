
module.exports = function (app, url) {
    require('./User.routes')(app, url);
    require('./Role.routes')(app, url);
    require('./Ticket.routes')(app, url);
    require('./Travel.routes')(app, url);
};