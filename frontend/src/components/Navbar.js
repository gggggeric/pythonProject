import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated, encryptionKey }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [logoutModal, setLogoutModal] = useState(false); // Modal for logout success
    const [confirmLogout, setConfirmLogout] = useState(false); // Modal for logout confirmation

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, [setIsAuthenticated]);

    useEffect(() => {
        if (encryptionKey) {
            setNotifications((prev) => [...prev, `Your encryption key: ${encryptionKey}`]);
        }
    }, [encryptionKey]);

    const handleLogoutClick = () => {
        setConfirmLogout(true); // Show confirmation modal
    };

    const handleLogoutConfirm = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        setConfirmLogout(false); // Hide confirmation modal
        setLogoutModal(true); // Show success modal
        setTimeout(() => {
            setLogoutModal(false); // Hide success modal after 2 seconds
            navigate('/');
        }, 2000);
    };

    const handleLogoutCancel = () => {
        setConfirmLogout(false); // Hide confirmation modal
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    // Breadcrumbs logic
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        return (
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <span key={to}>
                            {' > '}
                            <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
                        </span>
                    );
                })}
            </div>
        );
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
                                    <FontAwesomeIcon icon={faBell} />
                                    {notifications.length > 0 && (
                                        <span className="notification-bubble">
                                            {notifications.length}
                                        </span>
                                    )}
                                    Notifications
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
                            <li className="navbar-item" onClick={handleLogoutClick}>
                                <span className="navbar-links" style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {/* Breadcrumbs */}
            {generateBreadcrumbs()}

            {/* Modal for logout success */}
            {logoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>You have successfully logged out.</p>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmLogout && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-buttons">
                            <button onClick={handleLogoutConfirm}>Yes</button>
                            <button onClick={handleLogoutCancel}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
