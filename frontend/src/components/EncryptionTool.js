// src/components/EncryptionTool.js
import React, { useState } from 'react';
import axios from 'axios';
import './EncryptionTool.css';

const EncryptionTool = ({ isAuthenticated }) => {
    const [file, setFile] = useState(null);
    const [key, setKey] = useState('');
    const [mode, setMode] = useState('encrypt');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to proceed.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        if (mode === 'decrypt') {
            formData.append('key', key);
        }

        try {
            const endpoint = mode === 'encrypt' ? '/api/encrypt/' : '/api/decrypt/';
            const response = await axios.post(`http://localhost:8000${endpoint}`, formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Handle the response based on the mode
            if (mode === 'encrypt') {
                const encryptionKey = response.headers['encryption-key'];
                if (encryptionKey) {
                    alert(`Encryption successful! Your key is: ${encryptionKey}. Please keep it safe.`);
                }
            }

            // Download the response file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Set the download filename based on the mode
            link.setAttribute('download', mode === 'encrypt' ? `${file.name}.enc` : file.name.replace(/\.enc$/, ''));

            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage('File processed successfully.');
        } catch (error) {
            console.error('Error processing the file', error.response?.data || error);
            setMessage(error.response?.data?.message || 'There was an error processing your request.');
        }
    };

    return (
        <div className="encryption-tool">
            <h1>Data Encryption & Decryption Tool</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select File:
                    <input type="file" onChange={handleFileChange} />
                </label>
                
                <label>
                    Operation:
                    <select value={mode} onChange={handleModeChange}>
                        <option value="encrypt">Encrypt</option>
                        <option value="decrypt">Decrypt</option>
                    </select>
                </label>
                
                {mode === 'decrypt' && (
                    <label>
                        Decryption Key:
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Enter the decryption key"
                        />
                    </label>
                )}
                
                {/* Only show the button if the user is authenticated */}
                {isAuthenticated ? (
                    <button type="submit">{mode === 'encrypt' ? 'Encrypt File' : 'Decrypt File'}</button>
                ) : (
                    <p>Please log in to make a transaction.</p>
                )}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EncryptionTool;
