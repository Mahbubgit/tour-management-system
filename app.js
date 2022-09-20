const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

//routes
const tourRoute = require('./routes/tour.route');

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Tour Management System.')
})

app.use('/app/v1/tours', tourRoute);

module.exports = app;