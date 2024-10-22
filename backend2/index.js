"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./authentication/index");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
console.log("error k ha-1");
app.use((0, cors_1.default)());
console.log("error k ha0");
app.use(express_1.default.json());
// Wrapper to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
console.log("error k ha");
app.post("/signup", asyncHandler(index_1.signup));
app.post("/signin", asyncHandler(index_1.signIn));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
console.log("error k ha1");
app.listen(3000);
