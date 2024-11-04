import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EncryptionTool from './components/EncryptionTool';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [encryptionKey, setEncryptionKey] = useState(''); // State for encryption key

    return (
        <Router>
            <div style={{ backgroundColor: '#3C3D37', minHeight: '100vh', padding: '20px', color: 'white' }}>
                <Navbar 
                    isAuthenticated={isAuthenticated} 
                    setIsAuthenticated={setIsAuthenticated} 
                    encryptionKey={encryptionKey} // Pass encryption key to Navbar
                />
                <Routes>
                    <Route 
                        path="/" 
                        element={<EncryptionTool 
                            isAuthenticated={isAuthenticated} 
                            setEncryptionKey={setEncryptionKey} // Pass function to set encryption key
                        />} 
                    />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
