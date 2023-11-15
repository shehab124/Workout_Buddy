import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { email, password };

        const response = fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields);
        }
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>
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
            <button>Log In</button>
        </form>
    );
}

export default Login;