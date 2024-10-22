"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signup = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../prisma");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const app = (0, express_1.default)();
const JWT_SECRET = 'your-secret-key'; // Replace with your actual JWT secret
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Signup Route Handler
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Check if a user with the same email already exists
            const existingUser = yield prisma_1.db.user.findFirst({
                where: {
                    email: email
                }
            });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
            // Hash the password using bcrypt
            const hashedPassword = yield bcrypt.hash(password, 10);
            // Create a new user in the database
            const newUser = yield prisma_1.db.user.create({
                data: {
                    email: email,
                    password: hashedPassword, // Save the hashed password
                }
            });
            // Optionally, you could generate a JWT for the user right after signup
            const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
                expiresIn: '1h' // Token expiration time
            });
            // Set the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Set secure flag in production
                maxAge: 60 * 60 * 1000, // 1 hour (in milliseconds)
                sameSite: 'strict' // Helps mitigate CSRF attacks
            });
            // Respond with success
            res.status(201).json({ success: true, message: 'User created successfully', token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
}
exports.signup = signup;
// Signin Route Handler
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Find the user by email
            const user = yield prisma_1.db.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            // Validate the password using bcrypt
            const isPasswordValid = yield bcrypt.compare(password, user.password); // `user.password` is the hashed password stored in the database
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
            // Create a JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: '1h' // Token expiration time
            });
            // Set the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Set secure flag in production
                maxAge: 60 * 60 * 1000, // 1 hour (in milliseconds)
                sameSite: 'strict' // Helps mitigate CSRF attacks
            });
            // Send a success response
            res.status(200).json({ success: true, message: 'User signed in successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
}
exports.signIn = signIn;
// Exporting as a module
