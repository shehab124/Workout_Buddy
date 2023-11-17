import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";


const WorkoutDetails = ({ workout, id }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()


    const handleDelete = async () => {

        if (!user)
            return

        const response = await fetch('/api/workouts/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (response.ok)
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
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