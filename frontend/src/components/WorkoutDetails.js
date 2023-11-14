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
                }
            })
    }


    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (Kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default WorkoutDetails;