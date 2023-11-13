import { useContext } from "react"
import { WorkoutContext } from "../contexts/WorkoutContext"


const WorkoutDetails = ({ workout, id }) => {

    const { deleteWorkout } = useContext(WorkoutContext);

    const handleDelete = async () => {
        await fetch('/api/workouts/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    console.log("Error deleting item: " + id)
                }
                else if (response.ok) {
                    deleteWorkout(id);
                    //console.log("Workout Deleted id: " + workout._id);
                }
            })
            .catch(error => {
                //console.log(workout._id)
                //console.log("Error: ", error);
            })
    }


    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <button className="delete" onClick={handleDelete}>Delete</button>
            <p><strong>Load (Kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails;