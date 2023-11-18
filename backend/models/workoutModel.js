const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        require: true
    }
}, { timestamps: true });

// pass collection name, and schema
module.exports = mongoose.model('Workout', workoutSchema);