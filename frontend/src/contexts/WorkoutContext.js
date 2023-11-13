import React, { useState, createContext, useEffect } from 'react';

export const WorkoutContext = createContext();

const WorkoutContextProvider = ({ children }) => {

    const [workouts, setWorkouts] = useState(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts/')
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        }
        fetchWorkouts();
    });

    const addWorkout = (title, load, reps, id) => {
        setWorkouts([{ _id: id, title, load, reps }, ...workouts]);
    }

    const deleteWorkout = (id) => {
        setWorkouts(workouts.filter(workout => workout._id !== id))
    }


    return (
        <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutContextProvider;