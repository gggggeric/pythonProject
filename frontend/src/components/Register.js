import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/register/', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
