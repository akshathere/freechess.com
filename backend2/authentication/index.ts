import express, { NextFunction, Request, Response } from "express";
import { validateSchema } from "../zod";
import { db } from "../prisma";
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt')
const app = express();
const JWT_SECRET = 'your-secret-key'; // Replace with your actual JWT secret

// Middleware to parse JSON bodies
app.use(express.json());
interface SignupBody {
    email: string;
    password: string;
  }
// Signup Route Handler
export async function signup(req: Request, res: Response) {
    const { email, password } = req.body as SignupBody;

    try {
        // Check if a user with the same email already exists
        const existingUser = await db.user.findFirst({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await db.user.create({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// Signin Route Handler
export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await db.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password); // `user.password` is the hashed password stored in the database

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
// Exporting as a module

