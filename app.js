const express = require('express');
const dotenv = require('dotenv').config();
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cors = require("cors");

const globalErrorHandler = require("./app/middlewares/errorMiddleware");
const AppError = require("./app/middlewares/appErrorMiddleware");
const app = express();

// Allow Cross - Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: "15kb",
}));

const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: {
        status: "fail",
        message: "Too many requests from this IP, please try again in an hour!",
    },
});
app.use("/api", limiter);

// inetialize routes
require("./app/Routes/index.routes")(app, "/api");


// handle undefined Routes
app.use("*", (req, res, next) => {
    const err = new AppError(404, "fail", "undefined route");
    next(err, req, res, next);
});

app.use(globalErrorHandler);

module.exports = app;