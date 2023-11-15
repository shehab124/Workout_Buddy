import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useSignup = () => {

    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (email, password) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok)
            setError(json.error)

        if (response.ok) {
            setError(null);
            dispatch({ type: 'LOGIN', payload: json })
            localStorage.setItem('user', JSON.stringify(json))
        }

        setIsLoading(false);
    }
    return { signup, error, isLoading };
}

export default useSignup;