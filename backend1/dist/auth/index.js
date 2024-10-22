"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAuthUser = void 0;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use your JWT secret here
function extractAuthUser(token) {
    if (!token) {
        console.error('Token not provided');
        return null;
    }
    try {
        // Verify the token and return the decoded user data
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Return the decoded user data (id and email)
    }
    catch (error) {
        console.error('Invalid token:', error.message);
        return null; // Return null if the token is invalid or expired
    }
}
exports.extractAuthUser = extractAuthUser;
