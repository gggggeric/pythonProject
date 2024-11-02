// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Data Encryption and Decryption
                </Link>
                <ul className="navbar-menu">

                <li className="navbar-item">
                        <Link to="/EncryptionTool" className="navbar-links">
                            <FontAwesomeIcon icon={faSignInAlt} /> try
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/home" className="navbar-links">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/register" className="navbar-links">
                            <FontAwesomeIcon icon={faUserPlus} /> Register
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-links">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
