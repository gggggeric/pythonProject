import React from 'react';
import './Help.css';

const Help = () => {
    return (
        <div className="help-container">
            <h1>Encryption and Decryption Guide</h1>

            <section>
                <h2>How to Use the Program</h2>
                <ul>
                    <li>Register first</li>
                    <li>Login</li>
                    <li>Upload any file</li>
                    <li>Check notifications for the encryption key</li>
                </ul>
            </section>

            <section>
                <h2>What is Encryption?</h2>
                <p>
                    Encryption is a technique used to secure data by converting it into an unreadable format that can 
                    only be decoded with a specific key. This ensures data confidentiality and prevents unauthorized 
                    access. One of the most widely used encryption methods is AES (Advanced Encryption Standard), 
                    which uses a single, symmetric key for both encryption and decryption.
                </p>
            </section>

            <section>
                <h2>What is Decryption?</h2>
                <p>
                    Decryption is the process of converting encrypted data back to its original, readable format using 
                    the correct key. In AES, the same key that encrypted the data is used to decrypt it, meaning secure 
                    key storage is essential.
                </p>
            </section>

            <section>
                <h2>Objective: Build a Python Program to Encrypt Files</h2>
                <p>
                    This program will focus on encrypting files using symmetric encryption with AES. The project 
                    involves understanding cryptographic methods, handling files, and implementing secure encryption 
                    with Python. You'll use the PyCryptodome library, which provides tools to create secure 
                    encryption applications.
                </p>

                <h3>Skills Needed:</h3>
                <ul>
                    <li><strong>Cryptography:</strong> Utilizing the PyCryptodome library to implement AES encryption.</li>
                    <li><strong>File Handling:</strong> Working with files to read, encrypt, and store data securely.</li>
                    <li><strong>User Input Validation:</strong> Ensuring proper user input, such as file paths and keys, to prevent errors.</li>
                </ul>

                <h3>Program Objective:</h3>
                <p>
                    The goal is to create a secure file encryption program that uses AES to encrypt sensitive data files. 
                    With a few lines of Python, users will be able to protect files with a specified encryption key.
                </p>
            </section>

            <section className="about-developers">
                <h2>About the Developers</h2>
                <ul>
                    <li><strong>Geric Morit</strong> - Developer (<a href="mailto:gericmorit3211@gmail.com">gericmorit3211@gmail.com</a>)</li>
                    <li><strong>Anna Barcelona</strong> - Developer (<a href="mailto:barcelona.annab@gmail.com">barcelona.annab@gmail.com</a>)</li>
                    <li><strong>Kristel Cabalbag</strong> - Developer (<a href="mailto:kristel.cabalbag@example.com">kristel.cabalbag@example.com</a>)</li>
                    <li><strong>Nicole Bacala</strong> - Developer (<a href="mailto:Nicolebacala17@gmail.com">Nicolebacala17@gmail.com</a>)</li>
                </ul>
            </section>
        </div>
    );
};

export default Help;
