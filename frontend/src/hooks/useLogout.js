import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useWorkoutsContext } from './useWorkoutContext';

const useLogout = () => {

    const { dispatch } = useContext(AuthContext);
    const { dispatch: workoutDispatch } = useWorkoutsContext();

    const logout = async () => {
        workoutDispatch({ type: "CLEAR_WOKROUTS" })
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('user');
    }
    return { logout };
}

export default useLogout;