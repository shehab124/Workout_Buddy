require('dotenv').config() //used to load environment variables from .env file

const express = require('express')
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error);
    })


// middleware
app.use(express.json()) // to be able to access POST req body in json
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);