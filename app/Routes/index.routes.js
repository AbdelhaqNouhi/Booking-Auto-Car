
module.exports = function (app, url) {
    require('./User.routes')(app, url);
    require('./Admin.routes')(app, url);
};