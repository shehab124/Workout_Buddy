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
        const workout = await workoutModel.create({ title, load, reps });
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
// const deleteWorkout = async (req, res) => {
//     const { id } = req.params;
//     console.log("Attempting to delete id: " + id);
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         console.log("INVALID ID")
//         return res.status(404).json({ error: "Invalid ID" });
//     }

//     const x = await workoutModel.findById(id)
//     console.log("FOUND!!!" + x);
//     const workout = await workoutModel.deleteOne({ _id: id });

//     if (!workout) {
//         return res.status(400).json({ error: "Invalid ID" });
//     }

//     res.status(200).json(workout);
// }

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete id: " + id);

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("INVALID ID");
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        // Find the workout by ID
        const workout = await workoutModel.findById(String(id));

        if (!workout) {
            console.log("WORKOUT NOT FOUND")
            return res.status(404).json({ error: "Workout not found" });
        }

        // Delete the workout
        const result = await workout.deleteOne();

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Workout deleted successfully" });
        } else {
            res.status(500).json({ error: "Failed to delete workout" });
        }
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
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