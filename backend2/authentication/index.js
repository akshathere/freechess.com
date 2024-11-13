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
exports.authenticateUser = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const JWT_SECRET = 'your-secret-key'; // Replace with your actual JWT secret
// Middleware to parse JSON bodies
app.use(express_1.default.json());
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Request body:", req.body); // Add this line for debugging
        const { email, password } = req.body;
        try {
            // Check if a user with the provided email already exists
            const user = yield prisma_1.db.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user) {
                // If user exists, handle sign-in
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ success: false, message: 'Invalid password' });
                }
                // Generate JWT token for the signed-in user
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                    expiresIn: '1h',
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'strict',
                });
                console.log(token, "in signin");
                return res.status(200).json({
                    success: true,
                    message: 'User signed in successfully',
                    token,
                });
            }
            else {
                // If user does not exist, handle sign-up
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield prisma_1.db.user.create({
                    data: {
                        email: email,
                        password: hashedPassword,
                    },
                });
                // Generate JWT token for the newly registered user
                const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
                    expiresIn: '1h',
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'strict',
                });
                console.log(token, "in signup");
                return res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                    token,
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
}
exports.authenticateUser = authenticateUser;
// Exporting as a module
