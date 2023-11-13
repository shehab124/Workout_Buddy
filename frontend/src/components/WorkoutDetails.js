
const WorkoutDetails = ({ workout }) => {

    const handleDelete = async () => {
        await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok)
                    console.log("Error deleting item")
            })
            .catch(error => {
                console.log("Error: ", error);
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