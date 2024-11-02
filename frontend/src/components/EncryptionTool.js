import React, { useState } from 'react';
import axios from 'axios';
import './EncryptionTool.css';

const EncryptionTool = () => {
    const [file, setFile] = useState(null);
    const [key, setKey] = useState('');
    const [mode, setMode] = useState('encrypt');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleKeyChange = (e) => {
        const encodedKey = btoa(e.target.value); // Encode key to Base64
        setKey(encodedKey);
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

        // Log the FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
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
            if (mode === 'encrypt') {
                link.setAttribute('download', `${file.name}.enc`); // Encrypted file retains .enc
            } else {
                link.setAttribute('download', file.name.replace(/\.enc$/, '')); // Decrypted file uses original name
            }

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
                
                <button type="submit">{mode === 'encrypt' ? 'Encrypt File' : 'Decrypt File'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EncryptionTool;
