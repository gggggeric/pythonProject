import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to control loading spinner
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };

        setLoading(true); // Show the loading spinner when the request is being sent

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/register/', formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setLoading(false); // Hide the spinner when the request is complete
            setShowModal(true); // Show modal on successful registration
        } catch (error) {
            setLoading(false); // Hide the spinner if there's an error
            console.error('There was an error registering!', error);
            alert('Registration failed!');
        }
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
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
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {/* Show loading spinner while registering */}
            {loading && <div className="loading-spinner"></div>}

            {/* Registration Success Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Registration successful!</p>
                        <div className="modal-buttons">
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
