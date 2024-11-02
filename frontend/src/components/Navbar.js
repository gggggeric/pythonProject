// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate(); // Using useNavigate for programmatic navigation

    useEffect(() => {
        // Check local storage for authentication state on component mount
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, [setIsAuthenticated]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            setIsAuthenticated(false); // Update state
            localStorage.removeItem('isAuthenticated'); // Clear local storage
            navigate('/'); // Redirect to home page after logout
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Data Encryption and Decryption
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-links">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>
                    </li>
                    {!isAuthenticated && ( // Show Register link only if not authenticated
                        <li className="navbar-item">
                            <Link to="/register" className="navbar-links">
                                <FontAwesomeIcon icon={faUserPlus} /> Register
                            </Link>
                        </li>
                    )}
                    {!isAuthenticated ? (
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-links">
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </Link>
                        </li>
                    ) : (
                        <li className="navbar-item" onClick={handleLogout}>
                            <span className="navbar-links" style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
