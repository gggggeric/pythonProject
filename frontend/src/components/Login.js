// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', {
                email,
                password,
            });

            console.log('Login successful:', response.data);
            setIsAuthenticated(true); // Update state to reflect successful authentication
            localStorage.setItem('isAuthenticated', 'true'); // Persist authentication status
            alert('Login successful! Welcome back!');
            navigate('/'); // Redirect to the protected route
        } catch (error) {
            console.error('There was an error logging in!', error);
            // Set error message to display to the user
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                {/* Display error message if there's an error */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Login;
