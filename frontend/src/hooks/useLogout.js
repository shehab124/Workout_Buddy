import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useLogout = () => {

    const { dispatch } = useContext(AuthContext);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem('user');
    }
    return { logout };
}

export default useLogout;