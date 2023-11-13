const workoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {

    const workouts = await workoutModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    const workout = await workoutModel.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
}

// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        await workoutModel.create({ title, load, reps });
        res.status(200);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    const workout = await workoutModel.findByIdAndDelete({ _id: id });

    if (!workout) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    const workout = await workoutModel.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!workout) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    res.status(200).json(workout);
}


module.exports = { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout };