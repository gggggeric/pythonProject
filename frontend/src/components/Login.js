// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Ensure this import is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', {
                email,
                password,
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div className="auth-container"> {/* Apply the class here */}
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" // Placeholder text for email
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" // Placeholder text for password
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
