"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidation = void 0;
const zod_1 = require("../zod");
function ZodValidation(req, res, next) {
    const body = req.body;
    // Validate the input using the schema
    const response = (0, zod_1.validateSchema)(body);
    // Send the appropriate response based on the validation result
    if (response.status !== 200) {
        res.status(response.status).json({ error: response.message });
    }
}
exports.ZodValidation = ZodValidation;
