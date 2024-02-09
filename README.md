# Secured File Share

Secure File Sharing App is a comprehensive solution for secure file exchange, developed using the MERN (MongoDB, Express.js, React, Node.js) stack. This application enables users to share files with end-users with a high level of privacy and security. Featuring end-to-end encryption, password protection, input sanitization, brute force attack protection, protection against NoSQL injections, XSS attacks, and many other security measures, it stands as a modern web application designed to meet the highest standards of data protection.

# Application interface

![screencapture-localhost-5173-2024-02-09-09_13_53](https://github.com/Kuzma02/Secured-File-Share/assets/138793624/bd3c6cf8-5a0a-4c96-a7c7-a77052a2674e)

![screencapture-localhost-5173-app-2024-02-09-09_14_12](https://github.com/Kuzma02/Secured-File-Share/assets/138793624/da30c3e4-bf2e-4550-b7b9-2ff8e1acbf77)

![screencapture-localhost-5173-download-2024-02-09-09_14_20](https://github.com/Kuzma02/Secured-File-Share/assets/138793624/3f9a9ffb-1e81-4d33-a7c6-ba1f08d64c82)

# Features
- End-to-End Encryption: Ensures that files are encrypted during transmission and storage, providing confidentiality and security for sensitive information.
- Password Protection: Allows senders to protect shared files with a password, ensuring that only intended recipients can access the files.
- Input Sanitization: Guards against malicious input, preventing NoSQL injections, and ensuring the integrity of the database.
- Brute Force Protection: Implements rate limiting and account lockout mechanisms to protect against brute force attacks.
- XSS Protection: Includes measures to sanitize input and output, protecting against Cross-Site Scripting (XSS) attacks.
- Comprehensive Security: Incorporates various other security practices to safeguard against a wide array of vulnerabilities.

# Technologies Used
MongoDB: For a flexible, scalable database.
Express.js: To handle server-side logic and RESTful API endpoints.
React: For building a dynamic and responsive user interface.
Node.js: As the runtime environment for executing JavaScript on the server side.

# Getting Started
To get a local copy up and running, follow these simple steps.

# Prerequisites
Node.js
Internet connection

# Installation

1. Clone the repo
```
https://github.com/Kuzma02/Secured-File-Share
```

2. Enter your environment variables in .env on the server
```
MONGO_URI=your_mongo_uri
MJ_APIKEY=your_mail_jet_public_API_key
MJ_APIKEY_PRIVATE=your_mail_jet_private_API_key
```

3. Enter your environment variables in .env on the client
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
```

4. In the root of the project create folder "uploads"

5. Open a terminal in the root of your project and run:
```
npm install
node app.js
```
6. Open a terminal in the /client of your project and run:
```
npm install
npm run dev
```
