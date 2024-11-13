import express, { Request, Response, NextFunction } from "express";
import { authenticateUser } from "./authentication/index";
import cors from 'cors'
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  }));
app.use(express.json());

// Wrapper to handle async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
console.log("error k ha")
app.post("/signup", asyncHandler(authenticateUser));
app.post("/signin", asyncHandler(authenticateUser));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
console.log("error k ha1")
app.listen(3000)
