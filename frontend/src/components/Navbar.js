import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated, encryptionKey }) => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, [setIsAuthenticated]);

    useEffect(() => {
        // Update notifications state when encryptionKey changes
        if (encryptionKey) {
            setNotifications([`Your encryption key: ${encryptionKey}`]);
        }
    }, [encryptionKey]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            navigate('/');
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const clearNotifications = () => {
        setNotifications([]);
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
                    {!isAuthenticated && (
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
                        <>
                            <li className="navbar-item" onClick={toggleDropdown}>
                                <span className="navbar-links notification">
                                    <FontAwesomeIcon icon={faBell} /> Notifications
                                </span>
                                {dropdownOpen && (
                                    <div className="notification-dropdown">
                                        {notifications.length > 0 ? (
                                            <>
                                                {notifications.map((note, index) => (
                                                    <div key={index} className="notification-item">
                                                        {note}
                                                    </div>
                                                ))}
                                                <button className="clear-notifications" onClick={clearNotifications}>
                                                    Clear Notifications
                                                </button>
                                            </>
                                        ) : (
                                            <div className="notification-item">No notifications at the moment</div>
                                        )}
                                    </div>
                                )}
                            </li>
                            <li className="navbar-item" onClick={handleLogout}>
                                <span className="navbar-links" style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
