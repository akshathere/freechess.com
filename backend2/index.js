"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./authentication/index");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express_1.default.json());
// Wrapper to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
console.log("error k ha");
app.post("/signup", asyncHandler(index_1.authenticateUser));
app.post("/signin", asyncHandler(index_1.authenticateUser));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
console.log("error k ha1");
app.listen(3000);
