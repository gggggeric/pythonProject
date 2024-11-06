import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading
    const [loginSuccess, setLoginSuccess] = useState(false); // To track if login was successful
    const [showModal, setShowModal] = useState(false); // Modal state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login/', {
                email,
                password,
            });

            setIsAuthenticated(true); // Update state to reflect successful authentication
            localStorage.setItem('isAuthenticated', 'true'); // Persist authentication status
            setLoginSuccess(true); // Set login success state
            setErrorMessage(''); // Reset error message
            setLoading(false); // Hide loading spinner
            setShowModal(true); // Show success modal
            setTimeout(() => {
                navigate('/'); // Redirect to the home page or protected route
            }, 2000);
        } catch (error) {
            setErrorMessage('Invalid email or password. Please try again.'); // Show error message
            setLoading(false); // Hide loading spinner
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
                <button type="submit" disabled={loading}>Login</button>
                {/* Show loading spinner when logging in */}
                {loading && <div className="loading-spinner"></div>}
                {/* Display error message if there's an error */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>

            {/* Modal for login success */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Login Successful!</h3>
                        <p>Welcome back!</p>
                        <button onClick={() => setShowModal(false)} className="modal-close-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
