import { useContext, useEffect, useState } from "react";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../contexts/WorkoutContext";

const Home = () => {

    const { workouts } = useContext(WorkoutContext);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} id={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;