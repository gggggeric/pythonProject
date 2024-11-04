import React, { useState } from 'react';
import axios from 'axios';
import './EncryptionTool.css';

const EncryptionTool = ({ isAuthenticated, setEncryptionKey }) => {
    const [file, setFile] = useState(null);
    const [key, setKey] = useState('');
    const [mode, setMode] = useState('encrypt');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

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

        // Optionally validate key length if in decrypt mode
        if (mode === 'decrypt' && key.length === 0) {
            setMessage('Please provide a decryption key.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        if (mode === 'decrypt') {
            formData.append('key', key);
        }

        setLoading(true); // Set loading state to true
        try {
            const endpoint = mode === 'encrypt' ? '/api/encrypt/' : '/api/decrypt/';
            const response = await axios.post(`http://localhost:8000${endpoint}`, formData, {
                responseType: mode === 'decrypt' ? 'blob' : 'json',
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Handle the response based on the mode
            if (mode === 'encrypt') {
                const { encryption_key, file_name, file } = response.data;
                alert(`Encryption successful! Your key is: ${encryption_key}. Please keep it safe.`);
                setEncryptionKey(encryption_key);

                // Trigger download of the encrypted file
                const blob = new Blob([Uint8Array.from(atob(file), c => c.charCodeAt(0))]);
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', file_name);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            if (mode === 'decrypt') {
                const contentDisposition = response.headers['content-disposition'];
                let original_filename = file.name.replace('.enc', ''); // Use original file name as fallback
                if (contentDisposition) {
                    const matches = contentDisposition.match(/filename="?([^";]+)"?/);
                    if (matches && matches[1]) {
                        original_filename = matches[1];
                    }
                }

                // Use the response.data directly as the Blob
                const blob = response.data;

                // Trigger download of the decrypted file
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', original_filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            setMessage('File processed successfully.');
        } catch (error) {
            console.error('Error processing the file', error.response?.data || error);
            setMessage(error.response?.data?.error || 'There was an error processing your request.');
        } finally {
            setLoading(false); // Reset loading state
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
                
                {isAuthenticated ? (
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : (mode === 'encrypt' ? 'Encrypt File' : 'Decrypt File')}
                    </button>
                ) : (
                    <p>Please log in to make a transaction.</p>
                )}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EncryptionTool;
