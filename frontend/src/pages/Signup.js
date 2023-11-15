import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const { state, dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { email, password };

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();
        console.log(json.user)
        console.log(json)
        if (!response.ok)
            setError(json.error)

        if (response.ok) {
            setEmail('');
            setPassword('');
            setError(null);
            dispatch({ type: 'SIGNUP', payload: json.email })
        }
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />
            <button>Sign Up</button>
        </form>
    );
}

export default Signup;