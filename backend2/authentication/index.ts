import express, { Request, Response } from "express";
import { db } from "../prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const JWT_SECRET = 'your-secret-key'; // Replace with your actual JWT secret

// Middleware to parse JSON bodies
app.use(express.json());

interface AuthBody {
  email: string;
  password: string;
}

export async function authenticateUser(req: Request, res: Response) {
    console.log("Request body:", req.body); // Add this line for debugging
  const { email, password } = req.body as AuthBody;

  try {
    // Check if a user with the provided email already exists
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      // If user exists, handle sign-in
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // Generate JWT token for the signed-in user
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'strict',
      });
      console.log(token,"in signin")
      return res.status(200).json({
        success: true,
        message: 'User signed in successfully',
        token,
      });

    } else {
      // If user does not exist, handle sign-up
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });

      // Generate JWT token for the newly registered user
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'strict',
      });
      console.log(token,"in signup")
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Exporting as a module
