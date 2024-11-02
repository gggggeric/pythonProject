// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import EncryptionTool from './components/EncryptionTool';
import './components/Auth.css'; // Import the CSS file for styling
import './index.css'; // Import the global styles

const App = () => {
    return (
        <Router>
            <div style={{ backgroundColor: '#3C3D37', minHeight: '100vh' }}> {/* Set background color */}
                <Navbar />  {/* Include the Navbar component */}
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} /> {/* Set default homepage */}
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/encryptionTool" element={<EncryptionTool />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
