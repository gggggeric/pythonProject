// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EncryptionTool from './components/EncryptionTool';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div style={{ backgroundColor: '#3C3D37', minHeight: '100vh', padding: '20px', color: 'white' }}>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/" element={<EncryptionTool isAuthenticated={isAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
