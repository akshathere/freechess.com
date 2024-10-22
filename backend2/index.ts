import express, { Request, Response, NextFunction } from "express";
import { signIn, signup } from "./authentication/index";
import cors from 'cors'
const app = express();

console.log("error k ha-1")
app.use(cors());
console.log("error k ha0")
app.use(express.json());

// Wrapper to handle async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
console.log("error k ha")
app.post("/signup", asyncHandler(signup));
app.post("/signin", asyncHandler(signIn));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
console.log("error k ha1")
app.listen(3000)
